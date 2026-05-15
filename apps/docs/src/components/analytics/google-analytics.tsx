'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// GA4 Measurement ID from environment
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Type for gtag function
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown> | undefined
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Google Analytics 4 Script Component
 * Loads gtag.js with optimized Next.js Script component
 */
export function GoogleAnalytics() {
  if (!GA_ID) {
    console.warn('[GA4] Measurement ID not configured. Set NEXT_PUBLIC_GA_ID in .env.local');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            cookie_flags: 'SameSite=None;Secure',
            cookie_expires: 63072000,
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  );
}

/**
 * Page View Tracker
 * Tracks page views on route changes in Next.js App Router
 */
function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('config', GA_ID, {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });

    // Debug log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA4] Page view: ${url}`);
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Page View Tracker with Suspense boundary
 * Required for useSearchParams hook
 */
export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
