"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "@/app/shared/components/site-components";
import { projects } from "../data";

const filters = ["Everything", "Creative", "Wellness", "E-commerce"];

export default function PortfolioShowcase() {
  const [active, setActive] = useState("Everything");
  const visible = projects.filter((project) => active === "Everything" || project.industry === active);
  return (
    <div className="mx-auto w-[min(1480px,calc(100%_-_96px))] pb-[78px] mobile:w-[calc(100%_-_36px)]">
      <article className="mb-10 grid grid-cols-2 items-center gap-8 overflow-hidden rounded-[10px] border border-black/[0.08] bg-[#F5F5F7] p-5 tablet:grid-cols-1 mobile:grid-cols-1 mobile:p-2.5">
        <div className="h-[460px] overflow-hidden rounded-[10px] tablet:h-[360px] mobile:h-[250px]"><ImageFrame image="photo-1517248135467-4c7edcad34c4" imageAlt="Intimate independent restaurant in warm natural light" /></div>
        <div className="px-5 py-8 mobile:px-1 mobile:py-3">
          <span className="text-[15px] font-semibold tracking-[.08em] text-blue">OUR APPROACH, IN PRACTICE</span>
          <h2 className="mb-3 mt-4 text-[clamp(32px,4vw,52px)] font-semibold leading-tight">People first.<br />Pixels second.</h2>
          <p className="mb-5 text-base leading-[1.7] text-muted">A good-looking website is only the beginning. We take the time to understand the people behind each project, then build an online home that feels genuinely theirs.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-base font-medium text-blue">Let’s make something good <ArrowRight size={15} /></Link>
        </div>
      </article>
      <div className="mb-6 flex flex-wrap gap-[7px]" role="group" aria-label="Filter projects">
        {filters.map((filter) => <button type="button" className={`min-h-[34px] rounded-full border px-[13px] text-sm transition ${active === filter ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-blue hover:text-blue"}`} key={filter} onClick={() => setActive(filter)} aria-pressed={active === filter}>{filter}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-6 pb-[55px] tablet:grid-cols-1 mobile:grid-cols-1" aria-live="polite">
        {visible.map((project) => (
          <article className="overflow-hidden rounded-[10px] border border-black/[0.08] bg-white transition hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]" key={project.name}>
            <div className="relative h-[430px] overflow-hidden rounded-t-[10px] mobile:h-[280px]"><ImageFrame image={project.image} imageAlt={project.alt} /><span className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-sm">{project.kind}</span></div>
            <div className="p-7 mobile:p-5">
              <span className="text-sm font-semibold text-blue">{project.industry}</span>
              <h3 className="mb-2 mt-1 text-2xl font-semibold">{project.name}</h3>
              <p className="text-base leading-[1.7] text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="rounded-full bg-paper px-3 py-1.5 text-sm text-muted" key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
        <p className="col-span-full mt-0 text-center text-base text-muted">Selected studio concepts. Client projects and measured performance results will appear here when available.</p>
      </div>
    </div>
  );
}