"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  Users,
  Settings,
  Globe,
  BarChart3,
  Search,
  Plus,
  Trash2,
  Lock,
  LogOut,
  RefreshCw,
  ExternalLink,
  Mail,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  Check,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Save,
  Megaphone,
  Radio,
  Sliders,
  DollarSign,
  Share2,
  X,
  FileText,
  BookOpen,
} from "lucide-react";
import { allTemplates as defaultTemplates } from "@/app/shared/data/templates-data";
import { blogPosts as defaultBlogPosts, type BlogPost } from "@/app/shared/data/blog-posts";

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

interface SiteSettings {
  studioName: string;
  tagline: string;
  studioEmail: string;
  studioWhatsapp: string;
  studioPhone: string;
  studioLocation: string;
  calendlyUrl: string;
  currency: string;
  announcementEnabled: boolean;
  announcementBadge: string;
  announcementText: string;
  announcementLink: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnUrl: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  responseTime: string;
  startingBudget: string;
}

type TabKey =
  | "inquiries"
  | "site-control"
  | "portfolio"
  | "templates"
  | "blog"
  | "traffic"
  | "leads"
  | "security";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("inquiries");

  // Core Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    studioName: "Looksbay Studio",
    tagline: "Premier Squarespace Circle Platinum Design & Engineering Studio",
    studioEmail: "hello@looksbay.com",
    studioWhatsapp: "+1 (415) 555-2671",
    studioPhone: "+1 (415) 555-2671",
    studioLocation: "New York, USA & Remote Worldwide",
    calendlyUrl: "https://calendly.com/looksbay",
    currency: "USD ($)",
    announcementEnabled: true,
    announcementBadge: "",
    announcementText: "Now accepting bespoke website commissions for 2026.",
    announcementLink: "",
    heroBadge: "Squarespace Circle Platinum Agency",
    heroHeadline: "We craft luxury Squarespace websites that command attention & drive conversions.",
    heroSubtitle: "Bespoke 7.1 websites, fluid engine architecture, custom CSS/JS engineering, 90+ PageSpeed technical SEO, and conversion-ready templates for ambitious brands.",
    heroPrimaryBtnText: "Start a Project",
    heroPrimaryBtnUrl: "/contact",
    heroSecondaryBtnText: "Explore Templates",
    heroSecondaryBtnUrl: "/templates",
    instagramUrl: "https://www.instagram.com/looksbay",
    linkedinUrl: "https://www.linkedin.com/company/looksbay",
    facebookUrl: "https://www.facebook.com/looksbay",
    twitterUrl: "https://twitter.com/looksbay",
    responseTime: "Within 4 business hours",
    startingBudget: "$2,500+",
  });

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Inquiries Filters
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Modals
  const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);

  // Form states for Add Portfolio
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioIndustry, setNewPortfolioIndustry] = useState("Architecture");
  const [newPortfolioKind, setNewPortfolioKind] = useState("Custom Development");
  const [newPortfolioImage, setNewPortfolioImage] = useState("");
  const [newPortfolioDescription, setNewPortfolioDescription] = useState("");
  const [newPortfolioTags, setNewPortfolioTags] = useState("Squarespace 7.1, Fluid Engine, CSS");

  // Form states for Add Template
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateSlug, setNewTemplateSlug] = useState("");
  const [newTemplatePrice, setNewTemplatePrice] = useState("$149");
  const [newTemplateCategories, setNewTemplateCategories] = useState("Portfolio, Creative");
  const [newTemplateImage, setNewTemplateImage] = useState("");
  const [newTemplateDemoUrl, setNewTemplateDemoUrl] = useState("https://squarespace.com");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");

  // Form states for Add Blog Post
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogSlug, setNewBlogSlug] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Design & Code");
  const [newBlogReadTime, setNewBlogReadTime] = useState("5 min read");
  const [newBlogExcerpt, setNewBlogExcerpt] = useState("");
  const [newBlogImage, setNewBlogImage] = useState("photo-1460925895917-afdab827c52f");
  const [newBlogAuthor, setNewBlogAuthor] = useState("Looksbay Editorial Team");
  const [newBlogContent, setNewBlogContent] = useState("");

  // Passcode state
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("admin_pin") || "admin123";
    if (pin === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setPinError("");
      fetchData();
    } else {
      setPinError("Invalid admin passcode");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPin("");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, subsRes, statsRes, portRes, tempRes, settingsRes, blogRes] =
        await Promise.all([
          fetch("/api/contact"),
          fetch("/api/admin/users"),
          fetch("/api/analytics"),
          fetch("/api/portfolio"),
          fetch("/api/templates"),
          fetch("/api/admin/settings"),
          fetch("/api/blog"),
        ]);

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData.inquiries || []);
      }
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubscribers(subsData.subscribers || []);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setAnalytics(statsData.stats || null);
      }
      if (portRes.ok) {
        const portData = await portRes.json();
        setPortfolioProjects(portData.projects || []);
      }
      if (tempRes.ok) {
        const tempData = await tempRes.json();
        setTemplateItems(tempData.templates?.length ? tempData.templates : defaultTemplates);
      }
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data?.settings) {
          setSiteSettings((prev) => ({ ...prev, ...data.settings }));
        }
      }
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogList(blogData.posts?.length ? blogData.posts : defaultBlogPosts);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSiteSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteSettings),
      });
      if (res.ok) {
        showToast("Website settings saved and live!");
      } else {
        showToast("Error updating settings");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error saving settings");
    } finally {
      setIsSavingSettings(false);
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
        showToast(`Status updated to ${status}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client inquiry?")) return;
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
      showToast("No emails to copy");
      return;
    }
    navigator.clipboard.writeText(emails);
    showToast("Client emails copied");
  };

  const copyTextToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard`);
  };

  const formatCleanPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/[^0-9]/g, "");
  };

  // Add Portfolio Handler
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim() || !newPortfolioImage.trim()) {
      showToast("Project title and image URL are required");
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
          description: newPortfolioDescription.trim() || "Bespoke Squarespace website built with Fluid Engine.",
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
        showToast("Project published to portfolio");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
      showToast("Template name and price are required");
      return;
    }
    const cleanSlug =
      newTemplateSlug.trim() ||
      newTemplateName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newTemplate: TemplateItem = {
      id: cleanSlug,
      slug: cleanSlug,
      name: newTemplateName.trim(),
      price: newTemplatePrice.trim(),
      categories: newTemplateCategories.split(",").map((c) => c.trim()).filter(Boolean),
      image: newTemplateImage.trim() || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      demoUrl: newTemplateDemoUrl.trim() || "https://squarespace.com",
      description: newTemplateDescription.trim() || "Luxury Squarespace 7.1 template designed with high conversion structure.",
    };

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate),
      });
      if (res.ok) {
        setTemplateItems((prev) => [newTemplate, ...prev]);
        setIsAddTemplateModalOpen(false);
        setNewTemplateName("");
        setNewTemplateSlug("");
        setNewTemplateImage("");
        setNewTemplateDescription("");
        showToast("Template published to store");
      }
    } catch (e) {
      console.error(e);
    }
  };

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
        showToast("Template removed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Blog Handler
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) {
      showToast("Article title is required");
      return;
    }
    const cleanSlug =
      newBlogSlug.trim() ||
      newBlogTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newPost: BlogPost = {
      slug: cleanSlug,
      title: newBlogTitle.trim(),
      excerpt: newBlogExcerpt.trim() || "Insights, design breakdowns, and technical guides from Looksbay Studio.",
      category: newBlogCategory,
      categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: newBlogReadTime.trim() || "5 min read",
      author: {
        name: newBlogAuthor.trim() || "Looksbay Editorial Team",
        role: "Squarespace Circle Specialists",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      image: newBlogImage.trim() || "photo-1460925895917-afdab827c52f",
      imageAlt: newBlogTitle,
      tags: ["Squarespace", "Web Design", newBlogCategory],
      content: {
        intro: newBlogExcerpt.trim() || "Welcome to this in-depth guide from Looksbay Studio.",
        sections: [
          {
            heading: "Key Insights & Strategy",
            body: newBlogContent
              ? newBlogContent.split("\n\n").filter(Boolean)
              : ["Custom development and bespoke architectural design principles crafted for high conversions."],
          },
        ],
        conclusion: "Need assistance building a custom Squarespace experience? Get in touch with our studio team.",
      },
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        setBlogList((prev) => [newPost, ...prev.filter((p) => p.slug !== newPost.slug)]);
        setIsAddBlogModalOpen(false);
        setNewBlogTitle("");
        setNewBlogSlug("");
        setNewBlogExcerpt("");
        setNewBlogContent("");
        showToast("Article published to blog!");
      } else {
        showToast("Failed to publish blog post");
      }
    } catch (e) {
      console.error(e);
      showToast("Network error publishing blog");
    }
  };

  const handleDeleteBlog = async (slug: string, title: string) => {
    if (!confirm(`Delete blog post "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogList((prev) => prev.filter((p) => p.slug !== slug));
        showToast("Article removed from blog");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin.length < 4) {
      showToast("Passcode must be at least 4 characters");
      return;
    }
    if (newPin !== confirmPin) {
      showToast("Passcodes do not match");
      return;
    }
    localStorage.setItem("admin_pin", newPin);
    setNewPin("");
    setConfirmPin("");
    showToast("Passcode updated successfully");
  };

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

  // Filtered blog posts
  const filteredBlogPosts = blogList.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q)
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

  // 1. PIN LOCK SCREEN (Minimalist Crisp White)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-zinc-900 px-4 font-sans">
        <div className="w-full max-w-[340px] rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-xs">
          <div className="text-center mb-6">
            <div className="size-9 rounded-lg bg-zinc-900 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2.5 shadow-xs">
              LB
            </div>
            <h1 className="text-sm font-semibold text-zinc-900 tracking-tight mb-0.5">
              Looksbay Studio Suite
            </h1>
            <p className="text-[11px] text-zinc-400">Enter studio passcode to unlock</p>
          </div>

          {pinError && (
            <div className="mb-3.5 rounded-lg bg-rose-50 p-2 text-[11px] text-rose-600 font-medium text-center border border-rose-100">
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
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 py-2 px-3 text-center text-sm font-medium tracking-widest text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none transition"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-zinc-900 py-2 text-xs font-medium text-white transition hover:bg-black shadow-xs"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-[10px] text-zinc-400">
            Default passcode: <code className="font-mono text-zinc-600">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // 2. MAIN EXECUTIVE SUITE (Ultra-Clean, High-Density, Smart & Professional)
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 flex font-sans antialiased selection:bg-zinc-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-zinc-900 text-white px-3.5 py-2 text-xs font-medium shadow-md animate-fade-in border border-zinc-800">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Fixed Sidebar (224px) */}
      <aside className="w-56 shrink-0 border-r border-zinc-200/80 bg-white flex flex-col justify-between hidden md:flex sticky top-0 h-screen select-none z-20">
        <div>
          {/* Logo & Status */}
          <div className="h-13 px-4 flex items-center justify-between border-b border-zinc-150">
            <div className="flex items-center gap-2.5">
              <div className="size-6 rounded-md bg-zinc-900 text-white font-bold text-[11px] flex items-center justify-center">
                LB
              </div>
              <div className="leading-tight">
                <span className="text-xs font-semibold text-zinc-900 tracking-tight block">
                  {siteSettings.studioName || "Looksbay"}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block">
                  Studio Admin
                </span>
              </div>
            </div>
            <span
              className="size-2 rounded-full bg-emerald-500"
              title="System Active"
            />
          </div>

          {/* Navigation Links */}
          <div className="p-2.5 space-y-4">
            {/* WORKFLOW */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-2 mb-1 block">
                Workflow
              </span>
              <div className="space-y-0.5">
                {[
                  {
                    id: "inquiries",
                    label: "Client Inquiries",
                    icon: Inbox,
                    badge: inquiries.filter((i) => i.status === "New").length || null,
                  },
                  {
                    id: "traffic",
                    label: "Live Traffic",
                    icon: BarChart3,
                    badge: analytics?.todayVisitors || null,
                  },
                  {
                    id: "leads",
                    label: "Subscribers",
                    icon: Users,
                    badge: subscribers.length || null,
                  },
                ].map(({ id, label, icon: Icon, badge }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveTab(id as TabKey);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      activeTab === id
                        ? "bg-zinc-100 text-zinc-900 font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        size={13}
                        className={activeTab === id ? "text-zinc-900" : "text-zinc-400"}
                      />
                      <span>{label}</span>
                    </div>
                    {badge !== null && (
                      <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-700 px-1.5 py-0.2 rounded">
                        {badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT & STORE */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-2 mb-1 block">
                Content &amp; Store
              </span>
              <div className="space-y-0.5">
                {[
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
                  {
                    id: "blog",
                    label: "Blog CMS",
                    icon: BookOpen,
                    badge: blogList.length,
                  },
                ].map(({ id, label, icon: Icon, badge }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveTab(id as TabKey);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      activeTab === id
                        ? "bg-zinc-100 text-zinc-900 font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        size={13}
                        className={activeTab === id ? "text-zinc-900" : "text-zinc-400"}
                      />
                      <span>{label}</span>
                    </div>
                    {badge !== null && (
                      <span className="text-[10px] font-medium text-zinc-400">
                        {badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* MASTER CONTROL */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-2 mb-1 block">
                Master Control
              </span>
              <div className="space-y-0.5">
                {[
                  {
                    id: "site-control",
                    label: "Website Control",
                    icon: Globe,
                    badge: null,
                  },
                  {
                    id: "security",
                    label: "Passcode & Access",
                    icon: Settings,
                    badge: null,
                  },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveTab(id as TabKey);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      activeTab === id
                        ? "bg-zinc-900 text-white font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        size={13}
                        className={activeTab === id ? "text-white" : "text-zinc-400"}
                      />
                      <span>{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t border-zinc-150 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={12} className="text-zinc-400" />
              <span>Public Website</span>
            </div>
            <ArrowUpRight size={11} className="text-zinc-400" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-500 hover:text-rose-600 hover:bg-rose-50/50 transition"
          >
            <LogOut size={12} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Minimal Navigation Bar */}
        <header className="h-13 bg-white border-b border-zinc-200/80 px-6 flex items-center justify-between sticky top-0 z-10 select-none">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-900">Looksbay Studio</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500 capitalize">
              {activeTab === "blog" ? "Blog CMS" : activeTab.replace("-", " ")}
            </span>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              title="Refresh Data"
              className="p-1.5 rounded-md border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            </button>

            {activeTab === "portfolio" && (
              <button
                type="button"
                onClick={() => setIsAddPortfolioModalOpen(true)}
                className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
              >
                <Plus size={12} />
                <span>Add Project</span>
              </button>
            )}

            {activeTab === "templates" && (
              <button
                type="button"
                onClick={() => setIsAddTemplateModalOpen(true)}
                className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
              >
                <Plus size={12} />
                <span>Add Template</span>
              </button>
            )}

            {activeTab === "blog" && (
              <button
                type="button"
                onClick={() => setIsAddBlogModalOpen(true)}
                className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
              >
                <Plus size={12} />
                <span>Write Article</span>
              </button>
            )}

            {activeTab === "site-control" && (
              <button
                type="button"
                onClick={() => handleSaveSiteSettings()}
                disabled={isSavingSettings}
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
              >
                <Save size={12} />
                <span>{isSavingSettings ? "Saving..." : "Save Changes"}</span>
              </button>
            )}
          </div>
        </header>

        {/* Mobile Tab Pills */}
        <div className="md:hidden flex overflow-x-auto p-2 gap-1 bg-white border-b border-zinc-200 shrink-0">
          {[
            { id: "inquiries", label: `Inquiries (${inquiries.length})` },
            { id: "site-control", label: "Website Control" },
            { id: "blog", label: `Blog (${blogList.length})` },
            { id: "portfolio", label: `Portfolio (${portfolioProjects.length})` },
            { id: "templates", label: `Templates (${templateItems.length})` },
            { id: "traffic", label: "Traffic" },
            { id: "leads", label: "Subscribers" },
            { id: "security", label: "Security" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as TabKey)}
              className={`whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium transition ${
                activeTab === id ? "bg-zinc-900 text-white" : "text-zinc-600 bg-zinc-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Dynamic Main Body */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-5">
          {/* ========================================================================= */}
          {/* TAB 1: CLIENT INQUIRIES */}
          {/* ========================================================================= */}
          {activeTab === "inquiries" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                    Client Inquiries &amp; Leads
                  </h1>
                  <p className="text-[11px] text-zinc-500">
                    Real-time inquiries received from your contact forms with direct WhatsApp and Email connectivity.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={copyInquiryEmails}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-2xs"
                  >
                    <Copy size={11} />
                    <span>Copy Emails</span>
                  </button>

                  <a
                    href="/api/contact?format=csv"
                    download
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-2xs"
                  >
                    <Download size={11} />
                    <span>Export CSV</span>
                  </a>
                </div>
              </div>

              {/* Slim Executive Metric Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 rounded-lg border border-zinc-200/80 bg-white shadow-2xs divide-y lg:divide-y-0 lg:divide-x divide-zinc-150">
                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-zinc-400 block">Total Inquiries</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg font-semibold text-zinc-900">{inquiries.length}</span>
                    <span className="text-[10px] text-zinc-400">all-time</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-zinc-400 flex items-center justify-between">
                    <span>New / Action Needed</span>
                    <span className="size-1.5 rounded-full bg-blue-600" />
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg font-semibold text-blue-600">
                      {inquiries.filter((i) => i.status === "New").length}
                    </span>
                    <span className="text-[10px] text-zinc-400">pending response</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-zinc-400 block">In Discussion</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg font-semibold text-amber-600">
                      {inquiries.filter((i) => i.status === "Contacted" || i.status === "Proposal Sent").length}
                    </span>
                    <span className="text-[10px] text-zinc-400">active proposal</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <span className="text-[11px] font-medium text-zinc-400 block">Closed / Won</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg font-semibold text-emerald-600">
                      {inquiries.filter((i) => i.status === "Closed").length}
                    </span>
                    <span className="text-[10px] text-zinc-400">finalized</span>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <div className="inline-flex rounded-md border border-zinc-200 bg-white p-0.5 shadow-2xs">
                  {[
                    { id: "all", label: "All", count: inquiries.length },
                    { id: "New", label: "New", count: inquiries.filter((i) => i.status === "New").length },
                    { id: "Contacted", label: "Contacted", count: inquiries.filter((i) => i.status === "Contacted").length },
                    { id: "Proposal Sent", label: "Proposal", count: inquiries.filter((i) => i.status === "Proposal Sent").length },
                    { id: "Closed", label: "Closed", count: inquiries.filter((i) => i.status === "Closed").length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInquiryFilterStatus(tab.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                        inquiryFilterStatus === tab.id
                          ? "bg-zinc-900 text-white font-semibold shadow-2xs"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`ml-1 text-[10px] ${
                          inquiryFilterStatus === tab.id ? "text-zinc-300" : "text-zinc-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search name, email, project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none transition shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="rounded-lg border border-zinc-200/80 bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Client</th>
                      <th className="py-2.5 px-4 font-semibold">Direct Contact</th>
                      <th className="py-2.5 px-4 font-semibold">Scope &amp; Budget</th>
                      <th className="py-2.5 px-4 font-semibold max-w-[300px]">Project Details</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-400">
                          <Inbox size={24} className="mx-auto mb-2 text-zinc-300 stroke-1" />
                          <p className="text-xs font-medium text-zinc-600 mb-0.5">No inquiries found</p>
                          <p className="text-[11px] text-zinc-400">New submissions will appear here automatically</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const cleanPhone = formatCleanPhone(inq.whatsapp || inq.phone);
                        const initials = inq.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase();

                        return (
                          <tr key={inq.id} className="hover:bg-zinc-50/60 transition-colors group">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="size-6 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-[10px] flex items-center justify-center shrink-0 border border-zinc-200">
                                  {initials || "C"}
                                </div>
                                <div>
                                  <span className="font-semibold text-zinc-900 block leading-tight">
                                    {inq.name}
                                  </span>
                                  <span className="text-[10px] text-zinc-400">
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <a
                                    href={`mailto:${inq.email}`}
                                    className="text-xs text-zinc-800 hover:text-zinc-900 font-medium truncate block max-w-[180px]"
                                  >
                                    {inq.email}
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => copyTextToClipboard(inq.email, "Email")}
                                    title="Copy Email"
                                    className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-700 transition"
                                  >
                                    <Copy size={10} />
                                  </button>
                                </div>

                                {cleanPhone ? (
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                      `Hi ${inq.name}! This is Looksbay Studio reaching out regarding your ${inq.project} inquiry.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline"
                                  >
                                    <MessageCircle size={10} className="text-emerald-600" />
                                    <span>{inq.whatsapp || inq.phone}</span>
                                  </a>
                                ) : (
                                  <span className="text-[10px] text-zinc-400">No WhatsApp</span>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <span className="text-xs text-zinc-800 font-medium block leading-tight">
                                {inq.project}
                              </span>
                              <span className="inline-block mt-0.5 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600">
                                {inq.budget || "Flexible"}
                              </span>
                            </td>

                            <td className="py-3 px-4 max-w-[280px]">
                              <p className="line-clamp-2 text-[11px] text-zinc-500 mb-0 leading-relaxed">
                                {inq.message}
                              </p>
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                className="text-[10px] text-zinc-700 hover:text-black font-semibold mt-0.5 inline-block"
                              >
                                View full brief →
                              </button>
                            </td>

                            <td className="py-3 px-4">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  updateInquiryStatus(inq.id, e.target.value as Inquiry["status"])
                                }
                                className={`rounded border px-2 py-1 text-[11px] font-medium focus:outline-none transition ${
                                  inq.status === "New"
                                    ? "border-blue-200 bg-blue-50/70 text-blue-700"
                                    : inq.status === "Contacted"
                                    ? "border-amber-200 bg-amber-50/70 text-amber-700"
                                    : inq.status === "Proposal Sent"
                                    ? "border-purple-200 bg-purple-50/70 text-purple-700"
                                    : "border-emerald-200 bg-emerald-50/70 text-emerald-700"
                                }`}
                              >
                                <option value="New">• New</option>
                                <option value="Contacted">• Contacted</option>
                                <option value="Proposal Sent">• Proposal Sent</option>
                                <option value="Closed">• Closed / Won</option>
                              </select>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {cleanPhone && (
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                      `Hi ${inq.name}! Looksbay Studio reaching out regarding your project.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open WhatsApp Chat"
                                    className="p-1.5 rounded text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                                  >
                                    <MessageCircle size={13} />
                                  </a>
                                )}

                                <a
                                  href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                    `Looksbay Studio — ${inq.project}`
                                  )}`}
                                  title="Send Email"
                                  className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition"
                                >
                                  <Mail size={13} />
                                </a>

                                <button
                                  type="button"
                                  onClick={() => setSelectedInquiry(inq)}
                                  title="View Details"
                                  className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition"
                                >
                                  <Eye size={13} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteInquiry(inq.id)}
                                  title="Delete Inquiry"
                                  className="p-1.5 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: WEBSITE CONTROL CENTER (Short 5-7 word banner, no link) */}
          {/* ========================================================================= */}
          {activeTab === "site-control" && (
            <div className="space-y-5 animate-fade-in max-w-4xl">
              <div>
                <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                  Website Master Control Center
                </h1>
                <p className="text-[11px] text-zinc-500">
                  Manage announcement message, brand identity, homepage headlines, and contacts in real time.
                </p>
              </div>

              <form onSubmit={handleSaveSiteSettings} className="space-y-5">
                {/* 1. Live Top Announcement Banner (Concise 5-7 words, no links) */}
                <div className="rounded-lg border border-zinc-200/80 bg-white p-4 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Megaphone size={14} className="text-zinc-600" />
                      <h2 className="text-xs font-semibold text-zinc-900 tracking-tight mb-0">
                        Top Announcement Banner
                      </h2>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
                      <input
                        type="checkbox"
                        checked={siteSettings.announcementEnabled}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            announcementEnabled: e.target.checked,
                          })
                        }
                        className="rounded border-zinc-300 text-zinc-900 focus:ring-0 size-3.5 cursor-pointer"
                      />
                      <span>Banner Visible on Live Website</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                      Announcement Text (Keep it short: 5 to 7 words)
                    </label>
                    <input
                      type="text"
                      value={siteSettings.announcementText}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          announcementText: e.target.value,
                        })
                      }
                      placeholder="e.g. Now accepting bespoke website commissions for 2026."
                      className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                    />
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Word count: {siteSettings.announcementText.trim().split(/\s+/).filter(Boolean).length} words
                    </p>
                  </div>

                  {/* Live Banner Preview Box */}
                  <div className="rounded-md border border-zinc-200 bg-zinc-50 p-2.5 text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Live Header Preview
                    </span>
                    {siteSettings.announcementEnabled && siteSettings.announcementText ? (
                      <div className="bg-[#0077ED] text-white text-[11px] py-1 px-4 rounded font-medium tracking-wide inline-block shadow-2xs">
                        <span>{siteSettings.announcementText}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400 italic">Banner is currently disabled</span>
                    )}
                  </div>
                </div>

                {/* 2. Studio Identity & Core Contacts */}
                <div className="rounded-lg border border-zinc-200/80 bg-white p-4 shadow-2xs space-y-3.5">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2.5">
                    <Globe size={14} className="text-zinc-600" />
                    <h2 className="text-xs font-semibold text-zinc-900 tracking-tight mb-0">
                      Studio Identity &amp; Contact Credentials
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Studio / Agency Name
                      </label>
                      <input
                        type="text"
                        value={siteSettings.studioName}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, studioName: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Tagline / Studio Slogan
                      </label>
                      <input
                        type="text"
                        value={siteSettings.tagline}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, tagline: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Primary Business Email
                      </label>
                      <input
                        type="email"
                        value={siteSettings.studioEmail}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, studioEmail: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Official WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={siteSettings.studioWhatsapp}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, studioWhatsapp: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Studio Location / Timezone
                      </label>
                      <input
                        type="text"
                        value={siteSettings.studioLocation}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, studioLocation: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Calendly / Consultation URL
                      </label>
                      <input
                        type="url"
                        value={siteSettings.calendlyUrl}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, calendlyUrl: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Hero & Homepage Controls */}
                <div className="rounded-lg border border-zinc-200/80 bg-white p-4 shadow-2xs space-y-3.5">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2.5">
                    <Sparkles size={14} className="text-zinc-600" />
                    <h2 className="text-xs font-semibold text-zinc-900 tracking-tight mb-0">
                      Homepage Hero Content
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Hero Eyebrow / Badge Text
                      </label>
                      <input
                        type="text"
                        value={siteSettings.heroBadge}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, heroBadge: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Main Headline
                      </label>
                      <input
                        type="text"
                        value={siteSettings.heroHeadline}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Subtitle / Description
                      </label>
                      <textarea
                        rows={2}
                        value={siteSettings.heroSubtitle}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                          Primary CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={siteSettings.heroPrimaryBtnText}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              heroPrimaryBtnText: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                          Primary CTA Destination Link
                        </label>
                        <input
                          type="text"
                          value={siteSettings.heroPrimaryBtnUrl}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              heroPrimaryBtnUrl: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Social Media Channels */}
                <div className="rounded-lg border border-zinc-200/80 bg-white p-4 shadow-2xs space-y-3.5">
                  <div className="flex items-center gap-2 border-b border-zinc-150 pb-2.5">
                    <Share2 size={14} className="text-zinc-600" />
                    <h2 className="text-xs font-semibold text-zinc-900 tracking-tight mb-0">
                      Social Media Channels
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={siteSettings.instagramUrl}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={siteSettings.linkedinUrl}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, linkedinUrl: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        value={siteSettings.facebookUrl}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, facebookUrl: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                        Twitter / X URL
                      </label>
                      <input
                        type="url"
                        value={siteSettings.twitterUrl}
                        onChange={(e) =>
                          setSiteSettings({ ...siteSettings, twitterUrl: e.target.value })
                        }
                        className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Bar */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                  >
                    <Save size={13} />
                    <span>{isSavingSettings ? "Saving Settings..." : "Save All Website Changes"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: BLOG CMS (Publish & Manage Blog Posts) */}
          {/* ========================================================================= */}
          {activeTab === "blog" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                    Blog CMS ({blogList.length} Articles)
                  </h1>
                  <p className="text-[11px] text-zinc-500">
                    Publish, update, and manage studio articles shown on your public blog page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddBlogModalOpen(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                >
                  <Plus size={12} />
                  <span>Write Article</span>
                </button>
              </div>

              {/* Blog Table */}
              <div className="rounded-lg border border-zinc-200/80 bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Article</th>
                      <th className="py-2.5 px-4 font-semibold">Category</th>
                      <th className="py-2.5 px-4 font-semibold">Date</th>
                      <th className="py-2.5 px-4 font-semibold">Read Time</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredBlogPosts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-zinc-400">
                          <BookOpen size={24} className="mx-auto mb-2 text-zinc-300 stroke-1" />
                          <p className="text-xs font-medium text-zinc-600 mb-0.5">No articles found</p>
                          <p className="text-[11px] text-zinc-400">Click Write Article to publish a new post</p>
                        </td>
                      </tr>
                    ) : (
                      filteredBlogPosts.map((post) => (
                        <tr key={post.slug} className="hover:bg-zinc-50/60 transition group">
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={
                                  post.image.startsWith("http") || post.image.startsWith("/")
                                    ? post.image
                                    : `https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=300&q=80`
                                }
                                alt={post.title}
                                className="size-8 rounded object-cover border border-zinc-200 shrink-0"
                              />
                              <div>
                                <span className="font-semibold text-zinc-900 block leading-tight">
                                  {post.title}
                                </span>
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  /blog/{post.slug}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-zinc-500 text-[11px]">{post.date}</td>
                          <td className="py-2.5 px-4 text-zinc-500 text-[11px]">{post.readTime}</td>
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-1 rounded text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition inline-flex items-center gap-0.5 text-[11px]"
                                title="View Live Article"
                              >
                                <Eye size={12} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleDeleteBlog(post.slug, post.title)}
                                className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                title="Delete Article"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: PORTFOLIO CMS */}
          {/* ========================================================================= */}
          {activeTab === "portfolio" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                    Portfolio Projects ({portfolioProjects.length})
                  </h1>
                  <p className="text-[11px] text-zinc-500">
                    Showcase client case studies displayed on the public portfolio page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddPortfolioModalOpen(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                >
                  <Plus size={12} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPortfolio.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-zinc-200/80 bg-white overflow-hidden shadow-2xs group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-zinc-100 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 rounded bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-zinc-800">
                          {item.industry}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xs font-semibold text-zinc-900 leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-medium text-zinc-500 shrink-0">
                            {item.kind}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 pt-0 border-t border-zinc-100 flex items-center justify-between mt-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="rounded bg-zinc-100 px-1.5 py-0.2 text-[9px] font-mono text-zinc-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeletePortfolio(item.name)}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded transition"
                        title="Delete project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: TEMPLATE STORE */}
          {/* ========================================================================= */}
          {activeTab === "templates" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                    Template Store ({templateItems.length})
                  </h1>
                  <p className="text-[11px] text-zinc-500">
                    Squarespace templates available for digital purchase and live preview.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddTemplateModalOpen(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                >
                  <Plus size={12} />
                  <span>Add Template</span>
                </button>
              </div>

              {/* Templates Table */}
              <div className="rounded-lg border border-zinc-200/80 bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Template</th>
                      <th className="py-2.5 px-4 font-semibold">Price</th>
                      <th className="py-2.5 px-4 font-semibold">Categories</th>
                      <th className="py-2.5 px-4 font-semibold">Demo Link</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredTemplates.map((t) => (
                      <tr key={t.id || t.slug} className="hover:bg-zinc-50/60 transition group">
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={t.image}
                              alt={t.name}
                              className="size-8 rounded object-cover border border-zinc-200 shrink-0"
                            />
                            <div>
                              <span className="font-semibold text-zinc-900 block leading-tight">
                                {t.name}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                /{t.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-4 font-mono font-semibold text-zinc-900">
                          {t.price}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="text-[11px] text-zinc-600">
                            {t.categories?.join(", ") || "General"}
                          </span>
                        </td>
                        <td className="py-2.5 px-4">
                          <a
                            href={t.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1 font-medium text-[11px]"
                          >
                            <span>Live Preview</span>
                            <ArrowUpRight size={10} />
                          </a>
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t.id || t.slug, t.name)}
                            className="text-zinc-400 hover:text-rose-600 p-1 rounded transition"
                            title="Delete template"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: LIVE TRAFFIC */}
          {/* ========================================================================= */}
          {activeTab === "traffic" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                  Live Traffic Analytics
                </h1>
                <p className="text-[11px] text-zinc-500">
                  Real-time visitor counts and high-traffic page performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-zinc-200/80 bg-white p-3.5 shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-500">Today's Visitors</span>
                  <div className="text-xl font-bold text-zinc-900 mt-1">
                    {analytics?.todayVisitors || 0}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200/80 bg-white p-3.5 shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-500">Today's Pageviews</span>
                  <div className="text-xl font-bold text-zinc-900 mt-1">
                    {analytics?.todayPageviews || 0}
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200/80 bg-white p-3.5 shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-500">All-Time Visitors</span>
                  <div className="text-xl font-bold text-zinc-900 mt-1">
                    {analytics?.totalVisitors || 0}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-white shadow-2xs overflow-hidden">
                <div className="p-3 border-b border-zinc-150">
                  <h3 className="text-xs font-semibold text-zinc-900">Top Visited Pages</h3>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 text-[10px] font-semibold uppercase text-zinc-500">
                    <tr>
                      <th className="py-2 px-4">Page Path</th>
                      <th className="py-2 px-4 text-right">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {analytics?.topPages?.map((p, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="py-2 px-4 font-mono text-[11px] text-zinc-800">{p.path}</td>
                        <td className="py-2 px-4 text-right font-semibold text-zinc-900">{p.views}</td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan={2} className="py-4 text-center text-zinc-400">
                          No page tracking data recorded yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: SUBSCRIBERS */}
          {/* ========================================================================= */}
          {activeTab === "leads" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                    Subscribers &amp; Leads ({subscribers.length})
                  </h1>
                  <p className="text-[11px] text-zinc-500">
                    Newsletter signups and email leads captured on the website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const emails = subscribers.map((s) => s.email).join(", ");
                    if (!emails) {
                      showToast("No emails to copy");
                      return;
                    }
                    navigator.clipboard.writeText(emails);
                    showToast("Subscriber emails copied");
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-2xs"
                >
                  <Copy size={11} />
                  <span>Copy All Emails</span>
                </button>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/80 border-b border-zinc-200/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Subscriber</th>
                      <th className="py-2.5 px-4 font-semibold">Interest</th>
                      <th className="py-2.5 px-4 font-semibold">Date Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-zinc-400 text-xs">
                          No subscribers recorded yet
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((s) => (
                        <tr key={s.id} className="hover:bg-zinc-50/60 transition">
                          <td className="py-2.5 px-4 font-medium text-zinc-900">{s.email}</td>
                          <td className="py-2.5 px-4 text-zinc-600">{s.interest || "General"}</td>
                          <td className="py-2.5 px-4 text-zinc-400 font-mono text-[10px]">
                            {new Date(s.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: SECURITY & ACCESS */}
          {/* ========================================================================= */}
          {activeTab === "security" && (
            <div className="space-y-4 animate-fade-in max-w-md">
              <div>
                <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">
                  Passcode &amp; Access Control
                </h1>
                <p className="text-[11px] text-zinc-500">
                  Update the master passcode protecting this admin portal.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-200/80 bg-white p-4 shadow-2xs">
                <form onSubmit={handleUpdatePin} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                      New Admin Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                      Confirm Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-zinc-900 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                  >
                    Update Passcode
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* INQUIRY BRIEF MODAL */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-5 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-150 pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Client Brief #{selectedInquiry.id.slice(-6)}
                </span>
                <h2 className="text-sm font-bold text-zinc-900 leading-tight">
                  {selectedInquiry.name}
                </h2>
                <span className="text-[11px] text-zinc-400">
                  Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/60 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 font-medium block">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-zinc-900 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-medium block">WhatsApp / Phone</span>
                <span className="font-semibold text-zinc-900">
                  {selectedInquiry.whatsapp || selectedInquiry.phone || "Not provided"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 font-medium block">Project Type</span>
                <span className="font-semibold text-zinc-900">{selectedInquiry.project}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-medium block">Budget Range</span>
                <span className="font-semibold text-emerald-700">{selectedInquiry.budget}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
                Full Client Message
              </span>
              <div className="rounded-lg bg-zinc-50 border border-zinc-200/80 p-3 text-xs text-zinc-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-150">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500 font-medium">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    updateInquiryStatus(selectedInquiry.id, e.target.value as Inquiry["status"])
                  }
                  className="rounded border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed / Won</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {formatCleanPhone(selectedInquiry.whatsapp || selectedInquiry.phone) && (
                  <a
                    href={`https://wa.me/${formatCleanPhone(selectedInquiry.whatsapp || selectedInquiry.phone)}?text=${encodeURIComponent(
                      `Hi ${selectedInquiry.name}! Thank you for reaching out to Looksbay Studio regarding your ${selectedInquiry.project} project.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition"
                  >
                    <MessageCircle size={12} />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Looksbay Studio — ${selectedInquiry.project} Proposal`
                  )}`}
                  className="inline-flex items-center gap-1 rounded bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black transition"
                >
                  <Mail size={12} />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WRITE ARTICLE / ADD BLOG MODAL */}
      {/* ========================================================================= */}
      {isAddBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-5 shadow-xl space-y-3.5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-150 pb-2.5">
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Write &amp; Publish Blog Article
              </h2>
              <button
                type="button"
                onClick={() => setIsAddBlogModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddBlog} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Squarespace Design Secrets for 2026"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Category
                  </label>
                  <select
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  >
                    <option value="Design & Code">Design &amp; Code</option>
                    <option value="SEO & Traffic">SEO &amp; Traffic</option>
                    <option value="Templates">Templates &amp; Themes</option>
                    <option value="Strategy">Strategy &amp; Growth</option>
                    <option value="Fluid Engine">Fluid Engine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={newBlogReadTime}
                    onChange={(e) => setNewBlogReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  URL Slug (optional)
                </label>
                <input
                  type="text"
                  placeholder="squarespace-design-secrets"
                  value={newBlogSlug}
                  onChange={(e) => setNewBlogSlug(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Article Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Short engaging summary shown in the blog feed..."
                  value={newBlogExcerpt}
                  onChange={(e) => setNewBlogExcerpt(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Cover Image URL or Unsplash ID
                </label>
                <input
                  type="text"
                  value={newBlogImage}
                  onChange={(e) => setNewBlogImage(e.target.value)}
                  placeholder="photo-1460925895917-afdab827c52f or https://..."
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={newBlogAuthor}
                  onChange={(e) => setNewBlogAuthor(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Article Body (Markdown or Paragraphs)
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your article insights here. Separate paragraphs with an empty line..."
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-150">
                <button
                  type="button"
                  onClick={() => setIsAddBlogModalOpen(false)}
                  className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-black transition shadow-xs"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD PORTFOLIO MODAL */}
      {/* ========================================================================= */}
      {isAddPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-150 pb-2.5">
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Add Showcase Project
              </h2>
              <button
                type="button"
                onClick={() => setIsAddPortfolioModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modernist Architecture Studio"
                  value={newPortfolioName}
                  onChange={(e) => setNewPortfolioName(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={newPortfolioIndustry}
                    onChange={(e) => setNewPortfolioIndustry(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Scope
                  </label>
                  <input
                    type="text"
                    value={newPortfolioKind}
                    onChange={(e) => setNewPortfolioKind(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newPortfolioImage}
                  onChange={(e) => setNewPortfolioImage(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newPortfolioDescription}
                  onChange={(e) => setNewPortfolioDescription(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newPortfolioTags}
                  onChange={(e) => setNewPortfolioTags(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPortfolioModalOpen(false)}
                  className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD TEMPLATE MODAL */}
      {/* ========================================================================= */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-150 pb-2.5">
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Add Template to Store
              </h2>
              <button
                type="button"
                onClick={() => setIsAddTemplateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Studio"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="$149"
                    value={newTemplatePrice}
                    onChange={(e) => setNewTemplatePrice(e.target.value)}
                    className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  URL Slug (optional)
                </label>
                <input
                  type="text"
                  placeholder="lumina-studio"
                  value={newTemplateSlug}
                  onChange={(e) => setNewTemplateSlug(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Preview Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newTemplateImage}
                  onChange={(e) => setNewTemplateImage(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={newTemplateDemoUrl}
                  onChange={(e) => setNewTemplateDemoUrl(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTemplateModalOpen(false)}
                  className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                >
                  Publish Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
