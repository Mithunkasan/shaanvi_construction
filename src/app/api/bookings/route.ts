import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized access.' }, { status: 401 });
    }

    const {
      customerName,
      phone,
      email,
      location,
      propertyType,
      budget,
      preferredDate,
      description,
    } = await req.json();

    if (!customerName || !phone || !email || !location || !propertyType || !budget || !preferredDate || !description) {
      return NextResponse.json({ message: 'Missing required booking inputs.' }, { status: 400 });
    }

    // 1. Create the booking linked to user
    const booking = await prisma.booking.create({
      data: {
        customerName,
        phone,
        email,
        location,
        propertyType,
        budget,
        preferredDate: new Date(preferredDate),
        description,
        userId: session.user.id,
        status: 'PENDING',
      },
    });

    // 2. Create notification alerting client of submission success
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Booking Requested',
        message: `Your booking for ${propertyType} at ${location} was received. A project director will review the details.`,
        type: 'BOOKING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (e) {
    console.error('Booking submission error:', e);
    return NextResponse.json({ message: 'An error occurred during booking creation.' }, { status: 500 });
  }
}
export default POST;
