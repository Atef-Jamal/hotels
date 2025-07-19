import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchParamsToObject(searchParams: ReadonlyURLSearchParams) {
  const params = new URLSearchParams(searchParams);
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    if (result[key]) {
      // If the key already exists, convert to array or push to existing array
      result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
    } else {
      result[key] = value;
    }
  }
  return result;
}
