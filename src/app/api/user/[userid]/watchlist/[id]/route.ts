import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userid: string; id: string } }
) {
  const { userid, id } = params;
  const coinId = parseInt(id);

  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  if (session.user.id !== userid) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const watchlisted = await prisma.watchlist.findFirst({
      where: {
        coinId: coinId,
        userId: userid,
      },
    });

    if (!watchlisted) {
      return NextResponse.json(
        { message: "Watchlist instance not found" },
        { status: 404 }
      );
    }

    await prisma.watchlist.delete({
      where: {
        watchlistId: watchlisted.watchlistId,
      },
    });

    return NextResponse.json({ message: "Watchlist instance deleted successfully" });
  } catch (error) {
    console.error("Error deleting Watchlist instance:", error);
    return NextResponse.json(
      { message: "Error deleting Watchlist instance", error },
      { status: 500 }
    );
  }
}
