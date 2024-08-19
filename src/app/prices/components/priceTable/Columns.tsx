"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { SlEye } from "react-icons/sl";
import { Coin } from "@/src/types/CoinSchema";
import WatchlistButton from "./WatchlistButton";
import { formatPrice } from "@/src/utils/format";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export const Columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "cmc_rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Rank <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.original.id}.png`}
              className="rounded-full h-8"
              alt={row.original.name}
            />
            <AvatarFallback>{row.original.symbol}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center max-w-[150px] whitespace-normal break-words">
          {row.original.name}
        </div>
      );
    },
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
    accessorKey: "quote.USD.percent_change_1h",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          1h% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(
        row.original.quote.USD.percent_change_1h.toFixed(3).toString()
      );
      if (pchange < 0) {
        return <span className="text-red-500">{pchange}%</span>;
      } else {
        return <span className="text-green-500">{pchange}%</span>;
      }
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
    accessorKey: "watchlist",
    header: "Watchlist",
    cell: ({ row }) => <WatchlistButton coinId={row.original.id} />,
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }) => {
      return (
        <Link className="flex justify-center" href={`/prices/${row.original.id}`}>
          <SlEye className="h-5 w-5" />
        </Link>
      );
    },
  },
];
