"use client";

import { CoinData } from "@/src/types/HistoricalDataSchema";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill"; // Import the polyfill

interface Props {
  data: CoinData[];
}

const CoinChart = ({ data }: Props) => {
  const chartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.ResizeObserver === "undefined") {
      window.ResizeObserver = ResizeObserver;
    }

    const chart = createChart(chartContainer.current!);

    chart.applyOptions({
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      autoSize: true,
    });

    const candlestickSeries = chart.addCandlestickSeries();

    candlestickSeries.applyOptions({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chart.priceScale("right").applyOptions({
      borderColor: "#71649C",
    });

    chart.timeScale().applyOptions({
      borderColor: "#71649C",
    });

    const transformedData = data.map((item) => ({
      time: new Date(item.time_period_start).toISOString().split("T")[0],
      open: item.rate_open,
      high: item.rate_high,
      low: item.rate_low,
      close: item.rate_close,
    }));

    candlestickSeries.setData(transformedData);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div
      className="my-4 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      ref={chartContainer}
    />
  );
};

export default CoinChart;
