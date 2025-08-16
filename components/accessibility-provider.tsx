"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AccessibilityContextType {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: "normal" | "large" | "extra-large"
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  setFontSize: (size: "normal" | "large" | "extra-large") => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "extra-large">("normal")

  useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches

    setReducedMotion(prefersReducedMotion)
    setHighContrast(prefersHighContrast)

    // Apply classes to document
    document.documentElement.classList.toggle("high-contrast", highContrast)
    document.documentElement.classList.toggle("reduced-motion", reducedMotion)
    document.documentElement.classList.toggle("large-text", fontSize === "large")
    document.documentElement.classList.toggle("extra-large-text", fontSize === "extra-large")
  }, [highContrast, reducedMotion, fontSize])

  const toggleHighContrast = () => setHighContrast(!highContrast)
  const toggleReducedMotion = () => setReducedMotion(!reducedMotion)

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reducedMotion,
        fontSize,
        toggleHighContrast,
        toggleReducedMotion,
        setFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
