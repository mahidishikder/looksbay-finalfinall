"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#fbfbfd] px-6 py-20 text-center">
      <div className="mx-auto max-w-[500px]">
        <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
          Something went wrong
        </span>
        <h1 className="mt-5 text-[32px] font-extrabold text-[#1D1D1F] tracking-tight">
          Oops, an unexpected error occurred.
        </h1>
        <p className="mt-3 text-[15px] text-[#6E6E73] leading-relaxed">
          We’ve logged the issue. You can try refreshing the page or head back to our homepage.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-6 py-3 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#0062C4]"
          >
            <RotateCcw size={15} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-6 py-3 text-[14px] font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
          >
            <Home size={15} />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
