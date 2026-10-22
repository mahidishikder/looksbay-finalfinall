"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { User, LogOut, ChevronDown } from "lucide-react";

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
        className="group inline-flex items-center gap-2.5 rounded-full border border-[#0077ED]/35 bg-white py-1.5 pl-1.5 pr-4 text-[15px] font-bold text-[#0077ED] shadow-[0_2px_8px_rgba(0,119,237,0.08)] transition-all hover:border-[#0077ED] hover:bg-[#0077ED]/[0.04] hover:shadow-[0_4px_14px_rgba(0,119,237,0.15)] active:scale-95"
      >
        <span className="grid size-8 place-items-center rounded-full bg-[#0077ED] text-white shadow-xs transition-transform group-hover:scale-105">
          <User size={18} strokeWidth={2.4} />
        </span>
        <span className="font-bold tracking-tight">Log In</span>
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
        className="flex items-center gap-2.5 rounded-full border border-black/10 bg-[#f5f5f7] py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-[#1d1d1f] transition-all hover:bg-white hover:border-[#0077ed]/30 hover:shadow-xs"
        aria-expanded={dropdownOpen}
      >
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-tr from-[#0077ed] to-[#7928ca] text-sm font-bold text-white shadow-xs">
          {initial}
        </span>
        <span className="max-w-[120px] truncate text-left text-[14px] font-bold text-[#1d1d1f]">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown size={15} className={`text-[#86868b] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-black/10 bg-white p-2.5 shadow-xl z-50 animate-fade-in">
          <div className="border-b border-black/5 px-3 py-2.5">
            <p className="text-sm font-bold text-[#1d1d1f] truncate">{user.name}</p>
            <p className="text-xs text-[#86868b] truncate mt-0.5">{user.email}</p>
          </div>

          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
