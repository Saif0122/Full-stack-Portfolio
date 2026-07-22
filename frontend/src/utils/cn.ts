import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely
 * Resolves conflicts when applying conditional classes via CVA
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
