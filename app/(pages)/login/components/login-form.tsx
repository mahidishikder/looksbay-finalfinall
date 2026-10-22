"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/context/auth-context";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to log in.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/templates");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs text-emerald-700">
          <CheckCircle2 size={16} />
          <span>Welcome back! Redirecting...</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <Mail size={18} />
          </span>
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
          Password
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <Lock size={18} />
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0062c4] active:scale-[0.99] disabled:opacity-60"
      >
        <span>{loading ? "Authenticating..." : "Sign In"}</span>
        <ArrowRight size={16} />
      </button>

      <button
        type="button"
        onClick={() => {
          setEmail("vip@looksbay.com");
          login("vip@looksbay.com");
          setSuccess(true);
          setTimeout(() => router.push("/templates"), 800);
        }}
        className="w-full text-center text-xs font-semibold text-[#0077ed] hover:underline pt-2"
      >
        Quick 1-Click VIP Demo Login
      </button>
    </form>
  );
}
