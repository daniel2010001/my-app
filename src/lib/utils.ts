import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObject(
  keys: readonly string[],
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && keys.every((key) => key in value);
}
