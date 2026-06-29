'use client';

import * as React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
}

export function Footer({
  companyName,
  email,
  phone,
  address,
  facebook,
  twitter,
  instagram,
  linkedin,
}: FooterProps) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Bio Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-wider uppercase text-white">
                Shaanvi <span className="text-amber-500">Construction</span>
              </span>
            </Link>
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
              Shaanvi Construction is an elite design and general contracting builder crafting luxury residential estates, commercial office landmarks, and sustainable landscape spaces globally.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {facebook && (
                <a href={facebook} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Services</h3>
            <ul className="space-y-3.5 text-xs md:text-sm">
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors font-light">Residential Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors font-light">Commercial Construction</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors font-light">Interior Design Curation</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-500 transition-colors font-light">Zoning & Planning Audits</a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Explore</h3>
            <ul className="space-y-3.5 text-xs md:text-sm font-light">
              <li>
                <a href="#about" className="hover:text-amber-500 transition-colors">Studio History</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-500 transition-colors">Project Gallery</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-amber-500 transition-colors">Shaanvi Construction Journal</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-500 transition-colors">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-xs md:text-sm font-light text-slate-400">
              <li>
                <p className="font-semibold text-white uppercase text-[10px] tracking-wider mb-0.5">Office Address</p>
                <p>{address}</p>
              </li>
              <li>
                <p className="font-semibold text-white uppercase text-[10px] tracking-wider mb-0.5">Direct Call</p>
                <p className="hover:text-amber-500 transition-colors font-medium">{phone}</p>
              </li>
              <li>
                <p className="font-semibold text-white uppercase text-[10px] tracking-wider mb-0.5">Studio Email</p>
                <p className="hover:text-amber-500 transition-colors font-medium">{email}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-hidden"
          title="Back to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}
export default Footer;
