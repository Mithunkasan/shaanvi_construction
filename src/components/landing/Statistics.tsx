'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = '' }: CounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(0, value, {
            duration: 2.5,
            ease: 'easeOut',
            onUpdate(val) {
              setDisplayValue(Math.floor(val));
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export function Statistics() {
  const stats = [
    { title: 'Completed Projects', value: 250, suffix: '+' },
    { title: 'Years of Experience', value: 25, suffix: '' },
    { title: 'Design Awards Won', value: 18, suffix: '' },
    { title: 'Satisfied Clients', value: 99, suffix: '%' },
  ];

  return (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.title} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-black text-amber-500 tracking-tight mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-400 font-semibold leading-relaxed">
                {stat.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Statistics;
