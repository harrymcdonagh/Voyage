import { Columns } from "./components/priceTable/Columns";
import { PriceTable } from "./components/priceTable/PriceTable";
import Header from "./components/header/Header";
import { getPrices, getWatchlisted } from "./actions";
import { Metadata } from "next";
import getSession from "@/src/lib/getSession";

export const metadata: Metadata = {
  title: "Prices",
};

export default async function Prices() {
  const data = await getPrices();
  const session = await getSession();
  const user = session?.user;
  const watchlisted = user ? await getWatchlisted(user.id) : [];

  const watchlistedSet = new Set(watchlisted.map((item: { coinId: any }) => item.coinId));
  const newData = data.map((coin) => ({
    ...coin,
    watchlisted: watchlistedSet.has(coin.id),
  }));

  return (
    <main>
      <Header data={data} />
      <div className="container mx-auto my-10">
        <h1 className="my-auto text-4xl font-bold text-center mt-3 mb-3">
          Today&apos;s Prices
        </h1>
        <PriceTable columns={Columns} data={newData} />
      </div>
    </main>
  );
}
