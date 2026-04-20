import { RootProvider } from 'fumadocs-ui/provider/next';
import { ToastProvider } from 'vayu-ui';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vayu.design'),
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
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <ToastProvider>{children}</ToastProvider>
        </RootProvider>
      </body>
    </html>
  );
}
