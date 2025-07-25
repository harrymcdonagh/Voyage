import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { userid: string } }
) {
  const { userid } = params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  if (session.user.id !== userid) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
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

  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  if (session.user.id !== userid) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const newWatchlistedCoin = await prisma.watchlist.create({
      data: {
        userId: userid,
        coinId: body.coinId,
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
