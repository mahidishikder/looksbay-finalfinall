"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function TrafficTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/admin")) return;

    // Avoid duplicate calls for the same path
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    // Get or create persistent visitor ID
    let visitorId = localStorage.getItem("looksbay_vid");
    if (!visitorId) {
      visitorId = "v_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem("looksbay_vid", visitorId);
    }

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          visitorId,
          referrer: document.referrer || "Direct",
        }),
      }).catch(() => {});
    } catch (e) {}
  }, [pathname]);

  return null;
}
