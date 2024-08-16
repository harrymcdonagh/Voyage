import { Card } from "@/components/ui/card";
import { Coin } from "@/src/types/CoinSchema";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { formatPrice } from "@/src/utils/format";

interface Props {
  data: Coin[];
}

const TopLosers = ({ data }: Props) => {
  const topLosers = data
    .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
    .slice(0, 3);

  return (
    <Card className="w-full h-full shadow-lg rounded-xl dark:bg-slate-900 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">Top Losers 📉</div>
          </div>
        </div>
        <div className="space-y-4">
          {topLosers.map((coin) => (
            <div key={coin.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                  className="rounded-full h-10"
                  alt={coin.name}
                />
                <AvatarFallback>{coin.symbol.slice(0, 3)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="text-lg font-semibold">{coin.name}</div>
                <div className="text-muted-foreground text-sm">{coin.symbol}</div>
              </div>
              <div className="ml-auto grid gap-1 text-right">
                <div className="text-lg font-semibold">
                  ${formatPrice(coin.quote.USD.price)}
                </div>
                <div className="text-sm">
                  {(() => {
                    const pchange = parseFloat(
                      coin.quote.USD.percent_change_24h.toFixed(2)
                    );
                    if (pchange < 0) {
                      return <span className="text-red-500">{pchange}%</span>;
                    } else {
                      return <span className="text-green-500">+{pchange}%</span>;
                    }
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopLosers;
