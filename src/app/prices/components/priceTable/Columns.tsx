"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CiStar } from "react-icons/ci";
import Link from "next/link";
import { SlEye } from "react-icons/sl";
import { Coin } from "@/src/types/CoinSchema";

export const Columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "cmc_rank",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
          Rank <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
      return <span>${row.original.quote.USD.price}</span>;
    },
  },
  {
    accessorKey: "quote.USD.percent_change_24h",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
          24h% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(row.original.quote.USD.percent_change_24h.toString());
      if (pchange < 0) {
        return <span className="text-red-600">{pchange}%</span>;
      } else {
        return <span className="text-green-600">{pchange}%</span>;
      }
    },
  },
  {
    accessorKey: "watchlist",
    header: "Watchlist",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CiStar className="h-5 w-5" />
      </div>
    ),
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
