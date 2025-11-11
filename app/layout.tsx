import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// ✅ Metadata (only for SEO + manifest)
export const metadata: Metadata = {
  title: "Celebrating New Beginnings with Generali Center",
  description: "Take and share photos with Generali branding",
  manifest: "/manifest.json",
  generator: "v0.dev",
}

// ✅ Viewport config (moved out of metadata)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// ✅ Theme color config (moved out of metadata)
export const themeColor = "#ca140f"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
      </head>
      <body className={inter.className}>{children}
      <Analytics/>
      </body>
    </html>
  )
}
