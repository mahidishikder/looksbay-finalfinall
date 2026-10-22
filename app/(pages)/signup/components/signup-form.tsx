"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/context/auth-context";
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interest, setInterest] = useState("Squarespace Templates");
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
    const res = await register(name, email, password, interest);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to create account.");
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
          <span>Account created! Redirecting to templates...</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <User size={18} />
          </span>
          <input
            type="text"
            required
            placeholder="e.g. Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
          Email Address (For Updates & Transfers)
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
            placeholder="Create secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
          Primary Service Interest
        </label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 px-3.5 text-sm text-[#1d1d1f] transition-all focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
        >
          <option value="Squarespace Templates">Premium Squarespace Templates</option>
          <option value="Custom Development">Custom Code & CSS / JavaScript</option>
          <option value="Squarespace SEO">Technical SEO & Speed Optimization</option>
          <option value="Platform Migration">WordPress / Wix Migration</option>
          <option value="Agency Partnership">Boutique Agency / White Label</option>
        </select>
      </div>

      <div className="flex items-start gap-2.5 pt-1 text-xs text-[#515154] leading-relaxed">
        <ShieldCheck size={16} className="text-[#0077ed] shrink-0 mt-0.5" />
        <span>
          Includes subscription to Looksbay Studio monthly newsletter (exclusive code snippets & template launches). Unsubscribe anytime.
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0062c4] active:scale-[0.99] disabled:opacity-60"
      >
        <span>{loading ? "Creating Account..." : "Create Account & Claim VIP Access"}</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
