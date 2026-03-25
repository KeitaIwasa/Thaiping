import type {Metadata} from 'next';
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
  title: 'Thai Typing Practice',
  description: 'Practice typing Thai phrases',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body className={`${googleSans.variable} ${notoSansJP.variable} ${notoSansThai.variable} font-sans`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
