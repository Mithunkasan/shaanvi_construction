'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const el = document.getElementById(href.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-md border-border/40 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Shaanvi Construction Logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className={cn(
              "text-base sm:text-xl md:text-2xl font-black tracking-wider uppercase",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              Shaanvi <span className="text-amber-500">Construction</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }
                }}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-amber-500 cursor-pointer',
                  isScrolled ? 'text-foreground/80' : 'text-white/90'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={cn(isScrolled ? '' : 'text-white hover:bg-white/10 hover:text-white')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Auth Buttons */}
            {session ? (
              <div className="flex items-center space-x-3">
                <Link href={session.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  title="Logout"
                  className={cn(isScrolled ? '' : 'text-white hover:bg-white/10 hover:text-white')}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className={cn(isScrolled ? '' : 'text-white hover:bg-white/10 hover:text-white')}>Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="gold">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={cn(isScrolled ? '' : 'text-white hover:bg-white/10 hover:text-white')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md focus:outline-hidden cursor-pointer",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-border/80 bg-background/95 backdrop-blur-md">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }
                }}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-amber-500 transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-border/40 my-3 pt-3">
              {session ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{session.user?.name || session.user?.email}</span>
                  </div>
                  <Link href={session.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button variant="gold" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
