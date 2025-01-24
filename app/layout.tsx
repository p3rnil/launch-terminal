import Link from 'next/link'
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react'
import { JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next'
import SmoothScroll from '@/components/smoothScroll'
import LocalDate from '@/components/localDate'
import './globals.css';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'], // Puedes agregar más subsets si necesitas
  weight: ['400', '700'], // Especifica los pesos necesarios
  display: 'swap', // Usa swap para mejorar la carga
});

export const metadata: Metadata = {
  title: 'Upcoming Rocket Launches',
  description: 'Type effect example',
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang='en'>
      <body className={`${jetBrainsMono.className} select-none antialiased`}>
        <SmoothScroll>
          <SpeedInsights />
          <Analytics />
          <header className='flex flex-col md:flex-row w-full justify-between mb-8 md:mb-16 uppercase'>
            <Link href='/'><h4>Upcoming space launches</h4></Link>
            <LocalDate format={{ weekday: 'long', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }} />
          </header>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
