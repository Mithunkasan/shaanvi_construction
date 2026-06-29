'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export function Pricing() {
  const plans = [
    {
      name: 'Consultation & Feasibility',
      price: '$1,500',
      description: 'Perfect for initial evaluations and spatial conceptualizations.',
      features: [
        'Initial Spatial Programming Session',
        'Zoning & Regulatory Permit Audit',
        'Draft 3D Conceptual Models',
        'Rough Construction Cost Estimates',
        'Preliminary Schedule Timeline Guidelines',
      ],
      cta: 'Book Feasibility Check',
      popular: false,
    },
    {
      name: 'Architectural Blueprint & Design',
      price: '$9,500',
      description: 'Full pre-construction blueprints and luxury material planning.',
      features: [
        'Complete CAD Architectural Blueprints',
        'Advanced 3D BIM Simulation Conflict Audits',
        'Bespoke Interior & Material Curation',
        'Structural Load-bearing Engineering Sheets',
        'Zoning Board Approval Support Documentation',
      ],
      cta: 'Start Blueprint Project',
      popular: true,
    },
    {
      name: 'General Contractor Build Management',
      price: 'Custom Quote',
      description: 'Complete general contracting from groundbreaking to delivery.',
      features: [
        'Full-scale General Contracting Crews',
        'Direct Sourcing of Premium Luxury Materials',
        'On-site Engineering Supervision & Daily Logs',
        'Independent Code Compliance & Safety Inspections',
        'Post-handover Structural Guarantees & blue prints',
      ],
      cta: 'Request Custom Proposal',
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Pricing Packages
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Clear, Milestone-Based Pricing
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            We partner on fixed deliverables, ensuring complete transparency with no surprise overheads.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card
                className={`relative flex flex-col justify-between w-full border overflow-hidden rounded-2xl transition-all duration-500 bg-card ${
                  plan.popular
                    ? 'border-amber-500 shadow-xl md:-translate-y-2'
                    : 'border-border/40 hover:border-amber-500/40 hover:shadow-md'
                }`}
              >
                {/* Popular Highlight Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-xs">
                    Recommended
                  </div>
                )}

                <CardHeader className="p-8">
                  <span className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">
                    {plan.popular ? 'Studio Signature' : 'Deliverable Service'}
                  </span>
                  <CardTitle className="text-xl md:text-2xl font-black mb-1">{plan.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-normal mt-2">
                    {plan.description}
                  </CardDescription>

                  <div className="pt-6">
                    <span className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom Quote' && (
                      <span className="text-sm text-muted-foreground font-medium ml-1">/ Fixed fee</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0 flex-1">
                  <div className="border-t border-border/30 my-6" />
                  <ul className="space-y-4">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start space-x-3 text-sm">
                        <div className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-muted-foreground leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                  <a href="#contact" className="w-full">
                    <Button variant={plan.popular ? 'gold' : 'outline'} className="w-full text-sm font-bold uppercase tracking-wider py-5 rounded-lg">
                      {plan.cta}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;
