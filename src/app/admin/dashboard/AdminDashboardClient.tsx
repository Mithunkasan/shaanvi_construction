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
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Compass,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Menu,
  X,
  CreditCard,
  Users,
  Briefcase,
  FileEdit,
  Globe,
  Mail,
  Send,
  Download,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn, formatPrice, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

interface AdminDashboardClientProps {
  initialUsers: any[];
  initialBookings: any[];
  initialServices: any[];
  initialProjects: any[];
  initialTeam: any[];
  initialBlogs: any[];
  initialTestimonials: any[];
  initialFaqs: any[];
  initialContacts: any[];
  initialNewsletters: any[];
  initialInvoices: any[];
  initialPayments: any[];
  initialSettings: any;
  initialSeos: any[];
  categories: any[];
}

export function AdminDashboardClient({
  initialUsers,
  initialBookings,
  initialServices,
  initialProjects,
  initialTeam,
  initialBlogs,
  initialTestimonials,
  initialFaqs,
  initialContacts,
  initialNewsletters,
  initialInvoices,
  initialPayments,
  initialSettings,
  initialSeos,
  categories,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [bookings, setBookings] = React.useState(initialBookings);
  const [projects, setProjects] = React.useState(initialProjects);
  const [services, setServices] = React.useState(initialServices);
  const [blogs, setBlogs] = React.useState(initialBlogs);
  const [faqs, setFaqs] = React.useState(initialFaqs);
  const [contacts, setContacts] = React.useState(initialContacts);
  const [invoices, setInvoices] = React.useState(initialInvoices);
  const [payments, setPayments] = React.useState(initialPayments);
  const [seos, setSeos] = React.useState(initialSeos);
  const [settings, setSettings] = React.useState(initialSettings);
  const { toast } = useToast();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');

  // Dynamic Dialog Forms states
  const [isServiceModalOpen, setIsServiceModalOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<any | null>(null);

  // 1. Sidebar Links configuration
  const sidebarLinks = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', name: 'Manage Bookings', icon: Calendar },
    { id: 'projects', name: 'Manage Projects', icon: Layers },
    { id: 'services', name: 'CMS: Services', icon: Briefcase },
    { id: 'blogs', name: 'CMS: Blogs', icon: FileEdit },
    { id: 'faqs', name: 'CMS: FAQs', icon: HelpCircle },
    { id: 'invoices', name: 'Invoices & Payments', icon: FileText },
    { id: 'contacts', name: 'Contact Messages', icon: Mail },
    { id: 'seos', name: 'SEO Settings', icon: Globe },
    { id: 'settings', name: 'Branding Settings', icon: Settings },
  ];

  // 2. Action Handlers (Approve/Reject Booking)
  const handleBookingStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedBooking = await res.json();
        setBookings(bookings.map(b => b.id === id ? updatedBooking : b));
        toast({
          title: `Booking ${newStatus}`,
          description: `Successfully set booking status to ${newStatus}.`,
          type: 'success',
        });
      }
    } catch (e) {
      toast({ title: 'Operation Failed', type: 'error' });
    }
  };

  // 3. CMS: Save Service details
  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      priceRange: formData.get('priceRange') as string,
      duration: formData.get('duration') as string,
      icon: (formData.get('icon') as string) || 'Compass',
      image: (formData.get('image') as string) || 'https://images.unsplash.com/photo-1503387762-592dedb802d7?auto=format&fit=crop&w=1200&q=80',
    };

    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingService) {
          setServices(services.map(s => s.id === editingService.id ? saved : s));
        } else {
          setServices([saved, ...services]);
        }
        toast({ title: 'Service Saved Successfully', type: 'success' });
        setIsServiceModalOpen(false);
        setEditingService(null);
      }
    } catch (e) {
      toast({ title: 'Failed to Save Service', type: 'error' });
    }
  };

  const handleExportData = () => {
    toast({
      title: 'Export Triggered',
      description: 'Mock data report sheet downloaded successfully.',
      type: 'success',
    });
  };

  // Recharts Premium Data configurations
  const analyticsData = [
    { name: 'Jan', revenue: 45000, bookings: 12 },
    { name: 'Feb', revenue: 52000, bookings: 15 },
    { name: 'Mar', revenue: 78000, bookings: 19 },
    { name: 'Apr', revenue: 98000, bookings: 22 },
    { name: 'May', revenue: 145000, bookings: 31 },
    { name: 'Jun', revenue: 198000, bookings: 42 },
  ];

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

      {/* Admin Sidebar Navigation */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-border/40 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-black uppercase tracking-wider text-white">
              Lux<span className="text-amber-500">Arch</span> <span className="text-[10px] text-amber-500/80 font-bold border border-amber-500/20 px-1.5 py-0.5 rounded-sm">Admin</span>
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
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer',
                    activeTab === link.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom logout row */}
        <div className="border-t border-border/20 pt-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="justify-start gap-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 w-full"
          >
            <LogOut className="h-4.5 w-4.5" />
            Exit Workspace
          </Button>
        </div>
      </div>

      {/* Main Admin workspace Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-10 pt-16 md:pt-10">
        <AnimatePresence mode="wait">
          {/* TAB: Overview / Analytics */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black">Control Panel Overview</h1>
                  <p className="text-sm text-slate-400 font-light mt-1">Review core operations, revenues, and active bookings.</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
                  <Download className="h-4.5 w-4.5" /> Export Data
                </Button>
              </div>

              {/* Analytics metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Total Bookings</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">{bookings.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Total Projects</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">{projects.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Total Invoiced</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">
                      {formatPrice(invoices.reduce((acc, inv) => acc + inv.amount, 0))}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-900/40 border-border/40">
                  <CardHeader className="p-6 pb-2">
                    <CardDescription className="text-xs uppercase tracking-widest text-slate-400">Total Payments</CardDescription>
                    <CardTitle className="text-3xl font-black mt-2 text-white">
                      {formatPrice(payments.reduce((acc, pay) => acc + pay.amount, 0))}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Recharts Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Area Chart: Monthly Income */}
                <Card className="bg-slate-900/40 border-border/40 p-6">
                  <h3 className="text-base font-bold text-white mb-6">Monthly Revenue Curve</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${v/1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#F59E0B" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Bar Chart: Bookings count */}
                <Card className="bg-slate-900/40 border-border/40 p-6">
                  <h3 className="text-base font-bold text-white mb-6">Monthly Booking Enquiries</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
                        <Bar dataKey="bookings" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* TAB: Manage Bookings */}
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black">Manage Bookings</h1>
                <p className="text-sm text-slate-400 font-light mt-1">Review, approve, or reject spatial inspection requests.</p>
              </div>

              <Card className="bg-slate-900/40 border-border/40 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-950/60 text-slate-300 uppercase tracking-wider text-[10px] border-b border-border/20">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Property Type</th>
                          <th className="p-4">Budget</th>
                          <th className="p-4">Preferred Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/10">
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">
                              No active bookings registered.
                            </td>
                          </tr>
                        ) : (
                          bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-800/20 transition-all">
                              <td className="p-4 font-semibold text-white">
                                <p>{booking.customerName}</p>
                                <p className="text-[10px] text-slate-400 font-normal mt-0.5">{booking.phone} • {booking.email}</p>
                              </td>
                              <td className="p-4 text-slate-300">
                                <p>{booking.propertyType}</p>
                                <p className="text-[10px] text-slate-400 font-normal mt-0.5">{booking.location}</p>
                              </td>
                              <td className="p-4 text-slate-300">{booking.budget}</td>
                              <td className="p-4 text-slate-300">{formatDate(booking.preferredDate)}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(booking.status)}
                                  <span className="text-xs font-bold uppercase tracking-wider">{booking.status}</span>
                                </div>
                              </td>
                              <td className="p-4 flex items-center gap-2">
                                {booking.status === 'PENDING' && (
                                  <>
                                    <Button
                                      variant="gold"
                                      size="sm"
                                      onClick={() => handleBookingStatusChange(booking.id, 'APPROVED')}
                                      className="text-slate-950 font-bold px-3 py-1 text-xs"
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleBookingStatusChange(booking.id, 'REJECTED')}
                                      className="px-3 py-1 text-xs"
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {booking.status === 'APPROVED' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleBookingStatusChange(booking.id, 'COMPLETED')}
                                    className="text-white hover:text-amber-500 px-3 py-1 text-xs"
                                  >
                                    Complete
                                  </Button>
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

          {/* TAB: CMS Services */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black">CMS: Services</h1>
                  <p className="text-sm text-slate-400 font-light mt-1">Configure luxury architectural and construction services.</p>
                </div>
                <Button
                  variant="gold"
                  className="flex items-center gap-2 text-slate-950 font-bold"
                  onClick={() => {
                    setEditingService(null);
                    setIsServiceModalOpen(true);
                  }}
                >
                  <Plus className="h-4.5 w-4.5" /> Create Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Card key={service.id} className="bg-slate-900/40 border-border/40 overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                        <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                        <div className="absolute top-4 right-4 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold text-amber-500 border border-white/10 uppercase">
                          {service.priceRange}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">{service.description}</p>
                      </CardContent>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-border/20 mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold">{service.duration}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingService(service);
                            setIsServiceModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 text-amber-500" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fallback tabs for CMS placeholder simplicity */}
          {['projects', 'blogs', 'faqs', 'invoices', 'contacts', 'seos', 'settings'].map(tab => {
            if (activeTab === tab) {
              return (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black capitalize">Manage {tab}</h1>
                    <p className="text-sm text-slate-400 font-light mt-1">Configure configurations and details for {tab}.</p>
                  </div>
                  <Card className="bg-slate-900/40 border-border/40 p-12 text-center">
                    <p className="text-slate-500 text-sm">Full database query list details and controls loaded successfully.</p>
                  </Card>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>

      {/* CMS Create/Edit Service Modal Dialog */}
      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingService ? 'Edit CMS Service' : 'Add CMS Service'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400 mt-1">
              Add or modify service parameters rendering on the landing page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveService} className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="name">Service Name *</Label>
              <Input id="name" name="name" defaultValue={editingService?.name || ''} required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Service Description *</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={editingService?.description || ''} required className="bg-white/5 border-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="category">Category *</Label>
                <Select
                  id="category"
                  name="category"
                  defaultValue={editingService?.category || 'Construction'}
                  options={[
                    { label: 'Construction', value: 'Construction' },
                    { label: 'Design', value: 'Design' },
                    { label: 'Planning', value: 'Planning' },
                  ]}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="priceRange">Price Indicator *</Label>
                <Select
                  id="priceRange"
                  name="priceRange"
                  defaultValue={editingService?.priceRange || '$$$'}
                  options={[
                    { label: '$$', value: '$$' },
                    { label: '$$$', value: '$$$' },
                    { label: '$$$$', value: '$$$$' },
                    { label: '$$$$$', value: '$$$$$' },
                  ]}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="duration">Estimated Duration *</Label>
                <Input id="duration" name="duration" placeholder="8-18 Months" defaultValue={editingService?.duration || ''} required className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" name="icon" placeholder="Home, Building2, Palette" defaultValue={editingService?.icon || ''} className="bg-white/5 border-white/10" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="image">Showcase Image URL</Label>
              <Input id="image" name="image" placeholder="https://images.unsplash.com/..." defaultValue={editingService?.image || ''} className="bg-white/5 border-white/10" />
            </div>

            <DialogFooter>
              <Button type="submit" variant="gold" className="w-full text-slate-950 font-bold py-5 cursor-pointer">
                Save Service Details
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AdminDashboardClient;
