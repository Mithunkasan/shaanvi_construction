'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HardHat, Compass, Ruler, Building, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
      {/* Background Image Slider or Single High-Quality Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      
      {/* Dark Overlay with glass reflection */}
      <div className="absolute inset-0 bg-slate-950/65" />

      {/* Floating Construction Icons in Background */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-10 md:left-24 text-amber-500/20"
        >
          <HardHat className="h-12 w-12 md:h-16 md:w-16" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-1/5 text-amber-500/15"
        >
          <Compass className="h-10 w-10 md:h-14 md:w-14" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-12 md:right-32 text-amber-500/20"
        >
          <Ruler className="h-12 w-12 md:h-16 md:w-16" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/5 text-amber-500/15"
        >
          <Building className="h-10 w-10 md:h-12 md:w-12" />
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">
            Enterprise Architecture & Construction
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
        >
          Crafting Masterpieces <br className="hidden md:inline" />
          From <span className="text-amber-500">Vision to Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-light"
        >
          Shaanvi Construction specializes in elite residential builds, skyscrapers, and custom interior design. We engineer structures that define modern luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="#contact">
            <Button variant="gold" size="lg" className="w-full sm:w-auto flex items-center gap-2 group text-slate-950 font-bold">
              Consult With Us
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#projects">
            <Button variant="glass" size="lg" className="w-full sm:w-auto">
              View Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs uppercase tracking-widest text-slate-400 mb-2"
        >
          Scroll Explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-amber-500 cursor-pointer"
          onClick={() => {
            const nextSec = document.getElementById('trusted');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;
