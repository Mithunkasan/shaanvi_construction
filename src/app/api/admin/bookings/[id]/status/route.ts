import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: 'Status is required.' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found.' }, { status: 404 });
    }

    // 1. Update Booking status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    // 2. Notify client of status update
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        title: `Booking Update: ${status}`,
        message: `Your booking for ${booking.propertyType} has been ${status.toLowerCase()} by the studio team.`,
        type: 'SYSTEM',
      },
    });

    // 3. Auto-generate contract invoice if approved
    if (status === 'APPROVED') {
      const invoiceNumber = 'INV-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const amount = booking.budget.includes('5M') ? 15000 : booking.budget.includes('2M') ? 9500 : 1500;
      await prisma.invoice.create({
        data: {
          invoiceNumber,
          bookingId: booking.id,
          userId: booking.userId,
          amount,
          status: 'UNPAID',
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });
      
      await prisma.notification.create({
        data: {
          userId: booking.userId,
          title: 'Invoice Generated',
          message: `An invoice has been generated for your ${booking.propertyType} contract. Please review and pay in your dashboard.`,
          type: 'PAYMENT',
        },
      });
    }

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (e) {
    console.error('Booking status update error:', e);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
export default POST;
