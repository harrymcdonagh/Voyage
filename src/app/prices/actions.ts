"use server";
import { cmcAxios, fngAxios, localAxios } from "@/src/lib/axios";
import { Coin } from "@/src/types/CoinSchema";

export async function addToWatchlist(userId: string | undefined, coinId: number) {
  try {
    const response = await localAxios.post(`/api/user/${userId}/watchlist`, {
      coinId: coinId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding ${coinId} to watchlist`, error);
    throw error;
  }
}

export async function removeFromWatchlist(userId: string | undefined, coinId: number) {
  try {
    const response = await localAxios.delete(`/api/user/${userId}/watchlist/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing ${coinId} from watchlist`, error);
    throw error;
  }
}

export async function getWatchlisted(userId: string | undefined) {
  try {
    const response = await localAxios.get(`/api/user/${userId}/watchlist`);
    return response.data;
  } catch (error) {
    console.error(`Error getting watchlist`, error);
    throw error;
  }
}

export async function getFearAndGreed() {
  const response = await fngAxios.get("");
  const data = response.data;
  return data.data[0];
}

export async function getPrices(): Promise<Coin[]> {
  const response = await cmcAxios.get(`/v1/cryptocurrency/listings/latest`);
  return response.data.data;
}
