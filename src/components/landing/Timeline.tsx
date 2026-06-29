'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Calendar, Edit3, HardHat, CheckSquare } from 'lucide-react';

export function Timeline() {
  const steps = [
    {
      step: '01',
      title: 'Consultation',
      subtitle: 'Understanding Vision',
      description: 'An initial review session where we discuss spatial programming requirements, aesthetic preferences, budget guides, and site parameters.',
      icon: HelpCircle,
    },
    {
      step: '02',
      title: 'Planning',
      subtitle: 'Feasibility & Budgeting',
      description: 'We run physical site evaluations, draft budget spreadsheets, align with local zoning laws, and construct initial schedule guidelines.',
      icon: Calendar,
    },
    {
      step: '03',
      title: 'Design',
      subtitle: 'BIM & Materials',
      description: 'Creating comprehensive 3D layouts, sourcing high-end materials, and simulating structural engineering stresses using BIM.',
      icon: Edit3,
    },
    {
      step: '04',
      title: 'Construction',
      subtitle: 'Site Execution',
      description: 'Executing construction contracts with our certified builder crews, maintaining strict safety, precision, and milestone audits.',
      icon: HardHat,
    },
    {
      step: '05',
      title: 'Delivery',
      subtitle: 'Handover & Support',
      description: 'A comprehensive walkthrough and quality check, followed by final contract signatures and handover of utility blueprints.',
      icon: CheckSquare,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Our Process
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            How We Build Your Masterpiece
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            Our seamless pre-construction to delivery workflow guarantees structural perfection on budget.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Central Line for Desktop */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border/40 -translate-y-1/2 hidden lg:block" />

          {/* Timeline items grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border-2 border-border/80 group-hover:border-amber-500 transition-colors duration-300 shadow-md">
                    <Icon className="h-6 w-6 text-amber-500" />
                    
                    {/* Floating Step Number */}
                    <span className="absolute -top-3 -right-3 text-[10px] font-black uppercase tracking-widest bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                      {step.step}
                    </span>
                  </div>

                  {/* Text Contents */}
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                      {step.subtitle}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground font-light px-2">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Timeline;
