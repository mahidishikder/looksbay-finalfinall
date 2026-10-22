import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./components/login-form";

export const metadata: Metadata = {
  title: "Client & Member Portal Login",
  description:
    "Log in to your Looksbay member account to access your Squarespace templates, custom CSS files, project proposals, and VIP discounts.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fbfbfd] px-4 py-16">
      <div className="w-full max-w-[460px] rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077ed]">
            Looksbay Studio
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="mt-2 text-sm text-[#515154]">
            Access your purchased templates, code plugins, and project dashboard.
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 border-t border-black/5 pt-5 text-center text-xs text-[#515154]">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="font-bold text-[#0077ed] hover:underline">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
