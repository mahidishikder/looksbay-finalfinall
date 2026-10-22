import type { Metadata } from "next";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { PageIntro } from "@/app/shared/components/site-components";
import InquiryForm from "./components/inquiry-form";

const description =
  "A custom website, a little more clarity, or just a good place to start. We’d love to hear what you have in mind.";

export const metadata: Metadata = {
  title: "Contact — Squarespace studio",
  description,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageIntro
        gradientTitle="Start A Conversation."
        secondaryTitle="Let’s Talk About What’s Next."
        description={description}
      />
      <section className="w-full bg-[#FFFFFF] py-12 desktop:py-16 pb-[82px] mobile:py-8 mobile:pb-[54px]">
        <div className="mx-auto grid w-[min(1100px,calc(100%_-_48px))] grid-cols-1 gap-6 mobile:w-[calc(100%_-_36px)]">
          <div className="grid grid-cols-2 gap-6 rounded-[16px] border border-black/[0.08] bg-[#F5F5F7] p-7 mobile:grid-cols-1 mobile:p-5 shadow-sm">
            <div className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">A Little Note, Anytime</span>
              <a className="text-[17px] font-semibold text-[#0077ED] transition-colors hover:text-[#0066CC]" href="mailto:hello@looksbay.com">
                hello@looksbay.com
              </a>
            </div>
            <div className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">We’re A Remote-First Studio</span>
              <div className="flex items-center gap-2.5 mt-0.5">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-full bg-white border border-black/[0.08] text-[#1D1D1F] transition-all hover:bg-[#0077ED] hover:text-white hover:border-[#0077ED] shadow-sm"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid size-9 place-items-center rounded-full bg-white border border-black/[0.08] text-[#1D1D1F] transition-all hover:bg-[#0077ED] hover:text-white hover:border-[#0077ED] shadow-sm"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-9 place-items-center rounded-full bg-white border border-black/[0.08] text-[#1D1D1F] transition-all hover:bg-[#0077ED] hover:text-white hover:border-[#0077ED] shadow-sm"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
