'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building2, Palette, Trees, Hammer, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Icon Map helper for dynamic icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Building2,
  Palette,
  Trees,
  Hammer,
  Compass,
};

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  category: string;
  priceRange: string;
  duration: string;
}

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
              Our Expertise
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Elite Architectural & Construction Services
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="#contact">
              <Button variant="outline" className="flex items-center gap-2">
                Custom Requests
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Compass;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border border-border/40 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 hover:shadow-lg transition-all duration-500 bg-card">
                  <div>
                    {/* Hover zoom image container */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/20" />
                      
                      {/* Price Range Badge */}
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-500 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                        {service.priceRange}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                          {service.category}
                        </span>
                      </div>

                      <CardTitle className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors duration-300">
                        {service.name}
                      </CardTitle>
                      
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </div>

                  <div className="px-6 pb-6 pt-0 border-t border-border/20 mt-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <div>
                      <p className="uppercase tracking-widest text-[10px] text-muted-foreground/60">Estimated Duration</p>
                      <p className="text-foreground font-semibold mt-0.5">{service.duration}</p>
                    </div>
                    <Link href="#contact">
                      <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-600 font-semibold p-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Book Service
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Services;
