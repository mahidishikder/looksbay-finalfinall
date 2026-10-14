import Link from "next/link";
import { Plus } from "lucide-react";
import { faqs } from "../data";

export function FAQSection() {
  return (
    <section className="bg-paper relative overflow-hidden px-5 py-[120px] mobile:px-[18px] mobile:py-[70px]">
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[820px]">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="inline-block text-[13px] font-bold uppercase tracking-[.18em] text-blue">
            GOOD QUESTIONS
          </span>
          <h2 className="mb-0 mt-2 text-[36px] font-extrabold tracking-tight text-ink mobile:text-[28px]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map(([question, answer]) => (
            <details
              className="group rounded-2xl border border-line bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue/40 hover:bg-white hover:shadow-md"
              key={question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden mobile:text-base">
                <span>{question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue transition-all duration-300 group-open:rotate-45 group-open:bg-blue group-open:text-white">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="mb-0 mt-4 max-w-[720px] text-[15px] leading-[1.65] text-muted mobile:text-sm">
                {answer}
              </p>
            </details>
          ))}
        </div>

        {/* Footer Link */}
        <p className="mt-10 text-center text-base font-medium text-muted">
          More questions?{" "}
          <Link
            className="font-semibold text-blue underline underline-offset-4 transition-opacity hover:opacity-80"
            href="/contact"
          >
            Let’s talk.
          </Link>
        </p>
      </div>
    </section>
  );
}