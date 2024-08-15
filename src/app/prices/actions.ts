"use server";
import { localAxios } from "@/src/lib/axios";

export async function addToWatchlist(userId: string | undefined, coinId: number) {
  try {
    const response = await localAxios.post(`/api/user/${userId}/watchlist`, {
      coinId: coinId,
    });
    console.log(`Added ${coinId} to watchlist`, response);
    return response.data;
  } catch (error) {
    console.error(`Error adding ${coinId} to watchlist`, error);
    throw error;
  }
}
