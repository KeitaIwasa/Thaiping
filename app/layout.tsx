import type {Metadata, Viewport} from 'next';
import { Noto_Sans_Thai, Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css'; // Global styles

const googleSans = localFont({
  src: '../public/fonts/GoogleSans-Regular.ttf',
  variable: '--font-google-sans',
});

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-jp' });
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-noto-thai' });

export const metadata: Metadata = {
  title: 'Thaiping',
  description: 'Practice typing Thai phrases',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: '#2D2A4A',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} ${notoSansJP.variable} ${notoSansThai.variable} font-sans`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
