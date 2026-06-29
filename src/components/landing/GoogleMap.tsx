'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface GoogleMapProps {
  mapsUrl: string | null;
}

export function GoogleMap({ mapsUrl }: GoogleMapProps) {
  const defaultUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183792015093!2d-73.98773122425988!3d40.75797877138676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25859c1b9b1b3%3A0xa59f972b9a7c36a4!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';
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
