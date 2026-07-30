"use client";

import { useQuery } from '@tanstack/react-query';
import { BillService } from '@/services/bill.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function BillsPage() {
  const { user } = useAuthStore();
  const { data: bills, isLoading } = useQuery({
    queryKey: ['bills'],
    queryFn: () => BillService.getBills(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Monthly Bills</h2>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">My Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-950/50">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Month</TableHead>
                  <TableHead className="text-zinc-400">Total Amount</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-right text-zinc-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-4 w-24 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16 bg-zinc-800" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-12 bg-zinc-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : bills?.length > 0 ? (
                  bills.map((bill: any) => (
                    <TableRow key={bill.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <TableCell className="text-zinc-300 font-medium">
                        {new Date(bill.month, bill.year - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-zinc-300 font-bold">
                        ৳{bill.totalAmount}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          bill.status === 'PAID'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                          {bill.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-emerald-500 hover:text-emerald-400 cursor-pointer text-sm font-medium">
                          View
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={4} className="h-24 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText className="h-8 w-8 opacity-20" />
                        <p>No bills generated yet.</p>
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
