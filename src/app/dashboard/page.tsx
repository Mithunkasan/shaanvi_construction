import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { UserDashboardClient } from './UserDashboardClient';

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // 1. Fetch user notifications
  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  // 2. Fetch user bookings
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  // 3. Fetch user projects
  const projects = await prisma.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  // 4. Fetch user invoices & payments
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: { payments: true },
    orderBy: { createdAt: 'desc' },
  });

  // 5. Fetch user profile data
  const profile = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, createdAt: true },
  });

  return (
    <UserDashboardClient
      initialNotifications={notifications}
      initialBookings={bookings}
      initialProjects={projects}
      initialInvoices={invoices}
      profile={profile}
    />
  );
}
