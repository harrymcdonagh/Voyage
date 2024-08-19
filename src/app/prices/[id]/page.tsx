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
  const historicalData = await getCoinHistoricalData("BTC");

  return (
    <div className="text-foreground flex flex-col md:flex-row relative">
      <div className="md:fixed md:top-[64px] md:left-0 md:h-[calc(100vh-64px)] md:w-[400px] md:overflow-y-auto p-6 md:p-8 border border-slate-700 rounded-lg">
        <CoinHeader name={data.name} symbol={data.symbol} id={data.id} />
        <CoinStats data={data} />
        <CoinLinks metadata={metadata} />
      </div>
      <div className="flex-1 min-w-0 p-6 md:p-8 md:ml-[400px] md:pt-[64px]">
        <section>
          <h2 className="text-3xl font-bold">Price History</h2>
          <CoinChart data={historicalData} />
        </section>
        <CoinDescription name={data.name} description={metadata.description} />
      </div>
    </div>
  );
}

export default CoinPage;
