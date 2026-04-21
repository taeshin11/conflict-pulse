import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Conflict Pulse | Real-Time Intelligence',
    template: '%s | Conflict Pulse'
  },
  description: 'Live pulse monitoring of global conflict intensity, escalation trends, and active war zones',
  keywords: 'conflict pulse, war monitor, conflict escalation, global conflicts, war tracker',
  openGraph: {
    type: 'website',
    siteName: 'Conflict Pulse',
    title: 'Conflict Pulse | Real-Time Intelligence',
    description: 'Live pulse monitoring of global conflict intensity, escalation trends, and active war zones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conflict Pulse',
    description: 'Live pulse monitoring of global conflict intensity, escalation trends, and active war zones',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Conflict Pulse',
              url: 'https://conflict-pulse-omega.vercel.app',
              description: 'Live pulse monitoring of global conflict intensity, escalation trends, and active war zones',
              publisher: {
                '@type': 'Organization',
                name: 'Conflict Pulse',
                url: 'https://conflict-pulse-omega.vercel.app',
              },
            })
          }}
        />
      </head>
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
