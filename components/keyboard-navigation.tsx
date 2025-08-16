"use client"

import { useEffect } from "react"

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip navigation shortcuts
      if (event.altKey && event.key >= "1" && event.key <= "9") {
        event.preventDefault()
        const tabIndex = Number.parseInt(event.key) - 1
        const tabs = document.querySelectorAll('[role="tab"]')
        if (tabs[tabIndex]) {
          ;(tabs[tabIndex] as HTMLElement)
            .click()(tabs[tabIndex] as HTMLElement)
            .focus()
        }
      }

      // Search shortcut
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }

      // Help shortcut
      if (event.key === "?" && !event.ctrlKey && !event.metaKey) {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement.tagName !== "INPUT" && activeElement.tagName !== "TEXTAREA") {
          event.preventDefault()
          console.log("[v0] Keyboard shortcuts: Alt+1-9 (tabs), Ctrl+K (search), ? (help)")
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}
