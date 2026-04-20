import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vayu.design').replace(/\/$/, '');
const homeUrl = `${siteUrl}/`;
const homeTitle = 'Vayu UI by Vayu Design | AI Native UI Toolkit';
const homeDescription =
  'Free AI-native UI toolkit for developers and vibe coders with accessible React components, docs, CLI, and MCP tooling.';
const homeOgImage = `${siteUrl}/og/home`;

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  applicationName: 'Vayu UI',
  category: 'developer tools',
  alternates: {
    canonical: homeUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: homeUrl,
    siteName: 'Vayu UI',
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: homeOgImage,
        width: 1200,
        height: 630,
        alt: 'Vayu UI AI-native toolkit preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: [homeOgImage],
  },
};

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${homeUrl}#website`,
      url: homeUrl,
      name: 'Vayu UI',
      alternateName: ['Vayu Design', 'Vayu UI Toolkit'],
      description: homeDescription,
      inLanguage: 'en',
      publisher: {
        '@id': `${homeUrl}#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${homeUrl}#organization`,
      url: homeUrl,
      name: 'Vayu UI',
      alternateName: ['Vayu Design'],
      description: 'Open-source AI-native UI toolkit for React and Next.js developers.',
      sameAs: ['https://github.com/Rugved1652/vayu-ui'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${homeUrl}#software`,
      name: 'Vayu UI',
      alternateName: 'Vayu Design UI Toolkit',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'AI Native Toolkit',
      operatingSystem: 'Web',
      url: homeUrl,
      description: homeDescription,
      isAccessibleForFree: true,
      audience: {
        '@type': 'Audience',
        audienceType: 'Developers and vibe coders',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        url: homeUrl,
      },
      featureList: [
        '50+ accessible React components',
        '35+ reusable hooks',
        'CLI scaffolding for AI-native workflows',
        'MCP tooling for AI coding assistants',
        'Tailwind CSS v4 token-driven theming',
      ],
      creator: {
        '@id': `${homeUrl}#organization`,
      },
    },
  ],
} as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <LandingPage />
    </>
  );
}
