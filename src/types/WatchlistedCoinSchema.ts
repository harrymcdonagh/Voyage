import { z } from "zod";

export const CoinSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  id: z.string().min(1, "ID is required"),
  rank: z.number().min(1, "Rank must be greater than 0"),
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  price: z.number().min(0.000000001, "Price must be valid"),
  pchange: z.number().min(0.000000001, "percentage change must be valid"),
});

export type WatchlistCoin = z.infer<typeof CoinSchema>;
