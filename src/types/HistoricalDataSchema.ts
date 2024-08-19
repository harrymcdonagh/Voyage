import { z } from "zod";

const CoinDataSchema = z.object({
  time_period_start: z.string(),
  time_period_end: z.string(),
  time_open: z.string(),
  time_close: z.string(),
  rate_open: z.number(),
  rate_high: z.number(),
  rate_low: z.number(),
  rate_close: z.number(),
});

export type CoinData = z.infer<typeof CoinDataSchema>;
