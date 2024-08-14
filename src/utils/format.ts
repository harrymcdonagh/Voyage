import { format, parseISO } from "date-fns";

export function formatDate(isoString: string): string {
  const date = parseISO(isoString);
  return format(date, "MMMM dd, yyyy, hh:mm:ss a 'UTC'");
}

export const formatPrice = (price: number) => {
  let decimals;

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

  return price.toFixed(decimals);
};
