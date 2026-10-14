import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(110deg,#f5f5f7_0_58%,#fff_58%_100%)]">
      <div className="mx-auto grid min-h-[570px] w-[min(1480px,calc(100%_-_48px))] grid-cols-[0.95fr_1.05fr] items-center gap-[clamp(40px,5vw,70px)] py-[70px] pl-0 pr-0 tablet:min-h-0 tablet:grid-cols-1 tablet:gap-9 mobile:w-[calc(100%_-_36px)] mobile:grid-cols-1 mobile:gap-9 mobile:py-11">
        
        {/* Left Side */}
        <div className="relative z-[1] ml-[10px] max-w-[640px] tablet:ml-0 tablet:max-w-[680px]">
          <span className="inline-block text-[15px] font-bold tracking-[.12em] text-[#2761EB] mobile:text-[10px]">
            SQUARESPACE WEB DESIGN · SEO EXPERT
          </span>

          {/* Title with Gradient covering "Your Entire Squarespace Journey." */}
          <h1 className="my-[18px] max-w-[620px] text-[clamp(42px,4vw,62px)] font-extrabold leading-[1.02] tracking-[-0.05em] mobile:text-[40px]">
            <span className="bg-[linear-gradient(90deg,#007AFF_0%,#8B5CF6_35%,#EC4899_70%,#FF5500_100%)] bg-clip-text text-transparent">
              Your Entire <br />
              Squarespace Journey.
            </span>
            <br />
            <span className="text-[#1D1D1F]">
              Under One Roof.
            </span>
          </h1>

          <p className="my-0 max-w-[440px] text-lg leading-[1.55] text-[#56555d]">
            From custom design and front-end coding to advanced SEO and ready-to-launch templates—we handle everything Squarespace.
          </p>

          <ul className="my-5 mb-7 grid list-none gap-2.5 p-0">
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 text-[#2761EB] shrink-0" />
              <span>Thoughtful custom website design</span>
            </li>
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 text-[#2761EB] shrink-0" />
              <span>Technical SEO and performance</span>
            </li>
            <li className="flex items-center gap-2.5 text-base leading-[1.5] text-[#4d4d54]">
              <CheckCircle2 className="h-5 w-5 text-[#2761EB] shrink-0" />
              <span>Templates ready for your business</span>
            </li>
          </ul>

          {/* Primary Rounded Pill Button */}
          <Link 
            href="/contact" 
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2761EB] px-8 py-4 text-[16px] font-bold tracking-[.02em] text-white shadow-[0_10px_22px_rgba(39,97,235,0.28)] transition-all duration-300 hover:bg-[#1f52cd] hover:shadow-[0_14px_28px_rgba(39,97,235,0.38)] hover:-translate-y-0.5"
          >
            GET STARTED 
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Right Side Image */}
        <div className="mx-auto flex w-full items-center justify-center">
          <img 
            className="h-auto w-full max-w-[760px] object-contain border-0 shadow-none outline-none ring-0 bg-transparent"
            src="https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w"
            alt="Looksbay Squarespace design preview"
          />
        </div>
      </div>
    </section>
  );
}