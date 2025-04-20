import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAuthorId(authorKey: string) {
  const authorId = authorKey.split('/').pop();
  console.log(`authorId: ${authorId}`)
  return authorId
}