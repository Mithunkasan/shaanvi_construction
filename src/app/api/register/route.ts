import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
    }

    // 1. Check if user already exists in either User or Admin table to prevent collisions
    const existingUser = await prisma.user.findUnique({ where: { email } });
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });

    if (existingUser || existingAdmin) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 400 });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create standard client user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (e) {
    console.error('Registration error:', e);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}
export default POST;
