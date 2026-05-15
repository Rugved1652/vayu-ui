import { RootProvider } from 'fumadocs-ui/provider/next';
import { ToastProvider } from 'vayu-ui';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './global.css';
import { GoogleAnalytics, PageViewTracker } from '@/components/analytics/google-analytics';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vayu.design'),
  verification: {
    google: 'HBJdJN82gp-YsL0CNw8oe7zbW6gX-Ic8QEzDvhRtGYc',
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/icon?size=192', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/icon'],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col min-h-screen">
        <PageViewTracker />
        <RootProvider>
          <ToastProvider>{children}</ToastProvider>
        </RootProvider>
      </body>
    </html>
  );
}
