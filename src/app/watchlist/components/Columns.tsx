"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { SlEye } from "react-icons/sl";
import { Coin } from "@/src/types/CoinSchema";
import { formatPrice } from "@/src/utils/format";

export const Columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "quote.USD.price",
    header: "Price ($)",
    cell: ({ row }) => {
      return <span>${formatPrice(row.original.quote.USD.price)}</span>;
    },
  },
  {
    accessorKey: "quote.USD.market_cap",
    header: "Market Cap ($)",
    cell: ({ row }) => {
      return <span>${formatPrice(row.original.quote.USD.market_cap)}</span>;
    },
  },
  {
    accessorKey: "quote.USD.volume_24h",
    header: "24h Volume ($)",
    cell: ({ row }) => {
      return <span>${formatPrice(row.original.quote.USD.volume_24h)}</span>;
    },
  },
  {
    accessorKey: "quote.USD.percent_change_24h",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          24h% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(
        row.original.quote.USD.percent_change_24h.toFixed(3).toString()
      );
      if (pchange < 0) {
        return <span className="text-red-500">{pchange}%</span>;
      } else {
        return <span className="text-green-500">{pchange}%</span>;
      }
    },
  },
  {
    accessorKey: "quote.USD.percent_change_7d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          7d% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(
        row.original.quote.USD.percent_change_7d.toFixed(3).toString()
      );
      if (pchange < 0) {
        return <span className="text-red-500">{pchange}%</span>;
      } else {
        return <span className="text-green-500">{pchange}%</span>;
      }
    },
  },
  {
    accessorKey: "quote.USD.percent_change_30d",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          30d% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(
        row.original.quote.USD.percent_change_30d.toFixed(3).toString()
      );
      if (pchange < 0) {
        return <span className="text-red-500">{pchange}%</span>;
      } else {
        return <span className="text-green-500">{pchange}%</span>;
      }
    },
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }) => {
      return (
        <Link className="flex justify-center" href={`/prices/${row.original.symbol}`}>
          <SlEye className="h-5 w-5" />
        </Link>
      );
    },
  },
];
