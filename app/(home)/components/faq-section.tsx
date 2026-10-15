"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data";

export function FAQSection() {
  const [allOpen, setAllOpen] = useState(false);

  return (
    <section className="bg-[#FAFAFC] py-24 md:py-32 px-6 lg:px-12">
      {/* Container width max-w-[1480px] */}
      <div className="mx-auto w-full max-w-[1480px]">
        
        {/* Header Section */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.25em] text-[#2761EB]">
              Good Questions
            </p>
            <h2 className="text-[42px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[54px] md:text-[64px] leading-[1.04]">
              Questions? Answers.
            </h2>
          </div>
          
          {/* Expand All Toggle Link */}
          <div className="shrink-0 pb-1">
            <button
              type="button"
              onClick={() => setAllOpen(!allOpen)}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#2761EB] hover:underline"
            >
              <span>{allOpen ? "Collapse all" : "Expand all"}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${allOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Accordions with Larger Typography */}
        <div className="border-t border-black/10">
          {faqs.map(([question, answer]) => (
            <details
              open={allOpen ? true : undefined}
              className="group border-b border-black/10 py-7 transition-colors duration-200"
              key={question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-[21px] sm:text-[24px] md:text-[26px] font-bold tracking-tight text-[#1D1D1F] [&::-webkit-details-marker]:hidden hover:text-[#2761EB] transition-colors">
                <span className="leading-[1.25]">{question}</span>
                <span className="shrink-0 text-[#86868B] transition-transform duration-300 group-open:rotate-180 group-open:text-[#1D1D1F]">
                  <ChevronDown className="h-6 w-6" />
                </span>
              </summary>
              <p className="mb-0 mt-5 max-w-[1200px] text-[17px] sm:text-[18px] leading-[1.65] text-[#515154]">
                {answer}
              </p>
            </details>
          ))}
        </div>

        {/* Footer Link */}
        <p className="mt-14 text-left text-[17px] font-normal text-[#6E6E73]">
          Still have questions?{" "}
          <Link
            className="font-semibold text-[#2761EB] hover:underline"
            href="/contact"
          >
            Let’s talk.
          </Link>
        </p>

      </div>
    </section>
  );
}