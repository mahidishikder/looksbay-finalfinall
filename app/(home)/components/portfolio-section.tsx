import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFrame } from "../../components";
import { projects } from "../data";

export function PortfolioSection() {
  return (
    <section className="bg-paper px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] mobile:px-[18px] mobile:py-[60px]">
      <div className="mb-[23px] flex items-end justify-between gap-6 tablet:items-start tablet:flex-col">
        <div className="max-w-[720px]">
          <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">A FEW GOOD PROJECTS</span>
          <h2 className="mb-2 mt-1.5 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Squarespace Website Designer Portfolio</h2>
          <p className="m-0 text-[15px] leading-[1.55] text-muted">Thoughtful Squarespace websites for ambitious businesses looking to elevate their online presence and attract more of their people. Each website is made to feel like its owner: clear, considered, and built to grow.</p>
        </div>
        <Link href="/portfolio" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue px-[22px] text-[15px] font-bold text-white transition hover:bg-blue-hover">VIEW MORE WORK <ArrowRight size={14} /></Link>
      </div>
      <div className="grid grid-cols-3 gap-7 tablet:grid-cols-2 mobile:gap-2.5">
        {projects.map((project) => (
          <Link href="/portfolio" className="min-w-0 rounded-lg border border-line bg-gradient-to-br from-white to-[#fbfcff] p-3.5 text-center shadow-card mobile:p-[11px]" key={project.name}>
            <ImageFrame className="h-[250px] mobile:h-[105px]" image={project.image} imageAlt={project.alt} />
            <h3 className="mb-[3px] mt-4 text-[17px] font-semibold mobile:text-[15px]">{project.name}</h3>
            <p className="mb-[9px] mt-0 text-[15px] text-muted mobile:text-[11px]">{project.type}</p>
            <span className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#eef5ff] text-[15px] font-semibold text-blue">VIEW PROJECT <ArrowRight size={13} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProjectSection() {
  return (
    <section className="grid grid-cols-2 items-center gap-9 bg-white px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] tablet:grid-cols-1 tablet:gap-7 mobile:px-5 mobile:py-[60px]">
      <div className="max-w-[520px]">
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">FEATURED CUSTOM WEB DESIGN PROJECT</span>
        <h2 className="mb-2.5 mt-2.5 text-[clamp(36px,4vw,54px)] font-semibold leading-tight">A digital home for a brand with a story to tell.</h2>
        <p className="mb-5 mt-0 text-base leading-[1.6] text-muted">Thoughtful design, clear messaging, and a Squarespace experience built around what makes this business different.</p>
        <Link href="/portfolio" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-[22px] text-[15px] font-bold text-blue transition hover:bg-[#eef5ff]">VIEW THE PROJECT <ArrowRight size={14} /></Link>
      </div>
      <div className="relative grid min-h-[300px] place-items-center tablet:min-h-[250px] mobile:min-h-[205px]">
        <div className="w-[74%] rotate-[-2deg] rounded-md border-[5px] border-[#252525] bg-white p-[11px] shadow-[0_15px_24px_rgba(0,0,0,.24)]">
          <span className="block p-2 text-[17px] font-bold text-[#542646]">GOOD THINGS<br />GROW HERE.</span>
          <div className="h-[139px] overflow-hidden rounded bg-[#e7e2dc] mobile:h-[110px]"><img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Featured website project preview" /></div>
        </div>
        <div className="absolute bottom-0 right-[3%] h-[140px] w-[20%] rotate-[5deg] overflow-hidden rounded-xl border-4 border-[#222] bg-white p-[5px] mobile:h-[120px]"><img className="h-full w-full rounded-md object-cover" src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80" alt="Featured project on a mobile phone" /></div>
      </div>
    </section>
  );
}
