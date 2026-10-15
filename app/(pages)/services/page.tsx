import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CodeXml,
  Globe2,
  Layers2,
  MousePointerClick,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import { NewsletterCTA, PageIntro } from "@/app/shared/components/site-components";
import { services } from "@/app/shared/data/services";
import ServicesPlanner from "./components/services-planner";

const description =
  "Considered Squarespace websites, thoughtful SEO, and the kind of small details that make a big difference.";

export const metadata: Metadata = {
  title: "Services — Squarespace studio",
  description,
};

const serviceIcons = {
  layers: Layers2,
  code: CodeXml,
  refresh: RefreshCw,
  search: Search,
  sparkles: Sparkles,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="SOME THINGS ARE BETTER TOGETHER"
        title={<>A good website.<br /><span className="bg-gradient-to-r from-blue via-[#7257ff] to-[#d94d9a] bg-clip-text text-transparent">A good team.</span></>}
        description={description}
      />
      <div className="mx-auto w-[min(1480px,calc(100%_-_96px))] pb-[85px] mobile:w-[calc(100%_-_36px)] mobile:pb-[55px]">
        <div className="grid gap-[13px] mobile:gap-[9px]">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article className="grid scroll-mt-[95px] grid-cols-[58px_1fr_auto] items-center gap-[18px] rounded-[10px] border border-black/[0.08] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card mobile:grid-cols-[41px_1fr] mobile:gap-3 mobile:px-[13px] mobile:py-[17px]" id={service.id} key={service.id}>
                <span className="grid size-[46px] place-items-center bg-[#eef5ff] text-blue mobile:size-[37px]"><Icon size={21} strokeWidth={1.7} /></span>
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[.65px] text-blue">0{index + 1} / MADE FOR YOUR BUSINESS</span>
                  <h2 className="mb-1.5 mt-1 text-lg font-semibold">{service.name}</h2>
                  <p className="mb-0 mt-0 max-w-[565px] text-base leading-[1.75] text-muted">{service.description}</p>
                  <div className="mt-[11px] flex flex-wrap gap-[7px]">{service.features.map((feature) => <span className="rounded-full bg-paper px-[9px] py-[5px] text-sm text-muted" key={feature}>{feature}</span>)}</div>
                </div>
                <div className="grid justify-items-end gap-2 mobile:col-start-2 mobile:grid-flow-col mobile:items-center mobile:justify-items-start mobile:gap-3">
                  <strong className="text-[13px] font-semibold mobile:text-sm">{service.price}</strong>
                  <Link href={`/contact?project=${encodeURIComponent(service.name)}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue px-4 text-sm font-semibold text-white transition hover:bg-blue-hover">Make an inquiry <ArrowRight size={14} /></Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-5 py-[42px] tablet:grid-cols-1 tablet:gap-4 tablet:py-7 mobile:grid-cols-1 mobile:gap-4 mobile:py-7">
          <div className="flex items-center gap-[13px]"><span className="grid size-10 shrink-0 place-items-center bg-[#eef5ff] text-blue"><MousePointerClick size={18} /></span><div><h3 className="my-1 text-base font-semibold">First, a conversation.</h3><p className="m-0 text-sm text-muted">No pressure. Just a real chat.</p></div></div>
          <div className="flex items-center gap-[13px]"><span className="grid size-10 shrink-0 place-items-center bg-[#eef5ff] text-blue"><BadgeCheck size={18} /></span><div><h3 className="my-1 text-base font-semibold">Then, a clear proposal.</h3><p className="m-0 text-sm text-muted">Good communication, always.</p></div></div>
          <div className="flex items-center gap-[13px]"><span className="grid size-10 shrink-0 place-items-center bg-[#eef5ff] text-blue"><Globe2 size={18} /></span><div><h3 className="my-1 text-base font-semibold">And your moment to launch.</h3><p className="m-0 text-sm text-muted">We’ll be right there with you.</p></div></div>
        </div>
      </div>
      <section className="scroll-mt-[65px] bg-paper px-6 py-[82px] mobile:px-5 mobile:py-[55px]" id="estimate">
        <div className="mx-auto grid max-w-[1160px] grid-cols-[.8fr_1.2fr] items-start gap-[75px] tablet:grid-cols-1 tablet:gap-5 mobile:grid-cols-1 mobile:gap-5">
          <div><span className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />A little more clarity</span><h2 className="mb-3 mt-4 text-[42px] font-semibold leading-[1.12]">What might<br />this look like?</h2><p className="max-w-[330px] text-base leading-[1.85] text-muted">Choose your starting point and anything else you have in mind. You’ll get a rough estimate in seconds, and a completely human conversation after.</p></div>
          <ServicesPlanner />
        </div>
      </section>
      <NewsletterCTA />
    </>
  );
}
