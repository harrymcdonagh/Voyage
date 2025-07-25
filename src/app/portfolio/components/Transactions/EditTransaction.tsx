"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { localAxios } from "@/src/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen } from "lucide-react"; // swapped in pen icon

interface CryptoData {
  id: string;
  name: string;
  amount: number;
  price: number;
  symbol: string;
  date: string;
  type: "BUY" | "SELL";
}

interface EditTransactionProps {
  userId?: string;
  transaction: CryptoData;
  onUpdated?: (updated: CryptoData) => void;
}

export default function EditTransaction({
  userId,
  transaction,
  onUpdated,
}: EditTransactionProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<CryptoData, "id">>({
    name: "",
    amount: 0,
    price: 0,
    symbol: "",
    date: new Date().toISOString().slice(0, 16),
    type: "BUY",
  });

  useEffect(() => {
    if (open && transaction) {
      setFormData({
        name: transaction.name,
        amount: transaction.amount,
        price: transaction.price,
        symbol: transaction.symbol,
        date: new Date(transaction.date).toISOString().slice(0, 16),
        type: transaction.type,
      });
    }
  }, [open, transaction]);

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    try {
      const { data: updated } = await localAxios.put<CryptoData>(
        `/api/user/${userId}/transactions/${transaction.id}`,
        payload
      );
      onUpdated && onUpdated(updated);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Update the details of your cryptocurrency transaction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* …form fields pre-filled exactly like AddTransaction… */}
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            {/* Symbol */}
            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) =>
                  handleInputChange("symbol", e.target.value.toUpperCase())
                }
                required
              />
            </div>
            {/* Amount & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="any"
                  value={formData.amount}
                  onChange={(e) =>
                    handleInputChange("amount", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="any"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
            </div>
            {/* Type */}
            <div className="grid gap-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "BUY" | "SELL") =>
                  handleInputChange("type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Date */}
            <div className="grid gap-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
