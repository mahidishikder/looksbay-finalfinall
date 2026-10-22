import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Clock,
  Layers,
  Wand2,
  ChevronRight,
  ShieldCheck,
  Gift,
  Zap,
  Check,
} from "lucide-react";
import { allTemplates } from "@/app/shared/data/templates-data";
import TrustBanner from "../components/trust-banner";
import { NewsletterCTA } from "@/app/shared/components/site-components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allTemplates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = allTemplates.find((t) => t.slug === slug);
  if (!template) {
    return { title: "Template Not Found | Looksbay Studio" };
  }
  return {
    title: `${template.name} — Squarespace 7.1 Fluid Engine Template | Looksbay`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = allTemplates.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = allTemplates.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-white">
      {/* 1. Breadcrumbs Bar — Aligned to 1480px site-container */}
      <div className="border-b border-black/[0.06] bg-[#F5F5F7]">
        <div className="site-container flex h-14 items-center justify-between text-xs text-[#6E6E73]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="transition hover:text-[#0077ED]">
              Home
            </Link>
            <ChevronRight size={13} className="text-black/30" />
            <Link href="/templates" className="transition hover:text-[#0077ED]">
              Templates
            </Link>
            <ChevronRight size={13} className="text-black/30" />
            <span className="font-semibold text-[#1D1D1F]">{template.name}</span>
          </nav>

          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#0077ED] transition hover:text-[#0062C4]"
          >
            <span>Open Live Demo</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 2. Main Hero Section: Dual-Column Layout with Devices Mockup */}
      <section className="py-12 desktop:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-10 desktop:grid-cols-12 desktop:gap-14">
            
            {/* Left Column: Template Information & Actions */}
            <div className="desktop:col-span-5 text-left">
              {/* Category / Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ED]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ED]">
                  <Sparkles size={12} />
                  Squarespace 7.1 Fluid Engine
                </span>
                {template.categories.slice(0, 2).map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-medium text-[#515154]"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="gradient-heading mb-4 text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                {template.name} Template
              </h1>

              {/* Tagline / Subtitle */}
              <p className="mb-6 text-[16px] leading-[1.6] text-[#515154]">
                {template.tagline}
              </p>

              {/* Pricing Box */}
              <div className="mb-6 rounded-[14px] border border-black/[0.08] bg-[#F5F5F7] p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#1D1D1F]">${template.price}</span>
                  <span className="text-base text-[#8E8E93] line-through">${template.originalPrice}</span>
                  <span className="rounded-full bg-[#34C759]/15 px-2.5 py-0.5 text-xs font-bold text-[#248A3D]">
                    Save 20%
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#6E6E73]">
                  One-time purchase • Includes extended 6-month free Squarespace trial + 20% off annual subscription.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mb-6 flex flex-col gap-3 mobile:flex-col tablet:flex-row desktop:flex-row">
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-6 font-semibold text-[#1D1D1F] transition hover:bg-black/5 hover:border-black/30"
                >
                  <span>View Live Demo</span>
                  <ExternalLink size={15} />
                </a>

                <Link
                  href={`/contact?template=${encodeURIComponent(template.name)}&service=template-only`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#0077ED] px-6 font-semibold text-white shadow-sm transition hover:bg-[#0062C4]"
                >
                  Buy Template (${template.price})
                </Link>
              </div>

              {/* Circle Platinum Perks Bullet List */}
              <div className="space-y-2 border-t border-black/[0.06] pt-5 text-xs sm:text-sm text-[#515154]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0077ED] shrink-0" />
                  <span>Instant 24-Hour Contributor Transfer straight to your email</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0077ED] shrink-0" />
                  <span>Zero Coding Required — Drag and drop with Fluid Engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0077ED] shrink-0" />
                  <span>Step-by-step video academy walking you through every edit</span>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Device Visual Mockup Showcase */}
            <div className="desktop:col-span-7">
              <div className="relative overflow-hidden rounded-[20px] bg-[#F5F5F7] p-4 sm:p-6 desktop:p-8 border border-black/[0.06] shadow-sm">
                {/* Main Desktop Device Frame */}
                <div className="overflow-hidden rounded-[12px] bg-white shadow-lg border border-black/10">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 border-b border-black/5 bg-[#EBEBED] px-4 py-2">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-[#FF5F56]" />
                      <div className="size-2 rounded-full bg-[#FFBD2E]" />
                      <div className="size-2 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="mx-auto rounded bg-white px-4 py-0.5 text-[10px] font-medium text-[#8E8E93]">
                      {template.name.toLowerCase()}-studio.squarespace.com
                    </div>
                  </div>
                  {/* Screenshot with proportional aspect ratio */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={template.mockups.desktop}
                      alt={template.alt}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating Mobile Phone Mockup */}
                <div className="absolute -bottom-2 right-4 sm:right-6 w-[110px] sm:w-[140px] desktop:w-[155px] overflow-hidden rounded-[20px] border-[4px] border-[#1D1D1F] bg-[#1D1D1F] shadow-2xl">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[16px]">
                    <img
                      src={template.mockups.mobile}
                      alt={`${template.name} mobile layout`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Value Proposition Strip — 4 Columns in 1 Row */}
      <section className="border-y border-black/[0.06] bg-[#F9F9FA] py-6">
        <div className="site-container">
          <div className="grid grid-cols-4 gap-4 tablet:grid-cols-2 mobile:grid-cols-1">
            <div className="flex items-center gap-3 rounded-[12px] bg-white p-3.5 shadow-sm border border-black/[0.04]">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0077ED]/10 text-[#0077ED]">
                <Zap size={16} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#1D1D1F]">Fluid Engine 7.1</span>
                <span className="block text-[11px] text-[#6E6E73]">Zero code required</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] bg-white p-3.5 shadow-sm border border-black/[0.04]">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#34C759]/10 text-[#248A3D]">
                <Gift size={16} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#1D1D1F]">20% Squarespace Off</span>
                <span className="block text-[11px] text-[#6E6E73]">Annual plan discount</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] bg-white p-3.5 shadow-sm border border-black/[0.04]">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#AF52DE]/10 text-[#AF52DE]">
                <Clock size={16} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#1D1D1F]">6-Month Free Trial</span>
                <span className="block text-[11px] text-[#6E6E73]">Extended partner trial</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[12px] bg-white p-3.5 shadow-sm border border-black/[0.04]">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#FF9500]/10 text-[#FF9500]">
                <ShieldCheck size={16} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-[#1D1D1F]">24-Hour Delivery</span>
                <span className="block text-[11px] text-[#6E6E73]">Contributor invite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What's Included: Pages & Technical Architecture (Clean 2-Column Layout) */}
      <section className="py-14 desktop:py-20 bg-white">
        <div className="site-container">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Everything You Need
            </span>
            <h2 className="gradient-heading mb-2 mt-1.5 text-[clamp(26px,3.5vw,38px)] font-extrabold tracking-tight">
              What’s Included in {template.name}
            </h2>
            <p className="text-sm text-[#6E6E73]">
              A complete, studio-grade website ecosystem ready for immediate deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1">
            {/* Left: Pre-built pages list */}
            <div className="rounded-[16px] border border-black/[0.08] bg-[#F5F5F7] p-6 text-left">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#0077ED] text-white">
                  <Layers size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">
                    8+ Pre-Built Page Layouts
                  </h3>
                  <p className="text-xs text-[#6E6E73]">
                    Ready to populate with your copy and photography
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {template.pagesIncluded.map((page, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-white px-3.5 py-2.5 text-xs font-medium text-[#1D1D1F] shadow-sm border border-black/[0.04]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="size-1.5 rounded-full bg-[#0077ED]" />
                      <span>{page}</span>
                    </div>
                    <span className="text-[10px] text-[#0077ED] font-semibold">Included</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Features & Perks */}
            <div className="rounded-[16px] border border-black/[0.08] bg-[#F5F5F7] p-6 text-left">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#1D1D1F] text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">
                    Technical Features &amp; Perks
                  </h3>
                  <p className="text-xs text-[#6E6E73]">
                    Fluid Engine 7.1 standards with zero coding needed
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {template.features.map((feat, i) => (
                  <div key={i} className="rounded-lg bg-white p-3 shadow-sm border border-black/[0.04]">
                    <h4 className="font-bold text-[#1D1D1F] text-xs mb-0.5">{feat.title}</h4>
                    <p className="text-[11px] leading-relaxed text-[#6E6E73]">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Transfer Works — 3 Simple Steps in 1 Row */}
      <section className="border-y border-black/[0.06] bg-[#F7F7F8] py-14 desktop:py-18">
        <div className="site-container text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
            <Clock size={13} />
            Seamless 3-Step Handover
          </span>
          <h2 className="gradient-heading mb-3 mt-1.5 text-[clamp(26px,3.5vw,38px)] font-extrabold tracking-tight">
            How Template Transfer Works
          </h2>
          <p className="mx-auto mb-10 max-w-[540px] text-sm text-[#6E6E73]">
            No technical knowledge needed. We deliver the complete website directly into your Squarespace account in 3 simple steps.
          </p>

          <div className="grid grid-cols-3 gap-6 tablet:grid-cols-3 mobile:grid-cols-1 text-left">
            {/* Step 1 */}
            <div className="relative rounded-[14px] border border-black/[0.08] bg-white p-6 shadow-sm">
              <span className="inline-block mb-3 rounded-full bg-[#0077ED] px-3 py-0.5 text-xs font-bold text-white">
                Step 01
              </span>
              <h3 className="mb-2 text-base font-bold text-[#1D1D1F]">
                Purchase Securely
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                Order your template with instant confirmation. You do not need a paid Squarespace plan yet—we provide an extended 6-month free trial site.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-[14px] border border-black/[0.08] bg-white p-6 shadow-sm">
              <span className="inline-block mb-3 rounded-full bg-[#0077ED] px-3 py-0.5 text-xs font-bold text-white">
                Step 02
              </span>
              <h3 className="mb-2 text-base font-bold text-[#1D1D1F]">
                Receive Email Invite
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                Within 24 business hours, you will receive an official Squarespace contributor transfer email inviting you to take full ownership.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-[14px] border border-black/[0.08] bg-white p-6 shadow-sm">
              <span className="inline-block mb-3 rounded-full bg-[#0077ED] px-3 py-0.5 text-xs font-bold text-white">
                Step 03
              </span>
              <h3 className="mb-2 text-base font-bold text-[#1D1D1F]">
                1-Click Launch
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                Accept the invite with one click. The complete template lands in your account ready for your text, photos, and domain connection!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Full-Service Done-For-You Customization Banner */}
      <section className="py-14 desktop:py-20 bg-white">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#092a40] via-[#103b57] to-[#1c557d] p-6 sm:p-10 text-white shadow-xl">
            <div className="grid grid-cols-1 items-center gap-8 desktop:grid-cols-12">
              
              <div className="desktop:col-span-8 text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <Wand2 size={12} />
                  Full-Service Studio Customization
                </span>
                
                <h2 className="mb-3 mt-3 text-[clamp(26px,3.5vw,40px)] font-extrabold leading-[1.1] tracking-tight text-white">
                  Want Us to Customize It For You?
                </h2>

                <p className="mb-6 max-w-[620px] text-sm sm:text-base leading-relaxed text-white/85">
                  Skip the learning curve. Send us your brand photos, copy, colors, and requirements—our <strong>Squarespace Circle Platinum team</strong> will completely transform this template to match your brand and launch it in just <strong>5 business days</strong>.
                </p>

                {/* What's included checklist */}
                <div className="grid grid-cols-2 gap-2.5 mobile:grid-cols-1 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                    <span>Full brand palette &amp; custom font setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                    <span>Your photos, copy &amp; logos added to all pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                    <span>Contact form, bookings &amp; newsletter integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#00E5FF] shrink-0" />
                    <span>Mobile responsiveness &amp; SEO meta optimization</span>
                  </div>
                </div>
              </div>

              {/* Price & Booking Call-to-action */}
              <div className="desktop:col-span-4 flex flex-col items-center justify-center rounded-[14px] bg-white/10 p-6 backdrop-blur-xl border border-white/20 text-center">
                <span className="text-[11px] uppercase tracking-widest text-white/70 font-bold">
                  Template + Full Customization
                </span>
                <div className="my-2 text-3xl font-extrabold text-white">
                  ${template.customizationPrice}
                </div>
                <p className="mb-4 text-xs text-white/80">
                  White-glove setup. Delivered ready to launch in 5 business days.
                </p>
                
                <Link
                  href={`/contact?template=${encodeURIComponent(template.name)}&service=custom-installation`}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 text-xs font-bold text-[#092a40] transition hover:bg-white/90 shadow-md"
                >
                  Book Custom Installation
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Official Trust & Partner Banner */}
      <TrustBanner />

      {/* 8. Frequently Asked Questions */}
      <section className="py-14 desktop:py-20 bg-white">
        <div className="site-container max-w-[840px]">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Got Questions?
            </span>
            <h2 className="gradient-heading mb-2 mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73]">
              Common questions about purchasing, transferring, and customizing templates.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="rounded-[12px] border border-black/[0.08] bg-[#F7F7F8] p-5">
              <h3 className="font-bold text-[#1D1D1F] mb-1.5 text-sm sm:text-base">
                Do I need to buy a Squarespace subscription before purchasing?
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                No! We transfer the template to you under an extended <strong>6-month free trial</strong>. You only pay for a Squarespace plan when you are ready to connect your domain and launch, and you will get <strong>20% off</strong> your first year!
              </p>
            </div>

            <div className="rounded-[12px] border border-black/[0.08] bg-[#F7F7F8] p-5">
              <h3 className="font-bold text-[#1D1D1F] mb-1.5 text-sm sm:text-base">
                Can I customize the colors, fonts, photos, and layouts?
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                100% yes! Squarespace 7.1 Fluid Engine lets you move blocks, add new sections, change all colors and fonts globally in seconds, and upload your own images and text with simple drag and drop.
              </p>
            </div>

            <div className="rounded-[12px] border border-black/[0.08] bg-[#F7F7F8] p-5">
              <h3 className="font-bold text-[#1D1D1F] mb-1.5 text-sm sm:text-base">
                How does the &quot;Full-Service Customization&quot; add-on work?
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                If you would like us to customize the template for your business, select Custom Installation (${template.customizationPrice}). You provide your images, logos, copy, and brand requirements, and our team handles all layout building, mobile optimization, form connections, and launch configurations within 5 business days!
              </p>
            </div>

            <div className="rounded-[12px] border border-black/[0.08] bg-[#F7F7F8] p-5">
              <h3 className="font-bold text-[#1D1D1F] mb-1.5 text-sm sm:text-base">
                How long does it take to receive my template?
              </h3>
              <p className="text-xs leading-relaxed text-[#6E6E73]">
                You will receive your Squarespace Contributor Transfer email within 24 business hours of ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. More Templates Showcase — 3 Columns Side-by-Side */}
      <section className="border-t border-black/[0.06] bg-[#F5F5F7] py-14 desktop:py-20">
        <div className="site-container text-center">
          <h2 className="gradient-heading mb-10 text-2xl sm:text-3xl font-extrabold tracking-tight">
            More Squarespace Templates
          </h2>

          <div className="grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
            {relatedTemplates.map((rel) => (
              <article
                key={rel.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[16px] bg-white pb-6 text-center shadow-sm transition hover:shadow-md border border-black/[0.06]"
              >
                <div className="w-full p-4 pb-3">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[10px] bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.alt}
                      className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-102"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#1D1D1F] leading-tight">
                    {rel.name} – Fluid Engine
                  </span>
                  <div className="mt-1 mb-3 flex items-center justify-center gap-2">
                    <span className="text-sm font-bold text-[#1D1D1F]">${rel.price}</span>
                    <span className="text-xs text-[#8E8E93] line-through">${rel.originalPrice}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 w-full">
                    <a
                      href={rel.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-black/15 bg-white py-2 text-[11px] font-medium text-[#1D1D1F] transition hover:bg-black/5"
                    >
                      View Demo
                    </a>
                    <Link
                      href={`/templates/${rel.slug}`}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[#0077ED] py-2 text-[11px] font-medium text-white transition hover:bg-[#0062C4]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Single Final Newsletter CTA */}
      <NewsletterCTA />
    </article>
  );
}
