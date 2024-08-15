import { cmcAxios, localAxios } from "@/src/lib/axios";

async function getWatchlistCoinData(coinIds: number[]) {
  try {
    const ids = coinIds.join(",");
    const response = await cmcAxios.get("/v2/cryptocurrency/quotes/latest", {
      params: { id: ids },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for ${coinIds}:`, error);
    return null;
  }
}

async function getWatchlist(userId: string | undefined) {
  const response = await localAxios.get(`/api/user/${userId}/watchlist`);
  return response.data;
}

export async function getWatchlistData(userId: string | undefined) {
  const watchlist = await getWatchlist(userId);
  const coinIds = watchlist.map((coin: { coinId: number }) => coin.coinId);

  const coinData = await getWatchlistCoinData(coinIds);

  if (!coinData) {
    console.warn("No data returned for the coinIds");
    return [];
  }

  // Convert the response into an array of coin details
  const detailedData = Object.values(coinData);

  return detailedData;
}
