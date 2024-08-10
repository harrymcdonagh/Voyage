import { Columns } from "./components/Transactions/Columns";
import { Transaction } from "./components/Transactions/TransactionSchema";
import { TransactionTable } from "./components/Transactions/TransactionTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import getSession from "@/src/lib/getSession";
import axiosInstance from "@/src/lib/axios";

export const metadata: Metadata = {
  title: "Portfolio",
};

async function getTransactions(userId: string | undefined): Promise<Transaction[]> {
  const response = await axiosInstance.get(`/api/user/${userId}/transactions`);
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
      <TransactionTable userId={userId} columns={Columns} data={data} />
    </div>
  );
}
