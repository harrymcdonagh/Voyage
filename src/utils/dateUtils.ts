import { format, parseISO } from 'date-fns';

export function formatTransactionDate(isoString: string): string {
  const date = parseISO(isoString);
  return format(date, "MMMM dd, yyyy, hh:mm:ss a 'UTC'");
}