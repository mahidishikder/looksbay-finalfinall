import Link from "next/link";
import { faqs } from "../data";

export function FAQSection() {
  return (
    <section className="bg-paper px-5 py-[100px] mobile:px-[18px] mobile:py-[60px]">
      <div className="mb-6 text-center">
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">GOOD QUESTIONS</span>
        <h2 className="mb-0 mt-1.5 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Frequently Asked Questions</h2>
      </div>
      <div className="mx-auto max-w-[720px]">
        {faqs.map(([question, answer]) => (
          <details className="border-b border-line group" key={question}>
            <summary className="flex min-h-[47px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
              {question}<span className="text-xl text-blue transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mb-[15px] mt-0 max-w-[640px] text-sm leading-[1.6] text-muted">{answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted">More questions? <Link className="text-blue underline" href="/contact">Let’s talk.</Link></p>
    </section>
  );
}
