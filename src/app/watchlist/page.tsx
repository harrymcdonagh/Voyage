import getSession from "@/src/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { WatchlistTable } from "./components/WatchlistTable";
import { getWatchlistData } from "./actions";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default async function Watchlist() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?CallbackUrl=/watchlist");
  }

  const userId = session?.user?.id;
  const data = await getWatchlistData(userId);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5">Your Watchlist</h1>
      <WatchlistTable userId={userId} initialData={data} />
    </div>
  );
}
