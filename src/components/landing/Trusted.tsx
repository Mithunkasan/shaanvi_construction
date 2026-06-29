'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function Trusted() {
  const partners = [
    'AeroGroup Inc.',
    'MinimalStudi Facades',
    'VertexCorp Engineering',
    'Santorini Real Estate',
    'VanceHolding luxury',
    'BIM Solutions Co.',
  ];

  return (
    <section id="trusted" className="py-12 bg-slate-900/40 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Partnered with industry leaders worldwide
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-base md:text-lg font-bold tracking-widest uppercase hover:text-amber-500 hover:opacity-100 transition-all duration-300"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Trusted;
