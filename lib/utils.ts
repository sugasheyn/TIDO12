import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe number formatting utilities to prevent toLocaleString errors
export function safeNumberFormat(value: number | undefined | null, fallback: string = '0'): string {
  if (value === undefined || value === null || isNaN(value)) {
    return fallback
  }
  try {
    return value.toLocaleString()
  } catch (error) {
    console.warn('Error formatting number:', error)
    return fallback
  }
}

export function safeDateFormat(date: Date | string | undefined | null, options?: Intl.DateTimeFormatOptions, fallback: string = 'Unknown'): string {
  if (!date) {
    return fallback
  }
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return fallback
    }
    return dateObj.toLocaleString(undefined, options)
  } catch (error) {
    console.warn('Error formatting date:', error)
    return fallback
  }
}

export function safeTimeFormat(date: Date | string | undefined | null, fallback: string = 'Unknown'): string {
  if (!date) {
    return fallback
  }
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return fallback
    }
    return dateObj.toLocaleTimeString()
  } catch (error) {
    console.warn('Error formatting time:', error)
    return fallback
  }
}

export function safeDateOnlyFormat(date: Date | string | undefined | null, fallback: string = 'Unknown'): string {
  if (!date) {
    return fallback
  }
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return fallback
    }
    return dateObj.toLocaleDateString()
  } catch (error) {
    console.warn('Error formatting date only:', error)
    return fallback
  }
}
