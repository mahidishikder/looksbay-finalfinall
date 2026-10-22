"use client";

import React from "react";
import { AuthProvider } from "../context/auth-context";
import { AuthModal } from "./auth-modal";
import { TrafficTracker } from "./traffic-tracker";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TrafficTracker />
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
