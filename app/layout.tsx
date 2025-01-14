import Link from 'next/link'
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from "next/font/local";
import SmoothScroll from '@/components/smoothScroll'
import LocalDate from '@/components/localDate'
import "./globals.css";

const jetBrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Regular.woff",
      weight: "400",
    },
  ],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Upcoming Rocket Launches",
  description: "Type effect example",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} select-none font-sans antialiased`}>
        <SmoothScroll>
          <SpeedInsights />
          <Analytics />
          <header className="flex flex-col md:flex-row w-full justify-between mb-8 md:mb-16 uppercase">
            <Link href="/"><h4>Upcoming space launches</h4></Link>
            <LocalDate format={{ weekday: 'long', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }} />
          </header>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
