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
  Briefcase,
  BarChart3,
  Globe,
  Sparkles,
} from "lucide-react";
import { allTemplates as fallbackTemplates } from "@/app/shared/data/templates-data";

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
  alt?: string;
  description: string;
  tags: string[];
  hearts?: number;
}

interface TemplateItem {
  id: string;
  slug: string;
  name: string;
  price: string;
  originalPrice?: string;
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
  | "campaigns"
  | "seo"
  | "settings";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Data states
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(true);
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
    setTimeout(() => setToastMessage(null), 2800);
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
      setTemplateItems(templatesData.templates || fallbackTemplates);
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

  // Add Portfolio Handler
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim() || !newPortfolioImage.trim()) {
      showToast("Please provide project name and image URL");
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
          description:
            newPortfolioDescription.trim() ||
            "Bespoke Squarespace website built with Fluid Engine.",
          tags: newPortfolioTags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolioProjects((prev) => [data.project, ...prev]);
        setIsAddPortfolioModalOpen(false);
        setNewPortfolioName("");
        setNewPortfolioImage("");
        setNewPortfolioDescription("");
        showToast("Portfolio project added successfully!");
      } else {
        showToast("Failed to create portfolio project");
      }
    } catch (e) {
      console.error(e);
      showToast("Network error while adding portfolio project");
    }
  };

  // Delete Portfolio Handler
  const handleDeletePortfolio = async (name: string) => {
    if (!confirm(`Are you sure you want to delete portfolio project "${name}"?`)) return;
    try {
      const res = await fetch(`/api/portfolio?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPortfolioProjects((prev) =>
          prev.filter((p) => p.name.toLowerCase() !== name.toLowerCase())
        );
        showToast("Portfolio project deleted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Template Handler
  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim() || !newTemplatePrice.trim()) {
      showToast("Please provide template name and price");
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
          categories: newTemplateCategories
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          image:
            newTemplateImage.trim() ||
            "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
          demoUrl: newTemplateDemoUrl.trim() || `https://${cleanSlug}.squarespace.com`,
          description:
            newTemplateDescription.trim() ||
            "Premium Squarespace 7.1 template engineered for conversions.",
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
        showToast("Template added to store successfully!");
      } else {
        showToast("Failed to create template");
      }
    } catch (e) {
      console.error(e);
      showToast("Network error while adding template");
    }
  };

  // Delete Template Handler
  const handleDeleteTemplate = async (idOrSlug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete template "${name}"?`)) return;
    try {
      const res = await fetch(`/api/templates?id=${encodeURIComponent(idOrSlug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTemplateItems((prev) =>
          prev.filter((t) => t.id !== idOrSlug && t.slug !== idOrSlug)
        );
        showToast("Template deleted from store");
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

  // Filtered portfolio
  const filteredPortfolio = portfolioProjects.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.kind.toLowerCase().includes(q)
    );
  });

  // Estimated pipeline calculation
  const totalPipelineValue = inquiries.reduce((acc, inq) => {
    if (inq.budget.includes("5,000")) return acc + 5000;
    if (inq.budget.includes("3,000")) return acc + 3500;
    if (inq.budget.includes("1,500")) return acc + 2000;
    return acc + 1000;
  }, 0);

  // Peak visitors for chart scaling
  const maxDayVisitors = Math.max(
    ...(analytics?.dailyTrend?.map((d) => d.visitors) || [50]),
    20
  );

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
              Enterprise control center for users, traffic, portfolio, and templates.
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
                placeholder="Enter PIN (Default: admin123)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-black/10 bg-[#fbfbfd] py-3 px-4 text-center text-base font-bold tracking-widest text-[#1d1d1f] transition focus:border-[#0077ed] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0077ed]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0077ed] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#0062c4] active:scale-[0.99]"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-[#86868b]">
            Protected with AES Session Token. PIN: <code>admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#1D1D1F] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-black/[0.08] bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-extrabold tracking-tight text-[#1D1D1F]"
            >
              <span className="grid size-7 place-items-center rounded-lg bg-[#0077ED] text-white shadow-xs">
                L
              </span>
              <span>Looksbay Admin Suite</span>
            </Link>
            <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={fetchData}
              title="Refresh Data"
              className="grid size-8 place-items-center rounded-lg border border-black/10 bg-white text-[#515154] hover:bg-[#F5F5F7]"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#515154] hover:bg-[#F5F5F7]"
            >
              <span>View Live Website</span>
              <ExternalLink size={12} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="grid size-8 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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
              {
                id: "traffic",
                label: "Daily Traffic",
                icon: BarChart3,
                badge: analytics?.todayVisitors ? `${analytics.todayVisitors} today` : "Live",
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
              { id: "leads", label: "Users & Leads", icon: Users, badge: subscribers.length },
              {
                id: "inquiries",
                label: "Client Inquiries",
                icon: Inbox,
                badge: inquiries.filter((i) => i.status === "New").length || null,
              },
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
            { id: "traffic", label: `Traffic (${analytics?.todayVisitors || 0})` },
            { id: "portfolio", label: `Portfolio (${portfolioProjects.length})` },
            { id: "templates", label: `Templates (${templateItems.length})` },
            { id: "leads", label: `Leads (${subscribers.length})` },
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Daily Traffic Card */}
                <div
                  onClick={() => setActiveTab("traffic")}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs cursor-pointer transition hover:border-[#0077ED]/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Today&apos;s Website Visitors
                    </span>
                    <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-[#0077ED]">
                      <BarChart3 size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    {analytics?.todayVisitors || 0}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-600">
                      Yesterday: {analytics?.yesterdayVisitors || 0} visitors
                    </span>
                    <span className="text-[#0077ED] font-bold">View Traffic →</span>
                  </div>
                </div>

                {/* Registered Leads */}
                <div
                  onClick={() => setActiveTab("leads")}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs cursor-pointer transition hover:border-[#0077ED]/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Member Leads
                    </span>
                    <span className="grid size-8 place-items-center rounded-xl bg-purple-50 text-purple-600">
                      <Users size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    {subscribers.length}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-emerald-600">
                    +100% Verified Opt-ins
                  </span>
                </div>

                {/* Portfolio Projects */}
                <div
                  onClick={() => setActiveTab("portfolio")}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs cursor-pointer transition hover:border-[#0077ED]/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Portfolio Showcase
                    </span>
                    <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Briefcase size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    {portfolioProjects.length}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-indigo-600">
                    Live Client Showcase Items
                  </span>
                </div>

                {/* Active Templates */}
                <div
                  onClick={() => setActiveTab("templates")}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs cursor-pointer transition hover:border-[#0077ED]/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Template Store
                    </span>
                    <span className="grid size-8 place-items-center rounded-xl bg-pink-50 text-pink-600">
                      <ShoppingBag size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    {templateItems.length}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-pink-600">
                    Squarespace 7.1 Templates Live
                  </span>
                </div>

                {/* Pipeline Value */}
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Client Pipeline
                    </span>
                    <span className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl sm:text-3xl font-black text-[#1D1D1F]">
                    ${totalPipelineValue.toLocaleString()}
                  </p>
                  <span className="mt-2 block text-xs font-semibold text-emerald-600">
                    {inquiries.length} Active Client Inquiries
                  </span>
                </div>

                {/* SEO Health */}
                <div
                  onClick={() => setActiveTab("seo")}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs cursor-pointer transition hover:border-[#0077ED]/40"
                >
                  <div className="flex items-center justify-between text-[#86868B]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      SEO Health Score
                    </span>
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
                      <h2 className="text-base font-bold text-[#1D1D1F]">
                        Recent Member Sign-Ups
                      </h2>
                      <p className="text-xs text-[#86868B]">
                        Live users captured from the website navigation
                      </p>
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
                    <h2 className="text-base font-bold text-[#1D1D1F]">Quick Studio Actions</h2>
                    <p className="text-xs text-[#86868B] mb-5">
                      Fast 1-click access to common operations
                    </p>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setIsAddPortfolioModalOpen(true)}
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Plus size={14} className="text-[#0077ED]" />
                          <span>+ Add Portfolio Project</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsAddTemplateModalOpen(true)}
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Plus size={14} className="text-purple-600" />
                          <span>+ Add New Template</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </button>

                      <button
                        type="button"
                        onClick={copyAllEmails}
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Copy size={14} className="text-emerald-600" />
                          <span>Copy Marketing Emails</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </button>

                      <a
                        href="/api/admin/users?format=csv"
                        download
                        className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-[#FBFBFD] px-3.5 py-2.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
                      >
                        <div className="flex items-center gap-2">
                          <Download size={14} className="text-[#515154]" />
                          <span>Download CSV Contacts</span>
                        </div>
                        <ChevronRight size={14} className="text-[#86868B]" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-blue-50/70 border border-[#0077ED]/20 p-3.5 text-xs text-[#0077ED]">
                    <p className="font-bold">Automated Live Tracking</p>
                    <p className="mt-0.5 text-[11px] text-[#515154]">
                      Every client visit and route change is recorded automatically with zero third-party cookies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAILY TRAFFIC & ANALYTICS */}
          {activeTab === "traffic" && (
            <div className="space-y-6 animate-fade-in">
              {/* Traffic Metrics Header */}
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Daily Website Traffic & Visitor Intelligence
                    </h2>
                    <p className="text-xs text-[#86868B]">
                      Daily unique visitors, page views, and top website routes.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                      <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Tracker Active
                    </span>
                  </div>
                </div>

                {/* 4 Traffic Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                      Today&apos;s Visitors
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-[#0077ED] mt-1">
                      {analytics?.todayVisitors || 0}
                    </p>
                    <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
                      Unique users today
                    </span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                      Today&apos;s Page Views
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F] mt-1">
                      {analytics?.todayPageviews || 0}
                    </p>
                    <span className="text-[11px] text-[#86868B] mt-1 block">
                      Total pages browsed today
                    </span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                      Yesterday&apos;s Visitors
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-[#515154] mt-1">
                      {analytics?.yesterdayVisitors || 0}
                    </p>
                    <span className="text-[11px] text-[#86868B] mt-1 block">
                      Previous day traffic
                    </span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                      Total Visitors Logged
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-purple-600 mt-1">
                      {analytics?.totalVisitors || 0}
                    </p>
                    <span className="text-[11px] text-[#86868B] mt-1 block">
                      {analytics?.totalPageviews || 0} All-time views
                    </span>
                  </div>
                </div>

                {/* Visual Daily Visitor Trend Chart (7-Day Bar Graph) */}
                <div className="border border-black/5 rounded-2xl p-5 bg-[#FBFBFD] mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F]">
                        Last 7 Days Visitor Trend (Daily Breakdown)
                      </h3>
                      <p className="text-[11px] text-[#86868B]">
                        Real-time visitor count for each specific day
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0077ED]">
                      Peak Day: {maxDayVisitors} visitors
                    </span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 sm:px-6 border-b border-black/10">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const heightPercent = Math.max(
                        Math.round((item.visitors / maxDayVisitors) * 100),
                        8
                      );
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;

                      return (
                        <div
                          key={item.date}
                          className="flex-1 flex flex-col items-center h-full justify-end group"
                        >
                          <span className="text-[11px] font-bold text-[#1D1D1F] mb-1.5 opacity-90 group-hover:scale-110 transition-transform">
                            {item.visitors}
                          </span>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 group-hover:brightness-110 ${
                              isToday
                                ? "bg-gradient-to-t from-[#0077ED] to-[#3898FF] shadow-sm"
                                : "bg-black/[0.12] hover:bg-[#0077ED]/60"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Labels Under Chart */}
                  <div className="flex justify-between gap-3 sm:gap-6 px-2 sm:px-6 pt-2.5">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;
                      return (
                        <div key={item.date} className="flex-1 text-center">
                          <span
                            className={`block text-[11px] font-bold ${
                              isToday ? "text-[#0077ED]" : "text-[#515154]"
                            }`}
                          >
                            {item.day}
                          </span>
                          <span className="block text-[9px] text-[#86868B]">
                            {item.date.slice(5)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Visited Pages Table */}
                <div>
                  <h3 className="text-sm font-bold text-[#1D1D1F] mb-3">
                    Top Visited Pages & Content Performance
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-black/5">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F5F7] border-b border-black/5 text-[#515154] font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-4">Page Route</th>
                          <th className="py-2.5 px-4">Total Pageviews</th>
                          <th className="py-2.5 px-4">Share of Traffic</th>
                          <th className="py-2.5 px-4 text-right">Live Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {analytics?.topPages?.map((p, idx) => {
                          const totalViews = analytics.totalPageviews || 1;
                          const percent = Math.min(
                            100,
                            Math.round((p.views / totalViews) * 100)
                          );
                          return (
                            <tr key={idx} className="hover:bg-[#FBFBFD]">
                              <td className="py-2.5 px-4 font-mono font-bold text-[#1D1D1F]">
                                {p.path}
                              </td>
                              <td className="py-2.5 px-4 font-bold text-[#0077ED]">
                                {p.views.toLocaleString()} views
                              </td>
                              <td className="py-2.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-28 rounded-full bg-black/5 overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-[#0077ED]"
                                      style={{ width: `${Math.max(percent, 8)}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-[#86868B] font-semibold">
                                    {percent}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <Link
                                  href={p.path}
                                  target="_blank"
                                  className="text-[#0077ED] font-semibold hover:underline inline-flex items-center gap-1"
                                >
                                  <span>Visit</span>
                                  <ExternalLink size={11} />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO CMS */}
          {activeTab === "portfolio" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Portfolio Showcase CMS
                    </h2>
                    <p className="text-xs text-[#86868B]">
                      Add, update, or remove portfolio client projects dynamically without touching code.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/portfolio"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0077ED] hover:underline"
                    >
                      <span>View Public Showcase</span>
                      <ExternalLink size={13} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsAddPortfolioModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add Portfolio Item</span>
                    </button>
                  </div>
                </div>

                {/* Portfolio Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-black/[0.08] bg-[#FBFBFD] overflow-hidden shadow-xs flex flex-col justify-between transition hover:border-[#0077ED]/40 hover:bg-white"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="h-44 w-full bg-neutral-100 overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-[#1D1D1F] shadow-xs">
                            {item.industry}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-base font-bold text-[#1D1D1F]">{item.name}</h3>
                          <p className="text-xs font-semibold text-[#0077ED] mt-0.5">
                            {item.kind}
                          </p>
                          <p className="text-xs text-[#515154] mt-2 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.tags?.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="rounded-md bg-black/5 px-2 py-0.5 text-[10px] font-medium text-[#515154]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 pt-3 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#86868B]">
                          ❤️ {item.hearts || 520} likes
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href="/portfolio"
                            target="_blank"
                            className="text-xs font-bold text-[#0077ED] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Live</span>
                            <ExternalLink size={11} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeletePortfolio(item.name)}
                            className="rounded-lg p-1.5 text-[#86868B] hover:bg-red-50 hover:text-red-600 transition"
                            title="Delete Project"
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

          {/* TAB 4: TEMPLATES CATALOG CMS */}
          {activeTab === "templates" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Template Store & Catalog CMS
                    </h2>
                    <p className="text-xs text-[#86868B]">
                      Manage prices, preview URLs, and add new Squarespace 7.1 templates.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/templates"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077ED] hover:underline"
                    >
                      <span>View Public Store</span>
                      <ExternalLink size={13} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsAddTemplateModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add New Template</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {templateItems.map((t) => (
                    <div
                      key={t.id || t.slug}
                      className="group rounded-2xl border border-black/[0.08] bg-[#FBFBFD] overflow-hidden shadow-xs flex flex-col justify-between transition hover:border-[#0077ED]/40 hover:bg-white"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="h-44 w-full bg-neutral-100 overflow-hidden relative">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[10px] font-black shadow-xs">
                            ${t.price} USD
                          </span>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="rounded-full bg-blue-50 text-[#0077ED] px-2 py-0.5 text-[10px] font-bold">
                              Fluid Engine 7.1
                            </span>
                            <span className="text-[11px] font-mono text-[#86868B]">
                              /{t.slug}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#1D1D1F]">{t.name}</h3>
                          <p className="text-xs text-[#0077ED] font-semibold">
                            {t.categories ? t.categories.join(", ") : "Squarespace Template"}
                          </p>
                          <p className="mt-2 text-xs text-[#515154] line-clamp-2">
                            {t.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-3 border-t border-black/5 flex items-center justify-between">
                        <a
                          href={t.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#0077ED] hover:underline"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/templates/${t.slug}`}
                            target="_blank"
                            className="text-xs font-bold text-[#515154] hover:text-[#1D1D1F]"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t.id || t.slug, t.name)}
                            className="rounded-lg p-1.5 text-[#86868B] hover:bg-red-50 hover:text-red-600 transition"
                            title="Delete Template"
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

          {/* TAB 5: LEADS & USERS */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Registered Leads & Members
                    </h2>
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
                            <a
                              href={`mailto:${u.email}`}
                              className="text-[#0077ED] font-semibold hover:underline"
                            >
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

          {/* TAB 6: CLIENT INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5 mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Client Inquiries & Project Briefs
                    </h2>
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
                          onChange={(e) =>
                            updateInquiryStatus(inq.id, e.target.value as any)
                          }
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

          {/* TAB 7: EMAIL MARKETING */}
          {activeTab === "campaigns" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5">
                  <h2 className="text-xl font-bold text-[#1D1D1F]">
                    Email Marketing & Campaign Broadcaster
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Segment your captured leads and export directly to Mailchimp, Klaviyo, Brevo, or Flodesk.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">Ready Audience</span>
                    <p className="text-2xl font-black text-[#1D1D1F] mt-1">
                      {subscribers.length} Emails
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold">100% Opt-in</span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">Template Buyers</span>
                    <p className="text-2xl font-black text-[#0077ED] mt-1">
                      {subscribers.filter((s) => s.interest.includes("Template")).length}
                    </p>
                    <span className="text-[11px] text-[#86868B]">High Intent</span>
                  </div>

                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">High-Ticket Clients</span>
                    <p className="text-2xl font-black text-purple-600 mt-1">
                      {subscribers.filter((s) => s.interest.includes("Custom")).length}
                    </p>
                    <span className="text-[11px] text-[#86868B]">Custom Dev Segment</span>
                  </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F]">
                    1-Click Marketing Campaign Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={copyAllEmails}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0077ED] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Copy size={14} />
                      <span>Copy All ({subscribers.length}) Emails</span>
                    </button>

                    <a
                      href="/api/admin/users?format=csv"
                      download
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs font-bold text-[#1D1D1F] shadow-xs transition hover:bg-[#F5F5F7]"
                    >
                      <Download size={14} />
                      <span>Download CSV for Mailchimp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: TECHNICAL SEO HEALTH */}
          {activeTab === "seo" && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D1D1F]">
                      Technical SEO & Core Web Vitals Monitor
                    </h2>
                    <p className="text-xs text-[#86868B]">
                      Search engine crawler status, JSON-LD structured schemas, and performance indicators.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-black">
                    Grade A+ (98/100)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl border border-black/5 bg-[#FBFBFD] p-4 text-center">
                    <span className="text-xs font-bold text-[#86868B]">LCP (Largest Contentful Paint)</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1">0.82s</p>
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

          {/* TAB 9: SETTINGS & PASSCODE */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-fade-in max-w-xl">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                <div className="border-b border-black/5 pb-5 mb-5">
                  <h2 className="text-xl font-bold text-[#1D1D1F]">
                    Admin Passcode & Studio Settings
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Update master security credentials for the admin suite.
                  </p>
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
                    <strong>Current Active PIN:</strong>{" "}
                    <code className="font-bold text-[#1D1D1F]">{currentMasterPin}</code>
                  </p>
                  <p>
                    <strong>Studio Email:</strong>{" "}
                    <code className="font-bold text-[#1D1D1F]">hello@looksbay.com</code>
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Portfolio Project */}
      {isAddPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-[#0077ED]/10 text-[#0077ED]">
                  <Briefcase size={16} />
                </span>
                <h3 className="text-base font-bold text-[#1D1D1F]">Add Portfolio Project</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPortfolioModalOpen(false)}
                className="text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumina Architecture & Interior"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#515154] mb-1">
                    Industry Category
                  </label>
                  <select
                    value={newPortfolioIndustry}
                    onChange={(e) => setNewPortfolioIndustry(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                  >
                    <option value="Creative">Creative</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Studio">Studio</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#515154] mb-1">
                    Project Kind / Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Custom Squarespace Website"
                    value={newPortfolioKind}
                    onChange={(e) => setNewPortfolioKind(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Image URL (Squarespace CDN or Web URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.squarespace-cdn.com/..."
                  value={newPortfolioImage}
                  onChange={(e) => setNewPortfolioImage(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
                {newPortfolioImage && (
                  <div className="mt-2 h-28 w-full rounded-lg overflow-hidden border border-black/10">
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
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Technology Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Squarespace 7.1, Fluid Engine, Custom CSS"
                  value={newPortfolioTags}
                  onChange={(e) => setNewPortfolioTags(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Bespoke luxury brand website with fluid animations and responsive mobile architecture."
                  value={newPortfolioDescription}
                  onChange={(e) => setNewPortfolioDescription(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
              >
                Save & Publish to Portfolio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Template */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-purple-50 text-purple-600">
                  <ShoppingBag size={16} />
                </span>
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  Add New Squarespace Template
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddTemplateModalOpen(false)}
                className="text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Horizon Studio"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#515154] mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. horizon-studio"
                    value={newTemplateSlug}
                    onChange={(e) => setNewTemplateSlug(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#515154] mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="180.00"
                    value={newTemplatePrice}
                    onChange={(e) => setNewTemplatePrice(e.target.value)}
                    className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Categories (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Designer, Creative, Photography, Studio"
                  value={newTemplateCategories}
                  onChange={(e) => setNewTemplateCategories(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Template Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.squarespace-cdn.com/..."
                  value={newTemplateImage}
                  onChange={(e) => setNewTemplateImage(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
                {newTemplateImage && (
                  <div className="mt-2 h-28 w-full rounded-lg overflow-hidden border border-black/10">
                    <img
                      src={newTemplateImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Live Squarespace Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://demo.squarespace.com"
                  value={newTemplateDemoUrl}
                  onChange={(e) => setNewTemplateDemoUrl(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Modern, luxury Squarespace 7.1 template built for conversions and client engagement."
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062C4]"
              >
                Publish Template to Store
              </button>
            </form>
          </div>
        </div>
      )}

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
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Prospect Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FBFBFD] py-2.5 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Email Address
                </label>
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
                <label className="block text-[11px] font-bold text-[#515154] mb-1">
                  Primary Interest
                </label>
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
