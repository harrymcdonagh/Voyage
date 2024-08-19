import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface CoinHeaderProps {
  name: string;
  symbol: string;
  id: number;
}

const CoinHeader: React.FC<CoinHeaderProps> = ({ name, symbol, id }) => (
  <div className="flex items-center gap-4 mb-6">
    <Avatar>
      <AvatarImage
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
        className="rounded-full h-8"
        alt={name}
      />
      <AvatarFallback>{symbol}</AvatarFallback>
    </Avatar>
    <h1 className="text-4xl font-bold">{name}</h1>
  </div>
);

export default CoinHeader;
