import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: userid }
    });

    return NextResponse.json(transactions);
  } catch (error) {
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
        coinName: body.coinName,
        coinAmount: body.coinAmount,
        coinPrice: body.coinPrice,
        coinSymbol: body.coinSymbol,
        transactionDate: body.transactionDate
      }
    });

    return NextResponse.json(newTransaction);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating transaction', error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();
  const transactionId = body.id;

  try {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId: userid 
      }
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();
  const transactionId = body.id;

  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      select: {
        coinName: true,
        coinSymbol: true,
      }
    });

    if (!existingTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
        userId: userid,
      },
      data: {
        coinAmount: body.coinAmount,
        coinPrice: body.coinPrice,
        transactionDate: body.transactionDate,
        coinName: existingTransaction.coinName,
        coinSymbol: existingTransaction.coinSymbol,
      }
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating transaction', error }, { status: 500 });
  }
}

