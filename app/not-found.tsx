import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-[#fbfbfd] px-6 py-20 text-center">
      <div className="mx-auto max-w-[560px]">
        {/* Eyebrow badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ED]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ED]">
          <Sparkles size={13} />
          404 — Page Not Found
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-[clamp(44px,6vw,72px)] font-black tracking-tight text-[#1D1D1F] leading-none">
          Lost in Space?
        </h1>

        <p className="mt-4 text-[16px] text-[#6E6E73] leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved. Let’s get you back to our studio flagship.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#0077ED] px-7 py-3.5 text-[15px] font-bold text-white shadow-sm transition hover:bg-[#0062C4] active:scale-95"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/services/bespoke-web-design"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7] active:scale-95"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
