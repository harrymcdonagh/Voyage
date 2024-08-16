import { Columns } from "./components/priceTable/Columns";
import { PriceTable } from "./components/priceTable/PriceTable";
import Header from "./components/header/Header";
import { getPrices } from "./actions";

export default async function Prices() {
  const data = await getPrices();

  return (
    <main>
      <Header data={data} />
      <div className="container mx-auto my-10">
        <h1 className="my-auto text-4xl font-bold text-center mt-7 mb-3">
          Today&apos;s Prices
        </h1>
        <PriceTable columns={Columns} data={data} />
      </div>
    </main>
  );
}
