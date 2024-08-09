"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";

export const TransactionSchema = z.object({
  userId: z.string(),
  id: z.string(),
  coinAmount: z.number(),
  coinName: z.string(),
  coinSymbol: z.string(),
  coinPrice: z.number(),
  transactionValue: z.number(),
  transactionDate: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const Columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "coinName",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.coinName} ({row.original.coinSymbol})
        </span>
      );
    },
  },
  {
    accessorKey: "coinAmount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.coinAmount} {row.original.coinSymbol}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => {
      return <span>${row.original.coinPrice}</span>;
    },
  },
  {
    accessorKey: "transactionValue",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Value <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <span>${row.original.transactionValue}</span>;
    },
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => <Button variant="outline">Edit</Button>,
  },
];
