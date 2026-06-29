'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(({ duration = 4000, ...props }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, duration, ...props }]);

    if (duration !== Infinity) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 w-full max-w-sm p-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              layout
              className="flex items-start space-x-3 rounded-lg border border-border/80 bg-card/95 p-4 text-card-foreground shadow-lg backdrop-blur-md pointer-events-auto"
            >
              {t.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
              {t.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
              {t.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />}
              {t.type === 'info' && <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
              
              <div className="flex-1 space-y-1">
                {t.title && <h4 className="text-sm font-semibold leading-none">{t.title}</h4>}
                {t.description && <p className="text-xs text-muted-foreground leading-normal">{t.description}</p>}
              </div>

              <button
                onClick={() => dismiss(t.id)}
                className="text-muted-foreground hover:text-foreground shrink-0 rounded-md focus:outline-hidden cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
export default ToastProvider;
