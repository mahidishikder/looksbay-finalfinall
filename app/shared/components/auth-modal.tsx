"use client";

import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export function AuthModal() {
  const { isModalOpen, modalMode, closeAuth, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(modalMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interest, setInterest] = useState("Squarespace Templates");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync mode when modalMode changes
  React.useEffect(() => {
    setMode(modalMode);
    setError(null);
    setSuccess(null);
  }, [modalMode, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await register(name, email, password, interest);
        if (!res.success) {
          setError(res.error || "Failed to create account");
        } else {
          setSuccess("Welcome to Looksbay Studio!");
          setTimeout(() => {
            closeAuth();
          }, 1200);
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Failed to log in");
        } else {
          setSuccess("Logged in successfully!");
          setTimeout(() => {
            closeAuth();
          }, 1200);
        }
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    const demoEmail = "member@looksbay.com";
    await login(demoEmail);
    setSuccess("Logged in as VIP Member!");
    setTimeout(() => {
      closeAuth();
    }, 1000);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeAuth}
    >
      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-[24px] border border-black/[0.08] bg-white p-7 sm:p-9 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuth}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-[#f5f5f7] text-[#515154] transition hover:bg-[#e8e8ed] hover:text-[#1d1d1f]"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ed]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ed] mb-3">
            <Sparkles size={13} />
            <span>Looksbay Member Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1d1d1f]">
            {mode === "signup" ? "Join Looksbay Studio" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-sm text-[#515154]">
            {mode === "signup"
              ? "Access free code snippets, template transfers, and VIP discounts."
              : "Sign in to manage your templates, custom codes, and project inquiries."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#f5f5f7] p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`rounded-lg py-2 transition-all ${
              mode === "login"
                ? "bg-white text-[#1d1d1f] shadow-xs"
                : "text-[#86868b] hover:text-[#1d1d1f]"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
            className={`rounded-lg py-2 transition-all ${
              mode === "signup"
                ? "bg-white text-[#1d1d1f] shadow-xs"
                : "text-[#86868b] hover:text-[#1d1d1f]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs sm:text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs sm:text-sm text-emerald-700">
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
                Your Full Name
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
                placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] transition-all placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
              />
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
                Primary Interest
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 px-3.5 text-sm text-[#1d1d1f] transition-all focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
              >
                <option value="Squarespace Templates">Premium Squarespace Templates</option>
                <option value="Custom Development">Custom Code & CSS / JavaScript</option>
                <option value="Squarespace SEO">Technical SEO & Core Web Vitals</option>
                <option value="Platform Migration">WordPress / Wix / Figma Migration</option>
                <option value="Other">Boutique Agency Partnerships</option>
              </select>
            </div>
          )}

          {mode === "signup" && (
            <div className="flex items-start gap-2.5 pt-1 text-xs text-[#515154] leading-relaxed">
              <ShieldCheck size={16} className="text-[#0077ed] shrink-0 mt-0.5" />
              <span>
                By creating an account, you agree to receive curated Squarespace code tips and product updates. Unsubscribe anytime with 1 click.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0062c4] active:scale-[0.99] disabled:opacity-60"
          >
            <span>{loading ? "Processing..." : mode === "signup" ? "Create Free Account" : "Sign In to Looksbay"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Fast Log In Option */}
        <div className="mt-5 border-t border-black/[0.06] pt-4 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="text-xs font-semibold text-[#0077ed] hover:underline"
          >
            Quick 1-Click Demo Login
          </button>
        </div>
      </div>
    </div>
  );
}
