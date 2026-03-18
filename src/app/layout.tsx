import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: '--font-noto-sans-bengali',
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bengali',
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A1045',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Gazi Online - Enterprise Fintech Service Hub | Basirhat',
    template: '%s | Gazi Online'
  },
  description: 'Gazi Online provides fast PAN card services, banking, and utility bill payments in Basirhat. Get your PAN card in 3 days with Aadhaar verification.',
  keywords: ['PAN Card Basirhat', 'Banking Services Paikpara', 'Gazi Online', 'প্যান কার্ড বসিরহাট', 'আধার প্যান লিঙ্ক'],
  authors: [{ name: 'Gazi Online' }],
  creator: 'Gazi Online',
  publisher: 'Gazi Online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_IN',
    url: 'https://gazionline.com',
    siteName: 'Gazi Online',
    title: 'Gazi Online - Digital Service Infrastructure',
    description: 'Democratizing access to banking and government services for rural India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gazi Online - Fintech Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gazi Online - Enterprise Fintech Services',
    description: 'Fast, secure, and reliable digital services in Basirhat.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};


import { ThemeWrapper } from '@/components/ThemeWrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "LocalBusiness",
               "name": "Gazi Online",
               "image": "https://gazionline.com/logo.png",
               "@id": "https://gazionline.com",
               "url": "https://gazionline.com",
               "telephone": "+916295051584",
               "address": {
                 "@type": "PostalAddress",
                 "streetAddress": "শ্বেতপুর, নিউ হাজী মার্কেট, পাইকপাড়া",
                 "addressLocality": "বসিরহাট",
                 "addressRegion": "পশ্চিমবঙ্গ",
                 "postalCode": "743422",
                 "addressCountry": "IN"
               },
               "geo": {
                 "@type": "GeoCoordinates",
                 "latitude": "22.6726",
                 "longitude": "88.8792"
               },
               "openingHoursSpecification": {
                 "@type": "OpeningHoursSpecification",
                 "dayOfWeek": [
                   "Monday",
                   "Tuesday",
                   "Wednesday",
                   "Thursday",
                   "Friday",
                   "Saturday"
                 ],
                 "opens": "09:00",
                 "closes": "20:00"
               },
               "sameAs": [
                 "https://www.facebook.com/gazionline"
               ]
             }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansBengali.variable} ${notoSerifBengali.variable} antialiased font-sans transition-colors duration-300 relative`}
        style={{ color: 'var(--text-primary)' }}
      >
        <ThemeWrapper>
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}









