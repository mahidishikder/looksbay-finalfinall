import type { Metadata } from "next";
import Link from "next/link";
import TemplateMarketplace from "./components/template-marketplace";
import TrustBanner from "./components/trust-banner";
import { TestimonialsSection } from "@/app/(home)/components";
import { NewsletterCTA } from "@/app/shared/components/site-components";
import { allTemplates } from "@/app/shared/data/templates-data";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  PlayCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  Layers,
  Smartphone,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best Premium Squarespace 7.1 Templates — Fluid Engine Shop",
  description:
    "Buy premium Squarespace 7.1 templates built on Fluid Engine. Designer-grade websites for photographers, coaches, creative studios, and e-commerce with instant transfer.",
  keywords: [
    "best squarespace templates",
    "premium squarespace templates",
    "squarespace 7.1 templates",
    "fluid engine templates",
    "modern squarespace templates for small business",
    "luxury squarespace templates",
    "squarespace portfolio templates",
    "ecommerce squarespace templates",
    "buy squarespace templates",
    "squarespace template shop",
    "buy squarespace template instant transfer",
    "squarespace templates for photographers",
    "squarespace templates for coaches",
    "creative studio squarespace templates",
    "squarespace templates etsy alternative",
    "squarespace template installation service",
    "squarespace landing page templates",
    "mobile responsive squarespace templates",
    "dark mode squarespace template",
    "minimal clean aesthetic squarespace templates",
  ],
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "Premium Squarespace 7.1 Templates Shop | Looksbay Studio",
    description:
      "Modern, luxury Squarespace templates built for high conversions. Instant automated transfer, video tutorials, and optional 48-hour setup.",
    url: "https://www.looksbay.com/templates",
    type: "website",
    images: [
      {
        url: "/images/service-templates.jpg",
        width: 1200,
        height: 630,
        alt: "Looksbay Premium Squarespace Templates Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Premium Squarespace 7.1 Templates | Looksbay Studio",
    description:
      "Handcrafted Squarespace 7.1 templates built on Fluid Engine for ambitious creators.",
    images: ["/images/service-templates.jpg"],
  },
};

// CollectionPage + ItemList Schema Markups
const templateCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.looksbay.com/templates#collection",
  name: "Premium Squarespace 7.1 Templates Collection",
  description:
    "Curated collection of high-converting Squarespace 7.1 Fluid Engine templates for creative entrepreneurs, consultants, photographers, and luxury boutiques.",
  url: "https://www.looksbay.com/templates",
  provider: {
    "@type": "Organization",
    name: "Looksbay Studio",
    url: "https://www.looksbay.com",
    logo: "https://www.looksbay.com/assets/favicon.png",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allTemplates.length,
    itemListElement: allTemplates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `https://www.looksbay.com/templates/${template.slug}#product`,
        name: `${template.name} — Squarespace 7.1 Template`,
        description: template.description,
        image: template.image,
        url: `https://www.looksbay.com/templates/${template.slug}`,
        category: template.categories.join(", "),
        brand: {
          "@type": "Brand",
          name: "Looksbay Studio",
        },
        offers: {
          "@type": "Offer",
          price: template.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://www.looksbay.com/templates/${template.slug}`,
          seller: {
            "@type": "Organization",
            name: "Looksbay Studio",
          },
        },
      },
    })),
  },
};

const transferSteps = [
  {
    step: "01",
    title: "Instant Transfer to Your Account",
    description:
      "Within 10 minutes of purchase, you receive an official Squarespace collaborator invite to your brand-new, pre-built 7.1 site.",
  },
  {
    step: "02",
    title: "Step-by-Step Video Walkthroughs",
    description:
      "Access our dedicated library of bite-sized video tutorials. Swap images, adjust color palettes, and edit typography with zero coding.",
  },
  {
    step: "03",
    title: "Launch & Enjoy 6-Month Free Trial",
    description:
      "As a Squarespace Circle partner perk, you get an extended 6-month free trial (instead of 14 days) plus 20% off your annual plan.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="w-full bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateCollectionSchema) }}
      />

      {/* Main Semantic Header */}
      <section className="border-b border-black/[0.06] bg-[#F5F5F7] px-6 pt-16 tablet:pt-24 desktop:pt-[110px] pb-14 tablet:pb-20 desktop:pb-[90px] text-center">
        <div className="mx-auto max-w-[880px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0077ED]/20 bg-[#0077ED]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0077ED] mb-4">
            <Sparkles size={13} />
            Squarespace 7.1 Fluid Engine Collection
          </span>

          <h1 className="text-[clamp(32px,4.5vw,58px)] font-black tracking-[-0.03em] text-[#1D1D1F] leading-[1.08] uppercase">
            Best Premium Squarespace Templates{" "}
            <span className="apple-gradient-heading block mt-2">
              Engineered For Conversions
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[620px] text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            Thoughtfully crafted for photographers, coaches, creative studios, and boutique brands.
            Launch a world-class website in days with instant automated transfer.
          </p>

          {/* Key Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-xs border border-black/[0.06]">
              <Layers size={13} className="text-[#0077ED]" />
              Fluid Engine Drag-and-Drop
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-xs border border-black/[0.06]">
              <Smartphone size={13} className="text-[#0077ED]" />
              100% Mobile Responsive
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-xs border border-black/[0.06]">
              <PlayCircle size={13} className="text-[#0077ED]" />
              Video Tutorials Included
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-xs border border-black/[0.06]">
              <ShieldCheck size={13} className="text-[#0077ED]" />
              6-Month Free Trial + 20% Off
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Component */}
      <TemplateMarketplace />

      {/* 3-Step Instant Transfer Workflow */}
      <section className="border-y border-black/[0.06] bg-[#FBFBFC] py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[720px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Frictionless Setup Experience
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,46px)] font-black tracking-tight text-[#1D1D1F]">
              How The Template Transfer Works
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#6E6E73]">
              No complicated developer handoffs. Your complete website is transferred into your own
              Squarespace account ready for content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transferSteps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <span className="text-4xl font-black text-[#0077ED]/25 block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* 48-Hour Installation Callout Card */}
          <div className="mt-14 rounded-2xl border border-[#0077ED]/20 bg-gradient-to-r from-[#EBF4FF] to-[#F5F8FF] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="max-w-[620px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ED] shadow-xs mb-3">
                <Clock size={13} />
                Need It Done For You?
              </span>
              <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                48-Hour White-Glove Template Setup Service
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#515154] leading-relaxed">
                Short on time? Let our studio team install your chosen template, customize your colors,
                upload your typography, and launch your pages in just two business days.
              </p>
            </div>
            <Link
              href="/services/template-setup"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0077ED] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0062C4]"
            >
              <span>Explore 48h Setup</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <TrustBanner />
      <TestimonialsSection />
      <NewsletterCTA />
    </div>
  );
}
