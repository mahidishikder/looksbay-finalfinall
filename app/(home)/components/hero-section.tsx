import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(110deg,#f5f5f7_0_58%,#fff_58%_100%)]">
      <div className="mx-auto grid min-h-[570px] w-[min(1480px,calc(100%_-_48px))] grid-cols-[1.12fr_.88fr] items-center gap-[clamp(56px,6vw,96px)] py-[70px] pl-0 pr-0 tablet:min-h-0 tablet:grid-cols-1 tablet:gap-9 mobile:w-[calc(100%_-_36px)] mobile:grid-cols-1 mobile:gap-9 mobile:py-11">
        <div className="relative z-[1] ml-[18px] max-w-[760px] tablet:ml-0 tablet:max-w-[680px]">
          <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue mobile:text-[10px]">SQUARESPACE WEB DESIGN · SEO EXPERT</span>
          <h1 className="my-[18px] max-w-[740px] text-[clamp(48px,4.5vw,68px)] font-extrabold leading-[.96] tracking-[-.07em] mobile:text-[42px]">Your Entire Squarespace Journey. <span className="bg-gradient-to-r from-[#1f61eb] via-[#6e61e7] to-[#a255d5] bg-clip-text text-transparent">Under One Roof.</span></h1>
          <p className="my-0 max-w-[470px] text-lg leading-[1.55] text-[#56555d]">From custom design and front-end coding to advanced SEO and ready-to-launch templates—we handle everything Squarespace.</p>
          <ul className="my-5 mb-7 grid list-none gap-2.5 p-0">
            <li className="text-base leading-[1.5] text-[#4d4d54] before:mr-2.5 before:font-bold before:text-blue before:content-['✓']">Thoughtful custom website design</li>
            <li className="text-base leading-[1.5] text-[#4d4d54] before:mr-2.5 before:font-bold before:text-blue before:content-['✓']">Technical SEO and performance</li>
            <li className="text-base leading-[1.5] text-[#4d4d54] before:mr-2.5 before:font-bold before:text-blue before:content-['✓']">Templates ready for your business</li>
          </ul>
          <Link href="/contact" className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#0a62eb] to-[#0d4dbd] px-6 text-lg font-bold tracking-[.03em] text-white shadow-[0_12px_18px_rgba(13,79,189,.18)] transition hover:-translate-y-0.5 hover:brightness-105 mobile:gap-2 mobile:px-3 mobile:text-[13px]">LET’S TALK ABOUT YOUR WEBSITE <ArrowRight size={15} /></Link>
        </div>
        <div className="mx-auto flex min-h-[450px] w-full max-w-[620px] items-center justify-center tablet:min-h-[340px] mobile:min-h-[250px]">
          <img className="h-auto max-h-[450px] w-full rounded-xl border-4 border-[#171717] object-cover shadow-[0_22px_32px_rgba(30,20,29,.18)]"
            src="https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w"
            alt="Looksbay Squarespace design preview"
          />
        </div>
      </div>
    </section>
  );
}
