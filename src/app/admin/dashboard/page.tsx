import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminDashboardClient } from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // Extra security check in Server Component
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  // Fetch all administrative collections in parallel
  const [
    users,
    bookings,
    services,
    projects,
    team,
    blogs,
    testimonials,
    faqs,
    contacts,
    newsletters,
    invoices,
    payments,
    settings,
    seos,
    categories,
  ] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.service.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.team.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.blog.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.invoice.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } }),
    prisma.payment.findMany({ include: { invoice: true }, orderBy: { createdAt: 'desc' } }),
    prisma.settings.findFirst({ where: { id: 'site-settings' } }),
    prisma.sEO.findMany({ orderBy: { pageRoute: 'asc' } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <AdminDashboardClient
      initialUsers={users}
      initialBookings={bookings}
      initialServices={services}
      initialProjects={projects}
      initialTeam={team}
      initialBlogs={blogs}
      initialTestimonials={testimonials}
      initialFaqs={faqs}
      initialContacts={contacts}
      initialNewsletters={newsletters}
      initialInvoices={invoices}
      initialPayments={payments}
      initialSettings={settings}
      initialSeos={seos}
      categories={categories}
    />
  );
}
