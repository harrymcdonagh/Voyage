"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import RemoveButton from "./RemoveButton";
import EditTransaction from "./EditTransaction";
import { Transaction } from "../../../../types/TransactionSchema";
import { formatPrice, formatDate } from "@/src/utils/format";

export const getColumns = (mutate: () => void): ColumnDef<Transaction>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.name} ({row.original.symbol})
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span>
        {row.original.amount} {row.original.symbol}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => <span>${formatPrice(row.original.price)}</span>,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Value <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>${formatPrice(row.original.value)}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
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
        <EditTransaction
          userId={row.original.userId}
          transaction={row.original}
          mutate={mutate}
        />
        <RemoveButton
          userId={row.original.userId}
          id={row.original.id}
          mutate={mutate}
        />
      </div>
    ),
  },
];
