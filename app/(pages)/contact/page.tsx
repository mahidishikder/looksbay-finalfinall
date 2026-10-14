import type { Metadata } from "next";
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
    <>
      <PageIntro
        eyebrow="WELL, HELLO THERE"
        title={<>Let’s talk about<br /><span className="bg-gradient-to-r from-blue via-[#7257ff] to-[#d94d9a] bg-clip-text text-transparent">what’s next.</span></>}
        description={description}
      />
      <section className="mx-auto grid w-[min(1000px,calc(100%_-_48px))] grid-cols-1 gap-[22px] pb-[70px] mobile:w-[calc(100%_-_36px)] mobile:pb-[54px]">
        <div className="grid grid-cols-2 gap-6 rounded-xl border border-line bg-white p-6 mobile:grid-cols-1">
          <div className="grid gap-2"><span className="text-sm text-muted">A little note, anytime</span><a className="text-lg font-semibold text-blue" href="mailto:hello@looksbay.com">hello@looksbay.com</a></div>
          <div className="grid gap-2"><span className="text-sm text-muted">We’re a remote-first studio</span><a className="text-lg font-semibold text-blue" href="https://instagram.com" target="_blank" rel="noreferrer">Find us on Instagram ↗</a></div>
        </div>
        <InquiryForm />
      </section>
    </>
  );
}
