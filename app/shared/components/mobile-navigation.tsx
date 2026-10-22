"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, X, User } from "lucide-react";
import { menuCards } from "../data/menu-cards";
import { useAuth } from "../context/auth-context";

const navigationLinks = [
  ["Home", "/"],
  ["Templates", "/templates"],
  ["Portfolio", "/portfolio"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export function MobileNavigation() {
  const { user, openAuth, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    setShowServices(false);
  }

  const navigationMenu = (
    <nav
      id="mobile-navigation"
      className={`fixed inset-x-0 bottom-0 top-[62px] z-[100] overflow-hidden border-t border-black/5 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-[transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:duration-0 tablet:top-[86px] desktop:top-[86px] ${
        isOpen ? "visible translate-x-0" : "invisible translate-x-full"
      }`}
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className="flex h-full w-full flex-col overflow-y-auto px-6 pb-10 pt-8 mobile:px-5 tablet:px-12">
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e8e93]">
                Navigation Menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="group flex size-9 items-center justify-center rounded-full bg-[#f5f5f7] transition-colors hover:bg-[#0077ed]"
                aria-label="Close menu"
              >
                <X size={18} className="text-[#1d1d1f] transition-colors group-hover:text-white" />
              </button>
            </div>

            <div className="grid">
              {navigationLinks.slice(0, 2).map(([name, href], index) => (
                <Link
                  className="group flex min-h-[72px] items-center justify-between border-b border-black/5 text-[clamp(1.8rem,5vw,2.4rem)] font-medium tracking-[-.03em] text-[#1d1d1f] transition-colors hover:text-[#0077ed]"
                  href={href}
                  key={href}
                  onClick={closeMenu}
                >
                  <span>{name}</span>
                  <div className="grid size-10 place-items-center rounded-full bg-[#f5f5f7] transition-all group-hover:bg-[#0077ed] group-hover:text-white">
                    <ArrowRight size={20} strokeWidth={2} />
                  </div>
                </Link>
              ))}

              <button
                type="button"
                className="group flex min-h-[72px] w-full items-center justify-between border-b border-black/5 text-left text-[clamp(1.8rem,5vw,2.4rem)] font-medium tracking-[-.03em] text-[#1d1d1f] transition-colors hover:text-[#0077ed]"
                aria-expanded={showServices}
                aria-controls="mobile-service-cards"
                onClick={() => setShowServices((expanded) => !expanded)}
              >
                <span>Services</span>
                <div className="grid size-10 place-items-center rounded-full bg-[#f5f5f7] transition-all group-hover:bg-[#0077ed] group-hover:text-white">
                  <ArrowRight className={`transition-transform duration-300 ${showServices ? "rotate-90" : ""}`} size={20} strokeWidth={2} />
                </div>
              </button>

              {showServices && (
                <div id="mobile-service-cards" className="grid grid-cols-2 gap-3 border-b border-black/5 py-5 mobile:gap-2 tablet:gap-4">
                  <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
                    <defs>
                      <linearGradient id="mobile-menu-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2997FF" />
                        <stop offset="35%" stopColor="#A855F7" />
                        <stop offset="65%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#FF9500" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {menuCards.map(({ title, description, href, icon: Icon }) => (
                    <Link
                      className="flex min-h-[225px] flex-col items-start rounded-[10px] border border-[#dedee3] bg-[#f5f5f7] px-3 py-4 transition-all duration-200 hover:border-blue/40 hover:bg-white hover:shadow-[0_8px_24px_rgba(29,29,31,.08)] mobile:min-h-[240px] mobile:px-2.5 tablet:min-h-[250px] tablet:px-6 tablet:py-6"
                      href={href}
                      key={title}
                      onClick={closeMenu}
                    >
                      <span className="mb-4 grid size-10 shrink-0 place-items-center rounded-[10px] bg-white shadow-[0_5px_14px_rgba(0,0,0,.06)] tablet:mb-5 tablet:size-12">
                        <Icon size={20} strokeWidth={1.8} stroke="url(#mobile-menu-icon-gradient)" />
                      </span>
                      <span className="grid gap-2">
                        <strong className="gradient-heading text-[14px] font-bold leading-tight tablet:text-[19px]">{title}</strong>
                        <small className="text-[12px] leading-[1.5] text-muted tablet:text-[14px] tablet:leading-[1.6]">{description}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {navigationLinks.slice(2).map(([name, href], index) => (
                <Link
                  className="group flex min-h-[72px] items-center justify-between border-b border-black/5 text-[clamp(1.8rem,5vw,2.4rem)] font-medium tracking-[-.03em] text-[#1d1d1f] transition-colors hover:text-[#0077ed]"
                  href={href}
                  key={href}
                  onClick={closeMenu}
                >
                  <span>{name}</span>
                  <div className="grid size-10 place-items-center rounded-full bg-[#f5f5f7] transition-all group-hover:bg-[#0077ed] group-hover:text-white">
                    <ArrowRight size={20} strokeWidth={2} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-black/5 mt-4">
            {!user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openAuth("login");
                }}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-[#f5f5f7] text-base font-bold text-[#1d1d1f] transition-all hover:bg-white"
              >
                <User size={18} />
                <span>Log In / Sign Up</span>
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] p-3">
                <div className="truncate pr-2">
                  <p className="text-xs font-bold text-[#1d1d1f] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#86868b] truncate">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Sign Out
                </button>
              </div>
            )}

            <Link
              href="/contact"
              className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#0077ed] text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#0062c4]"
              onClick={closeMenu}
            >
              Book a call
            </Link>
          </div>
      </div>
    </nav>
  );

  return (
    <div className="header-mobile-menu relative hidden h-full items-center tablet:flex mobile:flex">
      <button
        type="button"
        className="group relative grid size-12 place-items-center rounded-full bg-[#f5f5f7]/80 transition-colors hover:bg-[#eef5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => {
          setIsOpen((open) => !open);
          setShowServices(false);
        }}
      >
        <span className="grid w-6 gap-[6px]" aria-hidden="true">
          <span className={`h-[2.5px] w-full rounded-full bg-[#1d1d1f] transition-all duration-300 ${isOpen ? "translate-y-[8.5px] rotate-45" : ""}`} />
          <span className={`h-[2.5px] w-full rounded-full bg-[#1d1d1f] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2.5px] w-full rounded-full bg-[#1d1d1f] transition-all duration-300 ${isOpen ? "-translate-y-[8.5px] -rotate-45" : ""}`} />
        </span>
      </button>
      {isMounted && createPortal(navigationMenu, document.body)}
    </div>
  );
}