"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "./components";

const projects = [
  { name: "Sunday Supply", kind: "Independent retail", industry: "E-commerce", image: "photo-1441986300917-64674bd600d8", alt: "Bright independent clothing boutique with considered window displays", description: "A considered digital shop for the small things that make an ordinary day feel special.", tags: ["Squarespace 7.1", "Custom design"] },
  { name: "Still Life Studio", kind: "Creative practice", industry: "Creative", image: "photo-1497366811353-6870744d04b2", alt: "Naturally lit independent creative studio", description: "A welcoming, picture-led home for the people and stories behind the work.", tags: ["Squarespace 7.1", "Brand & website"] },
  { name: "The Good Practice", kind: "Wellness studio", industry: "Wellness", image: "photo-1540555700478-4be289fbecef", alt: "Quiet light-filled spa and wellness studio", description: "A gentle online first impression that feels like walking into the real studio.", tags: ["Squarespace 7.1", "SEO"] },
  { name: "Oona Objects", kind: "Independent brand", industry: "E-commerce", image: "photo-1483985988355-763728e1935b", alt: "Editorial fashion campaign for an independent considered brand", description: "An editorial storefront with a little more space for the things worth keeping.", tags: ["Squarespace 7.1", "E-commerce"] },
];
const filters = ["Everything", "Creative", "Wellness", "E-commerce"];

export default function PortfolioShowcase() {
  const [active, setActive] = useState("Everything");
  const visible = projects.filter((project) => active === "Everything" || project.industry === active);
  return (
    <div className="mx-auto w-[min(1480px,calc(100%_-_96px))] pb-[78px] mobile:w-[calc(100%_-_36px)]">
      <article className="mb-8 grid grid-cols-2 items-center gap-8 overflow-hidden rounded-xl bg-white p-4 shadow-card tablet:grid-cols-1 mobile:grid-cols-1 mobile:p-2.5">
        <div className="h-[360px] tablet:h-[300px] mobile:h-[225px]"><ImageFrame image="photo-1517248135467-4c7edcad34c4" imageAlt="Intimate independent restaurant in warm natural light" /></div>
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
      <div className="grid grid-cols-2 gap-5 pb-[55px] tablet:grid-cols-1 mobile:grid-cols-1" aria-live="polite">
        {visible.map((project) => (
          <article className="overflow-hidden rounded-xl border border-line bg-white shadow-card" key={project.name}>
            <div className="relative h-[310px] mobile:h-[225px]"><ImageFrame image={project.image} imageAlt={project.alt} /><span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-2 text-sm">{project.kind}</span></div>
            <div className="p-6">
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