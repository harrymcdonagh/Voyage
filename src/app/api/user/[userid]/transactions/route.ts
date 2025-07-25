import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { auth } from '@/src/auth';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;

  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  if (session.user.id !== userid) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: userid }
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return NextResponse.json({ message: 'Error retrieving transactions', error }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();

  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  if (session.user.id !== userid) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: userid,
        name: body.name,
        amount: parseFloat(body.amount),
        price: parseFloat(body.price),
        symbol: body.symbol,
        value: body.amount * body.price,
        date: new Date(body.date),
        type: body.type,
      }
    });

    return NextResponse.json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ message: 'Error creating transaction', error }, { status: 500 });
  }
}

