'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  Heart,
  LogOut,
  Plus,
  Compass,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Menu,
  X,
  CreditCard
} from 'lucide-react';
import { cn, formatPrice, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

interface UserDashboardClientProps {
  initialNotifications: any[];
  initialBookings: any[];
  initialProjects: any[];
  initialInvoices: any[];
  profile: any;
}

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  phone: z.string().min(6, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  location: z.string().min(5, 'Site location required'),
  propertyType: z.string().min(1, 'Please select property type'),
  budget: z.string().min(1, 'Please select budget range'),
  preferredDate: z.string().min(1, 'Please select preferred date'),
  description: z.string().min(10, 'Please describe your request (min 10 chars)'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function UserDashboardClient({
  initialNotifications,
  initialBookings,
  initialProjects,
  initialInvoices,
  profile,
}: UserDashboardClientProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(initialNotifications);
  const [bookings, setBookings] = React.useState(initialBookings);
  const [projects, setProjects] = React.useState(initialProjects);
  const [invoices, setInvoices] = React.useState(initialInvoices);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = React.useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: profile?.name || '',
      email: profile?.email || '',
    },
  });

  const sidebarLinks = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', name: 'My Bookings', icon: Calendar },
    { id: 'projects', name: 'My Projects', icon: Layers },
    { id: 'invoices', name: 'Invoices & Payments', icon: FileText },
    { id: 'notifications', name: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read).length },
    { id: 'profile', name: 'Profile Settings', icon: Settings },
    { id: 'wishlist', name: 'My Wishlist', icon: Heart },
    { id: 'support', name: 'Support Tickets', icon: HelpCircle },
  ];

  // 1. Submit Booking Request
  const handleBookingSubmit = async (data: BookingFormValues) => {
    setIsSubmittingBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const newBooking = await res.json();
        setBookings([newBooking, ...bookings]);
        toast({
          title: 'Booking Requested',
          description: 'Your inspection request has been submitted. Status: Pending.',
          type: 'success',
        });
        reset();
        setIsBookingModalOpen(false);
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({
        title: 'Booking Failed',
        description: 'Unable to submit booking. Please check connection.',
        type: 'error',
      });
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // 2. Mock Invoice Payment
  const handlePayment = async () => {
    if (!selectedInvoice) return;
    setIsProcessingPayment(true);

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: selectedInvoice.id }),
      });

      if (res.ok) {
        const updatedInvoice = await res.json();
        // Update local invoices list state
        setInvoices(invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)));
        toast({
          title: 'Payment Successful',
          description: `Invoice ${selectedInvoice.invoiceNumber} paid. Receipt generated.`,
          type: 'success',
        });
        setIsPaymentModalOpen(false);
        setSelectedInvoice(null);
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({
        title: 'Payment Error',
        description: 'Verification check failed. Please call bank.',
        type: 'error',
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // 3. Mark Notification as Read
  const handleMarkNotificationRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      if (res.ok) {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      }
    } catch (e) {
      // Fail silently
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'APPROVED':
      case 'COMPLETED':
      case 'PAID':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'REJECTED':
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-rose-500" />;
      case 'OVERDUE':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Mobile Sidebar overlay toggler */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-border/40 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-black uppercase tracking-wider text-white">
              Lux<span className="text-amber-500">Arch</span>
            </span>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer',
                    activeTab === link.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && link.badge > 0 ? (
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full',
                      activeTab === link.id ? 'bg-slate-950 text-amber-500' : 'bg-amber-500 text-slate-950'
                    )}>
                      {link.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom profile/logout row */}
        <div className="border-t border-border/20 pt-4 flex flex-col gap-2">
          <div className="px-3 py-2 flex flex-col">
            <span className="text-xs text-slate-400">Signed in as</span>
            <span className="text-sm font-semibold truncate text-white">{profile?.name || profile?.email}</span>
          </div>
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="justify-start gap-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 w-full"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Dashboard Panel workspace */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-10 pt-16 md:pt-10">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Welcome banner */}
              <div>
                <h1 className="text-2xl md:text-3xl font-black">Welcome Back, {profile?.name || 'Client'}</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Review active contracts, book site evaluations, and track payments.</p>
              </div>

              {/* Status metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Total Bookings</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">{bookings.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Active Builds</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">
                      {projects.filter((p) => p.status !== 'COMPLETED').length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Unpaid Invoices</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">
                      {invoices.filter((i) => i.status === 'UNPAID').length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Notifications</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">
                      {notifications.filter((n) => !n.read).length}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Recent Active Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-4 border-b border-border/20 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-white">Recent Booking Submissions</CardTitle>
                      <CardDescription className="text-xs">Schedule consultations and surveys.</CardDescription>
                    </div>
                    <Button variant="gold" size="sm" className="flex items-center gap-1 text-slate-950 font-bold" onClick={() => setIsBookingModalOpen(true)}>
                      <Plus className="h-4 w-4" /> Book Service
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 divide-y divide-border/20">
                    {bookings.length === 0 ? (
                      <p className="text-sm text-slate-500 py-4 text-center">No active bookings registered.</p>
                    ) : (
                      bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">{booking.propertyType}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{booking.location} • {formatDate(booking.preferredDate)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(booking.status)}
                            <span className="text-xs font-bold uppercase tracking-wider">{booking.status}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Notifications card preview */}
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-4 border-b border-border/20">
                    <CardTitle className="text-lg font-bold text-white">Recent Alerts & Updates</CardTitle>
                    <CardDescription className="text-xs">Milestones and payment compliance messages.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 divide-y divide-border/20">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-slate-500 py-4 text-center">No notifications available.</p>
                    ) : (
                      notifications.slice(0, 3).map((notif) => (
                        <div
                          key={notif.id}
                          className={cn(
                            'py-4 first:pt-0 last:pb-0 flex items-start justify-between cursor-pointer',
                            !notif.read ? 'text-white' : 'text-slate-400'
                          )}
                          onClick={() => handleMarkNotificationRead(notif.id)}
                        >
                          <div>
                            <p className="text-sm font-semibold">{notif.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{notif.message}</p>
                          </div>
                          {!notif.read && <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-2" />}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* TAB: Bookings */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black">My Bookings</h1>
                  <p className="text-sm text-slate-400 font-light mt-1">Book site evaluations and structural audits.</p>
                </div>
                <Button variant="gold" className="flex items-center gap-2 text-slate-950 font-bold" onClick={() => setIsBookingModalOpen(true)}>
                  <Plus className="h-4.5 w-4.5" /> Book Service
                </Button>
              </div>

              <Card className="bg-slate-900/40 border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-950/60 text-slate-300 uppercase tracking-wider text-[10px] border-b border-border/20">
                        <tr>
                          <th className="p-4">Property Type</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Budget Range</th>
                          <th className="p-4">Preferred Date</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/10">
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                              No booking records available.
                            </td>
                          </tr>
                        ) : (
                          bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-800/20 transition-all">
                              <td className="p-4 font-semibold text-white">{booking.propertyType}</td>
                              <td className="p-4 text-slate-300">{booking.location}</td>
                              <td className="p-4 text-slate-300">{booking.budget}</td>
                              <td className="p-4 text-slate-300">{formatDate(booking.preferredDate)}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(booking.status)}
                                  <span className="text-xs font-bold uppercase tracking-wider">{booking.status}</span>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* TAB: Projects */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">My Active Contracts</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Real-time tracker of ongoing developments.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.length === 0 ? (
                  <Card className="col-span-2 bg-slate-900/40 border-border/40 p-12 text-center">
                    <p className="text-slate-500 text-sm">No construction projects linked to this profile.</p>
                  </Card>
                ) : (
                  projects.map((project) => (
                    <Card key={project.id} className="bg-slate-900/40 border-border/40 overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                          <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover" />
                          <div className="absolute top-4 right-4 bg-slate-950/80 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                            {project.status}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6 font-light">{project.description}</p>
                          
                          {/* Progress bar visualizer */}
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Build Completion</span>
                              <span className="font-semibold text-white">{project.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold-gradient rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* TAB: Invoices & Payments */}
          {activeTab === 'invoices' && (
            <motion.div
              key="invoices"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">Invoices & Payments</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Verify payment histories and outstanding contract balances.</p>
              </div>

              <Card className="bg-slate-900/40 border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-950/60 text-slate-300 uppercase tracking-wider text-[10px] border-b border-border/20">
                        <tr>
                          <th className="p-4">Invoice #</th>
                          <th className="p-4">Due Date</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/10">
                        {invoices.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                              No financial records found.
                            </td>
                          </tr>
                        ) : (
                          invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-800/20 transition-all">
                              <td className="p-4 font-semibold text-white">{inv.invoiceNumber}</td>
                              <td className="p-4 text-slate-300">{formatDate(inv.dueDate)}</td>
                              <td className="p-4 font-bold text-white">{formatPrice(inv.amount)}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(inv.status)}
                                  <span className="text-xs font-bold uppercase tracking-wider">{inv.status}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                {inv.status === 'UNPAID' ? (
                                  <Button
                                    variant="gold"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedInvoice(inv);
                                      setIsPaymentModalOpen(true);
                                    }}
                                    className="text-slate-950 font-bold flex items-center gap-1.5"
                                  >
                                    <CreditCard className="h-4 w-4" /> Pay Now
                                  </Button>
                                ) : (
                                  <span className="text-xs text-muted-foreground font-semibold">Receipt Available</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* TAB: Notifications */}
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">All Notifications</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Warning alerts, compliance notifications, and builder messages.</p>
              </div>

              <Card className="bg-slate-900/40 border-border/40 p-6 divide-y divide-border/20">
                {notifications.length === 0 ? (
                  <p className="text-sm text-slate-500 py-8 text-center">No alerts in inbox.</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleMarkNotificationRead(notif.id)}
                      className={cn(
                        'py-4 flex items-start justify-between cursor-pointer first:pt-0 last:pb-0',
                        !notif.read ? 'text-white' : 'text-slate-400'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getStatusIcon(notif.type === 'PAYMENT' ? 'OVERDUE' : 'PENDING')}</div>
                        <div>
                          <p className="text-sm font-semibold">{notif.title}</p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">{notif.message}</p>
                          <span className="text-[10px] text-slate-500 mt-1.5 block">{formatDate(notif.createdAt)}</span>
                        </div>
                      </div>
                      {!notif.read && <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0 mt-2" />}
                    </div>
                  ))
                )}
              </Card>
            </motion.div>
          )}

          {/* TAB: Settings/Profile */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 max-w-xl"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">Profile Settings</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Configure profile details and email notifications.</p>
              </div>

              <Card className="bg-slate-900/40 border-border/40 p-6 md:p-8">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast({ title: 'Profile Updated', type: 'success' }); }}>
                  <div className="space-y-2">
                    <Label htmlFor="prof-name">Full Name</Label>
                    <Input id="prof-name" defaultValue={profile?.name || ''} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-email">Email Address (un-editable)</Label>
                    <Input id="prof-email" defaultValue={profile?.email || ''} readOnly className="bg-white/5 border-white/10 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-phone">Contact Phone</Label>
                    <Input id="prof-phone" defaultValue="+1 (555) 111-2222" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  
                  <div className="border-t border-border/20 pt-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Security / Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="prof-pass">New Password</Label>
                      <Input id="prof-pass" type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>

                  <Button type="submit" variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                    Save profile changes
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Mock TABS: Support & Wishlist */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">My Wishlist</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Masterpieces and materials you've bookmarked.</p>
              </div>
              <Card className="bg-slate-900/40 border-border/40 p-12 text-center">
                <p className="text-slate-500 text-sm">Your bookmarks list is currently empty.</p>
              </Card>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">Support Tickets</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Submit tickets directly to our site managers.</p>
              </div>
              <Card className="bg-slate-900/40 border-border/40 p-12 text-center">
                <p className="text-slate-500 text-sm">No active support tickets found.</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Request Dialog Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">New Booking Consultation</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Select service preferences and budget criteria for construction reviews.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleBookingSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="customerName">Full Name</Label>
                <Input id="customerName" {...register('customerName')} className="bg-white/5 border-white/10" />
                {errors.customerName && <p className="text-xs text-rose-500">{errors.customerName.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" {...register('phone')} className="bg-white/5 border-white/10" />
                {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} className="bg-white/5 border-white/10" />
                {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="location">Site Location</Label>
                <Input id="location" placeholder="100 Hampton Lane, Hamptons NY" {...register('location')} className="bg-white/5 border-white/10" />
                {errors.location && <p className="text-xs text-rose-500">{errors.location.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  id="propertyType"
                  placeholder="Select Type"
                  options={[
                    { label: 'Residential Villa', value: 'Residential Villa' },
                    { label: 'Commercial Skyscraper', value: 'Commercial Skyscraper' },
                    { label: 'Interior Design Renovation', value: 'Interior Design' },
                    { label: 'Structural Inspection', value: 'Structural Inspection' },
                  ]}
                  {...register('propertyType')}
                  className="bg-white/5 border-white/10"
                />
                {errors.propertyType && <p className="text-xs text-rose-500">{errors.propertyType.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="budget">Estimated Budget</Label>
                <Select
                  id="budget"
                  placeholder="Select Budget"
                  options={[
                    { label: 'Under $500,000', value: 'Under $500k' },
                    { label: '$500k - $2M', value: '$500k - $2M' },
                    { label: '$2M - $5M', value: '$2M - $5M' },
                    { label: 'Over $5M', value: 'Over $5M' },
                  ]}
                  {...register('budget')}
                  className="bg-white/5 border-white/10"
                />
                {errors.budget && <p className="text-xs text-rose-500">{errors.budget.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input id="preferredDate" type="date" {...register('preferredDate')} className="bg-white/5 border-white/10" />
                {errors.preferredDate && <p className="text-xs text-rose-500">{errors.preferredDate.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Inquiry Details</Label>
              <Textarea id="description" rows={4} placeholder="Spatial blueprints requirements, style options, timelines..." {...register('description')} className="bg-white/5 border-white/10" />
              {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
            </div>

            {/* Simulated Upload Images field */}
            <div className="space-y-1">
              <Label>Upload Site photos (optional)</Label>
              <div className="h-16 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-xs text-slate-500 hover:border-amber-500/40 cursor-pointer">
                <span>Click to drag-and-drop or select images</span>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmittingBooking} variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                {isSubmittingBooking ? (
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Request Consultation'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Invoice Card Payment Dialog Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-amber-500" /> Secure Payment
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Complete invoice transaction via mock payment gateway.
            </DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-6 pt-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-border/20 text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400">Total Outstanding Balance</span>
                <p className="text-3xl font-black text-white mt-1">{formatPrice(selectedInvoice.amount)}</p>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mt-1.5">
                  Invoice {selectedInvoice.invoiceNumber}
                </p>
              </div>

              {/* Mock Card Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-num">Card Number</Label>
                  <Input id="card-num" placeholder="4000 1234 5678 9010" className="bg-white/5 border-white/10 text-white" defaultValue="4000 1234 5678 9010" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-exp">Expiry Date</Label>
                    <Input id="card-exp" placeholder="12/28" className="bg-white/5 border-white/10 text-white" defaultValue="12/28" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvc">CVC Code</Label>
                    <Input id="card-cvc" type="password" placeholder="•••" className="bg-white/5 border-white/10 text-white" defaultValue="123" />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handlePayment} disabled={isProcessingPayment} variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                  {isProcessingPayment ? (
                    <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    `Authorize Payment (${formatPrice(selectedInvoice.amount)})`
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default UserDashboardClient;
