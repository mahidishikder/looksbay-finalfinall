"use client";

import React, { useEffect, useState } from "react";
import {
  Download,
  Mail,
  Users,
  Check,
  Copy,
  RefreshCw,
  Sparkles,
  Search,
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Calendar,
  Clock,
} from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  interest: string;
  source?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Check saved session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("looksbay_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode: admin123 or looksbay2026
    if (pin === "admin123" || pin === "looksbay2026" || pin === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("looksbay_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Incorrect Admin PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("looksbay_admin_auth");
    setPin("");
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setSubscribers(data.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers();
    }
  }, [isAuthenticated]);

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered subscribers
  const filtered = subscribers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.interest?.toLowerCase().includes(q)
    );
  });

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#fbfbfd] px-4 py-16">
        <div className="w-full max-w-[420px] rounded-[24px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#0077ed]/10 text-[#0077ed] mx-auto mb-4">
              <Lock size={22} />
            </span>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
              Admin Access Portal
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#86868b]">
              Enter your admin PIN to view registered users and marketing leads.
            </p>
          </div>

          {pinError && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 font-medium text-center">
              {pinError}
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
                Passcode / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter PIN (e.g. admin123)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 px-4 text-center text-sm font-semibold tracking-wider text-[#1d1d1f] transition-all focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077ed]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0062c4] active:scale-[0.99]"
            >
              <span>Unlock Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-[#86868b]">
            Default Master Passcode: <code className="font-bold text-[#1d1d1f]">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#fbfbfd] py-12">
      <div className="site-container max-w-[1180px]">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ed]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ed] mb-2">
              <ShieldCheck size={14} />
              <span>Admin Management Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
              User Logins & Email Leads
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#515154]">
              Real-time directory of all visitors who logged in or registered on Looksbay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={copyAllEmails}
              disabled={subscribers.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-xs font-bold text-[#1d1d1f] shadow-xs transition hover:bg-[#f5f5f7] active:scale-95 disabled:opacity-50"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Copied All!" : "Copy Emails"}</span>
            </button>

            <a
              href="/api/admin/users?format=csv"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[#0077ed] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062c4] active:scale-95"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-xs font-semibold text-[#86868b] transition hover:text-red-600 hover:border-red-200"
              title="Lock Admin Dashboard"
            >
              <LogOut size={14} />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between text-[#86868b]">
              <span className="text-xs font-bold uppercase tracking-wider">Total Users Logged In</span>
              <Users size={18} className="text-[#0077ed]" />
            </div>
            <p className="mt-3 text-3xl font-black text-[#1d1d1f]">{subscribers.length}</p>
            <span className="mt-1 block text-xs text-emerald-600 font-semibold">
              Captured via Navbar Login
            </span>
          </div>

          <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between text-[#86868b]">
              <span className="text-xs font-bold uppercase tracking-wider">Marketing Consent</span>
              <Mail size={18} className="text-[#7928ca]" />
            </div>
            <p className="mt-3 text-3xl font-black text-[#1d1d1f]">100%</p>
            <span className="mt-1 block text-xs text-[#515154]">
              Opted in for promotional emails
            </span>
          </div>

          <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between text-[#86868b]">
              <span className="text-xs font-bold uppercase tracking-wider">Campaign Target</span>
              <Sparkles size={18} className="text-amber-500" />
            </div>
            <p className="mt-3 text-base font-bold text-[#1d1d1f]">Mailchimp / Klaviyo</p>
            <span className="mt-1 block text-xs text-[#515154]">
              Direct CSV import ready
            </span>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xs">
          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] bg-[#fbfbfd] px-6 py-4">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="Search by name, email, or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white py-2 pl-9 pr-3 text-xs text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-[#0077ed] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={fetchSubscribers}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077ed] hover:underline"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="py-16 text-center text-xs text-[#86868b]">
              <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#0077ed]" />
              Loading registered users...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center px-4">
              <p className="text-sm font-semibold text-[#1d1d1f]">No matching users found</p>
              <p className="mt-1 text-xs text-[#86868b]">
                {searchQuery
                  ? "Try clearing your search query."
                  : "When someone clicks 'Log In' in the navbar, their details will appear here immediately."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-black/5 bg-[#f5f5f7] text-[#515154] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">User</th>
                    <th className="py-3 px-6">Email Address</th>
                    <th className="py-3 px-6">Interest / Category</th>
                    <th className="py-3 px-6">Joined / Logged In</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filtered.map((u) => {
                    const initial = (u.name || u.email || "U").charAt(0).toUpperCase();
                    const dateObj = new Date(u.createdAt);
                    const isConfirming = deleteConfirmId === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-[#fbfbfd] transition-colors">
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-tr from-[#0077ed] to-[#7928ca] text-[11px] font-bold text-white shadow-xs">
                              {initial}
                            </span>
                            <span className="font-semibold text-[#1d1d1f]">{u.name}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-6">
                          <a
                            href={`mailto:${u.email}`}
                            className="font-medium text-[#0077ed] hover:underline"
                          >
                            {u.email}
                          </a>
                        </td>

                        <td className="py-3.5 px-6">
                          <span className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-[#515154]">
                            {u.interest || "General"}
                          </span>
                        </td>

                        <td className="py-3.5 px-6 text-[#86868b]">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            <span>{dateObj.toLocaleDateString()}</span>
                            <span className="text-black/20">•</span>
                            <Clock size={13} />
                            <span>{dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-6 text-right">
                          {isConfirming ? (
                            <div className="inline-flex items-center gap-2">
                              <span className="text-[11px] text-red-600 font-semibold">Delete?</span>
                              <button
                                type="button"
                                onClick={() => deleteUser(u.id)}
                                className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-red-700"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="rounded bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-700 hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(u.id)}
                              className="text-[#86868b] hover:text-red-600 transition-colors p-1"
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
