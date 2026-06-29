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

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized access.' }, { status: 401 });
    }

    const { id } = await context.params;

    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ message: 'Notification not found or access denied.' }, { status: 404 });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (e) {
    console.error('Mark notification read error:', e);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
export default POST;
