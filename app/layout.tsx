// app/layout.tsx (Server Component)
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Inter } from "next/font/google";
import Providers from "@/app/providers"; // Import the client-only Providers component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Server-side metadata configuration
export const metadata: Metadata = {
  title: "Community Management System",
  description: "Manage your community properties, payments, and events",
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
  session, // Session prop for the session data
}: Readonly<{ children: React.ReactNode; session: any }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap the children inside the Providers component */}
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
