import axios from "axios";

const localAxios = axios.create({
  baseURL: process.env.DEV_URL,
});

const cmcAxios = axios.create({
  baseURL: process.env.CMC_URL,
});

cmcAxios.interceptors.request.use(
  (config) => {
    config.url += `?CMC_PRO_API_KEY=${process.env.CMC_API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const coinAxios = axios.create({
  baseURL: process.env.COIN_URL,
});

coinAxios.interceptors.request.use(
  (config) => {
    config.url += `/apikey-${process.env.COIN_API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fngAxios = axios.create({
  baseURL: process.env.FNG_URL,
});

export { localAxios, cmcAxios, coinAxios, fngAxios };
