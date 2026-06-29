'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string().min(6, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const body = await res.json();

      if (res.ok) {
        toast({
          title: 'Account Created',
          description: 'Your contract profile was registered. Please sign in.',
          type: 'success',
        });
        router.push('/login');
      } else {
        toast({
          title: 'Registration Failed',
          description: body.message || 'An error occurred during account creation.',
          type: 'error',
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: 'An unexpected connection error occurred.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_60%)]" />

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
            <CardTitle className="text-xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Register to book consultations and track build status.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 px-6 md:px-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                  {...register('name')}
                />
                {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
              </div>

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
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                  {...register('password')}
                />
                {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 p-6 md:p-8 pt-4">
              <Button type="submit" disabled={isLoading} variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Register'
                )}
              </Button>
              <div className="text-center text-xs text-slate-400">
                Already have an active account?{' '}
                <Link href="/login" className="text-amber-500 hover:underline">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
