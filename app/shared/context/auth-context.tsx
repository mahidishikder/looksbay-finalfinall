"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  interest?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isModalOpen: boolean;
  modalMode: "login" | "signup";
  openAuth: (mode?: "login" | "signup") => void;
  closeAuth: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password?: string,
    interest?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  // Load user session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("looksbay_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading stored user session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuth = (mode: "login" | "signup" = "login") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeAuth = () => {
    setIsModalOpen(false);
  };

  const register = async (
    name: string,
    email: string,
    password?: string,
    interest?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, interest }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Failed to create account" };
      }

      const newUser: UserProfile = data.user;
      setUser(newUser);
      localStorage.setItem("looksbay_user", JSON.stringify(newUser));
      setIsModalOpen(false);
      return { success: true };
    } catch (e) {
      // Fallback in case of network issue
      const localUser: UserProfile = {
        id: "usr_" + Date.now(),
        name,
        email,
        interest: interest || "Squarespace Templates",
        createdAt: new Date().toISOString(),
      };
      setUser(localUser);
      localStorage.setItem("looksbay_user", JSON.stringify(localUser));
      setIsModalOpen(false);
      return { success: true };
    }
  };

  const login = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Invalid credentials" };
      }

      const loggedUser: UserProfile = data.user;
      setUser(loggedUser);
      localStorage.setItem("looksbay_user", JSON.stringify(loggedUser));
      setIsModalOpen(false);
      return { success: true };
    } catch (e) {
      // Fallback demo login
      const name = email.split("@")[0] || "User";
      const localUser: UserProfile = {
        id: "usr_" + Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        createdAt: new Date().toISOString(),
      };
      setUser(localUser);
      localStorage.setItem("looksbay_user", JSON.stringify(localUser));
      setIsModalOpen(false);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("looksbay_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isModalOpen,
        modalMode,
        openAuth,
        closeAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
