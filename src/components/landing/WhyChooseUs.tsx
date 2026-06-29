'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Leaf, Eye, Layers, Landmark } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function WhyChooseUs() {
  const cards = [
    {
      title: 'Structural Integrity',
      description: 'Every structural frame, column, and foundation we lay meets double the safety tolerance margins mandated by international regulatory agencies.',
      icon: ShieldCheck,
    },
    {
      title: 'Advanced BIM Software',
      description: 'We draft and simulate all electrical grids, piping, and load-bearing columns in 3D BIM models before bringing heavy machinery to the site.',
      icon: Cpu,
    },
    {
      title: 'Luxury Eco-Sustainability',
      description: 'We lead the industry in blending elite aesthetics with solar shingles, green HVAC recovery systems, and sustainable structural timber.',
      icon: Leaf,
    },
    {
      title: 'Absolute Transparency',
      description: 'Clients can track physical progress, milestones, and invoice lists in real time using our custom user dashboard.',
      icon: Eye,
    },
    {
      title: 'Custom Fabrications',
      description: 'We manage private mills and glass studios to custom-fabricate windows, hand-cut stone columns, and bespoke woodwork.',
      icon: Layers,
    },
    {
      title: 'Comprehensive Insurance',
      description: 'All developments are backed by premium multi-million dollar liability insurance coverages for complete builder and buyer peace of mind.',
      icon: Landmark,
    },
  ];

  return (
    <section className="py-24 bg-slate-900/20 border-t border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Why Choose Shaanvi Construction
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Setting the Benchmark for Architectural Distinction
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            We operate at the intersection of engineering perfection, artistic vision, and luxury builder standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-border/40 bg-card hover:border-amber-500/40 hover:shadow-md transition-all duration-300">
                  <CardHeader className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold mb-2">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default WhyChooseUs;
