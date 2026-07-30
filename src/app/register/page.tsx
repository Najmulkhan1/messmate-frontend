"use client";

import { useState, useEffect } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useRHForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      setIsLoading(true);
      const data = await AuthService.register(values);
      setAuth(data.data.user, data.data.accessToken);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to register');
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
            <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Name</label>
                <Input placeholder="John Doe" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Email</label>
                <Input placeholder="name@example.com" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Phone</label>
                <Input placeholder="01XXXXXXXXX" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("phone")} />
                {form.formState.errors.phone && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Password</label>
                <Input type="password" placeholder="••••••••" className="bg-zinc-800 border-zinc-700 text-zinc-100" {...form.register("password")} />
                {form.formState.errors.password && <p className="text-[0.8rem] font-medium text-red-400">{form.formState.errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-400 text-center w-full">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
