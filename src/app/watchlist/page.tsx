import axiosInstance from "@/src/lib/axios";
import getSession from "@/src/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { WatchlistTable } from "./components/WatchlistTable";
import { Columns } from "./components/Columns";

export const metadata: Metadata = {
  title: "Watchlist",
};

async function getWatchlist(userId: string | undefined) {
  const respone = await axiosInstance.get(`/api/user/${userId}/watchlist`);
  return respone.data;
}

export default async function WatchlistPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/watchlist");
  }

  const userId = session?.user?.id;
  const data = await getWatchlist(userId);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5">Watchlist</h1>
      <WatchlistTable columns={Columns} data={data} />
    </div>
  );
}
