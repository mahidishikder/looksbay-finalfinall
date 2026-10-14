import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CodeXml, Layers2, Menu, RefreshCw, Search, Sparkles, X } from "lucide-react";
import { services } from "../data/services";

const serviceIcons = { layers: Layers2, code: CodeXml, refresh: RefreshCw, search: Search, sparkles: Sparkles };

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/95 backdrop-blur-xl">
      <div className="hidden min-h-6 place-items-center bg-blue px-3.5 py-1 text-center text-[10px] font-semibold tracking-[.07em] text-white">
        SPECIAL OFFER: COMPLIMENTARY SEO REVIEW WITH EVERY CUSTOM WEBSITE PROJECT
      </div>
      <div className="mx-auto flex h-[86px] w-[min(1480px,calc(100%_-_80px))] items-center justify-between mobile:h-[62px] mobile:w-[calc(100%_-_34px)]">
        <Link href="/" className="inline-flex w-max items-center" aria-label="Looksbay Studio home">
          <Image src="/looksbay-logo.jpg" alt="Looksbay" width={1941} height={544} priority className="h-auto w-[170px] mobile:w-[145px]" />
        </Link>
        <nav className="flex h-full items-center gap-7 tablet:hidden mobile:hidden" aria-label="Main navigation">
          <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/">Home</Link>
          <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/templates">Templates</Link>
          <div className="group/nav flex h-full items-center">
            <Link href="/services" className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" aria-haspopup="true">Services</Link>
            <div className="invisible absolute left-1/2 top-[81px] z-[22] grid w-[min(1040px,calc(100vw_-_40px))] -translate-x-1/2 translate-y-2 grid-cols-4 items-stretch gap-4 rounded-2xl border border-line bg-white/95 p-7 opacity-0 shadow-[0_24px_60px_rgba(29,29,31,.14)] transition-all group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
              <div className="col-span-full px-0.5 pb-2 text-xl font-semibold leading-tight">Everything Squarespace, under one roof.</div>
                {services.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  return (
                    <Link className="flex min-h-[190px] flex-col items-start gap-[18px] border border-line bg-gradient-to-br from-white to-[#f8faff] px-[18px] py-[22px] transition-all hover:-translate-y-[3px] hover:border-blue/40 hover:bg-[#f2f8ff] hover:shadow-[0_10px_24px_rgba(0,119,237,.09)]" href={service.href} key={service.name}>
                      <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-[#eef5ff] text-blue"><Icon size={19} strokeWidth={1.7} /></span>
                      <span className="grid gap-2"><strong className="text-base font-semibold text-ink">{service.name}</strong><small className="text-[15px] leading-[1.5] text-muted">{service.description}</small></span>
                    </Link>
                  );
                })}
              <Link href="/services" className="col-span-full flex items-center gap-2 justify-self-start pt-1 text-[15px] font-semibold text-blue">Explore all services</Link>
            </div>
          </div>
          <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/portfolio">Portfolio</Link>
          <Link className="inline-flex h-full items-center text-[17px] font-medium text-[#2e2f32] transition-colors hover:text-blue" href="/contact">Contact</Link>
        </nav>
        <Link href="/contact" className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-br from-[#0a62eb] to-[#0d4dbd] px-[22px] text-[17px] font-bold text-white transition hover:-translate-y-px hover:from-[#0d5fe5] hover:to-[#0b44a9] tablet:hidden mobile:hidden">Book a call <ArrowRight size={15} /></Link>
        <details className="group hidden tablet:block mobile:block">
          <summary className="grid size-10 cursor-pointer list-none place-items-center [&::-webkit-details-marker]:hidden" aria-label="Open navigation menu"><Menu size={22} className="group-open:hidden" /><X size={22} className="hidden group-open:block" /></summary>
          <nav className="absolute inset-x-0 top-full z-20 hidden gap-1 border-t border-line bg-white p-4 shadow-lg group-open:grid" aria-label="Mobile navigation">
            {[['Home', '/'], ['Templates', '/templates'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Contact', '/contact']].map(([name, href]) => <Link className="flex items-center justify-between py-3 text-base" href={href} key={href}>{name}<ArrowRight size={16} /></Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper text-ink">
      <div className="grid grid-cols-1">
        <div className="hidden bg-white p-10">
          <Link href="/" className="inline-flex w-max items-center"><Image src="/looksbay-logo.jpg" alt="Looksbay" width={1941} height={544} className="h-auto w-[170px]" /></Link>
          <p className="text-muted">Thoughtful websites for people with something to say, sell, or change.</p>
          <a href="mailto:hello@looksbay.com" className="inline-flex items-center gap-2 text-blue">hello@looksbay.com <ArrowRight size={15} /></a>
        </div>
        <div className="mx-auto w-full max-w-[1480px] px-6 pt-[52px] mobile:px-[22px]">
          <div className="grid grid-cols-[1fr_1fr_1.25fr] gap-8 mobile:grid-cols-2 mobile:gap-x-[18px] mobile:gap-y-7">
            <div className="grid content-start gap-3">
              <strong className="text-base font-semibold">Services</strong>
              <Link className="text-muted transition-colors hover:text-blue" href="/services#template-setup">Template setup</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/services#custom-design">Custom website</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/services#website-redesign">Website redesign</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/services#seo">SEO &amp; performance</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/services#brand-launch">Brand &amp; website</Link>
            </div>
            <div className="grid content-start gap-3">
              <strong className="text-base font-semibold">Explore</strong>
              <Link className="text-muted transition-colors hover:text-blue" href="/">Home</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/templates">Templates</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/portfolio">Our work</Link>
              <Link className="text-muted transition-colors hover:text-blue" href="/contact">Contact</Link>
            </div>
            <div className="grid content-start justify-items-start gap-3 mobile:col-span-full">
              <strong className="text-base font-semibold">Have a project in mind?</strong>
              <p className="m-0 text-muted">Let’s make an online home that feels like you.</p>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-br from-[#0a62eb] to-[#0d4dbd] px-[22px] font-bold text-white">Start a conversation <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="mt-[25px] flex min-h-[76px] items-center justify-between border-t border-line text-sm text-muted mobile:flex-col mobile:items-start mobile:justify-center mobile:gap-2 mobile:py-4">
            <span>© 2026 Looksbay Studio. All rights reserved.</span>
            <span>Made thoughtfully, in Squarespace.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <div className="mx-auto max-w-[800px] px-5 pb-11 pt-[76px] text-center"><span className="inline-flex items-center gap-[9px] text-[15px] font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />{eyebrow}</span><h1 className="my-[19px] text-[clamp(40px,5.3vw,63px)] font-semibold leading-[1.08] tracking-normal">{title}</h1><p className="mx-auto max-w-[510px] text-base leading-[1.8] text-muted">{description}</p></div>;
}

export function ImageFrame({ image, imageAlt, className = "", imagePosition }: { image: string; imageAlt: string; className?: string; imagePosition?: string }) {
  return <div className={`h-full w-full overflow-hidden bg-[#e9e6df] ${className}`}><img className="h-full w-full object-cover transition-transform duration-500" src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=1000&q=85`} alt={imageAlt} style={{ objectPosition: imagePosition }} loading="lazy" /></div>;
}

export function NewsletterCTA() {
  return <section className="bg-gradient-to-br from-paper via-white to-[#eef5ff]"><div className="mx-auto flex min-h-[326px] w-[min(1480px,calc(100%_-_96px))] flex-col items-start justify-center py-[57px] mobile:w-[calc(100%_-_36px)]"><span className="inline-flex items-center gap-[9px] text-[15px] font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />The beginning of something good</span><h2 className="my-[19px] text-[clamp(40px,5vw,59px)] font-semibold leading-[1.05]">Ready to love your website?</h2><p className="mb-[22px] mt-0 text-base text-muted">Tell us what you’re dreaming about. We’re listening.</p><Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[10px] bg-blue px-[22px] font-semibold text-white transition hover:bg-blue-hover">Let’s talk <ArrowRight size={16} /></Link></div></section>;
}