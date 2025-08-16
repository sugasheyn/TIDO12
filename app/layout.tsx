import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { AuthProvider } from "@/components/auth/auth-provider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "T1D Discovery Hub - Your Personal Diabetes Research Platform",
  description:
    "Discover breakthrough insights, connect with the community, and optimize your Type 1 diabetes management with AI-powered research from 50,000+ global sources",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <EnhancedErrorBoundary>{children}</EnhancedErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  )
}
