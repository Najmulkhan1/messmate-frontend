"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BazaarService } from '@/services/bazaar.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ShoppingCart, Plus, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function BazaarsPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ['bazaars', page],
    queryFn: () => BazaarService.getBazaars(page, 10),
  });

  const addBazaarMutation = useMutation({
    mutationFn: (data: any) => BazaarService.addBazaar(data),
    onSuccess: (res: any) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['bazaars'] });
      setIsModalOpen(false);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to add bazaar');
    }
  });

  const onSubmit = (formData: any) => {
    addBazaarMutation.mutate({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Bazaar History</h2>
        
        {user?.role === 'MANAGER' && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            {/* @ts-ignore */}
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <DialogHeader>
                <DialogTitle>Add New Bazaar Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="bg-zinc-800 border-zinc-700" 
                    {...register('date', { required: true })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount (Ã Â§Â³)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    step="0.01" 
                    placeholder="e.g. 500.50" 
                    className="bg-zinc-800 border-zinc-700" 
                    {...register('amount', { required: true, min: 1 })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="items">Items Purchased</Label>
                  <Input 
                    id="items" 
                    placeholder="e.g. Rice, Dal, Chicken" 
                    className="bg-zinc-800 border-zinc-700" 
                    {...register('items', { required: true })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="Any notes..." 
                    className="bg-zinc-800 border-zinc-700" 
                    {...register('description')} 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
                  disabled={addBazaarMutation.isPending}
                >
                  {addBazaarMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Expense
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Bazaars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-950/50">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Buyer</TableHead>
                  <TableHead className="text-zinc-400">Items</TableHead>
                  <TableHead className="text-right text-zinc-400">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-4 w-24 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-48 bg-zinc-800" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-16 bg-zinc-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : data?.bazaars?.length > 0 ? (
                  data.bazaars.map((bazaar: any) => (
                    <TableRow key={bazaar.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <TableCell className="text-zinc-300 font-medium">
                        {new Date(bazaar.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-zinc-300">{bazaar.buyer.name}</TableCell>
                      <TableCell className="text-zinc-400">{bazaar.items}</TableCell>
                      <TableCell className="text-right font-bold text-emerald-400">Ã Â§Â³{bazaar.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={4} className="h-24 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ShoppingCart className="h-8 w-8 opacity-20" />
                        <p>No bazaar records found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {data?.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">
              <div>
                Showing page {page} of {data.totalPages}
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
