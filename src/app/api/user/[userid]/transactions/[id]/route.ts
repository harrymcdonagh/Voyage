import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { userid: string, id: string } }) {
    const { userid, id } = params;
    const transactionId = id;

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
  
  export async function PUT(request: NextRequest, { params }: { params: { userid: string, id: string} }) {
    const { userid, id } = params;
    const body = await request.json();
    const transactionId = id;
  
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