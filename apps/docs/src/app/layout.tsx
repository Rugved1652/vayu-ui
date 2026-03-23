import { RootProvider } from 'fumadocs-ui/provider/next';
import { ToastProvider } from 'vayu-ui';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vayu-ui.dev'),
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
