"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MessService } from "@/services/mess.service";
import {
  LayoutDashboard,
  Utensils,
  ShoppingCart,
  Users,
  Wallet,
  FileText,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
  Building2,
  Plus,
  SendHorizonal,
  Loader2,
  SearchX,
  Sparkles,
  LogIn,
  Search,
  MapPin,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { DIVISIONS, getDistricts, getUpazilas } from "@/lib/bd-locations";

const allNavItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/meals", label: "Meals", icon: Utensils },
  { href: "/dashboard/bazaars", label: "Bazaars", icon: ShoppingCart },
  { href: "/dashboard/members", label: "Members", icon: Users, roles: ["MANAGER"] },
  { href: "/dashboard/deposits", label: "Deposits", icon: Wallet },
  { href: "/dashboard/bills", label: "Bills", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/admin", label: "Admin", icon: Shield, roles: ["ADMIN"] },
];

const iconColors: Record<string, string> = {
  "/dashboard": "from-emerald-500 to-teal-500",
  "/dashboard/meals": "from-blue-500 to-cyan-500",
  "/dashboard/bazaars": "from-orange-500 to-amber-500",
  "/dashboard/members": "from-violet-500 to-purple-500",
  "/dashboard/deposits": "from-rose-500 to-pink-500",
  "/dashboard/bills": "from-indigo-500 to-blue-500",
  "/dashboard/settings": "from-zinc-500 to-zinc-400",
  "/dashboard/admin": "from-emerald-500 to-teal-500",
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = allNavItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role || "")
  );

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

