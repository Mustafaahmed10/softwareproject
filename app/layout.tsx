// app/layout.tsx (Server Component)

import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react" // Import the SessionProvider
import "./globals.css" // This import is sufficient, no need to import it again below

const inter = Inter({ subsets: ["latin"] })

// Server-side metadata configuration
export const metadata: Metadata = {
  title: "Community Management System",
  description: "Manage your community properties, payments, and events",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
  session, // Session prop for the session data
}: Readonly<{ children: React.ReactNode; session: any }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap everything inside SessionProvider */}
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
