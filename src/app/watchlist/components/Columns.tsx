"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import RemoveButton from "./RemoveButton";
import { WatchlistCoin } from "@/src/types/WatchlistedCoinSchema";
import Link from "next/link";
import { SlEye } from "react-icons/sl";

export const Columns: ColumnDef<WatchlistCoin>[] = [
  {
    accessorKey: "rank",
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
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => {
      return <span>${row.original.price}</span>;
    },
  },
  /* {
    accessorKey: "pchange",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
          24h% <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pchange = parseFloat(row.original.pchange.toString());
      if (pchange < 0) {
        return <span className="text-red-600">{pchange}%</span>;
      } else {
        return <span className="text-green-600">{pchange}%</span>;
      }
    },
  }, */
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
  {
    accessorKey: "remove",
    header: "Remove",
    cell: ({ row }) => {
      return <RemoveButton userId={row.original.userId} id={row.original.id} />;
    },
  },
];
