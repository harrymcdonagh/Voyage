import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { cmcAxios } from "@/src/lib/axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  const { userid } = params;

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
