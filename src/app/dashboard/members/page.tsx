"use client";

import { useQuery } from '@tanstack/react-query';
import { MemberService } from '@/services/member.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Mail, Phone, MapPin, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MembersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: () => MemberService.getMembers(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Mess Members</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : data?.members?.length > 0 ? (
          data.members.map((member: any, i: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-600/20 text-emerald-500 flex items-center justify-center text-lg font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-100">{member.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 capitalize">
                          {member.role.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-zinc-400 pt-2 border-t border-zinc-800/50">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 opacity-50" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 opacity-50" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full h-48 flex flex-col items-center justify-center text-zinc-500 space-y-2 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
            <Users className="h-8 w-8 opacity-20" />
            <p>No members found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
