import { z } from "zod";

export const TransactionSchema = z.object({
    userId: z.string(),
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    amount: z.number().min(1, "Amount must be greater than 0"),
    price: z.number().min(0.000000001, "Price must be vaiid"),
    symbol: z.string().min(1, "Symbol is required"),
    value: z.number().min(0.000000001, "Value must be valid"),
    date: z.string().min(1, "Date is required"),
    type: z.enum(["BUY", "SELL"]),
  });
  
  export type Transaction = z.infer<typeof TransactionSchema>;