function JoinMessView() {
  const { user, updateUser } = useAuthStore();
  const router = useRouter();
  const canCreate = user?.role !== "MEMBER";
  const [tab, setTab] = useState<"join" | "create">("join");

  // Filters
  const [search, setSearch] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterSubDistrict, setFilterSubDistrict] = useState("");

  // Create form
  const [messName, setMessName] = useState("");
  const [messDesc, setMessDesc] = useState("");
  const [messDivision, setMessDivision] = useState("");
  const [messDistrict, setMessDistrict] = useState("");
  const [messSubDistrict, setMessSubDistrict] = useState("");

  const { data: messes = [], isLoading: loadingMesses } = useQuery({
    queryKey: ["availableMesses", search, filterDivision, filterDistrict, filterSubDistrict],
    queryFn: () => MessService.getAvailable({ search, division: filterDivision, district: filterDistrict, subDistrict: filterSubDistrict }),
  });

  const joinMutation = useMutation({
    mutationFn: (messId: string) => MessService.sendJoinRequest(messId),
    onSuccess: () => {
      toast.success("Join request sent! Wait for manager approval.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to send request");
    },
  });

  const createMutation = useMutation({
    mutationFn: () => MessService.create({
      name: messName,
      description: messDesc,
      division: messDivision,
      district: messDistrict,
      subDistrict: messSubDistrict,
    }),
    onSuccess: (res: any) => {
      const messId = res.data?.mess?._id || res.data?.mess?.id || res.data?._id || res.data?.id;
      if (messId) {
        updateUser({ messId, role: "MANAGER" });
        toast.success("Mess created successfully!");
        router.refresh();
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create mess");
    },
  });

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden flex">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col">
        <nav className="relative z-10 max-w-5xl mx-auto w-full px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-emerald-500/15 rounded-lg ring-1 ring-emerald-500/20">
              <Utensils className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Mess</span>
              <span className="text-emerald-400">Mate</span>
            </span>
          </Link>
          <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => { useAuthStore.getState().logout(); router.push("/login"); }}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl"
          >
            <div className="text-center mb-10">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                You&apos;re not part of any mess yet
              </h1>
              <p className="text-zinc-500 text-base max-w-lg mx-auto">
                {canCreate ? "Join an existing mess or create your own to get started." : "Join an existing mess to get started."}
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-8 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/50 w-fit mx-auto">
              <button
                onClick={() => setTab("join")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "join" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                <LogIn className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Join a Mess
              </button>
              {canCreate && (
                <button
                  onClick={() => setTab("create")}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === "create" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "text-zinc-400 hover:text-zinc-200"}`}
                >
                  <Plus className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  Create New
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {tab === "join" ? (
                <motion.div
                  key="join"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Search & Filters */}
                  <div className="space-y-2 mb-4">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        placeholder="Search mess by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 text-sm placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={filterDivision}
                        onValueChange={(value) => { setFilterDivision(value ?? ""); setFilterDistrict(""); setFilterSubDistrict(""); }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Divisions" />
                        </SelectTrigger>
                        <SelectPopup>
                          <SelectList>
                            <SelectItem value="">All Divisions</SelectItem>
                            {DIVISIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectList>
                        </SelectPopup>
                      </Select>
                      <Select
                        value={filterDistrict}
                        onValueChange={(value) => { setFilterDistrict(value ?? ""); setFilterSubDistrict(""); }}
                        disabled={!filterDivision}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Districts" />
                        </SelectTrigger>
                        <SelectPopup>
                          <SelectList>
                            <SelectItem value="">All Districts</SelectItem>
                            {getDistricts(filterDivision).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectList>
                        </SelectPopup>
                      </Select>
                      <Select
                        value={filterSubDistrict}
                        onValueChange={(value) => setFilterSubDistrict(value ?? "")}
                        disabled={!filterDistrict}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Upazilas" />
                        </SelectTrigger>
                        <SelectPopup>
                          <SelectList>
                            <SelectItem value="">All Upazilas</SelectItem>
                            {getUpazilas(filterDistrict).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                          </SelectList>
                        </SelectPopup>
                      </Select>
                    </div>
                  </div>

                  {loadingMesses ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-xl bg-zinc-900/50 border border-zinc-800/50 animate-pulse" />
                      ))}
                    </div>
                  ) : messes.length > 0 ? (
                    <div className="space-y-3">
                      {messes.map((mess: any, idx: number) => (
                        <motion.div
                          key={mess._id || mess.id || idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-emerald-500/20 hover:bg-zinc-900/60 transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/10">
                              {mess.name?.charAt(0).toUpperCase() || "M"}
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-zinc-100">{mess.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                <span>{mess.memberCount || 0} members</span>
                                {(mess.division || mess.district) && (
                                  <>
                                    <span>·</span>
                                    <MapPin className="w-3 h-3" />
                                    <span>{[mess.division, mess.district, mess.subDistrict].filter(Boolean).join(", ")}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => joinMutation.mutate(mess._id || mess.id)}
                            disabled={joinMutation.isPending}
                            className="rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white h-9 px-4 text-xs"
                          >
                            {joinMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <SendHorizonal className="w-3.5 h-3.5 mr-1.5" />}
                            Join
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-zinc-600 bg-zinc-900/20 rounded-2xl border border-zinc-800/40 border-dashed">
                      <SearchX className="w-10 h-10 mb-3" />
                      <p className="text-base font-medium text-zinc-500">No messes found</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        {search || filterDivision || filterDistrict || filterSubDistrict
                          ? "Try changing your search or filters"
                          : canCreate
                            ? "Create your own mess to get started"
                            : "Check back later or ask a manager to add you"}
                      </p>
                      {!search && !filterDivision && !filterDistrict && !filterSubDistrict && canCreate && (
                        <Button onClick={() => setTab("create")} className="mt-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm">
                          <Plus className="w-4 h-4 mr-1.5" />
                          Create a Mess
                        </Button>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-md mx-auto"
                >
                  <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm p-8">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-white tracking-tight">Create a New Mess</h2>
                      <p className="text-sm text-zinc-500 mt-1.5">You&apos;ll become the manager of this mess</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-zinc-300 block mb-1.5">Mess Name</label>
                        <Input
                          placeholder="e.g. Happy Mess, Bhalobasa Mess..."
                          value={messName}
                          onChange={(e) => setMessName(e.target.value)}
                          className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-zinc-300 block mb-1.5">Description (optional)</label>
                        <Input
                          placeholder="e.g. A mess for students..."
                          value={messDesc}
                          onChange={(e) => setMessDesc(e.target.value)}
                          className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
                        />
                      </div>
                      <div className="border-t border-zinc-800/50 pt-4">
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Location</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-xs text-zinc-500 block mb-1">Division</label>
                            <Select
                              value={messDivision}
                              onValueChange={(value) => setMessDivision(value ?? "")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectPopup>
                                <SelectList>
                                  <SelectItem value="">Select</SelectItem>
                                  {DIVISIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectList>
                              </SelectPopup>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-zinc-500 block mb-1">District</label>
                            <Select
                              value={messDistrict}
                              onValueChange={(value) => { setMessDistrict(value ?? ""); setMessSubDistrict(""); }}
                              disabled={!messDivision}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectPopup>
                                <SelectList>
                                  <SelectItem value="">Select</SelectItem>
                                  {getDistricts(messDivision).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectList>
                              </SelectPopup>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-zinc-500 block mb-1">Sub-district</label>
                            <Select
                              value={messSubDistrict}
                              onValueChange={(value) => setMessSubDistrict(value ?? "")}
                              disabled={!messDistrict}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectPopup>
                                <SelectList>
                                  <SelectItem value="">Select</SelectItem>
                                  {getUpazilas(messDistrict).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectList>
                              </SelectPopup>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => createMutation.mutate()}
                        disabled={!messName.trim() || createMutation.isPending}
                        className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20 mt-2 disabled:opacity-50"
                      >
                        {createMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Create Mess
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
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

  if (!user.messId && user.role !== "ADMIN") return <JoinMessView />;

  const pageTitle =
    pathname === "/dashboard"
      ? "Overview"
      : allNavItems.find((i) => i.href === pathname)?.label || pathname.split("/").pop() || "";

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <aside className="hidden md:flex md:w-60 lg:w-64 flex-col bg-zinc-900/40 border-r border-zinc-800/50 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
