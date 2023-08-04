// Importing the "ClassValue" type and "clsx" function from "clsx" library
import { type ClassValue, clsx } from "clsx";
// Importing the "twMerge" function from "tailwind-merge" library
import { twMerge } from "tailwind-merge";

// Function to merge and apply Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  // Use "clsx" to merge the class names and objects into a single class string
  // Apply Tailwind CSS classes using "twMerge"
  return twMerge(clsx(inputs));
}

// Function to create an absolute URL
export function absoluteUrl(path: string) {
  // Combine the NEXT_PUBLIC_APP_URL environment variable with the provided relative path
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
