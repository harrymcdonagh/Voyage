import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  try {
    const watchlistedCoins = await prisma.watchlist.findMany({
      where: { userId: userid }
    });
    return NextResponse.json(watchlistedCoins);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving watchlist', error }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();

  try {
    const newWatchlistedCoin = await prisma.watchlist.create({
      data: {
        userId: userid,
        coinSymbol: body.coinSymbol,
      }
    });

    return NextResponse.json(newWatchlistedCoin);
  } catch (error) {
    return NextResponse.json({ message: 'Error adding to watchlist', error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { userid: string } }) {
  const { userid } = params;
  const body = await request.json();
  const watchlistedId = body.id;

  try {
    await prisma.watchlist.delete({
      where: {
        id: watchlistedId,
        userId: userid 
      }
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 });
  }
}
