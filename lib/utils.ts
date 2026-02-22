import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get years of experience based on a start date
export function getYearsOfExperience() {
  const start = new Date(2022, 9, 1); // October 2022 (month is 0-indexed)
  const now = new Date();
  const years = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
  return `${years}+`;
}