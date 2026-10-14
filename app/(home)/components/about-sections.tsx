import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ImageFrame } from "@/app/shared/components/site-components";

export function PackageSection() {
  return (
    <section className="grid grid-cols-2 items-center gap-14 bg-paper px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] tablet:grid-cols-1 tablet:gap-[27px] mobile:grid-cols-1 mobile:gap-[27px] mobile:px-[18px] mobile:py-[60px]">
      <div className="relative grid min-h-[300px] place-items-center mobile:min-h-[250px]">
        <div className="w-[84%] rotate-[-3deg] rounded-t-[10px] border-[5px] border-b-[14px] border-[#292929] bg-[#222] p-[10px] shadow-[0_14px_27px_rgba(0,0,0,.15)]">
          <div className="h-[206px] overflow-hidden bg-white mobile:h-[168px]"><img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=85" alt="Squarespace website package preview" /></div>
        </div>
        <div className="absolute bottom-1 right-[4%] h-[155px] w-[21%] overflow-hidden rounded-[13px] border-4 border-[#242424] bg-white p-[5px]"><img className="h-full w-full rounded-md object-cover" src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80" alt="Responsive website on mobile" /></div>
      </div>
      <div>
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">THOUGHTFUL FROM START TO FINISH</span>
        <h2 className="mb-2 mt-1.5 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Squarespace Web Design Package</h2>
        <p className="text-base leading-[1.6] text-muted">We take care of the details, so you can focus on running your business. Your Squarespace website package includes:</p>
        <ul className="my-[17px] mb-[22px] grid list-none gap-2.5 p-0">
          <li className="flex items-center gap-2 text-[15px] text-muted"><Check className="shrink-0 text-blue" size={16} aria-hidden="true" />Custom design tailored to your brand</li>
          <li className="flex items-center gap-2 text-[15px] text-muted"><Check className="shrink-0 text-blue" size={16} aria-hidden="true" />Responsive desktop, tablet, and mobile layouts</li>
          <li className="flex items-center gap-2 text-[15px] text-muted"><Check className="shrink-0 text-blue" size={16} aria-hidden="true" />Search-ready page structure and metadata</li>
          <li className="flex items-center gap-2 text-[15px] text-muted"><Check className="shrink-0 text-blue" size={16} aria-hidden="true" />Training and a thoughtful launch handover</li>
        </ul>
        <Link href="/services" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue px-[22px] text-[15px] font-bold text-white transition hover:bg-blue-hover">EXPLORE THE PACKAGE <ArrowRight size={14} /></Link>
      </div>
    </section>
  );
}

export function StudioQuoteSection() {
  return (
    <section className="bg-white px-[22px] py-[100px] text-center mobile:py-[60px]">
      <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">A NOTE FROM THE STUDIO</span>
      <blockquote className="mx-auto my-3 max-w-[760px] text-xl leading-[1.55] text-ink mobile:text-[17px]">“We care about every website we make. It’s not just a design project—it’s your business, your story, and your next chapter. Our job is to make sure it feels like you.”</blockquote>
      <p className="m-0 text-sm text-muted">Looksbay Studio · Independent Squarespace specialists</p>
    </section>
  );
}

export function ExpertSection() {
  return (
    <section className="grid grid-cols-[.88fr_1.12fr] items-center gap-11 bg-[linear-gradient(110deg,#f5f5f7_0_39%,#fff_39%_100%)] px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] tablet:grid-cols-1 tablet:gap-[27px] mobile:grid-cols-1 mobile:gap-[27px] mobile:py-[60px]">
      <div className="mx-auto h-[320px] w-full max-w-[470px] tablet:h-[300px] mobile:h-[250px]"><ImageFrame className="rounded" image="photo-1580489944761-15a19d654956" imageAlt="Looksbay website designer working with a client" /></div>
      <div>
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">A SMALL, SPECIALIST STUDIO</span>
        <h2 className="mb-[11px] mt-2 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Expert Squarespace Website Designer</h2>
        <p className="my-[9px] text-sm leading-[1.6] text-muted">Get thoughtful, one-to-one support from a specialist Squarespace designer. We bring design, front-end development, and SEO together, so your project has a clear direction and a consistent team from first conversation through launch.</p>
        <p className="my-[9px] text-sm leading-[1.6] text-muted">We believe a good website should be beautiful, easy to use, and practical to manage. Every decision is made with your people and your business in mind.</p>
        <Link href="/services" className="mt-1 inline-flex items-center gap-2 text-[15px] font-semibold tracking-[.05em] text-blue">READ MORE ABOUT OUR APPROACH <ArrowRight size={14} /></Link>
        <div className="mt-[18px] flex flex-wrap gap-[9px]">
          <span className="min-w-[100px] border border-line p-3 text-[9px] leading-[1.5] text-muted">SQUARESPACE<br /><strong className="text-xs text-ink">Circle</strong> member</span>
          <span className="min-w-[100px] border border-line p-3 text-[9px] leading-[1.5] text-muted">5.0 / 5<br /><strong className="text-xs text-ink">Client-rated</strong></span>
          <span className="min-w-[100px] border border-line p-3 text-[9px] leading-[1.5] text-muted">INDEPENDENT<br /><strong className="text-xs text-ink">Studio</strong></span>
        </div>
      </div>
    </section>
  );
}
