import { Columns, Transaction } from "./components/Transactions/Columns";
import { TransactionTable } from "./components/Transactions/TransactionTable";

async function getTransactions(): Promise<Transaction[]> {
  return [
    {
      userId: "clzmoe77e0000gfzpeyzc57gj",
      id: "clzmoiqn40004gfzpxj9eayrp",
      coinName: "Bitcoin",
      coinAmount: 0.5,
      coinPrice: 63402,
      coinSymbol: "BTC",
      transactionValue: 31701,
      transactionDate: "2023-10-01T12:00:00.000Z",
    },
  ];
}

export default async function Portfolio() {
  const data = await getTransactions();
  return (
    <div className="container mx-auto">
      <TransactionTable columns={Columns} data={data} />
    </div>
  );
}
