import { Coin } from "@/src/types/CoinSchema";
import { Columns } from "./components/priceTable/Columns";
import { PriceTable } from "./components/priceTable/PriceTable";
import { cmcAxios } from "@/src/lib/axios";
import getSession from "@/src/lib/getSession";

async function getPrices(): Promise<Coin[]> {
  const response = await cmcAxios.get(`/v1/cryptocurrency/listings/latest`);
  return response.data.data;
}

export default async function Prices() {
  const data = await getPrices();
  const session = await getSession();
  const userId = session?.user?.id;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5">Today&apos;s Prices</h1>
      <PriceTable columns={Columns} data={data} />
    </div>
  );
}
