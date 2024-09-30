import React from "react";
import { getCoinData, getCoinHistoricalData, getCoinMetadata } from "./actions";
import CoinHeader from "./components/CoinHeader";
import CoinStats from "./components/CoinStats";
import CoinLinks from "./components/CoinLinks";
import CoinChart from "./components/CoinChart";
import CoinDescription from "./components/CoinDescription";

interface Props {
  params: { id: string };
}

async function CoinPage({ params: { id } }: Props) {
  const data = await getCoinData(id);
  const metadata = await getCoinMetadata(id);
  //const historicalData = await getCoinHistoricalData(data.symbol);

  return (
    <div className="text-foreground flex flex-col md:flex-row relative">
      <div className="md:fixed md:top-[64px] md:left-0 md:h-[calc(100vh-64px)] md:w-[400px] md:overflow-y-auto p-6 md:p-8 border border-slate-700 rounded-lg">
        <CoinHeader name={data.name} symbol={data.symbol} id={data.id} />
        <div className="px-4">
          <CoinStats data={data} />
        </div>
        <CoinLinks metadata={metadata} />
      </div>
      <div className="flex-1 min-w-0 p-6 md:p-8 md:ml-[400px]">
        <section className="border border-slate-700 rounded-lg p-6 md:p-8 mb-4">
          <h2 className="text-3xl font-bold">Price History (Sample Data)</h2>
          <CoinChart /* data={historicalData} */ />
        </section>
        <section className="border border-slate-700 rounded-lg p-6 md:p-8">
          <CoinDescription name={data.name} description={metadata.description} />
        </section>
      </div>
    </div>
  );
}

export default CoinPage;
