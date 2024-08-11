"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import RemoveButton from "./RemoveButton";
import { Transaction } from "./TransactionSchema";

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
    accessorKey: "edit-delete",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline">Edit</Button>
        <RemoveButton userId={row.original.userId} id={row.original.id} />
      </div>
    ),
  },
];
