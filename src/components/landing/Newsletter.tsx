'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast({
          title: 'Successfully Subscribed',
          description: 'You will receive our architectural publications monthly.',
          type: 'success',
        });
        setEmail('');
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Subscription failed');
      }
    } catch (e: any) {
      toast({
        title: 'Subscription Failed',
        description: e.message || 'Already subscribed or connection error.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-white/10">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6"
        >
          <Sparkles className="h-5 w-5 animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight"
        >
          Subscribe to Our Architectural Journal
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-slate-300 max-w-xl mt-4 leading-relaxed font-light"
        >
          Get premium builder tips, design studies, eco-renovation insights, and sneak previews of upcoming luxury estates.
        </motion.p>

        {/* Subscribe Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubscribe}
          className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 pl-10 focus-visible:ring-amber-500 focus-visible:ring-offset-slate-950 py-5 rounded-lg"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} variant="gold" className="text-slate-950 font-bold px-6 py-5 rounded-lg shrink-0 cursor-pointer">
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              'Subscribe'
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
export default Newsletter;
