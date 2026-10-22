import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./components/signup-form";

export const metadata: Metadata = {
  title: "Create Free Member Account",
  description:
    "Join Looksbay Studio to receive free custom CSS code snippets, 20% off Squarespace annual plans, and instant template delivery.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fbfbfd] px-4 py-16">
      <div className="w-full max-w-[500px] rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077ed]">
            VIP Member Access
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-[#515154]">
            Get instant access to developer resources, template updates, and exclusive Circle Partner discounts.
          </p>
        </div>

        <SignupForm />

        <div className="mt-6 border-t border-black/5 pt-5 text-center text-xs text-[#515154]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#0077ed] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
