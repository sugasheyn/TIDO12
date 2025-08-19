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

// Safe storage utilities for Replit compatibility
export function safeLocalStorageGet(key: string, fallback: any = null): any {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    }
    return fallback
  } catch (error) {
    console.warn('localStorage access failed:', error)
    return fallback
  }
}

export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    }
    return false
  } catch (error) {
    console.warn('localStorage set failed:', error)
    return false
  }
}

export function safeSessionStorageGet(key: string, fallback: any = null): any {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    }
    return fallback
  } catch (error) {
    console.warn('sessionStorage access failed:', error)
    return fallback
  }
}

export function safeSessionStorageSet(key: string, value: any): boolean {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return true
    }
    return false
  } catch (error) {
    console.warn('sessionStorage set failed:', error)
    return false
  }
}
