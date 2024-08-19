"use client";

import { createChart, ColorType } from "lightweight-charts";
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

    candlestickSeries.setData([
      {
        time: "2018-10-19",
        open: 180.34,
        high: 180.99,
        low: 178.57,
        close: 179.85,
      },
      {
        time: "2018-10-20",
        open: 179.85,
        high: 180.45,
        low: 178.92,
        close: 179.55,
      },
      {
        time: "2018-10-21",
        open: 179.55,
        high: 180.12,
        low: 178.75,
        close: 179.25,
      },
      {
        time: "2018-10-22",
        open: 179.25,
        high: 180.05,
        low: 178.88,
        close: 179.95,
      },
    ]);

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
