'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  comment: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;
  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border border-border/40 bg-card shadow-lg p-8 md:p-12 relative overflow-hidden glass">
                {/* Floating quote background mark */}
                <Quote className="absolute right-8 bottom-8 h-24 w-24 text-slate-100 dark:text-slate-800/10 pointer-events-none" />

                <CardContent className="p-0 flex flex-col space-y-6">
                  {/* Stars Rating */}
                  <div className="flex items-center space-x-1 text-amber-500">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed text-foreground">
                    "{current.comment}"
                  </p>

                  {/* Customer details */}
                  <div className="border-t border-border/30 pt-6">
                    <h4 className="text-lg font-bold text-foreground">{current.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                      {current.role} {current.company ? `at ${current.company}` : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
