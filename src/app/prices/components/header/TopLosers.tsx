import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const TopLosers = () => {
  return (
    <Card className="w-full h-full shadow-lg rounded-xl dark:bg-slate-900 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">Top Losers 📉</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Dogecoin"
              />
              <AvatarFallback>DOGE</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Dogecoin</div>
              <div className="text-muted-foreground text-sm">DOGE</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$0.0721</div>
              <div className="text-sm text-red-500">-3.5%</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Cardano"
              />
              <AvatarFallback>ADA</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Cardano</div>
              <div className="text-muted-foreground text-sm">ADA</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$0.2789</div>
              <div className="text-sm text-red-500">-2.8%</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder-user.jpg"
                className="rounded-full h-10"
                alt="Polkadot"
              />
              <AvatarFallback>DOT</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-lg font-semibold">Polkadot</div>
              <div className="text-muted-foreground text-sm">DOT</div>
            </div>
            <div className="ml-auto grid gap-1 text-right">
              <div className="text-lg font-semibold">$4.50</div>
              <div className="text-sm text-red-500">-2.1%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopLosers;
