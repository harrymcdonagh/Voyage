"use client";

import { CoinData } from "@/src/types/HistoricalDataSchema";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill"; // Import the polyfill

const CoinChart = () => {
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
      crosshair: {
        mode: 0,
      },
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

    // Generate more data points
    const generateData = (count: number) => {
      const data = [];
      let time = new Date("2023-01-01").getTime();
      let open = 100;
      let high = 105;
      let low = 95;
      let close = 100;

      for (let i = 0; i < count; i++) {
        const date = new Date(time);
        const formattedDate = date.toISOString().split("T")[0];

        data.push({
          time: formattedDate,
          open: open,
          high: high,
          low: low,
          close: close,
        });

        // Simulate price changes
        const change = (Math.random() - 0.5) * 10;
        open = close;
        close = Math.max(0, open + change);
        high = Math.max(open, close) + Math.random() * 5;
        low = Math.min(open, close) - Math.random() * 5;

        // Move to next day
        time += 24 * 60 * 60 * 1000;
      }

      return data;
    };

    const moreData = generateData(1000);

    candlestickSeries.setData(moreData);

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
