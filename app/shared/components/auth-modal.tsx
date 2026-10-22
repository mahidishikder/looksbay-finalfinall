"use client";

import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export function AuthModal() {
  const { isModalOpen, modalMode, closeAuth, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(modalMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || "Failed to create account");
        } else {
          setSuccess("Account created successfully.");
          setTimeout(() => closeAuth(), 800);
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Invalid credentials");
        } else {
          setSuccess("Signed in successfully.");
          setTimeout(() => closeAuth(), 800);
        }
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in"
      onClick={closeAuth}
    >
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuth}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-[#f5f5f7] text-[#515154] transition hover:bg-[#e8e8ed] hover:text-[#1d1d1f]"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Clean Header */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
            {mode === "signup" ? "Create Account" : "Sign In"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#86868b]">
            {mode === "signup"
              ? "Join Looksbay Studio to continue"
              : "Welcome back, enter your details below"}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 size={15} />
            <span>{success}</span>
          </div>
        )}

        {/* Clean Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
                  <User size={17} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
                <Mail size={17} />
              </span>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]">
                <Lock size={17} />
              </span>
              <input
                type="password"
                placeholder="Password"
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
            <span>{loading ? "Please wait..." : mode === "signup" ? "Continue" : "Sign In"}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Clean Switcher Toggle */}
        <div className="mt-6 border-t border-black/5 pt-4 text-center text-xs text-[#86868b]">
          {mode === "signup" ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="font-semibold text-[#0077ed] hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className="font-semibold text-[#0077ed] hover:underline"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
