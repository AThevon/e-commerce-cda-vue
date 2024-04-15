import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatPrice(
   price: number,
   locale: string = "en-US",
   currency: string = "USD"
): string {
   const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
   });

   return formatter.format(price);
}
