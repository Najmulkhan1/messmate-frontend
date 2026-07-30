"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AdminService } from "@/services/admin.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Users, Building2, Trash2, Search, Shield, BarChart3, Loader2 } from "lucide-react"

export default function AdminPage() {
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<"overview" | "users" | "messes">("overview")
  const [userSearch, setUserSearch] = useState("")
  const [messSearch, setMessSearch] = useState("")

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => AdminService.getStats(),
  })

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users", userSearch],
    queryFn: () => AdminService.getUsers({ search: userSearch || undefined, limit: 50 }),
  })

  const { data: messesData, isLoading: messesLoading } = useQuery({
    queryKey: ["admin-messes", messSearch],
    queryFn: () => AdminService.getMesses({ search: messSearch || undefined, limit: 50 }),
  })

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => AdminService.deleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted")
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] })
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to delete user"),
  })

  const promoteMutation = useMutation({
    mutationFn: (userId: string) => AdminService.promoteToAdmin(userId),
    onSuccess: () => {
      toast.success("User promoted to admin")
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to promote user"),
  })

  const stats = statsData?.data
  const users = usersData?.data?.users || []
  const messes = messesData?.data?.messes || []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-xl">
          <Shield className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Admin Panel</h2>
          <p className="text-sm text-zinc-500">Platform-wide management</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/50 w-fit">
        {(["overview", "users", "messes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? "bg-emerald-600 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {t === "overview" && <BarChart3 className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t === "users" && <Users className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t === "messes" && <Building2 className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: stats?.totalUsers ?? "...", icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "Total Messes", value: stats?.totalMesses ?? "...", icon: Building2, color: "from-emerald-500 to-teal-500" },
            { label: "Total Meals", value: stats?.totalMeals ?? "...", icon: BarChart3, color: "from-orange-500 to-amber-500" },
            { label: "Total Deposits", value: `৳${Number(stats?.totalDeposits || 0).toLocaleString()}`, icon: BarChart3, color: "from-violet-500 to-purple-500" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-zinc-500 mt-1">{card.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {tab === "users" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search users by name or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full h-10 pl-10 rounded-xl bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50"
            />
          </div>
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800/60 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Name</th>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-left px-4 py-3 font-medium">Role</th>
                    <th className="text-left px-4 py-3 font-medium">Mess</th>
                    <th className="text-right px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500">No users found</td></tr>
                  ) : users.map((user: any) => (
                    <tr key={user.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-200 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "ADMIN" ? "bg-emerald-500/10 text-emerald-400" :
                          user.role === "MANAGER" ? "bg-blue-500/10 text-blue-400" :
                          "bg-zinc-500/10 text-zinc-400"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{user.mess?.name || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {user.role !== "ADMIN" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => promoteMutation.mutate(user.id)}
                              disabled={promoteMutation.isPending}
                              className="text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg h-8 px-2"
                            >
                              <Shield className="w-3.5 h-3.5 mr-1" />
                              Promote
                            </Button>
                          )}
                          {user.role !== "ADMIN" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => { if (confirm(`Delete user "${user.name}"?`)) deleteUserMutation.mutate(user.id) }}
                              disabled={deleteUserMutation.isPending}
                              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg h-8 px-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "messes" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search messes by name..."
              value={messSearch}
              onChange={(e) => setMessSearch(e.target.value)}
              className="w-full h-10 pl-10 rounded-xl bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50"
            />
          </div>
          <div className="grid gap-3">
            {messesLoading ? (
              [1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-zinc-900/50 border border-zinc-800/50 animate-pulse" />)
            ) : messes.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">No messes found</div>
            ) : messes.map((mess: any) => (
              <motion.div
                key={mess.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {mess.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{mess.name}</p>
                    <p className="text-xs text-zinc-500">
                      {mess.manager?.name || "Unknown"} · {mess.memberCount || 0} members
                      {mess.district && ` · ${mess.district}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
