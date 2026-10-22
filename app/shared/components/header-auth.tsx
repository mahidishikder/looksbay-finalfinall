"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { User, LogIn, LogOut, Sparkles, ChevronDown, Check } from "lucide-react";

export function HeaderAuth() {
  const { user, openAuth, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f7] px-4 py-2.5 text-[15px] font-semibold text-[#1d1d1f] shadow-xs transition-all hover:border-[#0077ed]/40 hover:bg-white hover:text-[#0077ed] hover:shadow-sm active:scale-95"
      >
        <span className="grid size-6 place-items-center rounded-full bg-white text-[#515154] shadow-xs transition-colors group-hover:bg-[#0077ed] group-hover:text-white">
          <User size={13} strokeWidth={2.2} />
        </span>
        <span>Log In</span>
      </button>
    );
  }

  // User is logged in
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f7] py-1.5 pl-1.5 pr-3 text-sm font-semibold text-[#1d1d1f] transition-all hover:bg-white hover:border-[#0077ed]/30 hover:shadow-xs"
        aria-expanded={dropdownOpen}
      >
        <span className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-[#0077ed] to-[#7928ca] text-xs font-bold text-white shadow-xs">
          {initial}
        </span>
        <span className="max-w-[100px] truncate text-left text-xs font-bold text-[#1d1d1f]">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown size={14} className={`text-[#86868b] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-black/10 bg-white p-3 shadow-xl z-50 animate-fade-in">
          <div className="border-b border-black/5 px-3 py-2.5">
            <p className="text-xs font-bold text-[#1d1d1f]">{user.name}</p>
            <p className="text-[11px] text-[#86868b] truncate">{user.email}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0077ed]/10 px-2 py-0.5 text-[10px] font-bold text-[#0077ed]">
              <Sparkles size={10} />
              Looksbay Member
            </span>
          </div>

          <div className="py-2 text-xs font-medium text-[#515154] space-y-1">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[#f5f5f7]">
              <span>Marketing Emails</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <Check size={12} /> Active
              </span>
            </div>
            {user.interest && (
              <div className="rounded-lg px-3 py-1.5 text-[11px] text-[#86868b]">
                Interest: <strong className="text-[#1d1d1f]">{user.interest}</strong>
              </div>
            )}
          </div>

          <div className="border-t border-black/5 pt-1.5">
            <button
              type="button"
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
