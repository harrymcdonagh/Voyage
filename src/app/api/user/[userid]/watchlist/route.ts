import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userid: string } }
) {
  const { userid } = params;
  try {
    const watchlistedCoins = await prisma.watchlist.findMany({
      where: { userId: userid },
    });
    return NextResponse.json(watchlistedCoins);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving watchlist", error },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userid: string } }
) {
  const { userid } = params;
  const body = await request.json();

  try {
    const newWatchlistedCoin = await prisma.watchlist.create({
      data: {
        userId: userid,
        symbol: body.symbol,
      },
    });

    return NextResponse.json(newWatchlistedCoin);
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding to watchlist", error },
      { status: 500 }
    );
  }
}
