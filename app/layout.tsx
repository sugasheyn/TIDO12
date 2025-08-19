import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "T1D AI Platform - Intelligent Diabetes Discovery",
  description: "Advanced AI-powered platform for discovering, analyzing, and connecting diabetes research, community insights, and real-time data from 150+ sources worldwide.",
  keywords: "diabetes, type 1 diabetes, AI, research, data analysis, machine learning, healthcare, medical research",
  authors: [{ name: "T1D AI Platform Team" }],
  openGraph: {
    title: "T1D AI Platform - Intelligent Diabetes Discovery",
    description: "Advanced AI-powered platform for discovering, analyzing, and connecting diabetes research, community insights, and real-time data from 150+ sources worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "T1D AI Platform - Intelligent Diabetes Discovery",
    description: "Advanced AI-powered platform for discovering, analyzing, and connecting diabetes research, community insights, and real-time data from 150+ sources worldwide.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
