"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboard.service";
import { Utensils, Wallet, ShoppingCart, TrendingUp, AlertCircle, Bell, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const colorMap: Record<string, { bg: string; icon: string; gradient: string; light: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
    light: "bg-emerald-500/5",
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    light: "bg-blue-500/5",
  },
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
    gradient: "from-orange-500 to-amber-500",
    light: "bg-orange-500/5",
  },
  violet: {
    bg: "bg-violet-500/10",
    icon: "text-violet-400",
    gradient: "from-violet-500 to-purple-500",
    light: "bg-violet-500/5",
  },
};

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  loading,
  color = "emerald",
  trend,
}: {
  title: string;
  value: string | number;
  icon: any;
  description: string;
  loading: boolean;
  color?: string;
  trend?: { value: string; positive: boolean };
}) {
  const c = colorMap[color] || colorMap.emerald;

  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-5 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700/60 transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ring-1 ring-white/[0.05]`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                trend.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              }`}
            >
              {trend.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend.value}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-7 w-28 bg-zinc-800" />
            <Skeleton className="h-3 w-20 bg-zinc-800/50" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-white tracking-tight mb-1">{value}</div>
            <div className="text-xs text-zinc-500">{title}</div>
            <div className="text-[11px] text-zinc-600 mt-0.5">{description}</div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function OverviewCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm p-6 ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

function OverviewRow({ label, value, color = "emerald", barWidth }: { label: string; value: string | number; color?: string; barWidth?: string }) {
  const c = colorMap[color] || colorMap.emerald;
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b border-zinc-800/30 last:border-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="flex items-center gap-3">
        {barWidth && (
          <div className="w-20 h-1.5 rounded-full bg-zinc-800 overflow-hidden hidden sm:block">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: barWidth }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full bg-gradient-to-r ${c.gradient}`}
            />
          </div>
        )}
        <span className="text-sm font-semibold text-zinc-100 tabular-nums">{value}</span>
      </div>
    </div>
  );
}

function StatBar({ label, value, total, color = "emerald" }: { label: string; value: number; total: number; color?: string }) {
  const c = colorMap[color] || colorMap.emerald;
  const pct = total > 0 ? Math.min((value / total) * 100, 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-100 font-medium">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${c.gradient}`}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: () => DashboardService.getSummary(),
    refetchInterval: 30_000,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-lg font-medium text-zinc-300 mb-1">Failed to load dashboard</p>
        <p className="text-sm text-zinc-600">Please try refreshing the page.</p>
      </div>
    );
  }

  const balance = (data?.depositBalance || 0) - (data?.userEstimatedCost || 0);
  const isBalancePositive = balance >= 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Meals This Month"
          value={data?.totalMeals || 0}
          icon={Utensils}
          description="Across all mess members"
          loading={isLoading}
          color="emerald"
          trend={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Total Bazaar Expense"
          value={`৳${(data?.totalBazaar || 0).toLocaleString()}`}
          icon={ShoppingCart}
          description="Total spent on groceries"
          loading={isLoading}
          color="blue"
          trend={{ value: "8%", positive: false }}
        />
        <StatCard
          title="Current Meal Rate"
          value={`৳${(data?.mealRate || 0).toFixed(2)}`}
          icon={TrendingUp}
          description="Cost per meal unit"
          loading={isLoading}
          color="orange"
        />
        <StatCard
          title="My Deposit Balance"
          value={`৳${(data?.depositBalance || 0).toLocaleString()}`}
          icon={Wallet}
          description="Your current advance balance"
          loading={isLoading}
          color="violet"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Monthly Overview */}
        <OverviewCard className="lg:col-span-4" delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-zinc-100">My Monthly Overview</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Your personal consumption summary</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-5 w-full bg-zinc-800" />
              <Skeleton className="h-5 w-4/5 bg-zinc-800" />
              <Skeleton className="h-5 w-3/4 bg-zinc-800" />
              <Skeleton className="h-5 w-2/3 bg-zinc-800" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-800/20 p-4 space-y-3">
                <StatBar label="My Meals" value={data?.userMealsCount || 0} total={data?.totalMeals || 1} color="emerald" />
                <StatBar label="My Estimated Cost" value={(data?.userEstimatedCost || 0)} total={data?.totalBazaar || 1} color="blue" />
              </div>

              <div className="divide-y divide-zinc-800/30">
                <OverviewRow label="My Total Meals" value={data?.userMealsCount || 0} color="emerald" barWidth="70%" />
                <OverviewRow
                  label="My Estimated Cost"
                  value={`৳${(data?.userEstimatedCost || 0).toFixed(2)}`}
                  color="blue"
                  barWidth="45%"
                />
                <OverviewRow
                  label="My Deposit"
                  value={`৳${(data?.depositBalance || 0).toLocaleString()}`}
                  color="violet"
                  barWidth="80%"
                />
              </div>

              <div
                className={`mt-4 p-4 rounded-xl border ${
                  isBalancePositive ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Remaining Balance</p>
                    <p className="text-xs text-zinc-600">After estimated cost deduction</p>
                  </div>
                  <div className="text-right">
                    <motion.span
                      key={balance}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className={`text-xl font-bold ${isBalancePositive ? "text-emerald-400" : "text-red-400"}`}
                    >
                      ৳{balance.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${data?.depositBalance ? Math.min((Math.abs(balance) / data.depositBalance) * 100, 100) : 0}%`,
                    }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full ${isBalancePositive ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-red-500 to-rose-500"}`}
                  />
                </div>
              </div>
            </div>
          )}
        </OverviewCard>

        {/* Notifications & Quick Info */}
        <OverviewCard className="lg:col-span-3" delay={0.4}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Notifications</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Recent updates and alerts</p>
            </div>
            <div className="p-2 rounded-lg bg-zinc-800/50">
              <Bell className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-zinc-800 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.recentNotifications?.length > 0 ? (
                data.recentNotifications.map((notif: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-800/20 border border-zinc-800/30 hover:bg-zinc-800/30 transition-colors"
                  >
                    <p className="text-sm text-zinc-300">{notif.message}</p>
                    <p className="text-[11px] text-zinc-600 mt-1">{notif.time}</p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
                  <div className="p-3 rounded-full bg-zinc-800/50 mb-3">
                    <Bell className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-500">No new notifications</p>
                  <p className="text-xs text-zinc-600 mt-1">You&apos;re all caught up!</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-zinc-800/30">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/30">
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Members</div>
                <div className="text-lg font-bold text-zinc-100">{data?.totalMembers || 0}</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/30">
                <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Days Active</div>
                <div className="text-lg font-bold text-zinc-100">{data?.activeDays || 0}</div>
              </div>
            </div>
          </div>
        </OverviewCard>
      </div>
    </motion.div>
  );
}
