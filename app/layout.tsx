import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "🚨 ¡FELICIDADES! Pero Descubrimos Algo CHOCANTE Sobre Tu Futuro...",
  description: "Protocolo de Dominancia Emocional - El método secreto que convierte atracción en OBSESIÓN",
  generator: "v0.app",
  robots: "noindex, nofollow",
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans ${inter.variable} antialiased`}>
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA4_ID" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA4_ID');
          `}
        </Script>

        {/* Hotmart Checkout */}
        <Script src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js" strategy="afterInteractive" />

        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
