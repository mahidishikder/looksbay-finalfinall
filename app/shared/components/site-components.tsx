"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, ChevronDown, ArrowRight } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";
import { HeaderAuth } from "./header-auth";
import { menuCards } from "../data/menu-cards";

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Social media">
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-[#eef5ff] hover:text-blue"><Instagram size={20} /></a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-[#eef5ff] hover:text-blue"><Facebook size={20} /></a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-[#eef5ff] hover:text-blue"><Linkedin size={20} /></a>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = isOpen || isHovered;

  const isServicesActive = pathname.startsWith("/services");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsHovered(false);
  }, [pathname]);

  const [siteSettings, setSiteSettings] = useState<{
    announcementEnabled?: boolean;
    announcementBadge?: string;
    announcementText?: string;
    announcementLink?: string;
  }>({
    announcementEnabled: true,
    announcementBadge: "SPECIAL OFFER",
    announcementText: "Accepting new bespoke Squarespace client commissions for Q1 & Q2 — Complimentary SEO Audit included.",
    announcementLink: "/contact",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) setSiteSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-black/[0.08] bg-white/95 backdrop-blur-xl">
      {siteSettings.announcementEnabled && siteSettings.announcementText && (
        <div className="min-h-7 flex items-center justify-center bg-[#0077ED] px-3.5 py-1 text-center text-[11px] font-medium text-white gap-2">
          {siteSettings.announcementBadge && (
            <span className="bg-white/20 text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
              {siteSettings.announcementBadge}
            </span>
          )}
          <span className="truncate max-w-[800px]">{siteSettings.announcementText}</span>
          {siteSettings.announcementLink && (
            <Link
              href={siteSettings.announcementLink}
              className="underline underline-offset-2 hover:opacity-80 font-semibold shrink-0"
            >
              Details →
            </Link>
          )}
        </div>
      )}
      <div className="mx-auto flex h-[86px] w-[min(1480px,calc(100%_-_80px))] items-center justify-between gap-4 mobile:h-[62px] mobile:w-[calc(100%_-_34px)]">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Looksbay Studio home">
          <Image src="/looksbay-logo.png" alt="Looksbay" width={1024} height={194} priority className="h-auto w-[180px] mobile:w-[150px]" />
        </Link>
        <div className="flex h-full flex-1 items-center justify-center">
          <nav className="desktop-header-only desktop-header-nav flex h-full translate-x-6 items-center gap-7 tablet:hidden mobile:hidden" aria-label="Main navigation">
            <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/">Home</Link>
            <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/templates">Templates</Link>
           
            {/* Services with Connected Pointer Arrow Mega Menu */}
            <div
              ref={menuRef}
              className="group/nav flex h-full items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Anchor container specifically for Services trigger & the Caret Arrow */}
              <div className="relative flex h-full items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`inline-flex h-full items-center gap-1.5 text-[17px] font-medium transition-colors ${
                    isServicesActive || isVisible
                      ? "text-[#0077ED]"
                      : "text-[#2e2f32] hover:text-[#0077ED]"
                  }`}
                  aria-expanded={isVisible}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${
                      isVisible ? "rotate-180 text-[#0077ED]" : "text-[#86868B]"
                    }`}
                  />
                </button>

                {/* Pointer Caret Arrow (Connecting Nav to Mega Menu) */}
                <div
                  className={`pointer-events-none absolute bottom-[-8px] left-1/2 z-[30] -translate-x-1/2 transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 ${
                    isVisible
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-1.5 opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  <div className="size-4 rotate-45 border-l border-t border-[#dedee3] bg-white shadow-[-2px_-2px_4px_rgba(0,0,0,0.04)]" />
                </div>
              </div>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute left-1/2 top-[85px] z-[22] w-[min(1480px,calc(100vw_-_40px))] -translate-x-1/2 rounded-[14px] border border-black/[0.08] bg-white p-7 shadow-[0_24px_60px_rgba(29,29,31,.14)] transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 ${
                  isVisible
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0"
                }`}
              >
                <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
                  <defs>
                    <linearGradient id="menu-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2997FF" />
                      <stop offset="35%" stopColor="#A855F7" />
                      <stop offset="65%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#FF9500" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-4 items-stretch gap-6">
                  {menuCards.map(({ title, description, href, icon: Icon }) => (
                    <Link
                      className="flex min-h-[240px] flex-col items-start rounded-[12px] border border-[#dedee3] bg-[#f5f5f7] px-8 py-7 transition-all duration-200 hover:border-[#0077ED]/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(29,29,31,.08)]"
                      href={href}
                      key={title}
                      onClick={() => {
                        setIsOpen(false);
                        setIsHovered(false);
                      }}
                    >
                      <span className="mb-6 grid size-[52px] shrink-0 place-items-center rounded-[10px] bg-white shadow-[0_4px_12px_rgba(0,0,0,.06)]">
                        <Icon size={22} strokeWidth={1.8} stroke="url(#menu-icon-gradient)" />
                      </span>
                      <span className="grid gap-2">
                        <strong className="gradient-heading text-[18px] font-bold leading-tight">
                          {title}
                        </strong>
                        <small className="text-[14px] leading-[1.6] text-muted">
                          {description}
                        </small>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/portfolio">Portfolio</Link>
            <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/blog">Blog</Link>
            <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/contact">Contact</Link>
          </nav>
        </div>
       
        <div className="desktop-header-only desktop-header-actions flex items-center gap-5 pl-2 tablet:hidden mobile:hidden">
          <HeaderAuth />
          <Link href="/contact" className="inline-flex min-h-[52px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#0077ED] px-[22px] text-[17px] font-bold text-white transition hover:bg-[#0062C4]">Book a call</Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-6 pb-5 pt-[58px] text-ink mobile:px-[18px] mobile:pt-11">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
        <Link href="/" className="inline-flex items-center rounded-[10px] bg-white px-3 py-2 shadow-sm border border-black/[0.06]" aria-label="Looksbay Studio home">
          <Image src="/looksbay-logo.png" alt="Looksbay" width={1024} height={194} className="h-auto w-[180px]" />
        </Link>
        <p className="mb-0 mt-4 max-w-[560px] text-[15px] leading-7 text-muted">
          Thoughtful Squarespace websites for people with something to say, sell, or change.
        </p>

        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[14px] font-medium mobile:gap-x-5" aria-label="Footer navigation">
          <Link className="transition-colors hover:text-blue" href="/">Home</Link>
          <Link className="transition-colors hover:text-blue" href="/templates">Templates</Link>
          <Link className="transition-colors hover:text-blue" href="/services/bespoke-web-design">Services</Link>
          <Link className="transition-colors hover:text-blue" href="/portfolio">Portfolio</Link>
          <Link className="transition-colors hover:text-blue" href="/blog">Blog</Link>
          <Link className="transition-colors hover:text-blue" href="/contact">Contact</Link>
        </nav>

        <div className="mt-5 flex max-w-[900px] flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted mobile:gap-x-4">
          <Link className="transition-colors hover:text-blue" href="/services/bespoke-web-design">Bespoke web design</Link>
          <Link className="transition-colors hover:text-blue" href="/services/technical-seo">Technical SEO</Link>
          <Link className="transition-colors hover:text-blue" href="/services/lightning-speed">Lightning speed</Link>
          <Link className="transition-colors hover:text-blue" href="/services/dedicated-support">Dedicated support</Link>
          <Link className="transition-colors hover:text-blue" href="/services/template-setup">Template setup</Link>
        </div>

        <SocialLinks className="mt-5" />

        <div className="mt-8 w-full max-w-[560px] rounded-[14px] border border-line bg-white px-7 py-6 shadow-[0_12px_35px_rgba(29,29,31,.06)] mobile:px-5 mobile:py-6">
          <h2 className="gradient-heading mb-2 mt-0 text-[26px] font-bold leading-tight">Ready to love your website?</h2>
          <p className="mx-auto mb-5 mt-0 max-w-[420px] text-sm leading-6 text-muted">
            Tell us what you’re dreaming about. We’re listening.
          </p>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0077ED] px-6 font-semibold text-white transition hover:bg-[#0062C4]">
            Start a conversation
          </Link>
        </div>

        <div className="mt-8 flex w-full items-center justify-between border-t border-line py-4 text-[13px] text-muted mobile:flex-col mobile:gap-1.5">
          <span>© 2026 Looksbay Studio. All rights reserved.</span>
          <a className="transition-colors hover:text-blue" href="mailto:hello@looksbay.com">hello@looksbay.com</a>
          <div className="flex items-center gap-3">
            <span>Made thoughtfully, in Squarespace.</span>
            <Link href="/admin" className="text-black/30 hover:text-[#0077ED] transition-colors" title="Admin Portal">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  gradientTitle,
  secondaryTitle,
  description,
  className = "",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  gradientTitle?: string;
  secondaryTitle?: string;
  description: string;
  className?: string;
}) {
  return (
    <section className={`w-full border-b border-black/[0.06] bg-[#F5F5F7] px-6 text-center ${className || "pt-16 tablet:pt-24 desktop:pt-[130px] pb-14 tablet:pb-20 desktop:pb-[120px]"}`}>
      <div className="mx-auto max-w-[820px]">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0077ED]">
            {eyebrow}
          </p>
        )}
        <h1 className="mb-4 text-[clamp(24px,3.2vw,38px)] font-extrabold tracking-[-0.025em] leading-[1.14] uppercase">
          {gradientTitle ? (
            <>
              <span className="apple-gradient-heading inline-block">
                {gradientTitle}
              </span>
              {secondaryTitle && (
                <span className="block text-[#1D1D1F] mt-1.5 tracking-[-0.025em]">
                  {secondaryTitle}
                </span>
              )}
            </>
          ) : (
            <span className="apple-gradient-heading inline-block">
              {title}
            </span>
          )}
        </h1>
        <p className="mx-auto mb-0 max-w-[520px] text-base desktop:text-[16px] leading-[1.65] text-[#6E6E73] font-normal">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ImageFrame({ image, imageAlt, className = "", imagePosition }: { image: string; imageAlt: string; className?: string; imagePosition?: string }) {
  return <div className={`h-full w-full overflow-hidden bg-[#e9e6df] ${className}`}><img className="h-full w-full object-cover transition-transform duration-500" src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=1000&q=85`} alt={imageAlt} style={{ objectPosition: imagePosition }} loading="lazy" /></div>;
}

export function NewsletterCTA() {
  return (
    <section className="bg-white py-12 tablet:py-16 desktop:py-20">
      <div className="site-container">
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[20px] bg-[#E8F0FE] border border-[#0077ED]/15 px-8 py-14 tablet:py-16 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0077ED]">
            <span className="size-1.5 rounded-full bg-[#0077ED]" />
            The beginning of something good
          </span>
          <h2 className="gradient-heading my-4 text-[clamp(32px,4.5vw,54px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1D1D1F]">
            Ready to love your website?
          </h2>
          <p className="mb-8 max-w-[480px] text-base text-[#515154] leading-relaxed">
            Tell us what you’re dreaming about. We’re listening.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0077ED] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0062C4]"
          >
            Let’s talk
          </Link>
        </div>
      </div>
    </section>
  );
}