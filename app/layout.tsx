import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { PlansProvider } from "@/context/plans-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Coursewala",
  description: "Premium courses designed to fast-track your career and maximize your earning potential.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <PlansProvider>
          {children}
          <Toaster />
        </PlansProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
