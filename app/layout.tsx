import type { Metadata, Viewport } from "next";
import { Footer, Header } from "./shared/components/site-components";
import { AiAssistant } from "./shared/components/ai-assistant";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0077ED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.looksbay.com"),
  title: {
    default: "Looksbay — Premier Squarespace Design, Custom Code & Template Studio",
    template: "%s | Looksbay - Squarespace Studio",
  },
  description:
    "Looksbay Studio is a premier Squarespace Circle Platinum agency. We build bespoke 7.1 websites, engineer custom CSS/JS plugins, optimize Core Web Vitals to 90+ PageSpeed, and deliver luxury conversion-focused templates.",
  keywords: [
    "Squarespace web designer",
    "Squarespace custom developer",
    "Squarespace SEO expert",
    "premium Squarespace templates",
    "Squarespace 7.1 fluid engine",
    "Squarespace speed optimization",
    "hire Squarespace expert",
    "Squarespace CSS specialist",
    "WordPress to Squarespace migration",
    "Figma to Squarespace",
    "Squarespace Circle Partner",
    "Squarespace e-commerce agency",
  ],
  authors: [{ name: "Looksbay Studio", url: "https://www.looksbay.com" }],
  creator: "Looksbay Studio",
  publisher: "Looksbay Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.looksbay.com",
    siteName: "Looksbay Studio — Squarespace Specialists",
    title: "Looksbay — Premier Squarespace Design, Custom Code & Template Studio",
    description:
      "Bespoke Squarespace 7.1 websites, custom code plugins, 90+ PageSpeed technical SEO, and conversion-ready templates for ambitious brands.",
    images: [
      {
        url: "/looksbay-logo.png",
        width: 1200,
        height: 630,
        alt: "Looksbay Studio — Premier Squarespace Design, Custom Code & Template Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Looksbay — Premier Squarespace Design, Custom Code & Template Studio",
    description:
      "Bespoke Squarespace 7.1 websites, custom code plugins, 90+ PageSpeed technical SEO, and conversion-ready templates.",
    images: ["/looksbay-logo.png"],
    creator: "@looksbay",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.looksbay.com/#organization",
      name: "Looksbay Studio",
      alternateName: "Looksbay",
      url: "https://www.looksbay.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.looksbay.com/#logo",
        url: "https://www.looksbay.com/assets/favicon.png",
        caption: "Looksbay Studio Logo",
      },
      image: "https://www.looksbay.com/looksbay-logo.png",
      description:
        "Independent Squarespace Circle Platinum studio specializing in bespoke website design, custom CSS/JavaScript development, Core Web Vitals speed optimization, and premium 7.1 templates.",
      email: "hello@looksbay.com",
      priceRange: "$$$",
      sameAs: [
        "https://www.instagram.com/looksbay",
        "https://www.facebook.com/looksbay",
        "https://www.linkedin.com/company/looksbay",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Squarespace Design and Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bespoke Squarespace Web Design",
              description:
                "Custom Squarespace 7.1 websites crafted from Figma wireframes to high-converting Fluid Engine launch.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Code & Plugin Development",
              description:
                "Advanced CSS architecture, custom JavaScript animations, API integrations, and bespoke plugins for Squarespace.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical SEO & Speed Optimization",
              description:
                "Core Web Vitals tuning, structured schema markups, and guaranteed 90+ mobile PageSpeed scores.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Platform Migrations to Squarespace",
              description:
                "Zero-downtime migrations from WordPress, Wix, Webflow, and Shopify with 100% SEO ranking preservation.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Premium Squarespace 7.1 Templates",
              description:
                "Designer-grade, mobile-responsive Squarespace templates with instant transfer and optional 48-hour setup.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.looksbay.com/#website",
      url: "https://www.looksbay.com",
      name: "Looksbay",
      description: "Premier Squarespace Design, Custom Code & Template Studio",
      publisher: {
        "@id": "https://www.looksbay.com/#organization",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[94px] motion-reduce:scroll-auto">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-paper text-ink selection:bg-[#cce4ff] selection:text-[#1d1d1f]">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AiAssistant />
      </body>
    </html>
  );
}