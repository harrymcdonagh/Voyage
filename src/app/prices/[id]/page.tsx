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
  const testData = [
    { time: "2022-01-01", open: 100, high: 150, low: 80, close: 120 },
    { time: "2022-01-02", open: 120, high: 180, low: 100, close: 150 },
    { time: "2022-01-03", open: 150, high: 200, low: 120, close: 180 },
    { time: "2022-01-01", open: 100, high: 150, low: 80, close: 120 },
    { time: "2022-01-02", open: 120, high: 180, low: 100, close: 150 },
    { time: "2022-01-03", open: 150, high: 200, low: 120, close: 180 },
    { time: "2022-01-01", open: 100, high: 150, low: 80, close: 120 },
    { time: "2022-01-02", open: 120, high: 180, low: 100, close: 150 },
    { time: "2022-01-03", open: 150, high: 200, low: 120, close: 180 },
    { time: "2022-01-01", open: 100, high: 150, low: 80, close: 120 },
    { time: "2022-01-02", open: 120, high: 180, low: 100, close: 150 },
    { time: "2022-01-03", open: 150, high: 200, low: 120, close: 180 },

    // Add more candlestick data here if needed
  ];

  return (
    <div className="text-foreground flex flex-col md:flex-row relative">
      <div className="md:fixed md:top-[64px] md:left-0 md:h-[calc(100vh-64px)] md:w-[400px] md:overflow-y-auto p-6 md:p-8 border border-slate-700 rounded-lg">
        <CoinHeader name={data.name} symbol={data.symbol} id={data.id} />
        <CoinStats data={data} />
        <CoinLinks metadata={metadata} />
      </div>
      <div className="flex-1 min-w-0 p-6 md:p-8 md:ml-[400px]">
        <section className="border border-slate-700 rounded-lg p-6 md:p-8 mb-4">
          <h2 className="text-3xl font-bold">Price History (YTD)</h2>
          <CoinChart /* data={testData} */ />
        </section>
        <section className="border border-slate-700 rounded-lg p-6 md:p-8">
          <CoinDescription name={data.name} description={metadata.description} />
        </section>
      </div>
    </div>
  );
}

export default CoinPage;
