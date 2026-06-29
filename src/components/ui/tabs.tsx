'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [activeTab, setActiveTabState] = React.useState(defaultValue);

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setActiveTabState(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  const currentTab = value !== undefined ? value : activeTab;

  return (
    <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground glass border border-border/40',
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 z-10 cursor-pointer',
        isActive ? 'text-foreground font-semibold shadow-xs' : 'hover:text-foreground/80',
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 bg-background rounded-md -z-10 shadow-xs border border-border/50"
          transition={{ type: 'spring', bounce: 0.15, duration: 0.38 }}
        />
      )}
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  const isActive = context.activeTab === value;

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className={cn('mt-4 outline-hidden', className)}
    >
      {children}
    </motion.div>
  );
}
