"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { DepositService } from '@/services/deposit.service';
import { MemberService } from '@/services/member.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Wallet, Plus, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function DepositsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { register, handleSubmit, reset } = useForm();

  const { data: deposits, isLoading } = useQuery({
    queryKey: ['deposits'],
    queryFn: () => DepositService.getDeposits(),
  });

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: () => MemberService.getMembers(),
    enabled: user?.role === 'MANAGER',
  });

  const addDepositMutation = useMutation({
    mutationFn: (data: any) => DepositService.addDeposit(data),
    onSuccess: (res: any) => {
      toast.success('Deposit added successfully');
      queryClient.invalidateQueries({ queryKey: ['deposits'] });
      setIsModalOpen(false);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to add deposit');
    }
  });

  const onSubmit = (formData: any) => {
    addDepositMutation.mutate({
      memberId: formData.memberId,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Deposit History</h2>
        
        {user?.role === 'MANAGER' && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* @ts-ignore */}
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <DialogHeader>
                <DialogTitle>Add New Deposit</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="memberId">Select Member</Label>
                  <select 
                    id="memberId"
                    className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-zinc-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-100"
                    {...register('memberId', { required: true })}
                  >
                    <option value="">Select a member...</option>
                    {members?.map((m: any) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (৳)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    step="0.01" 
                    placeholder="e.g. 1000" 
                    className="bg-zinc-800 border-zinc-700" 
                    {...register('amount', { required: true, min: 1 })} 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
                  disabled={addDepositMutation.isPending}
                >
                  {addDepositMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Deposit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Recent Deposits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-950/50">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  {user?.role === 'MANAGER' && <TableHead className="text-zinc-400">Member</TableHead>}
                  <TableHead className="text-right text-zinc-400">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-4 w-24 bg-zinc-800" /></TableCell>
                      {user?.role === 'MANAGER' && <TableCell><Skeleton className="h-4 w-32 bg-zinc-800" /></TableCell>}
                      <TableCell className="text-right"><Skeleton className="h-4 w-16 bg-zinc-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : deposits?.length > 0 ? (
                  deposits.map((deposit: any) => (
                    <TableRow key={deposit.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <TableCell className="text-zinc-300 font-medium">
                        {new Date(deposit.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      {user?.role === 'MANAGER' && <TableCell className="text-zinc-300">{deposit.member?.name || 'Unknown'}</TableCell>}
                      <TableCell className="text-right font-bold text-emerald-400">৳{deposit.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={user?.role === 'MANAGER' ? 3 : 2} className="h-24 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Wallet className="h-8 w-8 opacity-20" />
                        <p>No deposit records found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
