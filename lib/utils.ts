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
      result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
    } else {
      result[key] = value;
    }
  }
  return result;
}

export const updateURLSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  argue: (
    | { actionType: "set" | "append"; key: string; value: string }
    | { actionType: "delete"; key: string; value?: string }
  )[],
) => {
  const params = new URLSearchParams(searchParams.toString());
  argue.forEach((item) => {
    if (item.actionType === "set") {
      params.set(item.key, item.value);
    }
    if (item.actionType === "append") {
      params.append(item.key, item.value);
    }
    if (item.actionType === "delete") {
      params.delete(item.key, item.value);
    }
  });
  return params.toString();
};
