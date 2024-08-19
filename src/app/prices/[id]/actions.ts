import { cmcAxios } from "@/src/lib/axios";

export async function getCoinData(coinId: string) {
  try {
    const response = await cmcAxios.get("/v2/cryptocurrency/quotes/latest", {
      params: { id: coinId },
    });
    return response.data.data[coinId];
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    return null;
  }
}

export async function getCoinMetadata(coinId: string) {
  try {
    const response = await cmcAxios.get("/v2/cryptocurrency/info", {
      params: { id: coinId },
    });
    return response.data.data[coinId];
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    return null;
  }
}
