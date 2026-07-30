"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MemberService } from "@/services/member.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Users, Mail, Phone, Plus, Loader2, UserPlus, Shield } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const addMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  role: z.enum(["MEMBER", "MANAGER"]),
});

const colorMap: Record<string, string> = {
  MANAGER: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  MEMBER: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function MembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: { name: "", email: "", phone: "", role: "MEMBER" },
  });

  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => MemberService.getMembers(),
  });

  const addMemberMutation = useMutation({
    mutationFn: (data: any) => MemberService.addMember(data),
    onSuccess: () => {
      toast.success("Member added successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setIsModalOpen(false);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add member");
    },
  });

  const onSubmit = (formData: { name: string; email: string; phone?: string; role: string }) => {
    addMemberMutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Mess Members</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage and view all members of your mess</p>
        </div>

        {user?.role === "MANAGER" && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* @ts-ignore */}
            <DialogTrigger render={<Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-10 px-5 shadow-lg shadow-emerald-500/15 transition-all duration-300"><UserPlus className="w-4 h-4 mr-2" />Add Member</Button>} />
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 p-6 sm:max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <UserPlus className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-white">Add New Member</DialogTitle>
                    <p className="text-sm text-zinc-500 mt-0.5">Invite a new member to your mess</p>
                  </div>
                </div>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-zinc-300">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="h-10 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-10 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-zinc-300">Phone (optional)</Label>
                  <Input
                    id="phone"
                    placeholder="01XXXXXXXXX"
                    className="h-10 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl"
                    {...register("phone")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-zinc-300">Role</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all"
                    {...register("role")}
                  >
                    <option value="MEMBER">Member</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={addMemberMutation.isPending}
                  className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/15 transition-all duration-300 disabled:opacity-50 mt-2"
                >
                  {addMemberMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding member...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add Member
                    </span>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-zinc-900/40 border-zinc-800/60 rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-xl bg-zinc-800" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : members?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member: any, i: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative bg-zinc-900/40 border-zinc-800/60 rounded-2xl hover:border-zinc-700/60 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <CardContent className="p-6 space-y-4 relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/20">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-100 text-base">{member.name}</h3>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border mt-1 ${colorMap[member.role] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                          {member.role === "MANAGER" ? <Shield className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          {member.role.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm pt-3 border-t border-zinc-800/40">
                    <div className="flex items-center text-zinc-400">
                      <Mail className="w-3.5 h-3.5 mr-2.5 text-zinc-600" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center text-zinc-400">
                        <Phone className="w-3.5 h-3.5 mr-2.5 text-zinc-600" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500 bg-zinc-900/20 rounded-2xl border border-zinc-800/40 border-dashed">
          <div className="p-4 rounded-full bg-zinc-800/50 mb-4">
            <Users className="w-8 h-8 text-zinc-600" />
          </div>
          <p className="text-lg font-medium text-zinc-400">No members found</p>
          <p className="text-sm text-zinc-600 mt-1">Add your first member to get started</p>
          {user?.role === "MANAGER" && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
