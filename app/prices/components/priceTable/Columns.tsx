"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Coin = {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  pchange: number;
};

export const Columns: ColumnDef<Coin>[] = [
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
  {
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
  },
  {
    accessorKey: "watchlist",
    header: "Watchlist",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "info",
    header: "Info",
  },
];
