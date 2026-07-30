"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Users,
  Wallet,
  FileText,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/meals", label: "Meals", icon: Utensils },
  { href: "/dashboard/bazaars", label: "Bazaars", icon: ShoppingCart },
  { href: "/dashboard/members", label: "Members", icon: Users },
  { href: "/dashboard/deposits", label: "Deposits", icon: Wallet },
  { href: "/dashboard/bills", label: "Bills", icon: FileText },
];

const iconColors: Record<string, string> = {
  "/dashboard": "from-emerald-500 to-teal-500",
  "/dashboard/meals": "from-blue-500 to-cyan-500",
  "/dashboard/bazaars": "from-orange-500 to-amber-500",
  "/dashboard/members": "from-violet-500 to-purple-500",
  "/dashboard/deposits": "from-rose-500 to-pink-500",
  "/dashboard/bills": "from-indigo-500 to-blue-500",
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <div className="flex h-16 items-center px-5 border-b border-zinc-800/50">
        <div className="p-1.5 bg-emerald-500/15 rounded-lg ring-1 ring-emerald-500/20 mr-2.5">
          <Utensils className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight">
            <span className="text-white">Mess</span>
            <span className="text-emerald-400">Mate</span>
          </span>
          <div className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">Dashboard</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const gradient = iconColors[item.href] || "from-zinc-500 to-zinc-500";
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}>
              <div
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/15"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
                <div
                  className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${gradient} shadow-lg`
                      : "bg-zinc-800/50 group-hover:bg-zinc-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`} />
                </div>
                <span className="relative z-10 text-sm">{item.label}</span>
                {isActive && (
                  <ChevronRight className="relative z-10 w-3.5 h-3.5 ml-auto text-emerald-400/50" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-medium text-zinc-200 truncate">{user?.name || "User"}</p>
            <p className="text-[11px] text-zinc-500 capitalize flex items-center gap-1">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${user?.role === "MANAGER" ? "bg-emerald-500" : "bg-blue-500"}`} />
              {user?.role?.toLowerCase() || "member"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl h-10 text-sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2.5" />
          Logout
        </Button>
      </div>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const pageTitle =
    pathname === "/dashboard"
      ? "Overview"
      : navItems.find((i) => i.href === pathname)?.label || pathname.split("/").pop() || "";

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-60 lg:w-64 flex-col bg-zinc-900/40 border-r border-zinc-800/50 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-zinc-100">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2.5 text-zinc-500 cursor-default rounded-xl">
              <Bell className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-zinc-800">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-[11px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm text-zinc-300 font-medium hidden lg:block">{user.name}</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5 border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/15 rounded-lg">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-base font-bold tracking-tight">
                    <span className="text-white">Mess</span>
                    <span className="text-emerald-400">Mate</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SidebarContent onNavigate={() => setIsMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
