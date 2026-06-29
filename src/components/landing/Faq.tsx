'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqProps {
  faqs: FAQ[];
}

export function Faq({ faqs }: FaqProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-24 bg-slate-900/10 border-t border-b border-border/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Support Center
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            Everything you need to know about structural planning, contract blueprints, and construction execution.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" defaultValue={faqs[0].id} className="bg-card rounded-2xl border border-border/40 p-6 md:p-8 shadow-sm">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
export default Faq;
