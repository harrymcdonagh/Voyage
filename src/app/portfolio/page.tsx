import { auth } from "@/src/auth";
import { Columns, Transaction } from "./components/Transactions/Columns";
import { TransactionTable } from "./components/Transactions/TransactionTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import getSession from "@/src/lib/getSession";

export const metadata: Metadata = {
  title: "Portfolio",
};

async function getTransactions(): Promise<Transaction[]> {
  return [
    {
      userId: "clzmoe77e0000gfzpeyzc57gj",
      id: "clzmoiqn40004gfzpxj9eayrp",
      coinName: "Bitcoin",
      coinAmount: 0.5,
      coinPrice: 63402,
      coinSymbol: "BTC",
      transactionValue: 31701,
      transactionDate: "2023-10-01T12:00:00.000Z",
    },
  ];
}

export default async function Page() {
  const data = await getTransactions();
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/settings");
  }

  return (
    <div className="container mx-auto">
      <TransactionTable columns={Columns} data={data} />
    </div>
  );
}
