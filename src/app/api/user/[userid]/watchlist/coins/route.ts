import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cmcAxios } from "@/src/lib/axios";
import { auth } from "@/src/auth";

export async function GET(
  req: NextRequest,
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
    const watchlisted = await prisma.watchlist.findMany({
      where: { userId: userid },
    });
    const coinIds = watchlisted.map((item) => item.coinId);

    if (coinIds.length === 0) {
      return NextResponse.json([]);
    }

    const ids = coinIds.join(",");
    const { data } = await cmcAxios.get("/v2/cryptocurrency/quotes/latest", {
      params: { id: ids },
    });
    const detailedData = Object.values(data.data);

    return NextResponse.json(detailedData);
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return NextResponse.json(
      { message: "Error retrieving watchlist data", error },
      { status: 500 }
    );
  }
}
