"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../store/useAuthStore";
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
  X
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // Prevent flicker

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-800 bg-zinc-900/50">
        <div className="flex h-16 items-center px-6 border-b border-zinc-800">
          <Utensils className="h-6 w-6 text-emerald-500 mr-2" />
          <span className="text-xl font-bold tracking-tight text-zinc-100">MessMate</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${isActive ? 'bg-emerald-600/10 text-emerald-500 font-medium' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}>
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-zinc-200 truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-zinc-800 bg-zinc-900/30 backdrop-blur-sm z-10">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-zinc-200">
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-bold ml-2 text-zinc-100">MessMate</span>
          </div>
          <div className="hidden md:flex items-center">
            <h1 className="text-xl font-semibold text-zinc-200 capitalize">
              {pathname.split('/').pop() || 'Overview'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800">
                <div className="flex items-center">
                  <Utensils className="h-6 w-6 text-emerald-500 mr-2" />
                  <span className="text-xl font-bold text-zinc-100">MessMate</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-zinc-200 p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`flex items-center px-3 py-3 rounded-md transition-colors ${isActive ? 'bg-emerald-600/10 text-emerald-500 font-medium' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}>
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-zinc-800">
                <Button variant="ghost" className="w-full justify-start text-red-400" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
