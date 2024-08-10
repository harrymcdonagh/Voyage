import { Columns, Transaction } from "./components/Transactions/Columns";
import { TransactionTable } from "./components/Transactions/TransactionTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import getSession from "@/src/lib/getSession";
import axios from "axios";

export const metadata: Metadata = {
  title: "Portfolio",
};

async function getTransactions(userId: string | undefined): Promise<Transaction[]> {
  const endpoint = `${process.env.DEV_URL}/api/user/${userId}/transactions`;
  console.log("Fetching transactions from:", endpoint);
  const response = await axios.get(endpoint);
  console.log("Fetched transactions:", response.data);
  return response.data;
}

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/settings");
  }

  const userId = session?.user?.id;
  const data = await getTransactions(userId);

  return (
    <div className="container mx-auto">
      <TransactionTable columns={Columns} data={data} />
    </div>
  );
}
