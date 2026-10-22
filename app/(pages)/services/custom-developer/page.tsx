import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  HelpCircle,
  FileCode2,
  LayoutGrid,
  Braces,
} from "lucide-react";
import { NewsletterCTA } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Hire a Squarespace Custom Developer & CSS/JavaScript Specialist",
  description:
    "Hire an expert Squarespace custom developer. We engineer bespoke CSS architecture, custom JavaScript plugins, Fluid Engine responsive fixes, and complex third-party API integrations.",
  keywords: [
    "Squarespace custom developer",
    "Hire Squarespace developer",
    "Freelance Squarespace developer",
    "Professional Squarespace designer",
    "Squarespace web design agency",
    "Custom Squarespace website design",
    "Squarespace CSS expert",
    "Squarespace JavaScript custom code",
    "Custom plugins for Squarespace",
    "Squarespace API integration",
    "Responsive Squarespace design",
    "Luxury Squarespace web design",
    "Minimalist Squarespace templates",
    "Squarespace front-end developer",
    "Advanced Squarespace styling",
    "Squarespace website redesign",
    "Squarespace custom layout builder",
    "Mobile-friendly Squarespace customization",
    "Squarespace animation expert",
    "Squarespace boutique web studio",
  ],
  alternates: {
    canonical: "/services/custom-developer",
  },
  openGraph: {
    title: "Hire a Senior Squarespace Custom Developer & CSS Specialist | Looksbay",
    description:
      "Bespoke Squarespace 7.1 code injection, custom JavaScript plugins, responsive fixes, and seamless API integrations engineered by Looksbay Studio.",
    url: "https://www.looksbay.com/services/custom-developer",
    type: "website",
    images: [
      {
        url: "/images/service-custom-design.jpg",
        width: 1200,
        height: 630,
        alt: "Squarespace Custom Code & Plugin Development by Looksbay Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire a Squarespace Custom Developer | Looksbay Studio",
    description:
      "Advanced CSS architecture, custom JavaScript plugins, and Fluid Engine precision for ambitious brands.",
    images: ["/images/service-custom-design.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.looksbay.com/services/custom-developer#service",
  name: "Squarespace Custom Code & Front-End Development Services",
  serviceType: "Squarespace Web Development",
  description:
    "Senior Squarespace custom development including bespoke CSS architecture, custom JavaScript plugins, Fluid Engine layout fixes, and third-party API webhooks.",
  provider: {
    "@type": "Organization",
    name: "Looksbay Studio",
    url: "https://www.looksbay.com",
    logo: "https://www.looksbay.com/assets/favicon.png",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "3500",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.looksbay.com/services/custom-developer",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Looksbay write custom CSS for Squarespace 7.1 Fluid Engine without breaking future platform updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We strictly target scoped section data-section-id attributes and clean semantic wrappers rather than volatile internal class names. All CSS is written using BEM methodology, modular pre-processors, and isolated namespace variables, ensuring your site remains resilient against automated Squarespace core rollouts.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Code Injection and Code Blocks in Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Code Injection allows scripts and stylesheets to execute site-wide in the header or footer (available on Business and Commerce plans), making it ideal for global analytics, font loaders, and custom navigation plugins. Code Blocks are embedded directly into individual sections on a page, ideal for custom calculators, interactive embeds, or specific layout widgets.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build custom interactive features like megamenus, calculators, and filtering systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We regularly build high-performance megamenus with rich media cards, dynamic portfolio category filters, custom pricing calculators, and interactive before-and-after sliders using lightweight vanilla JavaScript without heavy third-party library bloat.",
      },
    },
    {
      "@type": "Question",
      name: "Can you fix mobile responsive issues and broken block alignments on Squarespace 7.1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While Squarespace 7.1 Fluid Engine offers independent mobile placement, complex overlapping designs often create horizontal overflow, erratic block jumping, or awkward line wraps on small screens. We audit your mobile grid, apply custom media queries, and enforce strict container padding to deliver a flawless mobile user experience.",
      },
    },
    {
      "@type": "Question",
      name: "Can you integrate third-party APIs and booking systems into Squarespace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We integrate external APIs, webhooks, CRMs (HubSpot, Salesforce, Clio), and specialized booking systems (Mindbody, Boulevard, Momence, Resy) into Squarespace using custom REST endpoints, custom forms, and serverless edge functions.",
      },
      },
    {
      "@type": "Question",
      name: "Will custom code slow down my Squarespace website's PageSpeed scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. When coded by Looksbay, custom scripts are minified, asynchronous (async/defer), and tree-shaken to eliminate render-blocking threads. We build all features to maintain 90+ mobile Core Web Vitals performance benchmarks.",
      },
    },
  ],
};

