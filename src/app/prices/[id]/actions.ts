import { cmcAxios, coinAxios } from "@/src/lib/axios";

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

const getYTD = () => {
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  return oneYearAgo.toISOString();
};

const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

export async function getCoinHistoricalData(symbol: string) {
  try {
    const response = await coinAxios.get(`/v1/exchangerate/${symbol}/USD/history`, {
      params: {
        period_id: "1DAY",
        time_start: getYTD(),
        time_end: getCurrentDate(),
        limit: 1000,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}
