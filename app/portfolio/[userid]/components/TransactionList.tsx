"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { formatTransactionDate } from "@/utils/dateUtils";

interface Transaction {
  id: number;
  coinAmount: number;
  coinName: string;
  coinSymbol: string;
  coinPrice: number;
  transactionDate: string;
  transactionValue: number;
}

export default function TransactionList() {
  const { status, data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`/api/user/${session.user.id}/transactions`)
        .then((response) => {
          setTransactions(response.data);
          setLoading(false); // Set loading to false once data is fetched
          console.log(response.data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false); // Set loading to false if there's an error
        });
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [status, session]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error fetching transactions: {error}</div>;
  }

  if (!session) {
    return <div>Please log in to view your transactions.</div>;
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>View your recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div className="relative overflow-x-auto" key={transaction.id}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coin</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Type</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {transaction.coinName} ({transaction.coinSymbol})
                    </TableCell>
                    <TableCell>
                      {transaction.coinAmount} {transaction.coinSymbol}
                    </TableCell>
                    <TableCell>${transaction.transactionValue}</TableCell>
                    <TableCell>${transaction.coinPrice}</TableCell>
                    <TableCell>{formatTransactionDate(transaction.transactionDate)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">No transactions found.</div>
        )}
      </CardContent>
      <CardFooter className="px-7">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> transactions
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRightIcon className="w-4 h-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function ArrowDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ChevronLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function RepeatIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
