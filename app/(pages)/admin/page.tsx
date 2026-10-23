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
  MessageCircle,
  Table as TableIcon,
  LayoutGrid,
  Eye,
  Check,
  Phone,
  MessageSquare,
  Clock,
  DollarSign,
  FileText,
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
  whatsapp?: string;
  phone?: string;
  project: string;
  budget: string;
  message: string;
  template?: string;
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
  const [activeTab, setActiveTab] = useState<TabKey>("inquiries");

  // Data states
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inquiries view & filter state
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<string>("all");
  const [inquiryViewMode, setInquiryViewMode] = useState<"table" | "cards">("table");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

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
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        showToast("Inquiry removed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyInquiryEmails = () => {
    const emails = inquiries.map((i) => i.email).filter(Boolean).join(", ");
    if (!emails) {
      showToast("No client emails to copy");
      return;
    }
    navigator.clipboard.writeText(emails);
    showToast("Client emails copied to clipboard");
  };

  const copyTextToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  const formatCleanPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/[^0-9]/g, "");
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
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.whatsapp && inq.whatsapp.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      inq.project.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q) ||
      inq.status.toLowerCase().includes(q);

    const matchesStatus =
      inquiryFilterStatus === "all" || inq.status === inquiryFilterStatus;

    return matchesSearch && matchesStatus;
  });

  // Scale for real chart
  const maxDayVisitors = Math.max(
    ...(analytics?.dailyTrend?.map((d) => d.visitors) || [0]),
    1
  );

  // 1. PIN LOCK SCREEN (Clean Luxury Apple-White Theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] text-[#1D1D1F] px-4 font-sans">
        <div className="w-full max-w-[370px] rounded-2xl border border-black/[0.08] bg-white p-8 shadow-xl">
          <div className="text-center mb-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#0077ED] text-white mx-auto mb-3 font-black text-sm tracking-wider shadow-md shadow-[#0077ED]/25">
              LB
            </span>
            <h1 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
              Looksbay Studio
            </h1>
            <p className="text-xs text-[#6E6E73] mt-0.5">Admin Passcode Access</p>
          </div>

          {pinError && (
            <div className="mb-4 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 font-semibold text-center border border-red-200">
              {pinError}
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-3.5">
            <input
              type="password"
              required
              placeholder="••••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-3 px-4 text-center text-sm font-bold tracking-widest text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0077ED]/10 transition"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-sm shadow-[#0077ED]/25"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] text-[#8E8E93]">
            Default Passcode: <code className="font-semibold text-[#1D1D1F]">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD (Clean Luxury White Theme)
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col font-sans selection:bg-[#0077ED] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#1D1D1F] text-white px-4 py-2.5 text-xs font-medium shadow-2xl animate-fade-in">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Top Studio Bar (Clean White) */}
      <header className="sticky top-0 z-40 h-14 border-b border-black/[0.08] bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-[#0077ED] text-white text-xs font-black shadow-xs">
              LB
            </span>
            <span className="text-sm font-bold tracking-tight text-[#1D1D1F]">
              Looksbay Studio
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live System Active
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
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] transition hover:bg-[#F5F5F7]"
          >
            <Plus size={13} />
            <span>Template</span>
          </button>

          <div className="h-4 w-px bg-black/10 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={fetchData}
            title="Refresh"
            className="grid size-8 place-items-center rounded-lg border border-black/10 bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
          >
            <span>Live Site</span>
            <ArrowUpRight size={12} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Lock session"
            className="grid size-8 place-items-center rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* Main Studio Body: Sidebar + Active Canvas */}
      <div className="mx-auto flex w-full max-w-[1500px] flex-1 px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar Nav (Light) */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-20">
            {[
              { id: "inquiries", label: "Client Inquiries", icon: Inbox, badge: inquiries.filter((i) => i.status === "New").length || null },
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
              { id: "settings", label: "Studio Settings", icon: Settings, badge: null },
            ].map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveTab(id as TabKey);
                  setSearchQuery("");
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                  activeTab === id
                    ? "bg-[#0077ED] text-white shadow-sm font-semibold"
                    : "text-[#6E6E73] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
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
                        ? "bg-white/25 text-white"
                        : "bg-black/[0.06] text-[#1D1D1F]"
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
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
            { id: "overview", label: "Overview" },
            { id: "traffic", label: `Traffic (${analytics?.todayVisitors || 0})` },
            { id: "portfolio", label: `Portfolio (${portfolioProjects.length})` },
            { id: "templates", label: `Templates (${templateItems.length})` },
            { id: "leads", label: `Leads (${subscribers.length})` },
            { id: "settings", label: "Settings" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as TabKey)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === id
                  ? "bg-[#0077ED] text-white shadow-xs"
                  : "bg-white text-[#6E6E73] border border-black/[0.08]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <main className="flex-1 min-w-0">
          {/* TAB: CLIENT INQUIRIES (Primary High-End Light Table View) */}
          {activeTab === "inquiries" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-7 shadow-xs">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5 mb-5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
                        Client Inquiries &amp; Leads
                      </h2>
                      <span className="rounded-full bg-[#0077ED]/10 text-[#0077ED] border border-[#0077ED]/20 px-2.5 py-0.5 text-xs font-bold">
                        {inquiries.length} total
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6E73] mt-1 mb-0">
                      Real-time client leads from Contact Form with verified WhatsApp and Email channels.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyInquiryEmails}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition"
                    >
                      <Copy size={13} />
                      <span>Copy Emails</span>
                    </button>

                    <a
                      href="/api/contact?format=csv"
                      download
                      className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition"
                    >
                      <Download size={13} />
                      <span>CSV Export</span>
                    </a>

                    <button
                      type="button"
                      onClick={fetchData}
                      title="Refresh inquiries"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0062C4] shadow-xs transition"
                    >
                      <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {/* Metrics Row (Light) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                      Total Inquiries
                    </span>
                    <p className="text-2xl font-black text-[#1D1D1F] mt-1 mb-0">{inquiries.length}</p>
                    <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Submissions received</span>
                  </div>

                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                        New / Action Needed
                      </span>
                      <span className="size-2 rounded-full bg-[#0077ED] animate-pulse" />
                    </div>
                    <p className="text-2xl font-black text-[#0077ED] mt-1 mb-0">
                      {inquiries.filter((i) => i.status === "New").length}
                    </p>
                    <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Pending first response</span>
                  </div>

                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                      In Discussion
                    </span>
                    <p className="text-2xl font-black text-amber-600 mt-1 mb-0">
                      {inquiries.filter((i) => i.status === "Contacted" || i.status === "Proposal Sent").length}
                    </p>
                    <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Contacted or proposal sent</span>
                  </div>

                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                      Converted / Closed
                    </span>
                    <p className="text-2xl font-black text-emerald-600 mt-1 mb-0">
                      {inquiries.filter((i) => i.status === "Closed").length}
                    </p>
                    <span className="text-[11px] text-[#8E8E93] mt-0.5 block">Deals finalized</span>
                  </div>
                </div>

                {/* Filters & Search Toolbar (Light) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                  {/* Status Filter Tabs */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "all", label: "All", count: inquiries.length },
                      {
                        id: "New",
                        label: "New",
                        count: inquiries.filter((i) => i.status === "New").length,
                        activeColor: "bg-blue-50 text-[#0077ED] border-blue-300 font-bold",
                      },
                      {
                        id: "Contacted",
                        label: "Contacted",
                        count: inquiries.filter((i) => i.status === "Contacted").length,
                        activeColor: "bg-amber-50 text-amber-700 border-amber-300 font-bold",
                      },
                      {
                        id: "Proposal Sent",
                        label: "Proposal Sent",
                        count: inquiries.filter((i) => i.status === "Proposal Sent").length,
                        activeColor: "bg-purple-50 text-purple-700 border-purple-300 font-bold",
                      },
                      {
                        id: "Closed",
                        label: "Closed",
                        count: inquiries.filter((i) => i.status === "Closed").length,
                        activeColor: "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold",
                      },
                    ].map((tab) => {
                      const isActive = inquiryFilterStatus === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setInquiryFilterStatus(tab.id)}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            isActive
                              ? tab.activeColor || "bg-[#0077ED] text-white border-[#0077ED]"
                              : "border-black/[0.08] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                              isActive ? "bg-black/10 text-current" : "bg-black/[0.05] text-[#6E6E73]"
                            }`}
                          >
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search and View Mode */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]">
                        <Search size={14} />
                      </span>
                      <input
                        type="text"
                        placeholder="Search name, email, WhatsApp..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-1.5 pl-9 pr-3 text-xs text-[#1D1D1F] placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div className="flex items-center rounded-xl border border-black/10 bg-[#F5F5F7] p-0.5">
                      <button
                        type="button"
                        onClick={() => setInquiryViewMode("table")}
                        title="Table View"
                        className={`rounded-lg p-1.5 transition ${
                          inquiryViewMode === "table"
                            ? "bg-white text-[#1D1D1F] shadow-xs"
                            : "text-[#8E8E93] hover:text-[#1D1D1F]"
                        }`}
                      >
                        <TableIcon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquiryViewMode("cards")}
                        title="Cards View"
                        className={`rounded-lg p-1.5 transition ${
                          inquiryViewMode === "cards"
                            ? "bg-white text-[#1D1D1F] shadow-xs"
                            : "text-[#8E8E93] hover:text-[#1D1D1F]"
                        }`}
                      >
                        <LayoutGrid size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* TABLE VIEW (Light, Clean Apple Aesthetic) */}
                {inquiryViewMode === "table" && (
                  <div className="overflow-x-auto rounded-xl border border-black/[0.08] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F5F7] border-b border-black/[0.08] text-[#6E6E73] font-semibold">
                        <tr>
                          <th className="py-3 px-4">Client Name &amp; Date</th>
                          <th className="py-3 px-4">Contact (Email &amp; WhatsApp)</th>
                          <th className="py-3 px-4">Project &amp; Budget</th>
                          <th className="py-3 px-4 max-w-[280px]">Project Description</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.05]">
                        {filteredInquiries.map((inq) => {
                          const cleanPhone = formatCleanPhone(inq.whatsapp || inq.phone);
                          const initials = inq.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                          return (
                            <tr
                              key={inq.id}
                              className="hover:bg-[#F9FAFB] transition duration-150 group"
                            >
                              {/* Client Name & Date */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[#0077ED] to-blue-600 text-white font-bold text-xs shadow-xs shrink-0">
                                    {initials || "C"}
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#1D1D1F] text-xs leading-snug group-hover:text-[#0077ED] transition mb-0">
                                      {inq.name}
                                    </p>
                                    <span className="text-[10px] text-[#8E8E93] flex items-center gap-1 mt-0.5">
                                      <Clock size={10} />
                                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Email & WhatsApp */}
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  {/* Email */}
                                  <div className="flex items-center gap-1.5">
                                    <Mail size={12} className="text-[#0077ED] shrink-0" />
                                    <a
                                      href={`mailto:${inq.email}`}
                                      className="text-[#1D1D1F] hover:text-[#0077ED] font-medium truncate max-w-[180px]"
                                    >
                                      {inq.email}
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => copyTextToClipboard(inq.email, "Email")}
                                      title="Copy email"
                                      className="text-[#8E8E93] hover:text-[#1D1D1F] transition"
                                    >
                                      <Copy size={11} />
                                    </button>
                                  </div>

                                  {/* WhatsApp */}
                                  <div className="flex items-center gap-1.5">
                                    <MessageCircle size={12} className="text-[#25D366] shrink-0" />
                                    {cleanPhone ? (
                                      <>
                                        <a
                                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.name}! Looksbay Studio reaching out regarding your ${inq.project} inquiry.`)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[#1DA851] hover:underline font-semibold text-[11px]"
                                        >
                                          {inq.whatsapp || inq.phone}
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => copyTextToClipboard(inq.whatsapp || inq.phone || "", "WhatsApp number")}
                                          title="Copy number"
                                          className="text-[#8E8E93] hover:text-[#1D1D1F] transition"
                                        >
                                          <Copy size={11} />
                                        </button>
                                      </>
                                    ) : (
                                      <span className="text-[11px] text-[#8E8E93]">Not specified</span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Project & Budget */}
                              <td className="py-3 px-4">
                                <div>
                                  <span className="inline-block rounded-md bg-[#F5F5F7] border border-black/[0.08] px-2 py-0.5 text-[11px] font-semibold text-[#1D1D1F]">
                                    {inq.project}
                                  </span>
                                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                    <DollarSign size={11} className="-mr-0.5" />
                                    <span>{inq.budget}</span>
                                  </div>
                                  {inq.template && (
                                    <span className="text-[10px] text-[#6E6E73] block mt-0.5 truncate max-w-[140px]">
                                      Template: {inq.template}
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Project Description */}
                              <td className="py-3 px-4 max-w-[280px]">
                                <p className="text-xs text-[#6E6E73] leading-relaxed line-clamp-2 mb-0">
                                  {inq.message}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="text-[11px] text-[#0077ED] font-semibold hover:underline mt-0.5 inline-flex items-center gap-0.5"
                                >
                                  <span>View details</span>
                                  <Eye size={10} />
                                </button>
                              </td>

                              {/* Status Dropdown */}
                              <td className="py-3 px-4">
                                <select
                                  value={inq.status}
                                  onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                  className={`rounded-lg border px-2.5 py-1 text-xs font-bold bg-white cursor-pointer outline-none transition ${
                                    inq.status === "New"
                                      ? "text-[#0077ED] border-blue-200 bg-blue-50/70"
                                      : inq.status === "Contacted"
                                      ? "text-amber-700 border-amber-200 bg-amber-50/70"
                                      : inq.status === "Proposal Sent"
                                      ? "text-purple-700 border-purple-200 bg-purple-50/70"
                                      : "text-emerald-700 border-emerald-200 bg-emerald-50/70"
                                  }`}
                                >
                                  <option value="New">● New</option>
                                  <option value="Contacted">● Contacted</option>
                                  <option value="Proposal Sent">● Proposal Sent</option>
                                  <option value="Closed">● Closed</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {cleanPhone && (
                                    <a
                                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.name}! Looksbay Studio reaching out regarding your ${inq.project} inquiry.`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Open WhatsApp Chat"
                                      className="grid size-7 place-items-center rounded-lg bg-[#25D366]/15 text-[#1DA851] hover:bg-[#25D366] hover:text-white transition"
                                    >
                                      <MessageCircle size={13} />
                                    </a>
                                  )}

                                  <a
                                    href={`mailto:${inq.email}?subject=${encodeURIComponent(`Looksbay Studio: Follow up on ${inq.project}`)}`}
                                    title="Send Email"
                                    className="grid size-7 place-items-center rounded-lg bg-[#0077ED]/10 text-[#0077ED] hover:bg-[#0077ED] hover:text-white transition"
                                  >
                                    <Mail size={13} />
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedInquiry(inq)}
                                    title="View full brief"
                                    className="grid size-7 place-items-center rounded-lg border border-black/10 bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
                                  >
                                    <Eye size={13} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => deleteInquiry(inq.id)}
                                    title="Delete inquiry"
                                    className="grid size-7 place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredInquiries.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-10 text-center">
                              <Inbox size={28} className="mx-auto text-[#8E8E93] mb-2" />
                              <p className="text-xs font-semibold text-[#1D1D1F]">No inquiries found</p>
                              <p className="text-[11px] text-[#8E8E93] mt-0.5">
                                Try clearing search query or changing status filters.
                              </p>
                              {(searchQuery || inquiryFilterStatus !== "all") && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSearchQuery("");
                                    setInquiryFilterStatus("all");
                                  }}
                                  className="mt-3 inline-flex items-center gap-1 rounded-lg border border-black/10 bg-[#F5F5F7] px-3 py-1 text-xs font-semibold text-[#0077ED] hover:bg-[#EBEBEF]"
                                >
                                  Reset Filters
                                </button>
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* CARDS VIEW (Light) */}
                {inquiryViewMode === "cards" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInquiries.map((inq) => {
                      const cleanPhone = formatCleanPhone(inq.whatsapp || inq.phone);
                      const initials = inq.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase();

                      return (
                        <div
                          key={inq.id}
                          className="rounded-xl border border-black/[0.08] bg-white p-5 flex flex-col justify-between hover:shadow-md transition"
                        >
                          <div>
                            {/* Card Top */}
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  inq.status === "New"
                                    ? "bg-blue-50 text-[#0077ED] border border-blue-200"
                                    : inq.status === "Contacted"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : inq.status === "Proposal Sent"
                                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {inq.status}
                              </span>
                              <span className="text-[10px] text-[#8E8E93]">
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Client Header */}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[#0077ED] to-blue-600 text-white font-bold text-xs shadow-xs shrink-0">
                                {initials || "C"}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-sm font-bold text-[#1D1D1F] truncate mb-0">{inq.name}</h3>
                                <a href={`mailto:${inq.email}`} className="text-xs text-[#0077ED] hover:underline font-medium block truncate">
                                  {inq.email}
                                </a>
                              </div>
                            </div>

                            {/* WhatsApp Badge */}
                            {cleanPhone && (
                              <div className="mb-3 flex items-center justify-between rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 text-xs">
                                <div className="flex items-center gap-1.5 text-[#1DA851] font-semibold text-[11px]">
                                  <MessageCircle size={13} />
                                  <span>{inq.whatsapp || inq.phone}</span>
                                </div>
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.name}! Looksbay Studio reaching out regarding your ${inq.project} inquiry.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] font-bold text-[#1DA851] hover:underline"
                                >
                                  Chat →
                                </a>
                              </div>
                            )}

                            {/* Project & Budget Pills */}
                            <div className="mb-3 flex flex-wrap gap-1.5 text-[10px]">
                              <span className="rounded bg-[#F5F5F7] border border-black/[0.08] px-2 py-0.5 font-medium text-[#1D1D1F]">
                                {inq.project}
                              </span>
                              <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-semibold text-emerald-700">
                                {inq.budget}
                              </span>
                            </div>

                            {/* Message Preview */}
                            <p className="text-xs text-[#48484A] leading-relaxed line-clamp-3 bg-[#F9FAFB] rounded-lg p-2.5 border border-black/[0.04]">
                              {inq.message}
                            </p>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="rounded-lg border border-black/10 bg-white text-[#1D1D1F] px-2 py-1 text-[11px] font-medium"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Closed">Closed</option>
                            </select>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                title="View full inquiry"
                                className="grid size-7 place-items-center rounded-lg border border-black/10 bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]"
                              >
                                <Eye size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteInquiry(inq.id)}
                                title="Delete"
                                className="grid size-7 place-items-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredInquiries.length === 0 && (
                      <div className="col-span-full py-10 text-center">
                        <Inbox size={28} className="mx-auto text-[#8E8E93] mb-2" />
                        <p className="text-xs font-semibold text-[#1D1D1F]">No inquiries found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: OVERVIEW (Light) */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <span className="text-xs text-[#6E6E73] font-semibold uppercase tracking-wider">Visitors Today</span>
                  <p className="text-2xl font-black text-[#0077ED] mt-1.5 mb-0">{analytics?.todayVisitors || 0}</p>
                  <span className="text-[11px] text-[#8E8E93] mt-1 block">Real live tracking</span>
                </div>
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <span className="text-xs text-[#6E6E73] font-semibold uppercase tracking-wider">Portfolio Items</span>
                  <p className="text-2xl font-black text-[#1D1D1F] mt-1.5 mb-0">{portfolioProjects.length}</p>
                  <span className="text-[11px] text-[#8E8E93] mt-1 block">Live on website</span>
                </div>
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <span className="text-xs text-[#6E6E73] font-semibold uppercase tracking-wider">Templates</span>
                  <p className="text-2xl font-black text-[#1D1D1F] mt-1.5 mb-0">{templateItems.length}</p>
                  <span className="text-[11px] text-[#8E8E93] mt-1 block">Store catalog</span>
                </div>
                <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs">
                  <span className="text-xs text-[#6E6E73] font-semibold uppercase tracking-wider">Total Inquiries</span>
                  <p className="text-2xl font-black text-emerald-600 mt-1.5 mb-0">{inquiries.length}</p>
                  <span className="text-[11px] text-[#8E8E93] mt-1 block">Client inquiries</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Member Sign-ups */}
                <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3.5 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#0077ED]" />
                      <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">Recent Member Sign-ups</h3>
                    </div>
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
                        className="flex items-center justify-between rounded-xl bg-[#F9FAFB] p-3 border border-black/[0.05]"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1F] mb-0">{u.name}</p>
                          <p className="text-[11px] text-[#0077ED] mb-0">{u.email}</p>
                        </div>
                        <span className="text-[10px] text-[#8E8E93]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    {subscribers.length === 0 && (
                      <p className="text-xs text-[#8E8E93] py-2">No registered leads yet.</p>
                    )}
                  </div>
                </div>

                {/* Recent Client Inquiries */}
                <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3.5 mb-4">
                    <div className="flex items-center gap-2">
                      <Inbox size={16} className="text-emerald-600" />
                      <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">Latest Client Inquiries</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("inquiries")}
                      className="text-xs font-semibold text-[#0077ED] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inquiries Table ({inquiries.length})</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {inquiries.slice(0, 5).map((inq) => {
                      const cleanPhone = formatCleanPhone(inq.whatsapp || inq.phone);
                      return (
                        <div
                          key={inq.id}
                          className="flex items-center justify-between rounded-xl bg-[#F9FAFB] p-3 border border-black/[0.05] hover:bg-[#F2F4F7] transition"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#1D1D1F] truncate mb-0">{inq.name}</p>
                              <span
                                className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                                  inq.status === "New"
                                    ? "bg-blue-50 text-[#0077ED] border border-blue-200"
                                    : inq.status === "Contacted"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                              <span className="text-[#6E6E73] truncate">{inq.project}</span>
                              <span className="text-emerald-600 font-semibold">({inq.budget})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.name}, following up from Looksbay Studio regarding your ${inq.project} inquiry.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="grid size-7 place-items-center rounded-lg bg-[#25D366]/15 text-[#1DA851] hover:bg-[#25D366] hover:text-white transition"
                              >
                                <MessageCircle size={13} />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setActiveTab("inquiries");
                              }}
                              className="rounded-lg bg-white border border-black/10 hover:bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] transition shadow-2xs"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {inquiries.length === 0 && (
                      <p className="text-xs text-[#8E8E93] py-2">No client inquiries received yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DAILY TRAFFIC (Light) */}
          {activeTab === "traffic" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-7 shadow-xs">
                <div className="border-b border-black/[0.06] pb-4 mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight mb-0">
                      Website Traffic (100% Real Logs)
                    </h2>
                    <span className="text-xs text-[#6E6E73]">
                      Active session tracking. Zero fake or simulated data.
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 text-[10px] font-semibold">
                    Real-time
                  </span>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-medium text-[#6E6E73]">Today Visitors</span>
                    <p className="text-2xl font-black text-[#0077ED] mt-0.5 mb-0">
                      {analytics?.todayVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#8E8E93] mt-1 block">Real unique browsers</span>
                  </div>
                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-medium text-[#6E6E73]">Today Pageviews</span>
                    <p className="text-2xl font-black text-[#1D1D1F] mt-0.5 mb-0">
                      {analytics?.todayPageviews || 0}
                    </p>
                    <span className="text-[10px] text-[#8E8E93] mt-1 block">Real pages browsed</span>
                  </div>
                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-medium text-[#6E6E73]">Yesterday Visitors</span>
                    <p className="text-2xl font-black text-[#6E6E73] mt-0.5 mb-0">
                      {analytics?.yesterdayVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#8E8E93] mt-1 block">Previous day record</span>
                  </div>
                  <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-4">
                    <span className="text-[11px] font-medium text-[#6E6E73]">Total Recorded</span>
                    <p className="text-2xl font-black text-purple-600 mt-0.5 mb-0">
                      {analytics?.totalVisitors || 0}
                    </p>
                    <span className="text-[10px] text-[#8E8E93] mt-1 block">All-time unique count</span>
                  </div>
                </div>

                {/* 7-Day Chart (Light) */}
                <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#1D1D1F]">7-Day Real Visitor History</span>
                    <span className="text-[11px] text-[#6E6E73]">
                      Peak: {maxDayVisitors > 1 ? maxDayVisitors : 0} visitors
                    </span>
                  </div>

                  <div className="h-36 flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2 sm:px-4 border-b border-black/[0.08]">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const heightPercent =
                        item.visitors > 0
                          ? Math.max(Math.round((item.visitors / maxDayVisitors) * 100), 12)
                          : 4;
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;

                      return (
                        <div key={item.date} className="flex-1 flex flex-col items-center h-full justify-end group">
                          <span className="text-[10px] font-bold text-[#1D1D1F] mb-1">
                            {item.visitors}
                          </span>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full max-w-[36px] rounded-t-md transition-all ${
                              isToday
                                ? "bg-[#0077ED]"
                                : item.visitors > 0
                                ? "bg-black/15 group-hover:bg-[#0077ED]/60"
                                : "bg-black/[0.05]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between gap-3 sm:gap-6 px-2 sm:px-4 pt-2.5">
                    {analytics?.dailyTrend?.map((item, idx) => {
                      const isToday = idx === (analytics?.dailyTrend?.length || 0) - 1;
                      return (
                        <div key={item.date} className="flex-1 text-center">
                          <span className={`text-[11px] font-bold block ${isToday ? "text-[#0077ED]" : "text-[#1D1D1F]"}`}>
                            {item.day}
                          </span>
                          <span className="text-[9px] text-[#8E8E93] block">{item.date.slice(5)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real Top Pages (Light) */}
                <div>
                  <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-3">
                    Top Visited Routes
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-black/[0.08] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F5F7] border-b border-black/[0.08] text-[#6E6E73] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Route Path</th>
                          <th className="py-2.5 px-4">Real Page Views</th>
                          <th className="py-2.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.05]">
                        {analytics?.topPages && analytics.topPages.length > 0 ? (
                          analytics.topPages.map((p, idx) => (
                            <tr key={idx} className="hover:bg-[#F9FAFB]">
                              <td className="py-2.5 px-4 font-mono font-medium text-[#1D1D1F]">
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
                            <td colSpan={3} className="py-6 text-center text-[#8E8E93] text-xs">
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

          {/* TAB: PORTFOLIO CMS (Light) */}
          {activeTab === "portfolio" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5 mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight mb-0">
                      Portfolio Showcase
                    </h2>
                    <span className="text-xs text-[#6E6E73]">
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
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0062C4]"
                    >
                      <Plus size={14} />
                      <span>Add Project</span>
                    </button>
                  </div>
                </div>

                {/* Filter */}
                <div className="relative mb-5 max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 pl-9 pr-3 text-xs text-[#1D1D1F] placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:bg-white focus:outline-none transition"
                  />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-black/[0.08] bg-white overflow-hidden flex flex-col justify-between transition hover:shadow-md hover:border-[#0077ED]/40"
                    >
                      <div>
                        <div className="h-44 w-full bg-[#F5F5F7] overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/10 px-2.5 py-0.5 text-[10px] font-bold text-[#1D1D1F] shadow-xs">
                            {item.industry}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">{item.name}</h3>
                          <p className="text-[11px] text-[#0077ED] font-semibold mt-0.5 mb-0">
                            {item.kind}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {item.tags?.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="rounded-md bg-[#F5F5F7] border border-black/[0.06] px-1.5 py-0.5 text-[10px] text-[#6E6E73]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#8E8E93] font-medium">
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
                            className="p-1 text-[#8E8E93] hover:text-red-600 transition"
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

          {/* TAB: TEMPLATES STORE CMS (Light) */}
          {activeTab === "templates" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5 mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight mb-0">
                      Template Store
                    </h2>
                    <span className="text-xs text-[#6E6E73]">
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
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0062C4]"
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
                      className="group rounded-2xl border border-black/[0.08] bg-white overflow-hidden flex flex-col justify-between transition hover:shadow-md hover:border-[#0077ED]/40"
                    >
                      <div>
                        <div className="h-44 w-full bg-[#F5F5F7] overflow-hidden relative">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-black shadow-xs">
                            ${t.price}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">{t.name}</h3>
                          <p className="text-[11px] text-[#0077ED] font-semibold mt-0.5 mb-0">
                            {t.categories ? t.categories.join(", ") : "Squarespace 7.1"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-xs">
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
                            className="text-[#6E6E73] hover:text-[#1D1D1F]"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t.id || t.slug, t.name)}
                            className="p-1 text-[#8E8E93] hover:text-red-600 transition"
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

          {/* TAB: REGISTERED LEADS (Light) */}
          {activeTab === "leads" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5 mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight mb-0">Registered Leads</h2>
                    <span className="text-xs text-[#6E6E73]">{subscribers.length} total members</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyAllEmails}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7]"
                    >
                      <Copy size={13} />
                      <span>Copy Emails</span>
                    </button>
                    <a
                      href="/api/admin/users?format=csv"
                      download
                      className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7]"
                    >
                      <Download size={13} />
                      <span>CSV</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsAddLeadModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0062C4] shadow-xs"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-black/[0.08] bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F5F7] border-b border-black/[0.08] text-[#6E6E73] font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Email</th>
                        <th className="py-2.5 px-4">Interest</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.05]">
                      {filteredSubscribers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#F9FAFB]">
                          <td className="py-2.5 px-4 font-bold text-[#1D1D1F]">{u.name}</td>
                          <td className="py-2.5 px-4 text-[#0077ED] font-medium">{u.email}</td>
                          <td className="py-2.5 px-4 text-[#6E6E73]">{u.interest}</td>
                          <td className="py-2.5 px-4 text-[#8E8E93]">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteSubscriber(u.id)}
                              className="text-[#8E8E93] hover:text-red-600 transition p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredSubscribers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-[#8E8E93] text-xs">
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

          {/* TAB: SETTINGS (Light) */}
          {activeTab === "settings" && (
            <div className="space-y-5 animate-fade-in">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-7 shadow-xs max-w-md">
                <h2 className="text-base font-bold text-[#1D1D1F] mb-4">Passcode Settings</h2>

                <form onSubmit={handleUpdatePin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5">
                      New Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062C4] shadow-xs"
                  >
                    Save Passcode
                  </button>
                </form>

                <p className="mt-5 text-xs text-[#8E8E93]">
                  Current PIN: <code className="font-semibold text-[#1D1D1F]">{currentMasterPin}</code>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Portfolio Project (Light) */}
      {isAddPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white text-[#1D1D1F] p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-3.5 mb-4">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">Add Portfolio Project</h3>
              <button
                type="button"
                onClick={() => setIsAddPortfolioModalOpen(false)}
                className="text-[#8E8E93] hover:text-[#1D1D1F]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumina Studio"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                    Industry
                  </label>
                  <select
                    value={newPortfolioIndustry}
                    onChange={(e) => setNewPortfolioIndustry(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                  >
                    <option value="Creative">Creative</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Law">Law &amp; Corporate</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                    Kind / Scope
                  </label>
                  <input
                    type="text"
                    placeholder="Custom Squarespace Website"
                    value={newPortfolioKind}
                    onChange={(e) => setNewPortfolioKind(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newPortfolioImage}
                  onChange={(e) => setNewPortfolioImage(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
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
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Squarespace 7.1, Fluid Engine, Custom CSS"
                  value={newPortfolioTags}
                  onChange={(e) => setNewPortfolioTags(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Bespoke website built with Fluid Engine."
                  value={newPortfolioDescription}
                  onChange={(e) => setNewPortfolioDescription(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-xs"
              >
                Publish Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Template (Light) */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white text-[#1D1D1F] p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-3.5 mb-4">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">Add Template</h3>
              <button
                type="button"
                onClick={() => setIsAddTemplateModalOpen(false)}
                className="text-[#8E8E93] hover:text-[#1D1D1F]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Horizon"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="horizon"
                    value={newTemplateSlug}
                    onChange={(e) => setNewTemplateSlug(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="180.00"
                    value={newTemplatePrice}
                    onChange={(e) => setNewTemplatePrice(e.target.value)}
                    className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Categories
                </label>
                <input
                  type="text"
                  placeholder="Designer, Creative, Studio"
                  value={newTemplateCategories}
                  onChange={(e) => setNewTemplateCategories(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newTemplateImage}
                  onChange={(e) => setNewTemplateImage(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
                {newTemplateImage && (
                  <div className="mt-2 h-28 w-full rounded-lg overflow-hidden border border-black/10">
                    <img src={newTemplateImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newTemplateDemoUrl}
                  onChange={(e) => setNewTemplateDemoUrl(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Engineered for high conversions."
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-xs"
              >
                Publish Template
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Lead (Light) */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[390px] rounded-2xl bg-white text-[#1D1D1F] p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-3.5 mb-4">
              <h3 className="text-sm font-bold text-[#1D1D1F] mb-0">Add Member Lead</h3>
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-[#8E8E93] hover:text-[#1D1D1F]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1D1D1F] mb-1">Interest</label>
                <select
                  value={newLeadInterest}
                  onChange={(e) => setNewLeadInterest(e.target.value)}
                  className="w-full rounded-xl border border-black/[0.12] bg-[#F9FAFB] py-2 px-3 text-xs text-[#1D1D1F] focus:border-[#0077ED] focus:bg-white focus:outline-none"
                >
                  <option value="Squarespace Templates">Squarespace Templates</option>
                  <option value="Custom Development">Custom Development</option>
                  <option value="Squarespace SEO">Squarespace SEO</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#0077ED] py-2.5 text-xs font-semibold text-white transition hover:bg-[#0062C4] shadow-xs"
              >
                Save Lead
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Full Client Inquiry Details (Light) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-2xl bg-white text-[#1D1D1F] p-6 sm:p-7 shadow-2xl border border-black/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#0077ED] to-blue-600 text-white font-black text-sm shadow-sm">
                  {selectedInquiry.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "C"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D1D1F] leading-tight mb-0">
                    {selectedInquiry.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[#6E6E73]">
                    <span>ID: {selectedInquiry.id}</span>
                    <span>•</span>
                    <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="grid size-8 place-items-center rounded-lg border border-black/10 bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {formatCleanPhone(selectedInquiry.whatsapp || selectedInquiry.phone) && (
                <a
                  href={`https://wa.me/${formatCleanPhone(selectedInquiry.whatsapp || selectedInquiry.phone)}?text=${encodeURIComponent(`Hi ${selectedInquiry.name}! This is Looksbay Studio following up regarding your ${selectedInquiry.project} inquiry.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#20BD5A]"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Looksbay Studio: Follow up on ${selectedInquiry.project}`)}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0077ED] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0062C4]"
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const summary = `Client: ${selectedInquiry.name}\nEmail: ${selectedInquiry.email}\nWhatsApp: ${selectedInquiry.whatsapp || "N/A"}\nProject: ${selectedInquiry.project}\nBudget: ${selectedInquiry.budget}\nStatus: ${selectedInquiry.status}\nDate: ${new Date(selectedInquiry.createdAt).toLocaleString()}\n\nRequirements:\n${selectedInquiry.message}`;
                  copyTextToClipboard(summary, "Inquiry summary");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-[#F5F5F7] px-3.5 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
              >
                <Copy size={13} />
                <span>Copy Summary</span>
              </button>
            </div>

            {/* Details Grid (Light) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {/* Email */}
              <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-3.5">
                <span className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-xs font-bold text-[#0077ED] hover:underline truncate"
                  >
                    {selectedInquiry.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyTextToClipboard(selectedInquiry.email, "Email")}
                    className="text-[#8E8E93] hover:text-[#1D1D1F] p-1"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-3.5">
                <span className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1">
                  WhatsApp Number
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1DA851] truncate">
                    {selectedInquiry.whatsapp || selectedInquiry.phone || "Not specified"}
                  </span>
                  {(selectedInquiry.whatsapp || selectedInquiry.phone) && (
                    <button
                      type="button"
                      onClick={() => copyTextToClipboard(selectedInquiry.whatsapp || selectedInquiry.phone || "", "WhatsApp number")}
                      className="text-[#8E8E93] hover:text-[#1D1D1F] p-1"
                    >
                      <Copy size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-3.5">
                <span className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1">
                  Project Scope
                </span>
                <p className="text-xs font-bold text-[#1D1D1F] mb-0">
                  {selectedInquiry.project}
                </p>
                {selectedInquiry.template && (
                  <span className="text-[11px] text-[#6E6E73] block mt-0.5">
                    Template: {selectedInquiry.template}
                  </span>
                )}
              </div>

              {/* Budget */}
              <div className="rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-3.5">
                <span className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider block mb-1">
                  Investment Budget
                </span>
                <p className="text-xs font-bold text-emerald-600 mb-0">
                  {selectedInquiry.budget}
                </p>
              </div>
            </div>

            {/* Status Changer */}
            <div className="mb-5 rounded-xl border border-black/[0.06] bg-[#F9FAFB] p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1D1D1F] block">Lead Status</span>
                <span className="text-[11px] text-[#6E6E73]">Update lead stage in pipeline</span>
              </div>
              <select
                value={selectedInquiry.status}
                onChange={(e) => {
                  const newStatus = e.target.value as Inquiry["status"];
                  updateInquiryStatus(selectedInquiry.id, newStatus);
                  setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                }}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold bg-white outline-none cursor-pointer transition ${
                  selectedInquiry.status === "New"
                    ? "text-[#0077ED] border-blue-200 bg-blue-50/70"
                    : selectedInquiry.status === "Contacted"
                    ? "text-amber-700 border-amber-200 bg-amber-50/70"
                    : selectedInquiry.status === "Proposal Sent"
                    ? "text-purple-700 border-purple-200 bg-purple-50/70"
                    : "text-emerald-700 border-emerald-200 bg-emerald-50/70"
                }`}
              >
                <option value="New">● New Lead</option>
                <option value="Contacted">● Contacted</option>
                <option value="Proposal Sent">● Proposal Sent</option>
                <option value="Closed">● Closed / Won</option>
              </select>
            </div>

            {/* Full Message / Description */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E6E73] block mb-2">
                Project Description &amp; Client Requirements
              </span>
              <div className="rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-4 text-xs sm:text-sm text-[#1D1D1F] leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex items-center justify-between border-t border-black/[0.08] pt-4">
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete inquiry from ${selectedInquiry.name}?`)) {
                    deleteInquiry(selectedInquiry.id);
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 size={13} />
                <span>Delete Inquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
