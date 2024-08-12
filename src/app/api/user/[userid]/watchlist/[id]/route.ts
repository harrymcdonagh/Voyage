import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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