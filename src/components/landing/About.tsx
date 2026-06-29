'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function About() {
  const highlights = [
    '25+ Years of Architectural Innovation',
    'Award-winning Custom Residential Estates',
    'Enterprise-grade Commercial Skylines',
    'Comprehensive Pre-construction & BIM Planning',
    'Elite Material Procurement & Sourcing',
    'Strict Timelines and Precision Budget Schedulers',
  ];

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Images Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden group"
          >
            {/* Main Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage: `url('/about.jpg')`,
              }}
            />
            {/* Luxury Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent" />
            
            {/* Stat Overlay Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex flex-col md:flex-row justify-between gap-6"
            >
              <div>
                <p className="text-3xl font-black text-amber-500">250+</p>
                <p className="text-xs uppercase tracking-widest text-slate-300">Masterpieces Completed</p>
              </div>
              <div className="border-l border-white/10 hidden md:block" />
              <div>
                <p className="text-3xl font-black text-amber-500">18</p>
                <p className="text-xs uppercase tracking-widest text-slate-300">International Awards</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-amber-500">
              Legacy & Craftsmanship
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
              Redefining Luxury Through Modern Architectural Form
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              Since 2001, Shaanvi Construction has worked alongside elite clients, developers, and visionary designers. We do not simply build; we merge physical integrity with artistic wonder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-center space-x-3 text-sm font-medium">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#contact">
                <Button variant="gold" size="lg" className="text-slate-950 font-bold">
                  Schedule Studio Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default About;
