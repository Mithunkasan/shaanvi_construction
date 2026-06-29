'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: 'Authentication Denied',
          description: 'Invalid credentials or unauthorized administrative access.',
          type: 'error',
        });
      } else {
        toast({
          title: 'Access Granted',
          description: 'Welcome back, Administrator.',
          type: 'success',
        });
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (e) {
      toast({
        title: 'Security Error',
        description: 'An unexpected connection error occurred.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Red/amber warning highlight in background for security theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.04)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-amber-500/20 bg-slate-950/70 backdrop-blur-xl shadow-2xl glass">
          <CardHeader className="space-y-1 text-center pt-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 animate-pulse">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-black text-white tracking-wider uppercase">
              Admin Workspace
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Authorized administrative sign-in portal.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 px-6 md:px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Admin Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                  {...register('email')}
                />
                {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password Code</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950"
                  {...register('password')}
                />
                {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
              </div>
            </CardContent>

            <CardFooter className="p-6 md:p-8 pt-4">
              <Button type="submit" disabled={isLoading} variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Authorize Entry'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
