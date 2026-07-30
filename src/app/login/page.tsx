"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthService } from '@/services/auth.service';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      const data = await AuthService.login(values);
      setAuth(data.data.user, data.data.accessToken);
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-zinc-800 bg-zinc-900 text-zinc-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Login to MessMate</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Email</label>
                <Input placeholder="name@example.com" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Password</label>
                <Input type="password" placeholder="••••••••" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("password")} />
                {form.formState.errors.password && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-400 text-center w-full">
              Don't have an account?{' '}
              <Link href="/register" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
