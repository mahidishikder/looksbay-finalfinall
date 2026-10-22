"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/shared/context/auth-context";
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
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
    const res = await register(name, email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to create account.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/templates");
      }, 800);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600 font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs text-emerald-700 font-medium">
          <CheckCircle2 size={16} />
          <span>Account created successfully.</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#515154] mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <User size={17} />
          </span>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#515154] mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <Mail size={17} />
          </span>
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#515154] mb-1.5">
          Password
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
            <Lock size={17} />
          </span>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0062c4] active:scale-[0.99] disabled:opacity-60"
      >
        <span>{loading ? "Creating..." : "Create Account"}</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
