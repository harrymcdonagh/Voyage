"use server";
import { localAxios } from "@/src/lib/axios";

export async function addToWatchlist(userId: string | undefined, symbol: string) {
  const response = await localAxios.post(`/api/user/${userId}/watchlist`, {
    symbol: symbol,
  });
  console.log(`Added ${symbol} to watchlist`, response);
  return response.data;
}
