import { Coin, Columns } from "./Columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Coin[]> {
  // Fetch data from your API here.
  return [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 27000.0,
      pchange: 6.0,
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 1800.0,
      pchange: 5.0,
    },
    {
      rank: 3,
      name: "Ripple",
      symbol: "XRP",
      price: 0.5,
      pchange: -5.0,
    },
    {
      rank: 4,
      name: "Litecoin",
      symbol: "LTC",
      price: 100.0,
      pchange: 5.0,
    },
    {
      rank: 5,
      name: "Cardano",
      symbol: "ADA",
      price: 0.3,
      pchange: -5.0,
    },
    {
      rank: 6,
      name: "Polkadot",
      symbol: "DOT",
      price: 5.0,
      pchange: 5.0,
    },
    {
      rank: 7,
      name: "Chainlink",
      symbol: "LINK",
      price: 8.0,
      pchange: -5.0,
    },
    {
      rank: 8,
      name: "Stellar",
      symbol: "XLM",
      price: 0.09,
      pchange: 3.0,
    },
    {
      rank: 9,
      name: "Bitcoin Cash",
      symbol: "BCH",
      price: 300.0,
      pchange: 2.0,
    },
    {
      rank: 10,
      name: "Solana",
      symbol: "SOL",
      price: 25.0,
      pchange: 10.0,
    },
    {
      rank: 11,
      name: "Dogecoin",
      symbol: "DOGE",
      price: 0.07,
      pchange: 7.0,
    },
    {
      rank: 12,
      name: "Avalanche",
      symbol: "AVAX",
      price: 15.0,
      pchange: -3.0,
    },
    {
      rank: 13,
      name: "Shiba Inu",
      symbol: "SHIB",
      price: 0.000007,
      pchange: 12,
    },
    {
      rank: 14,
      name: "Polygon",
      symbol: "MATIC",
      price: 0.9,
      pchange: -4.0,
    },
    {
      rank: 15,
      name: "VeChain",
      symbol: "VET",
      price: 0.02,
      pchange: 1.0,
    },
    {
      rank: 16,
      name: "Uniswap",
      symbol: "UNI",
      price: 6.0,
      pchange: 0.0,
    },
    {
      rank: 17,
      name: "Cosmos",
      symbol: "ATOM",
      price: 12.0,
      pchange: 4.0,
    },
    {
      rank: 18,
      name: "Tron",
      symbol: "TRX",
      price: 0.08,
      pchange: 2.0,
    },
    {
      rank: 19,
      name: "Monero",
      symbol: "XMR",
      price: 150.0,
      pchange: -1.0,
    },
    {
      rank: 20,
      name: "Tezos",
      symbol: "XTZ",
      price: 3.0,
      pchange: 3.0,
    },
  ];
}

export default async function PricePage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-4xl font-bold text-center mb-5">Today's Prices</h1>
      <DataTable columns={Columns} data={data} />
    </div>
  );
}
