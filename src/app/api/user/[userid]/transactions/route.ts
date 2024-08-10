import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;

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

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: userid,
        name: body.name,
        amount: body.amount,
        price: body.price,
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

