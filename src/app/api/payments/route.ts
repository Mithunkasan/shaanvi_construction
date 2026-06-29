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

    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json({ message: 'Invoice ID is required.' }, { status: 400 });
    }

    // 1. Fetch the invoice
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice || invoice.userId !== session.user.id) {
      return NextResponse.json({ message: 'Invoice not found or access denied.' }, { status: 404 });
    }

    if (invoice.status === 'PAID') {
      return NextResponse.json({ message: 'Invoice is already paid.' }, { status: 400 });
    }

    // 2. Create the mock transaction number
    const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const paymentNumber = 'PMT-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    // 3. Perform database updates in transaction
    const [payment, updatedInvoice] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          paymentNumber,
          invoiceId,
          amount: invoice.amount,
          method: 'MOCK',
          status: 'SUCCESS',
          transactionId,
        },
      }),
      prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
        include: { payments: true },
      }),
    ]);

    // 4. Create invoice notification alert
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: 'Payment Successful',
        message: `Payment of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          invoice.amount
        )} for invoice ${invoice.invoiceNumber} was successfully processed.`,
        type: 'PAYMENT',
      },
    });

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (e) {
    console.error('Payment processing error:', e);
    return NextResponse.json({ message: 'An error occurred during payment processing.' }, { status: 500 });
  }
}
export default POST;
