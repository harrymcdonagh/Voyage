"use client";

import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";

export const TransactionSchema = z.object({
  userId: z.string(),
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  price: z.number(),
  symbol: z.string(),
  value: z.number(),
  date: z.string(),
  type: z.enum(["BUY", "SELL"]),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const Columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.name} ({row.original.symbol})
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.amount} {row.original.symbol}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => {
      return <span>${row.original.price}</span>;
    },
  },
  {
    accessorKey: "value",
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
      return <span>${row.original.value}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => <Button variant="outline">Edit</Button>,
  },
];