const capabilities = [
  {
    icon: FileCode2,
    title: "Advanced CSS Architecture",
    description:
      "Bespoke typographic hierarchies, micro-interactions, luxury glassmorphism cards, fluid hover effects, and branded form controls written with clean, scoped CSS.",
    tags: ["Custom Typography", "Fluid Transitions", "Scoped Namespaces", "Zero Layout Shift"],
  },
  {
    icon: Braces,
    title: "Custom JavaScript & Bespoke Plugins",
    description:
      "Engineered vanilla JavaScript features that go far beyond standard Squarespace capabilities: interactive calculators, multi-tier megamenus, live filterable project archives, and smooth tabbed switchers.",
    tags: ["Dynamic Mega-Menus", "Portfolio Filtering", "Interactive Sliders", "No jQuery Bloat"],
  },
  {
    icon: LayoutGrid,
    title: "Fluid Engine Grid & Mobile Fixes",
    description:
      "Resolution of stubborn responsive bugs: horizontal scroll leaks, mobile block overlaps, z-index layering conflicts, and inconsistent tablet viewport wrapping.",
    tags: ["Mobile Layout Audit", "Overflow Elimination", "Z-Index Layering", "Tablet Alignment"],
  },
  {
    icon: Cpu,
    title: "API, Webhook & CRM Integrations",
    description:
      "Connecting your Squarespace site to enterprise backends. Direct integration with HubSpot, Zapier, Stripe custom billing, Boulevard, Mindbody, and legal practice software.",
    tags: ["REST Webhooks", "CRM Auto-Sync", "Custom Checkout Flows", "Headless Integrations"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Technical Discovery & Scope Audit",
    description:
      "We analyze your design mockups (Figma, Adobe XD) or existing Squarespace site, identify platform constraints, and map out the exact CSS and JavaScript architecture needed.",
  },
  {
    step: "02",
    title: "Sandbox Staging & Clean Development",
    description:
      "Code is developed in an isolated staging sandbox. We write lightweight, documented code adhering strictly to Squarespace Circle developer standards.",
  },
  {
    step: "03",
    title: "Cross-Device & Core Web Vitals QA",
    description:
      "Rigorous testing across real iOS, Android, macOS, and Windows hardware. We verify 60fps animation smoothness, zero CLS (Cumulative Layout Shift), and fast time-to-interactive.",
  },
  {
    step: "04",
    title: "Live Deployment & Client Handover",
    description:
      "Zero-downtime injection into your live site, accompanied by recorded video documentation so you know exactly how to manage content without touching the underlying code.",
  },
];

export default function CustomDeveloperPage() {
  return (
    <div className="w-full bg-[#fbfbfd]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-gradient-to-b from-white via-[#f5f7fb] to-[#fbfbfd] px-6 pt-20 pb-16 tablet:pt-28 tablet:pb-24">
        <div className="site-container relative z-10 max-w-[1020px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0077ED]/20 bg-[#0077ED]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0077ED] mb-6">
            <Terminal size={14} />
            Squarespace Circle Platinum Developer
          </div>

          <h1 className="text-[clamp(34px,4.8vw,64px)] font-black tracking-[-0.035em] text-[#1D1D1F] leading-[1.08] uppercase">
            Hire a Senior Squarespace{" "}
            <span className="apple-gradient-heading block mt-1">
              Custom Developer & CSS Specialist
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-lg sm:text-xl text-[#515154] leading-relaxed">
            Break free from platform limitations. We engineer bespoke CSS architecture, custom
            JavaScript plugins, Fluid Engine responsive repairs, and enterprise API integrations for
            ambitious brands that demand perfection.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?project=Custom+Development"
              className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#0062C4] hover:shadow-lg active:scale-95"
            >
              <span>Book Developer Consultation</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-8 py-4 text-base font-semibold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
            >
              <span>Explore Custom Projects</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-black/[0.06] pt-10 text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">100%</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Fluid Engine 7.1 Native
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#0077ED]">0.0ms</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Render-Blocking Delay
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">60 FPS</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Micro-Animation Fluidity
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#0077ED]">10+ Yrs</p>
              <p className="text-xs text-[#86868B] uppercase font-semibold mt-1">
                Squarespace Code Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Capabilities Grid */}
      <section className="py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[760px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Full-Stack Technical Capabilities
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              Beyond Out-Of-The-Box Limitations
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
              Standard templates only take you so far. When your brand vision requires bespoke
              interactions, custom backend workflows, or pixel-perfect layout precision, our senior
              developers take over.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0077ED]/40 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-[#0077ED]/10 text-[#0077ED]">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{cap.title}</h3>
                    <p className="mt-3 text-base text-[#56555d] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-black/[0.06]">
                    {cap.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full bg-[#F5F5F7] px-3.5 py-1 text-xs font-semibold text-[#1D1D1F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Quality & Standards Section */}
      <section className="border-y border-black/[0.06] bg-[#0E131F] py-20 tablet:py-28 text-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#2997FF]">
                <ShieldCheck size={14} />
                Strict Engineering Standards
              </span>
              <h2 className="mt-3 text-[clamp(28px,3.5vw,46px)] font-black tracking-tight leading-tight">
                Code Written To Last, Not Break On Next Platform Update.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
                Many freelance developers copy-paste brittle scripts that crash the moment Squarespace
                updates internal IDs. Looksbay engineers write future-proof, scoped CSS and vanilla
                ES6+ JavaScript that protects your investment.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "No bloated jQuery libraries or insecure third-party script CDNs",
                  "Strict BEM CSS naming conventions scoped to section IDs",
                  "Safe for client DIY editing: content authors never touch or break code",
                  "Documented in a clean README and annotated in Custom CSS panel",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-white/90">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#2997FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Demonstration Card */}
            <div className="rounded-2xl border border-white/10 bg-[#161B28] p-6 shadow-2xl font-mono text-xs sm:text-[13px] leading-relaxed text-white/80 overflow-x-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white/50 text-xs">
                <span>looksbay-custom-architecture.css</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  Production Ready
                </span>
              </div>
              <pre className="mt-4 text-[#A5B4FC]">
                <code>{`/* Looksbay Scoped Section Architecture */
section[data-section-id="luxury-flagship"] {
  --lb-glass-bg: rgba(255, 255, 255, 0.85);
  --lb-accent: #0077ED;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Custom Interactive Mega-Menu Drawer */
.lb-megamenu-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 200ms ease;
  will-change: transform, opacity;
}

@media (max-width: 768px) {
  .lb-fluid-grid-fix {
    grid-template-columns: 1fr !important;
    overflow-x: hidden;
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-20 tablet:py-28">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-[700px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Structured Development Roadmap
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.8vw,48px)] font-black tracking-tight text-[#1D1D1F]">
              How We Work Together
            </h2>
            <p className="mt-4 text-base text-[#6E6E73]">
              From concept validation to sandbox testing and deployment, our process is transparent,
              efficient, and milestone-based.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-black/[0.06] bg-white p-7 shadow-xs hover:shadow-md transition-shadow"
              >
                <span className="text-3xl font-black text-[#0077ED]/30 block mb-3">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{step.title}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ Accordion */}
      <section className="border-t border-black/[0.06] bg-white py-20 tablet:py-28">
        <div className="site-container max-w-[880px]">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
              Frequently Asked Questions
            </span>
            <h2 className="gradient-heading mt-3 text-[clamp(28px,3.5vw,44px)] font-black tracking-tight text-[#1D1D1F]">
              Technical Development FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-black/[0.08] bg-[#FBFBFC] p-6 transition-colors open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base sm:text-lg font-bold text-[#1D1D1F]">
                  <span>{faq.name}</span>
                  <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#1D1D1F] transition-transform duration-200 group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#56555d] border-t border-black/[0.06] pt-4">
                  {faq.acceptedAnswer.text}
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
