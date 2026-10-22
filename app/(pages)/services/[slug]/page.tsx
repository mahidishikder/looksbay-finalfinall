import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  HelpCircle,
} from "lucide-react";
import { servicesDetailData, type ServiceDetail } from "@/app/shared/data/services-detail";
import TrustBanner from "@/app/(pages)/templates/components/trust-banner";
import { NewsletterCTA } from "@/app/shared/components/site-components";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all services and their aliases
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  servicesDetailData.forEach((service) => {
    params.push({ slug: service.slug });
    if (service.aliases) {
      service.aliases.forEach((alias) => params.push({ slug: alias }));
    }
  });
  return params;
}

function findService(slug: string): ServiceDetail | undefined {
  return servicesDetailData.find(
    (s) => s.slug === slug || (s.aliases && s.aliases.includes(slug))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) {
    return { title: "Service Not Found | Looksbay Studio" };
  }
  return {
    title: `${service.name} — Squarespace 7.1 Specialist | Looksbay Studio`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Breadcrumbs Bar — Subtle, Clean, Integrated */}
      <div className="border-b border-black/[0.06] bg-[#F5F5F7]">
        <div className="site-container flex h-12 items-center justify-between text-xs text-[#6E6E73]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="transition hover:text-[#0077ED]">
              Home
            </Link>
            <ChevronRight size={12} className="text-black/30" />
            <span className="text-black/60">
              Services
            </span>
            <ChevronRight size={12} className="text-black/30" />
            <span className="font-semibold text-[#1D1D1F]">{service.name}</span>
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-semibold text-[#0077ED] transition hover:text-[#0062C4]"
          >
            <span>Book Consultation</span>
            <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      {/* 2. Main Hero Section — Pure Home Page Aesthetic & Apple Gradient Typography */}
      <section className="overflow-hidden bg-[linear-gradient(110deg,#f5f5f7_0_58%,#fff_58%_100%)]">
        <div className="site-container grid min-h-[570px] grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(40px,5vw,70px)] py-[70px] tablet:min-h-0 tablet:grid-cols-1 tablet:gap-9 mobile:grid-cols-1 mobile:gap-9 mobile:py-11">
          
          {/* Left Side (Fixed Text) */}
          <div className="relative z-[1] max-w-[640px] tablet:max-w-[680px]">
            <span className="inline-block text-[15px] font-bold tracking-[.12em] text-[#2761EB] mobile:text-[11px] uppercase">
              {service.heroEyebrow || `${service.category.toUpperCase()} · SQUARESPACE CIRCLE PLATINUM`}
            </span>

            {/* Title with Apple Gradient */}
            <h1 className="my-[18px] max-w-[620px] text-[clamp(42px,4vw,62px)] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#1D1D1F] mobile:text-[36px]">
              {service.heroTitleLine1 || service.name} <br />
              <span className="bg-[linear-gradient(90deg,#2997FF_0%,#A855F7_28%,#EC4899_55%,#FF3B30_78%,#FF9500_100%)] bg-clip-text text-transparent">
                {service.heroTitleGradient || service.tagline}
              </span>
              {service.heroTitleLine3 && (
                <>
                  <br />
                  {service.heroTitleLine3}
                </>
              )}
            </h1>

            <p className="my-0 max-w-[460px] text-lg leading-[1.55] text-[#56555d] mobile:text-base">
              {service.description}
            </p>

            <ul className="my-5 mb-7 grid list-none gap-2.5 p-0">
              {(service.heroBullets && service.heroBullets.length > 0
                ? service.heroBullets
                : [
                    "Bespoke Squarespace 7.1 Fluid Engine build",
                    "Technical SEO and responsive mobile engineering",
                    "Direct senior team access & 30 days post-launch support",
                  ]
              ).map((bullet, i) => (
                <li key={i} className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54] mobile:text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2761EB]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?project=${encodeURIComponent(service.name)}`}
                className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-8 py-4 text-[16px] font-bold tracking-[.02em] text-white transition-colors hover:bg-[#0062C4]"
              >
                {service.heroButtonText || "BOOK A CONSULTATION"}
              </Link>
              <Link
                href="#deliverables"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/80 px-7 py-4 text-[15px] font-semibold text-[#1D1D1F] transition hover:bg-black/5 hover:border-black/30 backdrop-blur-sm"
              >
                View Deliverables
              </Link>
            </div>
          </div>

          {/* Right Side: Clean Apple-Style Smooth Device Preview (Matching Home Hero) */}
          <div className="relative mx-auto flex h-[460px] w-full items-center justify-center tablet:h-[360px] mobile:h-[260px]">
            <img
              src={service.heroImage || service.heroMockup}
              alt={`${service.name} Preview`}
              className="h-full w-full object-contain bg-transparent border-0 outline-none ring-0 shadow-none"
            />
          </div>

        </div>
      </section>

      {/* 3. Quick Specifications & Investment Strip — Clean & Elegant */}
      <section className="border-b border-black/[0.06] bg-white py-6">
        <div className="site-container grid grid-cols-4 gap-6 desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Starting Investment</span>
              <span className="text-lg font-extrabold text-[#1D1D1F]">{service.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
              <Clock size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Typical Turnaround</span>
              <span className="text-lg font-bold text-[#1D1D1F]">{service.timeline}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Circle Platinum Perk</span>
              <span className="text-[13px] font-bold text-[#1D1D1F]">6-Mo Trial + 20% Off</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#86868B]">Platform Spec</span>
              <span className="text-[13px] font-bold text-[#1D1D1F]">Fluid Engine 7.1 + CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Deliverables (4 Clean Cards) */}
      <section id="deliverables" className="border-b border-black/[0.06] bg-[#F7F7F8] py-16 tablet:py-20">
        <div className="site-container">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              What We Deliver
            </span>
            <h2 className="gradient-heading mb-3 mt-1.5 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight">
              Crafted With Surgical Precision
            </h2>
            <p className="mx-auto max-w-[580px] text-sm sm:text-base text-[#6E6E73]">
              Every element is tailored specifically for your brand’s prestige, conversion performance, and long-term search engine visibility.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6 desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[16px] border border-black/[0.08] bg-white p-6 sm:p-7 text-left shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-xl bg-[#0077ED]/10 text-[#0077ED]">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <h3 className="mb-2 text-base sm:text-lg font-bold text-[#1D1D1F]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6E6E73]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Proven 4-Step Process (Consistent With Home Looksbay Framework) */}
      <section className="py-16 tablet:py-20 bg-white">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
            <Clock size={13} />
            Our Structured Framework
          </span>
          <h2 className="gradient-heading mb-3 mt-1.5 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight">
            How We Execute Your Project
          </h2>
          <p className="mx-auto mb-12 max-w-[560px] text-sm sm:text-base text-[#6E6E73]">
            A seamless, stress-free process designed to take you from initial consultation to launch day without friction.
          </p>

          <div className="grid grid-cols-4 gap-6 desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 text-left">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-[16px] border border-black/[0.08] bg-[#F5F5F7] p-6 sm:p-7 shadow-sm"
              >
                <span className="inline-block mb-3 rounded-full bg-[#0077ED] px-3 py-0.5 text-xs font-bold text-white">
                  Step {step.step}
                </span>
                <h3 className="mb-2 text-base sm:text-lg font-bold text-[#1D1D1F]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6E6E73]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What's Included: Detailed Feature Checklist */}
      <section className="border-t border-black/[0.06] bg-[#F7F7F8] py-16 tablet:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-10 desktop:grid-cols-12 desktop:items-center">
            
            <div className="desktop:col-span-5 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
                Full Scope Breakdown
              </span>
              <h2 className="gradient-heading mb-4 mt-2 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight">
                Everything Included In Your Scope
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#6E6E73] mb-6">
                No hidden costs. No surprise fees. You receive a comprehensive, end-to-end service package engineered to elevate your business.
              </p>
              
              <Link
                href={`/contact?project=${encodeURIComponent(service.name)}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0077ED] px-7 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#0062C4]"
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="desktop:col-span-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.featuresIncluded.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm border border-black/[0.05]"
                  >
                    <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-[#1D1D1F] leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Recent Case Studies Showcase (Clean 3-Column Grid) */}
      <section className="py-16 tablet:py-20 bg-white">
        <div className="site-container text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
            Proven Results
          </span>
          <h2 className="gradient-heading mb-3 mt-1.5 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-tight">
            Recent Client Work
          </h2>
          <p className="mx-auto mb-12 max-w-[560px] text-sm sm:text-base text-[#6E6E73]">
            See how modern businesses transformed their digital footprint and scaled inquiries with Looksbay.
          </p>

          <div className="grid grid-cols-3 gap-7 tablet:grid-cols-2 mobile:grid-cols-1 text-left">
            {service.caseStudies.map((study, idx) => (
              <Link
                href={study.link}
                key={idx}
                className="group flex flex-col overflow-hidden rounded-[16px] border border-black/[0.08] bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-slate-100 mb-4">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1D1D1F] backdrop-blur-md shadow-sm">
                    {study.category}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0077ED] mb-1">
                  {study.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077ED]">
                  Explore Case Study
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Official Trust Banner */}
      <TrustBanner />

      {/* 8. Service FAQs */}
      <section className="py-16 tablet:py-20 bg-white">
        <div className="site-container max-w-[860px]">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Got Questions?
            </span>
            <h2 className="gradient-heading mb-2 mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73]">
              Everything you need to know about working with us on this service.
            </p>
          </div>

          <div className="space-y-3.5 text-left">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-[14px] border border-black/[0.08] bg-[#F7F7F8] p-5 sm:p-6"
              >
                <h3 className="font-bold text-[#1D1D1F] mb-1.5 text-sm sm:text-base">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6E6E73]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Newsletter CTA with #E8F0FE Card */}
      <NewsletterCTA />
    </article>
  );
}
