"use client";

import { useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { ImageFrame } from "./components";
import { templates, type Template } from "./data";

const filters = ["All templates", "Therapists", "Coaches", "Consultants", "Photographers", "Small business", "Law firms", "Wellness", "E-commerce"];

export default function TemplateMarketplace() {
  const [activeFilter, setActiveFilter] = useState("All templates");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<Template | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  const visibleTemplates = templates.filter((template) => {
    const matchesFilter = activeFilter === "All templates" || template.tags.includes(activeFilter);
    const matchesSearch = `${template.name} ${template.description} ${template.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="mx-auto w-[min(1480px,calc(100%_-_96px))] pb-[78px] mobile:w-[calc(100%_-_36px)]">
      <div className="mb-6 mt-2 flex items-center justify-between gap-3 mobile:items-start mobile:flex-col">
        <div className="flex flex-wrap gap-[7px]" role="group" aria-label="Filter templates by industry">
          {filters.map((filter) => <button type="button" className={`min-h-[34px] rounded-full border px-[13px] text-sm transition ${activeFilter === filter ? "border-ink bg-ink text-white" : "border-line bg-white text-muted hover:border-blue hover:text-blue"}`} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}
        </div>
        <span className="whitespace-nowrap text-sm text-muted" aria-live="polite">{visibleTemplates.length} {visibleTemplates.length === 1 ? "design" : "designs"}</span>
      </div>
      <label className="ml-auto mb-6 flex min-h-[42px] w-full max-w-[316px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-muted transition focus-within:border-blue focus-within:ring-[3px] focus-within:ring-blue/15">
        <Search size={15} aria-hidden="true" /><span className="sr-only">Search templates</span>
        <input className="h-[35px] w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted" type="search" placeholder="Search by name or industry" value={search} onChange={(event) => setSearch(event.target.value)} />
        <button className="grid size-7 shrink-0 place-items-center text-muted" type="button" aria-label="Clear search" onClick={() => setSearch("")}><X size={15} /></button>
      </label>
      <div className="grid grid-cols-3 gap-x-[19px] gap-y-[31px] tablet:grid-cols-2 mobile:grid-cols-1">
        {visibleTemplates.length ? visibleTemplates.map((template) => (
          <article className="rounded-[13px] border border-ink/5 bg-white p-2.5 transition hover:-translate-y-[3px] hover:shadow-[0_12px_35px_rgba(29,29,31,.09)]" key={template.name}>
            <div className="group relative aspect-[1.15] overflow-hidden rounded-[7px] bg-[#e8e6e1]">
              <ImageFrame image={template.image} imageAlt={template.imageAlt} imagePosition={template.imagePosition} />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-[7px] text-sm">{template.category}</span>
              {template.previousPrice && <span className="absolute right-3 top-3 rounded-full bg-[#edf4eb] px-2.5 py-[7px] text-sm text-[#3f6940]">Save 25%</span>}
              <button type="button" className="absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-[7px] rounded-full bg-white/95 px-3 py-[9px] text-sm opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100" onClick={() => { setPreview(template); previewDialog.current?.showModal(); }}>Take a look <ArrowRight size={14} /></button>
            </div>
            <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-3.5">
              <div><h2 className="m-0 text-lg font-semibold">{template.name}</h2><p className="mb-0 mt-1 text-sm leading-[1.5] text-muted">{template.description}</p></div>
              <span className="whitespace-nowrap pt-1 text-sm font-semibold">${template.price}{template.previousPrice && <span className="ml-1 text-xs text-muted line-through">${template.previousPrice}</span>}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line px-1 pt-2.5">
              <div className="flex flex-wrap gap-[5px]">{template.tags.slice(0, 2).map((tag) => <span className="rounded-full bg-paper px-2 py-[5px] text-xs text-muted" key={tag}>{tag}</span>)}</div>
              <a className="inline-flex items-center gap-[5px] whitespace-nowrap text-sm text-blue" href={`/contact?template=${encodeURIComponent(template.name)}`}>Choose template <ArrowRight size={13} /></a>
            </div>
          </article>
        )) : <div className="col-span-full grid min-h-[150px] place-items-center text-muted">No templates match just yet. Try another search.</div>}
      </div>
      <dialog className="fixed inset-0 m-auto max-h-[min(680px,calc(100dvh_-_40px))] w-[min(560px,calc(100vw_-_36px))] overflow-visible rounded-[14px] bg-white p-0 shadow-[0_22px_90px_rgba(0,0,0,.22)] backdrop:bg-black/50 backdrop:backdrop-blur-sm" ref={previewDialog} onClose={() => setPreview(null)} aria-labelledby="preview-title">
        <button className="absolute right-3 top-3 z-10 grid size-[35px] place-items-center rounded-full border border-ink/5 bg-white/95 text-ink" type="button" aria-label="Close template preview" onClick={() => previewDialog.current?.close()}><X size={18} /></button>
        {preview && <div><ImageFrame className="h-[min(310px,40dvh)] rounded-t-[14px]" image={preview.image} imageAlt={preview.imageAlt} imagePosition={preview.imagePosition} /><div className="p-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />SQUARESPACE 7.1 · {preview.category.toUpperCase()}</span>
          <h2 className="mb-1.5 mt-2.5 text-[27px] font-semibold" id="preview-title">{preview.name}</h2><p className="mb-3 mt-0 text-base text-muted">{preview.description}</p>
          <div className="flex flex-wrap gap-[5px]">{preview.tags.map((tag) => <span className="rounded-full bg-paper px-2 py-[5px] text-xs text-muted" key={tag}>{tag}</span>)}</div>
          <div className="mt-[19px] flex items-center justify-between border-t border-line pt-4"><strong className="text-xl">${preview.price}</strong><a href={`/contact?template=${encodeURIComponent(preview.name)}`} className="inline-flex min-h-12 items-center gap-2.5 rounded-[10px] bg-blue px-[22px] font-semibold text-white">Make it yours <ArrowRight size={15} /></a></div>
        </div></div>}
      </dialog>
      <p className="mb-0 mt-5 text-center text-base text-muted">Every template is designed for Squarespace 7.1 and Fluid Engine. One purchase, yours to keep.</p>
      <section className="scroll-mt-[88px] pt-[67px]" id="buying-guide">
        <div className="grid grid-cols-[.75fr_1.25fr] gap-20 tablet:grid-cols-1 tablet:gap-3 mobile:grid-cols-1 mobile:gap-3">
          <div><span className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />Good to know</span><h2 className="mb-2.5 mt-3.5 text-[38px] font-semibold">A few things<br />you might wonder.</h2><p className="max-w-[350px] text-base leading-[1.8] text-muted">A template should be the easy part. Here’s what happens next.</p></div>
          <div>
            <details className="group border-b border-line"><summary className="flex min-h-[55px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">Will this work with my Squarespace website?<span className="text-xl text-blue group-open:rotate-45">+</span></summary><p className="mb-[18px] mt-0 max-w-[510px] text-base leading-[1.8] text-muted">Yes. These designs are built exclusively for Squarespace 7.1 using Fluid Engine. Your Squarespace subscription is separate; we’ll walk you through the transfer after purchase.</p></details>
            <details className="group border-b border-line"><summary className="flex min-h-[55px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">Is installation included in the price?<span className="text-xl text-blue group-open:rotate-45">+</span></summary><p className="mb-[18px] mt-0 max-w-[510px] text-base leading-[1.8] text-muted">Templates are a one-time purchase. If you’d rather have us install your template, move your content, and tailor everything to your brand, our setup service is available separately.</p></details>
            <details className="group border-b border-line"><summary className="flex min-h-[55px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">Can I try it before I commit?<span className="text-xl text-blue group-open:rotate-45">+</span></summary><p className="mb-[18px] mt-0 max-w-[510px] text-base leading-[1.8] text-muted">Get in touch and we’ll share a live preview of the design you’re considering. We want you to feel confident about your choice.</p></details>
            <details className="group border-b border-line"><summary className="flex min-h-[55px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">What if I need a little extra help?<span className="text-xl text-blue group-open:rotate-45">+</span></summary><p className="mb-[18px] mt-0 max-w-[510px] text-base leading-[1.8] text-muted">Every template purchase includes our setup guide. Need a hand? We’re a small studio, and we’re happy to chat about making the right updates together.</p></details>
          </div>
        </div>
      </section>
    </div>
  );
}