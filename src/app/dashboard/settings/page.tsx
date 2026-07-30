"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { AuthService } from "@/services/auth.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { User, Save, Loader2, Lock, Phone } from "lucide-react"

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()

  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty")
      return
    }
    setSaving(true)
    try {
      const res = await AuthService.updateProfile({ name: name.trim(), phone: phone.trim() || undefined })
      updateUser(res.data.user)
      toast.success("Profile updated")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Fill in both password fields")
      return
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters")
      return
    }
    setSavingPassword(true)
    try {
      await AuthService.updateProfile({ currentPassword, newPassword })
      setCurrentPassword("")
      setNewPassword("")
      toast.success("Password changed")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change password")
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <User className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Profile Settings</h2>
            <p className="text-sm text-zinc-500">Update your personal information</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">Email</label>
            <Input
              value={user?.email || ""}
              disabled
              className="h-11 bg-zinc-800/30 border-zinc-700/30 text-zinc-500 rounded-xl cursor-not-allowed"
            />
            <p className="text-[11px] text-zinc-600 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">
              <Phone className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              Phone
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional"
              className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Change Password</h2>
            <p className="text-sm text-zinc-500">Update your account password</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              className="h-11 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={savingPassword}
            variant="outline"
            className="w-full h-11 rounded-xl border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
          >
            {savingPassword ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            Change Password
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
