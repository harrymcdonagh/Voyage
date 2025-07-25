"use client";

import type React from "react";
import { useState } from "react";
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
import { Plus } from "lucide-react";

interface AddTransactionProps {
  userId: string | undefined;
  mutate: () => void;
}

interface CryptoData {
  name: string;
  amount: number;
  price: number;
  symbol: string;
  date: string;
  type: "BUY" | "SELL";
}

export default function AddTransaction({ userId, mutate }: AddTransactionProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CryptoData>({
    name: "",
    amount: 0,
    price: 0,
    symbol: "",
    date: new Date().toISOString().slice(0, 16),
    type: "BUY",
  });

  const handleInputChange = (field: keyof CryptoData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    console.log("Submitting crypto data:", dataToSubmit);

    try {
      await localAxios.post(`/api/user/${userId}/transactions`, dataToSubmit);
      mutate();
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }

    setFormData({
      name: "",
      amount: 0,
      price: 0,
      symbol: "",
      date: new Date().toISOString().slice(0, 16),
      type: "BUY",
    });
    setOpen(false);
  };

  return (
    <div className="p-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Cryptocurrency Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of your cryptocurrency transaction below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Bitcoin"
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
                  placeholder="e.g., BTC"
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
                    placeholder="1.5"
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
                    placeholder="45000"
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
                    <SelectValue placeholder="Select type" />
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
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
