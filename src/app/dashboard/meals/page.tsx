"use client";

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MealService } from '@/services/meal.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Utensils, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

export default function MealsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['meals', page],
    queryFn: () => MealService.getMeals(page, 10),
  });

  const toggleMutation = useMutation({
    mutationFn: (mealId: string) => MealService.toggleMeal(mealId),
    onSuccess: (res: any) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['meals'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to toggle meal');
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Meal Management</h2>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">Monthly Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-950/50">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Type</TableHead>
                  <TableHead className="text-zinc-400">Member</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Guests</TableHead>
                  <TableHead className="text-right text-zinc-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-zinc-800">
                      <TableCell><Skeleton className="h-4 w-24 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16 bg-zinc-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-8 bg-zinc-800" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-20 bg-zinc-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : data?.meals?.length > 0 ? (
                  data.meals.map((meal: any) => (
                    <TableRow key={meal.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                      <TableCell className="text-zinc-300 font-medium">
                        {new Date(meal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 capitalize border border-zinc-700">
                          {meal.type.toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-zinc-300">{meal.member.name}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          meal.status 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {meal.status ? 'ON' : 'OFF'}
                        </span>
                      </TableCell>
                      <TableCell className="text-zinc-300">{meal.guestCount}</TableCell>
                      <TableCell className="text-right">
                        {user?.id === meal.member.id && new Date(meal.date) > new Date() ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-zinc-950 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                            onClick={() => toggleMutation.mutate(meal.id)}
                            disabled={toggleMutation.isPending}
                          >
                            {toggleMutation.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Toggle'}
                          </Button>
                        ) : (
                          <span className="text-xs text-zinc-500">Locked</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Utensils className="h-8 w-8 opacity-20" />
                        <p>No meals found for this month.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
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
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"
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
