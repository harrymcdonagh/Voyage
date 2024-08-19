import { format, parseISO } from "date-fns";

export function formatDate(isoString: string): string {
  const date = parseISO(isoString);
  return format(date, "MMMM dd, yyyy, hh:mm:ss a 'UTC'");
}

export const formatPercentage = (percentage: number) => {
  return `${percentage.toFixed(2)}%`;
};

export const formatLargeNum = (largeNum: number) => {
  if (largeNum >= 1_000_000_000_000) {
    return `${(largeNum / 1_000_000_000_000).toFixed(2)}T`;
  } else if (largeNum >= 1_000_000_000) {
    return `${(largeNum / 1_000_000_000).toFixed(2)}B`;
  } else if (largeNum >= 1_000_000) {
    return `${(largeNum / 1_000_000).toFixed(2)}M`;
  } else {
    return `${largeNum}`;
  }
};

export const formatPrice = (price: number): string => {
  let decimals: number;

  if (price >= 1000) {
    decimals = 2;
  } else if (price >= 1) {
    decimals = 2;
  } else if (price >= 0.01) {
    decimals = 4;
  } else if (price >= 0.0001) {
    decimals = 6;
  } else {
    decimals = 8;
  }

  const formattedNumber = price.toFixed(decimals);
  const [integerPart, decimalPart] = formattedNumber.split(".");
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${integerWithCommas}.${decimalPart}` : integerWithCommas;
};

export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};
