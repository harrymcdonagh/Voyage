import { z } from "zod";

export const CoinSchema = z.object({
    rank: z.number().min(1, "Rank must be greater than 0"),
    name: z.string().min(1, "Name is required"),
    symbol: z.string().min(1, "Symbol is required"),
    price: z.number().min(0.000000001, "Price must be valid"),
    pchange: z.number().min(0.000000001, "percentage change must be valid"),
  });
  
  export type Coin = z.infer<typeof CoinSchema>;