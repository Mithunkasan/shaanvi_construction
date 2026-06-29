'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const beforeImage = '/before.jpeg'; // Older warehouse/raw space
  const afterImage = '/after.jpeg'; // Modern luxury kitchen/living room

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-24 bg-slate-900/10 border-t border-b border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2">
            Visual Renovation
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Breathtaking Transformations
          </h2>
          <p className="text-base text-muted-foreground mt-4 font-light">
            Slide the handle to view the raw pre-construction space transform into a finished architectural masterpiece.
          </p>
        </div>

        {/* Comparison Frame */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl select-none cursor-ew-resize border border-border/50"
        >
          {/* After image (background layer) */}
          <div className="absolute inset-0">
            <img src={afterImage} alt="After Renovation" className="h-full w-full object-cover pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              After Renovation
            </div>
          </div>

          {/* Before image (clipped layer) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="Before Renovation"
              className="absolute inset-0 h-full w-full object-cover max-w-none pointer-events-none"
              style={{ width: containerRef.current?.getBoundingClientRect().width }}
            />
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              Before Renovation
            </div>
          </div>

          {/* Sliding Divider Bar */}
          <div
            className="absolute inset-y-0 w-1 bg-amber-500 cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Sliding handle button */}
            <div className="h-10 w-10 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg text-slate-950">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BeforeAfter;
