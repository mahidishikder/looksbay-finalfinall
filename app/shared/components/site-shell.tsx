"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "./site-components";
import { AiAssistant } from "./ai-assistant";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen w-full bg-[#F5F5F7]">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AiAssistant />
    </>
  );
}
