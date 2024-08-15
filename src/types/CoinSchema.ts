import { z } from "zod";

const QuoteCurrencySchema = z.object({
  price: z.number().min(0.000000001, "Price must be valid"),
  volume_24h: z.number().min(0, "Volume must be valid"),
  volume_change_24h: z.number().min(0, "Volume change must be valid"),
  percent_change_1h: z
    .number()
    .min(-100)
    .max(100, "Percent change must be between -100 and 100"),
  percent_change_24h: z
    .number()
    .min(-100)
    .max(100, "Percent change must be between -100 and 100"),
  percent_change_7d: z
    .number()
    .min(-100)
    .max(100, "Percent change must be between -100 and 100"),
  percent_change_30d: z
    .number()
    .min(-100)
    .max(100, "Percent change must be between -100 and 100"),
  market_cap: z.number().min(0, "Market cap must be valid"),
  market_cap_dominance: z.number().min(0, "Market cap dominance must be valid"),
  fully_diluted_market_cap: z.number().min(0, "Fully diluted market cap must be valid"),
  last_updated: z.string().min(1, "Last updated timestamp is required"),
});

const QuoteSchema = z.object({
  USD: QuoteCurrencySchema,
  BTC: QuoteCurrencySchema.optional(),
  ETH: QuoteCurrencySchema.optional(),
});

export const CoinSchema = z.object({
  id: z.number().min(1, "ID must be greater than 0"),
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  slug: z.string().min(1, "Slug is required"),
  cmc_rank: z.number().min(1, "Rank must be greater than 0"),
  num_market_pairs: z.number().min(0, "Number of market pairs must be valid"),
  circulating_supply: z.number().min(0, "Circulating supply must be valid"),
  total_supply: z.number().min(0, "Total supply must be valid"),
  max_supply: z.number().min(0, "Max supply must be valid").nullable(),
  infinite_supply: z.boolean(),
  last_updated: z.string().nonempty("Last updated timestamp is required"),
  date_added: z.string().nonempty("Date added timestamp is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  platform: z.string().nullable(),
  self_reported_circulating_supply: z
    .number()
    .min(0, "Self-reported circulating supply must be valid")
    .nullable(),
  self_reported_market_cap: z
    .number()
    .min(0, "Self-reported market cap must be valid")
    .nullable(),
  quote: QuoteSchema,
});

export type Coin = z.infer<typeof CoinSchema>;

export const DataResponseSchema = z.object({
  data: z.array(CoinSchema),
  status: z.object({
    timestamp: z.string().nonempty("Timestamp is required"),
    error_code: z.number().min(0, "Error code must be valid"),
    error_message: z.string().nullable(),
    elapsed: z.number().min(0, "Elapsed time must be valid"),
    credit_count: z.number().min(0, "Credit count must be valid"),
  }),
});

export type DataResponse = z.infer<typeof DataResponseSchema>;
