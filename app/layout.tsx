import type React from "react"
import type { Metadata } from "next/font/google"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PosterGenie.ai - AI-Powered Poster Creation & Social Media Automation",
  description:
    "Create stunning posters and automate your social media with AI. Powered by GPT-4o and DALL·E for professional results in minutes.",
  keywords: "AI poster generator, social media automation, DALL-E, GPT-4o, poster creation, marketing automation",
  authors: [{ name: "PosterGenie.ai Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#ffffff",
              },
              style: {
                border: "1px solid #10B981",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#ffffff",
              },
              style: {
                border: "1px solid #EF4444",
              },
            },
            loading: {
              iconTheme: {
                primary: "#7C3AED",
                secondary: "#ffffff",
              },
              style: {
                border: "1px solid #7C3AED",
              },
            },
          }}
        />
      </body>
    </html>
  )
}
