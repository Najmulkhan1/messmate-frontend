"use client";

import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/services/dashboard.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Wallet, ShoppingCart, TrendingUp, AlertCircle, Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

// Component for Stats Card
const StatCard = ({ title, value, icon: Icon, description, loading, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <div className="p-2 bg-emerald-500/10 rounded-full">
          <Icon className="w-4 h-4 text-emerald-500" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24 bg-zinc-800 mt-1" />
        ) : (
          <div className="text-2xl font-bold text-zinc-100">{value}</div>
        )}
        <p className="text-xs text-zinc-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => DashboardService.getSummary(),
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p>Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Meals This Month"
          value={data?.totalMeals || 0}
          icon={Utensils}
          description="Across all mess members"
          loading={isLoading}
          delay={0.1}
        />
        <StatCard
          title="Total Bazaar Expense"
          value={`৳${data?.totalBazaar || 0}`}
          icon={ShoppingCart}
          description="Total spent on groceries"
          loading={isLoading}
          delay={0.2}
        />
        <StatCard
          title="Current Meal Rate"
          value={`৳${(data?.mealRate || 0).toFixed(2)}`}
          icon={TrendingUp}
          description="Cost per meal unit"
          loading={isLoading}
          delay={0.3}
        />
        <StatCard
          title="My Deposit Balance"
          value={`৳${data?.depositBalance || 0}`}
          icon={Wallet}
          description="Your current advance balance"
          loading={isLoading}
          delay={0.4}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          className="col-span-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <CardHeader>
              <CardTitle className="text-zinc-100">My Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-4/5 bg-zinc-800" />
                  <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <span className="text-zinc-400">My Total Meals</span>
                    <span className="font-semibold text-zinc-100">{data?.userMealsCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <span className="text-zinc-400">My Estimated Cost</span>
                    <span className="font-semibold text-red-400">৳{(data?.userEstimatedCost || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-zinc-400 font-medium">Estimated Remaining Balance</span>
                    <span className={`font-bold text-lg ${(data?.depositBalance || 0) - (data?.userEstimatedCost || 0) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      ৳{((data?.depositBalance || 0) - (data?.userEstimatedCost || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="col-span-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <CardHeader>
              <CardTitle className="text-zinc-100">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-48 text-zinc-500 space-y-2">
                <Bell className="w-8 h-8 opacity-50" />
                <p>No new notifications</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
