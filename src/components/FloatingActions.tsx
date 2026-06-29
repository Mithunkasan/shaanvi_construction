'use client';

import * as React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

export function FloatingActions() {
  const whatsappNumber = '+18005550199'; // default mock number
  const callNumber = '+18005550199';

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3 pointer-events-auto">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        title="Chat on WhatsApp"
      >
        {/* WhatsApp Icon Mock */}
        <MessageSquare className="h-5.5 w-5.5 fill-current" />
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${callNumber}`}
        className="h-12 w-12 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        title="Call Us Directly"
      >
        <Phone className="h-5 w-5 fill-current" />
      </a>
    </div>
  );
}
export default FloatingActions;
