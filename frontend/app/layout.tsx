import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { AppProvider } from '@/components/app-provider'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'GurujiforPooja — Your Faith, Our Responsibility',
  description:
    'Book experienced, learned pandits for every pooja and ceremony. Authentic Vedic rituals performed with devotion at your doorstep. Weddings, Griha Pravesh, Satyanarayan Pooja, Rudra Abhishek and more.',
  generator: 'v0.app',
  keywords: ['pooja', 'pandit', 'pooja booking', 'havan', 'satyanarayan', 'griha pravesh', 'vedic rituals'],
  icons: {
    icon: [
      { url: '/icon.svg' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFDF9' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
