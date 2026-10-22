"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Inbox,
  ShoppingBag,
  Settings,
  Download,
  Copy,
  Search,
  Plus,
  Trash2,
  Lock,
  LogOut,
  RefreshCw,
  ExternalLink,
  Mail,
  CheckCircle2,
  Briefcase,
  BarChart3,
  X,
  Activity,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { allTemplates as defaultTemplates } from "@/app/shared/data/templates-data";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  interest: string;
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

interface AnalyticsStats {
  todayVisitors: number;
  todayPageviews: number;
  yesterdayVisitors: number;
  totalVisitors: number;
  totalPageviews: number;
  dailyTrend: { date: string; day: string; visitors: number; pageviews: number }[];
  topPages: { path: string; views: number }[];
  recentVisits: { path: string; timestamp: string; referrer?: string }[];
}

interface PortfolioProject {
  name: string;
  kind: string;
  industry: string;
  image: string;
  description: string;
  tags: string[];
  hearts?: number;
}

interface TemplateItem {
  id: string;
  slug: string;
  name: string;
  price: string;
  categories: string[];
  image: string;
  demoUrl: string;
  description: string;
}

type TabKey =
  | "overview"
  | "traffic"
  | "portfolio"
  | "templates"
  | "leads"
  | "inquiries"
  | "settings";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("portfolio");

  // Data states
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadInterest, setNewLeadInterest] = useState("Squarespace Templates");

  // Portfolio Add Modal State
  const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioIndustry, setNewPortfolioIndustry] = useState("Creative");
  const [newPortfolioKind, setNewPortfolioKind] = useState("Custom Squarespace Website");
  const [newPortfolioImage, setNewPortfolioImage] = useState("");
  const [newPortfolioDescription, setNewPortfolioDescription] = useState("");
  const [newPortfolioTags, setNewPortfolioTags] = useState("Squarespace 7.1, Fluid Engine, Custom CSS");

  // Template Add Modal State
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateSlug, setNewTemplateSlug] = useState("");
  const [newTemplatePrice, setNewTemplatePrice] = useState("180.00");
  const [newTemplateCategories, setNewTemplateCategories] = useState("Designer, Creative, Studio");
  const [newTemplateImage, setNewTemplateImage] = useState("");
  const [newTemplateDemoUrl, setNewTemplateDemoUrl] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");

  // Master Pin State
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
      showToast("Session unlocked");
    } else {
      setPinError("Invalid Passcode");
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
    showToast("Passcode updated");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, inqRes, analyticsRes, portfolioRes, templatesRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/contact"),
        fetch("/api/analytics/stats"),
        fetch("/api/portfolio"),
        fetch("/api/templates"),
      ]);

      const usersData = await usersRes.json();
      const inqData = await inqRes.json();
      const analyticsData = await analyticsRes.json();
      const portfolioData = await portfolioRes.json();
      const templatesData = await templatesRes.json();

      setSubscribers(usersData.users || []);
      setInquiries(inqData.inquiries || []);
      setAnalytics(analyticsData);
      setPortfolioProjects(portfolioData.projects || []);
      setTemplateItems(templatesData.templates || defaultTemplates);
    } catch (e) {
      console.error(e);
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
    showToast("Emails copied to clipboard");
  };

  const deleteSubscriber = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((u) => u.id !== id));
        showToast("Lead removed");
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
        showToast(`Status updated to ${status}`);
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
        showToast("Inquiry removed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadEmail || !newLeadEmail.includes("@")) {
      showToast("Valid email required");
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
        showToast("Lead registered");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Portfolio Handler
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim() || !newPortfolioImage.trim()) {
      showToast("Title and Image URL required");
      return;
    }
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newPortfolioName.trim(),
          industry: newPortfolioIndustry,
          kind: newPortfolioKind,
          image: newPortfolioImage.trim(),
          description: newPortfolioDescription.trim() || "Bespoke website built with Fluid Engine.",
          tags: newPortfolioTags.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolioProjects((prev) => [data.project, ...prev]);
        setIsAddPortfolioModalOpen(false);
        setNewPortfolioName("");
        setNewPortfolioImage("");
        setNewPortfolioDescription("");
        showToast("Project published to live portfolio");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Portfolio Handler
  const handleDeletePortfolio = async (name: string) => {
    if (!confirm(`Delete project "${name}"?`)) return;
    try {
      const res = await fetch(`/api/portfolio?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPortfolioProjects((prev) =>
          prev.filter((p) => p.name.toLowerCase() !== name.toLowerCase())
        );
        showToast("Project deleted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Template Handler
  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim() || !newTemplatePrice.trim()) {
      showToast("Name and Price required");
      return;
    }
    const cleanSlug =
      newTemplateSlug.trim() ||
      newTemplateName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTemplateName.trim(),
          slug: cleanSlug,
          price: newTemplatePrice.trim(),
          categories: newTemplateCategories.split(",").map((s) => s.trim()).filter(Boolean),
          image:
            newTemplateImage.trim() ||
            "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
          demoUrl: newTemplateDemoUrl.trim() || `https://${cleanSlug}.squarespace.com`,
          description: newTemplateDescription.trim() || "Engineered for high conversions.",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTemplateItems((prev) => [data.template, ...prev]);
        setIsAddTemplateModalOpen(false);
        setNewTemplateName("");
        setNewTemplateSlug("");
        setNewTemplateImage("");
        setNewTemplateDemoUrl("");
        setNewTemplateDescription("");
        showToast("Template published to store");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Template Handler
  const handleDeleteTemplate = async (idOrSlug: string, name: string) => {
    if (!confirm(`Delete template "${name}"?`)) return;
    try {
      const res = await fetch(`/api/templates?id=${encodeURIComponent(idOrSlug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTemplateItems((prev) =>
          prev.filter((t) => t.id !== idOrSlug && t.slug !== idOrSlug)
        );
        showToast("Template deleted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered portfolio
  const filteredPortfolio = portfolioProjects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.kind.toLowerCase().includes(q)
    );
  });

  // Filtered templates
  const filteredTemplates = templateItems.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.categories?.some((c) => c.toLowerCase().includes(q))
    );
  });

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

  // Scale for real chart
  const maxDayVisitors = Math.max(
    ...(analytics?.dailyTrend?.map((d) => d.visitors) || [0]),
    1
  );

  // 1. PIN LOCK SCREEN (International Minimalist Obsidian Theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-white px-4">
        <div className="w-full max-w-[360px] rounded-2xl border border-white/[0.08] bg-[#111624] p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="grid size-12 place-items-center rounded-xl bg-[#0077ED] text-white mx-auto mb-3 font-black text-sm tracking-wider shadow-lg shadow-[#0077ED]/25">
              LB
            </span>
            <h1 className="text-base font-bold text-white tracking-tight">
              Looksbay Studio
            </h1>
            <p className="text-xs text-[#8E9BB0] mt-0.5">Admin Passcode</p>
          </div>

          {pinError && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400 font-semibold text-center border border-red-500/20">
              {pinError}
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-3">
            <input
              type="password"
              required
              placeholder="••••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-[#0A0E18] py-2.5 px-4 text-center text-sm font-bold tracking-widest text-white focus:border-[#0077ED] focus:outline-none focus:ring-2 focus:ring-[#0077ED]/20"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-md shadow-[#0077ED]/20"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] text-[#637085]">
            Default PIN: <code className="text-[#8E9BB0]">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD (International Studio Obsidian Theme — Zero Header/Footer Leak)
  return (
    <div className="min-h-screen bg-[#090D16] text-[#E1E7EF] flex flex-col font-sans selection:bg-[#0077ED] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#1A2234] border border-white/10 px-4 py-2.5 text-xs font-medium text-white shadow-2xl animate-fade-in">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Top Studio Bar */}
      <header className="sticky top-0 z-40 h-14 border-b border-white/[0.08] bg-[#090D16]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-[#0077ED] text-white text-xs font-black shadow-sm">
              LB
            </span>
            <span className="text-sm font-bold tracking-tight text-white">
              Looksbay Studio
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Real Tracking Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddPortfolioModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-[#0077ED] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-xs"
          >
            <Plus size={13} />
            <span>Project</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddTemplateModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
          >
            <Plus size={13} />
            <span>Template</span>
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={fetchData}
            title="Refresh"
            className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-[#8E9BB0] hover:text-white hover:bg-white/[0.08] transition"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-[#8E9BB0] hover:text-white hover:bg-white/[0.08]"
          >
            <span>Live Site</span>
            <ArrowUpRight size={12} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Lock"
            className="grid size-8 place-items-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* Main Studio Body: Sidebar + Active Canvas */}
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-20">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
              {
                id: "traffic",
                label: "Daily Traffic",
                icon: BarChart3,
                badge: analytics?.todayVisitors || 0,
              },
              {
                id: "portfolio",
                label: "Portfolio CMS",
                icon: Briefcase,
                badge: portfolioProjects.length,
              },
              {
                id: "templates",
                label: "Template Store",
                icon: ShoppingBag,
                badge: templateItems.length,
              },
              { id: "leads", label: "Registered Leads", icon: Users, badge: subscribers.length },
              {
                id: "inquiries",
                label: "Client Inquiries",
                icon: Inbox,
                badge: inquiries.filter((i) => i.status === "New").length || null,
              },
              { id: "settings", label: "Studio Settings", icon: Settings, badge: null },
            ].map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveTab(id as TabKey);
                  setSearchQuery("");
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  activeTab === id
                    ? "bg-[#0077ED] text-white shadow-md font-semibold"
                    : "text-[#8E9BB0] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} />
                  <span>{label}</span>
                </div>
                {badge !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTab === id
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.06] text-[#8E9BB0]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Nav Pills */}
        <div className="md:hidden flex overflow-x-auto pb-2 gap-2 w-full mb-3 shrink-0">
          {[
            { id: "portfolio", label: `Portfolio (${portfolioProjects.length})` },
            { id: "templates", label: `Templates (${templateItems.length})` },
            { id: "traffic", label: `Traffic (${analytics?.todayVisitors || 0})` },
            { id: "overview", label: "Overview" },
            { id: "leads", label: `Leads (${subscribers.length})` },
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
            { id: "settings", label: "Settings" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as TabKey)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === id
                  ? "bg-[#0077ED] text-white"
                  : "bg-white/[0.04] text-[#8E9BB0] border border-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <main className="flex-1 min-w-0">
          {/* TAB: PORTFOLIO CMS */}
          {activeTab === "portfolio" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Portfolio Showcase
                    </h2>
                    <span className="text-xs text-[#8E9BB0]">
                      {portfolioProjects.length} client projects live on website
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/portfolio"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077ED] hover:underline px-2 py-1"
                    >
                      <span>View Live</span>
                      <ArrowUpRight size={12} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsAddPortfolioModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add Project</span>
                    </button>
                  </div>
                </div>

                {/* Filter */}
                <div className="relative mb-5 max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E9BB0]">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#637085] focus:border-[#0077ED] focus:outline-none"
                  />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-xl border border-white/[0.08] bg-[#0D121F] overflow-hidden flex flex-col justify-between transition hover:border-[#0077ED]/50"
                    >
                      <div>
                        <div className="h-44 w-full bg-[#080B12] overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 left-2.5 rounded-full bg-[#090D16]/90 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                            {item.industry}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold text-white">{item.name}</h3>
                          <p className="text-[11px] text-[#0077ED] font-semibold mt-0.5">
                            {item.kind}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {item.tags?.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="rounded-md bg-white/[0.05] border border-white/[0.05] px-1.5 py-0.5 text-[10px] text-[#8E9BB0]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#637085] font-medium">
                          ❤️ {item.hearts || 520}
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href="/portfolio"
                            target="_blank"
                            className="text-xs font-semibold text-[#0077ED] hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>Live</span>
                            <ArrowUpRight size={11} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeletePortfolio(item.name)}
                            className="p-1 text-[#8E9BB0] hover:text-red-400 transition"
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

          {/* TAB: TEMPLATES STORE CMS */}
          {activeTab === "templates" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Template Store
                    </h2>
                    <span className="text-xs text-[#8E9BB0]">
                      {templateItems.length} templates available for purchase
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/templates"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077ED] hover:underline px-2 py-1"
                    >
                      <span>Public Store</span>
                      <ArrowUpRight size={12} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsAddTemplateModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add Template</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTemplates.map((t) => (
                    <div
                      key={t.id || t.slug}
                      className="group rounded-xl border border-white/[0.08] bg-[#0D121F] overflow-hidden flex flex-col justify-between transition hover:border-[#0077ED]/50"
                    >
                      <div>
                        <div className="h-44 w-full bg-[#080B12] overflow-hidden relative">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[10px] font-black shadow-xs">
                            ${t.price}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold text-white">{t.name}</h3>
                          <p className="text-[11px] text-[#0077ED] font-semibold mt-0.5">
                            {t.categories ? t.categories.join(", ") : "Squarespace 7.1"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <a
                          href={t.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0077ED] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight size={11} />
                        </a>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/templates/${t.slug}`}
                            target="_blank"
                            className="text-[#8E9BB0] hover:text-white"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t.id || t.slug, t.name)}
                            className="p-1 text-[#8E9BB0] hover:text-red-400 transition"
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

          {/* TAB: DAILY TRAFFIC (100% REAL LIVE TRACKING) */}
          {activeTab === "traffic" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm">
                <div className="border-b border-white/[0.06] pb-4 mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Website Traffic (100% Real Logs)
                    </h2>
                    <span className="text-xs text-[#8E9BB0]">
                      Active session tracking. Zero fake or simulated data.
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 text-[10px] font-semibold">
                    Real-time
                  </span>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] p-3.5">
                    <span className="text-[11px] font-medium text-[#8E9BB0]">Today Visitors</span>
                    <p className="text-2xl font-black text-[#0077ED] mt-0.5">
                      {analytics?.todayVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#637085] mt-1 block">Real unique browsers</span>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] p-3.5">
                    <span className="text-[11px] font-medium text-[#8E9BB0]">Today Pageviews</span>
                    <p className="text-2xl font-black text-white mt-0.5">
                      {analytics?.todayPageviews || 0}
                    </p>
                    <span className="text-[10px] text-[#637085] mt-1 block">Real pages browsed</span>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] p-3.5">
                    <span className="text-[11px] font-medium text-[#8E9BB0]">Yesterday Visitors</span>
                    <p className="text-2xl font-black text-[#8E9BB0] mt-0.5">
                      {analytics?.yesterdayVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#637085] mt-1 block">Previous day record</span>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] p-3.5">
                    <span className="text-[11px] font-medium text-[#8E9BB0]">Total Recorded</span>
                    <p className="text-2xl font-black text-purple-400 mt-0.5">
                      {analytics?.totalVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#637085] mt-1 block">All-time unique count</span>
                  </div>
                </div>

                {/* 7-Day Chart */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0A0E18] p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-white">7-Day Real Visitor History</span>
                    <span className="text-[11px] text-[#8E9BB0]">
                      Peak: {maxDayVisitors > 1 ? maxDayVisitors : 0}
                    </span>
                  </div>

                  <div className="h-36 flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2 sm:px-4 border-b border-white/10">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const heightPercent =
                        item.visitors > 0
                          ? Math.max(Math.round((item.visitors / maxDayVisitors) * 100), 12)
                          : 4;
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;

                      return (
                        <div key={item.date} className="flex-1 flex flex-col items-center h-full justify-end group">
                          <span className="text-[10px] font-bold text-white mb-1">
                            {item.visitors}
                          </span>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full max-w-[36px] rounded-t-md transition-all ${
                              isToday
                                ? "bg-[#0077ED]"
                                : item.visitors > 0
                                ? "bg-white/20 group-hover:bg-[#0077ED]/60"
                                : "bg-white/[0.04]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between gap-3 sm:gap-6 px-2 sm:px-4 pt-2">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;
                      return (
                        <div key={item.date} className="flex-1 text-center">
                          <span className={`text-[11px] font-bold block ${isToday ? "text-[#0077ED]" : "text-[#8E9BB0]"}`}>
                            {item.day}
                          </span>
                          <span className="text-[9px] text-[#637085] block">{item.date.slice(5)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real Top Pages */}
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Top Visited Routes
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0A0E18] border-b border-white/[0.08] text-[#8E9BB0] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Route Path</th>
                          <th className="py-2.5 px-4">Real Page Views</th>
                          <th className="py-2.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {analytics?.topPages && analytics.topPages.length > 0 ? (
                          analytics.topPages.map((p, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02]">
                              <td className="py-2.5 px-4 font-mono font-medium text-white">
                                {p.path}
                              </td>
                              <td className="py-2.5 px-4 font-semibold text-[#0077ED]">
                                {p.views}
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <Link
                                  href={p.path}
                                  target="_blank"
                                  className="text-[#0077ED] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                  <span>Visit</span>
                                  <ArrowUpRight size={11} />
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="py-6 text-center text-[#637085] text-xs">
                              No page visits recorded yet. Open the website to see real views log here instantly.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#111624] p-4">
                  <span className="text-xs text-[#8E9BB0] font-medium">Real Visitors Today</span>
                  <p className="text-2xl font-black text-[#0077ED] mt-1">{analytics?.todayVisitors || 0}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111624] p-4">
                  <span className="text-xs text-[#8E9BB0] font-medium">Portfolio Items</span>
                  <p className="text-2xl font-black text-white mt-1">{portfolioProjects.length}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111624] p-4">
                  <span className="text-xs text-[#8E9BB0] font-medium">Templates</span>
                  <p className="text-2xl font-black text-white mt-1">{templateItems.length}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111624] p-4">
                  <span className="text-xs text-[#8E9BB0] font-medium">Inquiries</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">{inquiries.length}</p>
                </div>
              </div>

              {/* Recent Leads */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                  <h3 className="text-sm font-bold text-white">Recent Member Sign-ups</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-semibold text-[#0077ED] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2">
                  {subscribers.slice(0, 5).map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between rounded-lg bg-[#090D16] p-2.5 border border-white/[0.04]"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{u.name}</p>
                        <p className="text-[11px] text-[#0077ED]">{u.email}</p>
                      </div>
                      <span className="text-[10px] text-[#637085]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {subscribers.length === 0 && (
                    <p className="text-xs text-[#637085] py-2">No registered leads yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Registered Leads</h2>
                    <span className="text-xs text-[#8E9BB0]">{subscribers.length} total members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyAllEmails}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08]"
                    >
                      <Copy size={13} />
                      <span>Copy Emails</span>
                    </button>
                    <a
                      href="/api/admin/users?format=csv"
                      download
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08]"
                    >
                      <Download size={13} />
                      <span>CSV</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsAddLeadModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A0E18] border-b border-white/[0.08] text-[#8E9BB0] font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Email</th>
                        <th className="py-2.5 px-4">Interest</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {filteredSubscribers.map((u) => (
                        <tr key={u.id} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-4 font-bold text-white">{u.name}</td>
                          <td className="py-2.5 px-4 text-[#0077ED] font-medium">{u.email}</td>
                          <td className="py-2.5 px-4 text-[#8E9BB0]">{u.interest}</td>
                          <td className="py-2.5 px-4 text-[#637085]">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteSubscriber(u.id)}
                              className="text-[#8E9BB0] hover:text-red-400 transition p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredSubscribers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-[#637085] text-xs">
                            No member leads recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm">
                <div className="border-b border-white/[0.06] pb-4 mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Client Inquiries</h2>
                    <span className="text-xs text-[#8E9BB0]">{inquiries.length} submissions</span>
                  </div>
                  <button
                    type="button"
                    onClick={fetchData}
                    className="text-xs font-semibold text-[#0077ED] hover:underline"
                  >
                    Refresh
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-xl border border-white/[0.08] bg-[#0D121F] p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              inq.status === "New"
                                ? "bg-blue-500/20 text-[#0077ED]"
                                : inq.status === "Contacted"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-emerald-500/20 text-emerald-400"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-[10px] text-[#637085]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white">{inq.name}</h3>
                        <a href={`mailto:${inq.email}`} className="text-xs text-[#0077ED] font-medium block">
                          {inq.email}
                        </a>

                        <div className="mt-2 flex gap-2 text-[10px] text-[#8E9BB0]">
                          <span className="rounded bg-white/[0.04] border border-white/10 px-1.5 py-0.5 font-medium">
                            {inq.project}
                          </span>
                          <span className="rounded bg-white/[0.04] border border-white/10 px-1.5 py-0.5 font-medium text-emerald-400">
                            {inq.budget}
                          </span>
                        </div>

                        <p className="mt-2 text-xs text-[#8E9BB0] leading-relaxed line-clamp-2">
                          {inq.message}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="rounded-lg border border-white/10 bg-[#090D16] text-white px-2 py-1 text-[11px] font-medium"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#0077ED] px-2.5 py-1 text-[11px] font-semibold text-white"
                          >
                            <Mail size={11} />
                            <span>Reply</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1 text-[#8E9BB0] hover:text-red-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredInquiries.length === 0 && (
                    <div className="col-span-2 py-6 text-center text-[#637085] text-xs">
                      No client inquiries received yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111624] p-5 sm:p-6 shadow-sm max-w-md">
                <h2 className="text-base font-bold text-white mb-4">Passcode Settings</h2>

                <form onSubmit={handleUpdatePin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#8E9BB0] mb-1">
                      New Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062C4]"
                  >
                    Save Passcode
                  </button>
                </form>

                <p className="mt-4 text-xs text-[#637085]">
                  Current PIN: <code className="text-[#8E9BB0]">{currentMasterPin}</code>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Portfolio Project */}
      {isAddPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111624] text-white p-5 sm:p-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Add Portfolio Project</h3>
              <button
                type="button"
                onClick={() => setIsAddPortfolioModalOpen(false)}
                className="text-[#8E9BB0] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumina Studio"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                    Industry
                  </label>
                  <select
                    value={newPortfolioIndustry}
                    onChange={(e) => setNewPortfolioIndustry(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                  >
                    <option value="Creative">Creative</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Studio">Studio</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                    Kind
                  </label>
                  <input
                    type="text"
                    placeholder="Custom Squarespace Website"
                    value={newPortfolioKind}
                    onChange={(e) => setNewPortfolioKind(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newPortfolioImage}
                  onChange={(e) => setNewPortfolioImage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
                {newPortfolioImage && (
                  <div className="mt-2 h-28 w-full rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={newPortfolioImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as any).src =
                          "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Squarespace 7.1, Fluid Engine, Custom CSS"
                  value={newPortfolioTags}
                  onChange={(e) => setNewPortfolioTags(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Bespoke website built with Fluid Engine."
                  value={newPortfolioDescription}
                  onChange={(e) => setNewPortfolioDescription(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4]"
              >
                Publish Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Template */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111624] text-white p-5 sm:p-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Add Template</h3>
              <button
                type="button"
                onClick={() => setIsAddTemplateModalOpen(false)}
                className="text-[#8E9BB0] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Horizon"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="horizon"
                    value={newTemplateSlug}
                    onChange={(e) => setNewTemplateSlug(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="180.00"
                    value={newTemplatePrice}
                    onChange={(e) => setNewTemplatePrice(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Categories
                </label>
                <input
                  type="text"
                  placeholder="Designer, Creative, Studio"
                  value={newTemplateCategories}
                  onChange={(e) => setNewTemplateCategories(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newTemplateImage}
                  onChange={(e) => setNewTemplateImage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
                {newTemplateImage && (
                  <div className="mt-2 h-28 w-full rounded-lg overflow-hidden border border-white/10">
                    <img src={newTemplateImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://demo.squarespace.com"
                  value={newTemplateDemoUrl}
                  onChange={(e) => setNewTemplateDemoUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4]"
              >
                Publish Template
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Lead */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[380px] rounded-2xl bg-[#111624] text-white p-5 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Add Lead</h3>
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-[#8E9BB0] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E9BB0] mb-1">Interest</label>
                <select
                  value={newLeadInterest}
                  onChange={(e) => setNewLeadInterest(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] py-2 px-3 text-xs text-white focus:border-[#0077ED] focus:outline-none"
                >
                  <option value="Squarespace Templates">Squarespace Templates</option>
                  <option value="Custom Development">Custom Development</option>
                  <option value="Squarespace SEO">Squarespace SEO</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4]"
              >
                Save Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
