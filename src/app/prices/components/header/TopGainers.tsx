import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const TopGainers = () => {
  return (
    <Card className="w-full h-full shadow-lg rounded-xl dark:bg-slate-900 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">Top Gainers 🔥</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Bitcoin"
              />
              <AvatarFallback>BTC</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Bitcoin</div>
              <div className="text-muted-foreground text-sm">BTC</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$56,789.00</div>
              <div className="text-sm text-green-500">+2.5%</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Ethereum"
              />
              <AvatarFallback>ETH</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Ethereum</div>
              <div className="text-muted-foreground text-sm">ETH</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$1,789.00</div>
              <div className="text-sm text-green-500">+1.8%</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Solana"
              />
              <AvatarFallback>SOL</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Solana</div>
              <div className="text-muted-foreground text-sm">SOL</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$34.50</div>
              <div className="text-sm text-green-500">+1.2%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopGainers;
