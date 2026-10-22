import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Building2,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { industriesData, type IndustryData } from "@/app/shared/data/industries-data";
import { NewsletterCTA } from "@/app/shared/components/site-components";

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    industry: ind.slug,
  }));
}

function getIndustry(slug: string): IndustryData | undefined {
  return industriesData.find((ind) => ind.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return { title: "Industry Solution Not Found | Looksbay Studio" };
  }

  return {
    title: `${industry.title} | Looksbay Studio`,
    description: industry.heroSubheadline,
    keywords: industry.primaryKeywords,
    alternates: {
      canonical: `/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.title} — Looksbay Studio`,
      description: industry.tagline,
      url: `https://www.looksbay.com/industries/${industry.slug}`,
      type: "website",
      images: [
        {
          url: "/images/service-custom-design.jpg",
          width: 1200,
          height: 630,
          alt: `${industry.title} by Looksbay Studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | Looksbay Studio`,
      description: industry.tagline,
      images: ["/images/service-custom-design.jpg"],
    },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.looksbay.com/industries/${industry.slug}#service`,
    name: industry.title,
    serviceType: "Specialized Web Design",
    description: industry.heroSubheadline,
    provider: {
      "@type": "Organization",
      name: "Looksbay Studio",
      url: "https://www.looksbay.com",
      logo: "https://www.looksbay.com/assets/favicon.png",
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: industry.startingPrice.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://www.looksbay.com/industries/${industry.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full bg-[#fbfbfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-gradient-to-b from-white via-[#f7f9fe] to-[#fbfbfd] px-6 pt-20 pb-16 tablet:pt-28 tablet:pb-24">
        <div className="site-container relative z-10 max-w-[1020px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0077ED]/20 bg-[#0077ED]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0077ED] mb-6">
            <Building2 size={13} />
            Tailored Industry Solution · {industry.name}
          </div>

          <h1 className="text-[clamp(32px,4.5vw,60px)] font-black tracking-[-0.035em] text-[#1D1D1F] leading-[1.08] uppercase">
            {industry.heroHeadline}
          </h1>

          <p className="mx-auto mt-6 max-w-[760px] text-lg sm:text-xl text-[#515154] leading-relaxed">
            {industry.heroSubheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?project=${encodeURIComponent(industry.name)}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#0062C4] hover:shadow-lg active:scale-95"
            >
              <span>Book Strategy Call</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-4 text-base font-semibold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
            >
              <span>All Industries</span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-black/[0.06] pt-8 text-xs font-semibold text-[#86868B]">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#0077ED]" />
              Timeline: {industry.estimatedTimeline}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#0077ED]" />
              Investment: {industry.startingPrice}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0077ED]" />
              Squarespace 7.1 Fluid Engine
            </span>
          </div>
        </div>
      </section>

      {/* Solutions & Architecture */}
      <section className="py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[720px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Engineered For Results
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              How Looksbay Solves {industry.name} Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.solutionsProvided.map((sol, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-black/[0.08] bg-white p-8 shadow-sm transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-[#0077ED]/25 block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{sol.title}</h3>
                  <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix & Integrations */}
      <section className="border-y border-black/[0.06] bg-white py-20 tablet:py-28">
        <div className="site-container max-w-[880px]">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Standard Inclusions
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,44px)] font-black tracking-tight text-[#1D1D1F]">
              Features Built Into Every {industry.name} Website
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {industry.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-[#FBFBFC] p-4 text-sm font-semibold text-[#1D1D1F]"
              >
                <CheckCircle2 size={18} className="text-[#0077ED] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry FAQ Accordion */}
      <section className="bg-[#fbfbfd] py-20 tablet:py-28">
        <div className="site-container max-w-[880px]">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Common Questions
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,44px)] font-black tracking-tight text-[#1D1D1F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {industry.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-black/[0.08] bg-white p-6 transition-colors open:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base sm:text-lg font-bold text-[#1D1D1F]">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#1D1D1F] transition-transform duration-200 group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#56555d] border-t border-black/[0.06] pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
}
