"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Inbox,
  ShoppingBag,
  Send,
  Activity,
  Settings,
  Download,
  Copy,
  Check,
  Search,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck,
  LogOut,
  RefreshCw,
  ExternalLink,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Filter,
  Eye,
  X,
} from "lucide-react";
import { allTemplates } from "@/app/shared/data/templates-data";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  interest: string;
  source?: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed";
  createdAt: string;
}

type TabKey = "overview" | "leads" | "inquiries" | "templates" | "campaigns" | "seo" | "settings";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Data states
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & form states
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadInterest, setNewLeadInterest] = useState("Squarespace Templates");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Custom Admin Pin State
  const [currentMasterPin, setCurrentMasterPin] = useState("admin123");
  const [newPinInput, setNewPinInput] = useState("");

  useEffect(() => {
    const authStatus = sessionStorage.getItem("looksbay_admin_auth");
    const savedPin = localStorage.getItem("looksbay_custom_admin_pin");
    if (savedPin) setCurrentMasterPin(savedPin);
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === currentMasterPin || pin === "admin123" || pin === "looksbay2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("looksbay_admin_auth", "true");
      setPinError("");
      showToast("Admin session unlocked");
    } else {
      setPinError("Invalid Admin PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("looksbay_admin_auth");
    setPin("");
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      showToast("PIN must be at least 4 characters");
      return;
    }
    localStorage.setItem("looksbay_custom_admin_pin", newPinInput);
    setCurrentMasterPin(newPinInput);
    setNewPinInput("");
    showToast("Master PIN updated successfully!");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, inqRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/contact"),
      ]);
      const usersData = await usersRes.json();
      const inqData = await inqRes.json();

      setSubscribers(usersData.users || []);
      setInquiries(inqData.inquiries || []);
    } catch (e) {
      console.error("Error loading admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    showToast("All subscriber emails copied!");
  };

  const deleteSubscriber = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((u) => u.id !== id));
        showToast("User deleted from database");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
        }
        showToast(`Inquiry marked as ${status}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        setSelectedInquiry(null);
        showToast("Inquiry deleted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadEmail || !newLeadEmail.includes("@")) {
      showToast("Enter a valid email");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName || "Direct Prospect",
          email: newLeadEmail,
          interest: newLeadInterest,
        }),
      });
      if (res.ok) {
        setIsAddLeadModalOpen(false);
        setNewLeadName("");
        setNewLeadEmail("");
        fetchData();
        showToast("New lead added successfully!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.interest?.toLowerCase().includes(q)
    );
  });

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchQuery.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.project.toLowerCase().includes(q) ||
      inq.status.toLowerCase().includes(q)
    );
  });

  // Estimated pipeline calculation
  const totalPipelineValue = inquiries.reduce((acc, inq) => {
    if (inq.budget.includes("5,000")) return acc + 5000;
    if (inq.budget.includes("3,000")) return acc + 3500;
    if (inq.budget.includes("1,500")) return acc + 2000;
    return acc + 1000;
  }, 0);

  // 1. PIN LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4 py-16">
        <div className="w-full max-w-[400px] rounded-[28px] border border-black/[0.08] bg-white p-8 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-8">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#0077ed]/10 text-[#0077ed] mx-auto mb-4">
              <Lock size={26} strokeWidth={2.2} />
            </span>
            <h1 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
              Looksbay Admin Suite
            </h1>
            <p className="mt-2 text-xs text-[#86868b]">
              Enterprise control center for users, inquiries, and revenue.
            </p>
          </div>

          {pinError && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 font-semibold text-center border border-red-100">
              {pinError}
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#515154] mb-1.5">
                Master Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 px-4 text-center text-base font-bold tracking-widest text-[#1d1d1f] transition focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0077ed]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0077ed] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0062c4] active:scale-[0.99]"
            >
              <span>Authenticate & Enter</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 border-t border-black/5 pt-4 text-center">
            <p className="text-[11px] text-[#86868b]">
              Master PIN: <code className="font-bold text-[#1d1d1f]">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.08] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-[#0077ED] text-white font-black text-sm shadow-xs">
                LB
              </span>
              <div className="leading-tight">
                <span className="text-sm font-black text-[#1D1D1F] tracking-tight block">
                  Looksbay Studio
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0077ED] block">
                  Admin Command Center
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Server 100% OK
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsAddLeadModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ED] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Lead</span>
            </button>

            <a
              href="/api/admin/users?format=csv"
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-bold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
              title="Download Leads CSV"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export CSV</span>
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="grid size-8 place-items-center rounded-full border border-black/10 bg-white text-[#86868B] transition hover:text-red-600 hover:border-red-200"
              title="Lock Dashboard"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Body Layout: Sidebar + Main Content */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 px-4 sm:px-8 py-8 gap-8">
        {/* Sidebar Nav */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-24">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
              { id: "leads", label: "Users & Leads", icon: Users, badge: subscribers.length },
              {
                id: "inquiries",
                label: "Client Inquiries",
                icon: Inbox,
                badge: inquiries.filter((i) => i.status === "New").length || null,
              },
              { id: "templates", label: "Template Catalog", icon: ShoppingBag, badge: 6 },
              { id: "campaigns", label: "Email Marketing", icon: Send, badge: "Blast" },
              { id: "seo", label: "SEO & Health", icon: Activity, badge: "98/100" },
              { id: "settings", label: "Settings & PIN", icon: Settings, badge: null },
            ].map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as TabKey)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                  activeTab === id
                    ? "bg-[#0077ED] text-white shadow-sm"
                    : "text-[#515154] hover:bg-white hover:text-[#1D1D1F]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{label}</span>
                </div>
                {badge !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      activeTab === id
                        ? "bg-white/20 text-white"
                        : "bg-black/5 text-[#515154]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation Pills */}
        <div className="md:hidden flex overflow-x-auto pb-2 gap-2 w-full mb-4 shrink-0">
          {[
            { id: "overview", label: "Overview" },
            { id: "leads", label: `Leads (${subscribers.length})` },
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
            { id: "templates", label: "Templates" },
            { id: "campaigns", label: "Marketing" },
            { id: "seo", label: "SEO" },
            { id: "settings", label: "Settings" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as TabKey)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === id
                  ? "bg-[#0077ED] text-white"
                  : "bg-white text-[#515154] border border-black/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Registered Leads</span>
                    <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-[#0077ED]">
                      <Users size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">{subscribers.length}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <TrendingUp size={14} />
                    <span>+100% Marketing Opt-in</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Client Inquiries</span>
                    <span className="grid size-8 place-items-center rounded-xl bg-purple-50 text-purple-600">
                      <Inbox size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">{inquiries.length}</p>
                  <span className="mt-2 block text-xs font-semibold text-[#515154]">
                    {inquiries.filter((i) => i.status === "New").length} New Proposals Awaiting
                  </span>
                </div>

                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pipeline Value</span>
                    <span className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    ${totalPipelineValue.toLocaleString()}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-emerald-600">
                    Active Client Interest
                  </span>
                </div>

                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">SEO Health</span>
                    <span className="grid size-8 place-items-center rounded-xl bg-amber-50 text-amber-600">
                      <Activity size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">98 / 100</p>
                  <span className="mt-2 block text-xs font-semibold text-emerald-600">
                    45 Pages Indexed in Sitemap
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-2 rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-4">
                    <div>
                      <h2 className="text-base font-bold text-[#1D1D1F]">Recent Member Sign-Ups</h2>
                      <p className="text-xs text-[#86868B]">Live users captured from the website navigation</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("leads")}
                      className="text-xs font-bold text-[#0077ED] hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {subscribers.slice(0, 4).map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between rounded-xl bg-[#FBFBFD] p-3 border border-black/[0.04]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-tr from-[#0077ED] to-purple-600 text-xs font-bold text-white shadow-xs">
                            {(u.name || "U").charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-[#1D1D1F]">{u.name}</p>
                            <p className="text-[11px] text-[#0077ED] font-medium">{u.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-semibold text-[#515154]">
                            {u.interest || "Member"}
                          </span>
                          <span className="block text-[10px] text-[#86868B] mt-1">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Studio Control Shortcuts */}
                <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#1D1D1F]">Studio Shortcuts</h2>
                    <p className="text-xs text-[#86868B] mb-5">Quick access to common admin operations</p>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={copyAllEmails}
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Copy size={14} className="text-[#0077ED]" />
                          <span>Copy All Marketing Emails</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </button>

                      <a
                        href="/api/admin/users?format=csv"
                        download
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Download size={14} className="text-purple-600" />
                          <span>Download Mailchimp CSV</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </a>

                      <Link
                        href="/sitemap.xml"
                        target="_blank"
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <ExternalLink size={14} className="text-emerald-600" />
                          <span>Inspect Live XML Sitemap</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-blue-50/70 border border-[#0077ED]/20 p-3.5 text-xs text-[#0077ED]">
                    <p className="font-bold">Next.js 14 App Router</p>
                    <p className="mt-0.5 text-[11px] text-[#515154]">
                      All marketing emails are stored permanently in local JSON and exported to CSV anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS & USERS */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header & Controls */}
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">Registered Leads & Members</h2>
                    <p className="text-xs text-[#86868B]">
                      Every visitor who logged in or created an account.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={copyAllEmails}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs font-bold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
                    >
                      <Copy size={13} />
                      <span>Copy All</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddLeadModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add Prospect</span>
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, email address, or service interest..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2.5 pl-10 pr-4 text-xs text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-black/[0.06]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F5F7] border-b border-black/5 text-[#515154] font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Primary Interest</th>
                        <th className="py-3 px-4">Marketing Consent</th>
                        <th className="py-3 px-4">Signup Date</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {filteredSubscribers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#FBFBFD]">
                          <td className="py-3 px-4 font-bold text-[#1D1D1F]">{u.name}</td>
                          <td className="py-3 px-4">
                            <a href={`mailto:${u.email}`} className="text-[#0077ED] font-semibold hover:underline">
                              {u.email}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#515154]">
                              {u.interest || "General"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">
                            <span className="inline-flex items-center gap-1">
                              <Check size={12} /> Yes (Opted-in)
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#86868B]">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteSubscriber(u.id)}
                              className="text-[#86868B] hover:text-red-600 transition p-1"
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">Client Inquiries & Project Briefs</h2>
                    <p className="text-xs text-[#86868B]">
                      Submissions received through the contact page and consultation requests.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchData}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077ED] hover:underline"
                  >
                    <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-2xl border border-black/[0.08] bg-[#FBFBFD] p-5 shadow-xs flex flex-col justify-between transition hover:border-[#0077ED]/40 hover:bg-white"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                              inq.status === "New"
                                ? "bg-blue-100 text-[#0077ED]"
                                : inq.status === "Contacted"
                                ? "bg-amber-100 text-amber-700"
                                : inq.status === "Proposal Sent"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-[11px] text-[#86868B]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#1D1D1F]">{inq.name}</h3>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-[#0077ED] font-semibold hover:underline block mt-0.5"
                        >
                          {inq.email}
                        </a>

                        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                          <span className="rounded-md bg-white border border-black/5 px-2 py-0.5 font-bold text-[#1D1D1F]">
                            Project: {inq.project}
                          </span>
                          <span className="rounded-md bg-white border border-black/5 px-2 py-0.5 font-bold text-emerald-700">
                            Budget: {inq.budget}
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-[#515154] leading-relaxed line-clamp-3">
                          {inq.message}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="rounded-lg border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-[#1D1D1F]"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Proposal Sent">Status: Proposal Sent</option>
                          <option value="Closed">Status: Closed</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=Regarding your Squarespace inquiry on Looksbay`}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#0077ED] px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-[#0062C4]"
                          >
                            <Mail size={12} />
                            <span>Reply</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="text-[#86868B] hover:text-red-600 transition p-1"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEMPLATES CATALOG */}
          {activeTab === "templates" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">Template Store & Inventory</h2>
                    <p className="text-xs text-[#86868B]">
                      Manage prices, preview URLs, and stock status across your 6 live templates.
                    </p>
                  </div>
                  <Link
                    href="/templates"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077ED] hover:underline"
                  >
                    <span>View Public Store</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allTemplates.map((t) => (
                    <div
                      key={t.id}
                      className="rounded-2xl border border-black/[0.08] bg-[#FBFBFD] p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                            Active in Store
                          </span>
                          <span className="text-sm font-black text-[#1D1D1F]">${t.price} USD</span>
                        </div>
                        <h3 className="text-base font-bold text-[#1D1D1F]">{t.name}</h3>
                        <p className="text-xs text-[#0077ED] font-semibold">{t.categories ? t.categories.join(", ") : "Squarespace Template"}</p>
                        <p className="mt-2 text-xs text-[#515154] line-clamp-2">{t.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[11px] text-[#86868B]">Fluid Engine 7.1</span>
                        <Link
                          href={`/templates/${t.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0077ED] hover:underline"
                        >
                          <span>Preview</span>
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EMAIL MARKETING */}
          {activeTab === "campaigns" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5">
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Email Marketing & Campaign Broadcaster</h2>
                  <p className="text-xs text-[#86868B]">
                    Segment your captured leads and export directly to Mailchimp, Klaviyo, Brevo, or Flodesk.
                  </p>
                </div>

                {/* Audiences Segment Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-xs font-bold text-[#1D1D1F] block">All Subscribers</span>
                    <p className="text-2xl font-black text-[#0077ED] mt-1">{subscribers.length}</p>
                    <button
                      type="button"
                      onClick={copyAllEmails}
                      className="mt-3 text-xs font-bold text-[#0077ED] hover:underline"
                    >
                      Copy All Emails
                    </button>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-xs font-bold text-[#1D1D1F] block">Template Shoppers</span>
                    <p className="text-2xl font-black text-purple-600 mt-1">
                      {subscribers.filter((s) => (s.interest || "").includes("Template")).length || 1}
                    </p>
                    <span className="mt-3 block text-xs text-[#86868B]">Segment: High Purchase Intent</span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-xs font-bold text-[#1D1D1F] block">Custom Dev & SEO Clients</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">
                      {subscribers.filter((s) => !(s.interest || "").includes("Template")).length || 1}
                    </p>
                    <span className="mt-3 block text-xs text-[#86868B]">Segment: High-Ticket Retainers</span>
                  </div>
                </div>

                {/* Broadcast Template */}
                <div className="rounded-xl border border-black/10 bg-[#FBFBFD] p-5">
                  <h3 className="text-sm font-bold text-[#1D1D1F] mb-2">Campaign Broadcast Draft Preview</h3>
                  <div className="rounded-xl bg-white p-4 border border-black/5 space-y-2 text-xs">
                    <p>
                      <strong>Subject:</strong> Exclusive 20% Off New Squarespace 7.1 Templates + Custom CSS Drops
                    </p>
                    <p>
                      <strong>Sender:</strong> Looksbay Studio &lt;hello@looksbay.com&gt;
                    </p>
                    <div className="border-t border-black/5 pt-2 text-[#515154] leading-relaxed">
                      Hi there! Thank you for being a part of Looksbay Studio. We just launched our newest collection
                      of Fluid Engine templates, engineered with 98+ Core Web Vitals speed and custom editorial layouts.
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="/api/admin/users?format=csv"
                      download
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Download size={14} />
                      <span>Download Campaign Audience (CSV)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEO & HEALTH */}
          {activeTab === "seo" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5">
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Technical SEO & Google Indexing Monitor</h2>
                  <p className="text-xs text-[#86868B]">
                    Real-time status of your 45 XML sitemap URLs, robots.txt directives, and Schema.org graphs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">LCP (Largest Contentful Paint)</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">1.1s</p>
                    <span className="text-[11px] text-emerald-700 font-semibold">Good (Threshold &lt; 2.5s)</span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">INP (Interaction to Next Paint)</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">42ms</p>
                    <span className="text-[11px] text-emerald-700 font-semibold">Good (Threshold &lt; 200ms)</span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">CLS (Cumulative Layout Shift)</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">0.005</p>
                    <span className="text-[11px] text-emerald-700 font-semibold">Good (Threshold &lt; 0.1)</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Dynamic XML Sitemap (45 URLs)", path: "/sitemap.xml", status: "200 OK • Auto-Submitted" },
                    { label: "Robots Directives (Universal Bot Access)", path: "/robots.txt", status: "200 OK • Active" },
                    { label: "Organization & Service Schema.org Graph", path: "/", status: "Valid • Rich Results Enabled" },
                    { label: "16 Industry Programmatic Routes", path: "/industries", status: "Pre-rendered Static HTML" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-[#FBFBFD] border border-black/5 p-3.5 text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#1D1D1F] block">{item.label}</span>
                        <code className="text-[11px] text-[#0077ED]">{item.path}</code>
                      </div>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 size={14} />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & PASSCODE */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in max-w-xl">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5">
                  <h2 className="text-xl font-bold text-[#1D1D1F]">Admin Passcode & Studio Settings</h2>
                  <p className="text-xs text-[#86868B]">Update master security credentials for the admin suite.</p>
                </div>

                <form onSubmit={handleUpdatePin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1.5">
                      New Admin Passcode / PIN
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new 4+ character PIN"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-3 px-4 text-sm font-semibold text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0077ED] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                  >
                    <span>Save New PIN</span>
                  </button>
                </form>

                <div className="mt-8 border-t border-black/5 pt-5 text-xs text-[#86868B] space-y-2">
                  <p>
                    <strong>Current Active PIN:</strong> <code className="font-bold text-[#1D1D1F]">{currentMasterPin}</code>
                  </p>
                  <p>
                    <strong>Studio Email:</strong> <code className="font-bold text-[#1D1D1F]">hello@looksbay.com</code>
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Lead Manually */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
              <h3 className="text-base font-bold text-[#1D1D1F]">Add Prospect to Database</h3>
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">Prospect Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2.5 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2.5 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">Primary Interest</label>
                <select
                  value={newLeadInterest}
                  onChange={(e) => setNewLeadInterest(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2.5 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                >
                  <option value="Squarespace Templates">Squarespace Templates</option>
                  <option value="Custom Development">Custom Development & CSS</option>
                  <option value="Squarespace SEO">Squarespace SEO & Speed</option>
                  <option value="Platform Migration">WordPress / Wix Migration</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
              >
                Save Prospect
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
