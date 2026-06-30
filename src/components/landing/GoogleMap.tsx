'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface GoogleMapProps {
  mapsUrl: string | null;
}

export function GoogleMap({ mapsUrl }: GoogleMapProps) {
  const defaultUrl = 'https://maps.app.goo.gl/iBfbaEKzPoKYVoZz5';
  const url = mapsUrl || defaultUrl;

  return (
    <section className="bg-background pb-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 w-full rounded-2xl overflow-hidden border border-border/40 shadow-sm"
        >
          <iframe
            src={url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shaanvi Construction Studio Location Map"
            className="filter grayscale contrast-125 dark:invert dark:grayscale-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
export default GoogleMap;
