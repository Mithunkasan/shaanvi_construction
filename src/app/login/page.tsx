'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ShieldAlert } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginCard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: 'Login Failed',
          description: 'Invalid email address or password.',
          type: 'error',
        });
      } else {
        toast({
          title: 'Welcome Back',
          description: 'Successfully authenticated.',
          type: 'success',
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (e) {
      toast({
        title: 'Error occurred',
        description: 'An unexpected connection error occurred.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <Card className="border-border/30 bg-slate-900/40 backdrop-blur-xl shadow-2xl glass">
        <CardHeader className="space-y-1 text-center pt-8">
          <Link href="/" className="inline-block text-2xl font-black uppercase tracking-wider text-white mb-2">
            Shaanvi <span className="text-amber-500">Construction</span>
          </Link>
          <CardTitle className="text-xl font-bold text-white">Client Portal</CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Sign in to manage bookings, active projects, and invoices.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 px-6 md:px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Link href="#" className="text-xs text-amber-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                {...register('password')}
              />
              {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 rounded-xs border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-950 cursor-pointer"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-400 select-none cursor-pointer">
                Remember my session
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 p-6 md:p-8 pt-4">
            <Button type="submit" disabled={isLoading} variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
            <div className="text-center text-xs text-slate-400">
              Don't have an active contract account?{' '}
              <Link href="/signup" className="text-amber-500 hover:underline">
                Create one now
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

export default function UserLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_60%)]" />
      <React.Suspense fallback={
        <div className="relative z-10 w-full max-w-md flex items-center justify-center py-12">
          <span className="h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <LoginCard />
      </React.Suspense>
    </div>
  );
}
