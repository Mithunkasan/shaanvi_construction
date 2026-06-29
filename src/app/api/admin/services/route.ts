import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized access.' }, { status: 401 });
    }

    const { name, description, icon, image, category, priceRange, duration } = await req.json();

    if (!name || !description || !category || !priceRange || !duration) {
      return NextResponse.json({ message: 'Missing required service fields.' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        icon,
        image,
        category,
        priceRange,
        duration,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (e) {
    console.error('Create service error:', e);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
export default POST;
