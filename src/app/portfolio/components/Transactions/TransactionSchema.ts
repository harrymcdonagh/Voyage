import { z } from "zod";

export const TransactionSchema = z.object({
    userId: z.string(),
    id: z.string(),
    name: z.string(),
    amount: z.number(),
    price: z.number(),
    symbol: z.string(),
    value: z.number(),
    date: z.string(),
    type: z.enum(["BUY", "SELL"]),
  });
  
  export type Transaction = z.infer<typeof TransactionSchema>;