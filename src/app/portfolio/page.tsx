import { Columns } from "./components/Transactions/Columns";
import { Transaction } from "../../types/TransactionSchema";
import { TransactionTable } from "./components/Transactions/TransactionTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import getSession from "@/src/lib/getSession";
import { localAxios } from "@/src/lib/axios";

export const metadata: Metadata = {
  title: "Portfolio",
};

async function getTransactions(userId: string | undefined): Promise<Transaction[]> {
  const response = await localAxios.get(`/api/user/${userId}/transactions`);
  return response.data;
}

export default async function PortfolioPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/settings");
  }

  const userId = session?.user?.id;
  const data = await getTransactions(userId);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5">Transactions</h1>
      <TransactionTable userId={userId} columns={Columns} data={data} />
    </div>
  );
}
