'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  type?: 'single' | 'multiple';
  defaultValue?: string;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

export function Accordion({ children, className, type = 'single', defaultValue }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(
    defaultValue ? [defaultValue] : []
  );

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');
  const isOpen = context.openItems.includes(value);

  return (
    <div
      className={cn(
        'border-b border-border/60 pb-2 transition-all duration-300',
        isOpen ? 'border-amber-500/30' : '',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value, isOpen });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  isOpen?: boolean;
}

export function AccordionTrigger({ children, className, value, isOpen }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  return (
    <button
      onClick={() => value && context.toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium text-base md:text-lg transition-all duration-300 hover:text-amber-500 focus-visible:outline-hidden',
        isOpen ? 'text-amber-500 font-semibold' : 'text-foreground',
        className
      )}
    >
      {children}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-muted-foreground shrink-0 ml-4"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
