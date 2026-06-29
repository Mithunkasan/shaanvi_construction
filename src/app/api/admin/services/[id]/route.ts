import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized access.' }, { status: 401 });
    }

    const { id } = await context.params;
    const { name, description, icon, image, category, priceRange, duration } = await req.json();

    if (!name || !description || !category || !priceRange || !duration) {
      return NextResponse.json({ message: 'Missing required service fields.' }, { status: 400 });
    }

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ message: 'Service not found.' }, { status: 404 });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        icon,
        image,
        category,
        priceRange,
        duration,
      },
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (e) {
    console.error('Update service error:', e);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
export default PUT;
