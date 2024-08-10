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

export async function DELETE(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();
  const transactionId = body.id;

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userid
      }
    });

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId
      }
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();
  const transactionId = body.id;

  try {
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userid
      }
    });

    if (!existingTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        amount: body.amount,
        price: body.price,
        date: new Date(body.date),
        type: body.type,
        name: existingTransaction.name,  // Retain original name
        symbol: existingTransaction.symbol, // Retain original symbol
        value: body.amount * body.price, // Recalculate the value
      }
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ message: 'Error updating transaction', error }, { status: 500 });
  }
}
