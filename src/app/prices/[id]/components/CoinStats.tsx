import React from "react";
import { formatLargeNum, formatPrice } from "@/src/utils/format";
import { Coin } from "@/src/types/CoinSchema";

interface CoinStatsProps {
  data: Coin;
}

const CoinStats: React.FC<CoinStatsProps> = ({ data }) => (
  <div className="grid gap-4">
    <div>
      <div className="text-muted-foreground">Current Price</div>
      <div className="text-2xl font-bold">${formatPrice(data.quote.USD.price)}</div>
      <div className="text-muted-foreground">
        <span className="text-green-500">+2.5%</span> in the last 24 hours
      </div>
    </div>
    <div>
      <div className="text-muted-foreground">Market Cap</div>
      <div className="text-2xl font-bold">
        ${formatLargeNum(data.quote.USD.market_cap)}
      </div>
      <div className="text-muted-foreground">
        Ranked #{data.cmc_rank} by market capitalization
      </div>
    </div>
    <div>
      <div className="text-muted-foreground">Circulating Supply</div>
      <div className="text-2xl font-bold">
        {formatPrice(data.circulating_supply)} {data.symbol}
      </div>
      <div className="text-muted-foreground">
        Out of a total supply of {formatPrice(data.total_supply)} {data.symbol}
      </div>
    </div>
    <div>
      <div className="text-muted-foreground">Volume (24h)</div>
      <div className="text-2xl font-bold">
        ${formatLargeNum(data.quote.USD.volume_24h)}
      </div>
      <div className="text-muted-foreground">24-hour trading volume</div>
    </div>
  </div>
);

export default CoinStats;
