"use client";

import React from "react";
import { AuthProvider } from "../context/auth-context";
import { AuthModal } from "./auth-modal";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
