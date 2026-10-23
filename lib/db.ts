import fs from "fs";
import path from "path";
import { getMongoDb, isMongoConfigured } from "./mongodb";
import { projects as defaultProjects, type Project } from "@/app/(pages)/portfolio/data";
import { allTemplates as defaultTemplates, type TemplateData } from "@/app/shared/data/templates-data";
import { blogPosts as defaultBlogPosts, type BlogPost } from "@/app/shared/data/blog-posts";

// File paths for fallback local storage
const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");
const TEMPLATES_FILE = path.join(DATA_DIR, "templates.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// --------------------------------------------------------------------------
// 1. PORTFOLIO
// --------------------------------------------------------------------------
export async function getPortfolioItems(): Promise<Project[]> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const items = await db.collection("portfolio").find({}, { projection: { _id: 0 } }).toArray();
        if (items.length > 0) return items as unknown as Project[];
        // Auto-seed MongoDB if empty
        if (defaultProjects.length > 0) {
          await db.collection("portfolio").insertMany(defaultProjects as any);
          return defaultProjects;
        }
      }
    }
  } catch (err) {
    console.error("MongoDB portfolio fetch error:", err);
  }

  // Fallback to local JSON
  try {
    ensureDir();
    if (!fs.existsSync(PORTFOLIO_FILE)) {
      fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(defaultProjects, null, 2), "utf-8");
      return defaultProjects;
    }
    return JSON.parse(fs.readFileSync(PORTFOLIO_FILE, "utf-8") || "[]");
  } catch {
    return defaultProjects;
  }
}

export async function addPortfolioItem(project: Project): Promise<void> {
  // Save to MongoDB if available
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("portfolio").insertOne({ ...project, createdAt: new Date() } as any);
      }
    }
  } catch (err) {
    console.error("MongoDB portfolio insert error:", err);
  }

  // Always sync to local file as backup
  try {
    ensureDir();
    const list = await getPortfolioItems();
    const existing = list.filter((p) => p.name.toLowerCase() !== project.name.toLowerCase());
    existing.unshift(project);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (e) {
    console.error("Local portfolio save error:", e);
  }
}

export async function deletePortfolioItem(name: string): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("portfolio").deleteOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
      }
    }
  } catch (err) {
    console.error("MongoDB portfolio delete error:", err);
  }

  try {
    ensureDir();
    const list = await getPortfolioItems();
    const filtered = list.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (e) {
    console.error("Local portfolio delete error:", e);
  }
}

// --------------------------------------------------------------------------
// 2. TEMPLATES
// --------------------------------------------------------------------------
export async function getTemplateItems(): Promise<TemplateData[]> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const items = await db.collection("templates").find({}, { projection: { _id: 0 } }).toArray();
        if (items.length > 0) return items as unknown as TemplateData[];
        // Auto-seed MongoDB if empty
        if (defaultTemplates.length > 0) {
          await db.collection("templates").insertMany(defaultTemplates as any);
          return defaultTemplates;
        }
      }
    }
  } catch (err) {
    console.error("MongoDB templates fetch error:", err);
  }

  try {
    ensureDir();
    if (!fs.existsSync(TEMPLATES_FILE)) {
      fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(defaultTemplates, null, 2), "utf-8");
      return defaultTemplates;
    }
    return JSON.parse(fs.readFileSync(TEMPLATES_FILE, "utf-8") || "[]");
  } catch {
    return defaultTemplates;
  }
}

export async function addTemplateItem(template: TemplateData): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("templates").insertOne({ ...template, createdAt: new Date() } as any);
      }
    }
  } catch (err) {
    console.error("MongoDB template insert error:", err);
  }

  try {
    ensureDir();
    const list = await getTemplateItems();
    const existing = list.filter((t) => t.id !== template.id && t.slug !== template.slug);
    existing.unshift(template);
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (e) {
    console.error("Local template save error:", e);
  }
}

export async function deleteTemplateItem(idOrSlug: string): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("templates").deleteOne({
          $or: [{ id: idOrSlug }, { slug: idOrSlug }],
        });
      }
    }
  } catch (err) {
    console.error("MongoDB template delete error:", err);
  }

  try {
    ensureDir();
    const list = await getTemplateItems();
    const filtered = list.filter((t) => t.id !== idOrSlug && t.slug !== idOrSlug);
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (e) {
    console.error("Local template delete error:", e);
  }
}

// --------------------------------------------------------------------------
// 3. INQUIRIES
// --------------------------------------------------------------------------
export async function getInquiriesList(): Promise<any[]> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const items = await db.collection("inquiries").find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
        return items;
      }
    }
  } catch (err) {
    console.error("MongoDB inquiries fetch error:", err);
  }

  try {
    ensureDir();
    if (!fs.existsSync(INQUIRIES_FILE)) return [];
    return JSON.parse(fs.readFileSync(INQUIRIES_FILE, "utf-8") || "[]");
  } catch {
    return [];
  }
}

export async function addInquiry(inquiry: any): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("inquiries").insertOne(inquiry);
      }
    }
  } catch (err) {
    console.error("MongoDB inquiry insert error:", err);
  }

  try {
    ensureDir();
    const list = await getInquiriesList();
    list.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (e) {
    console.error("Local inquiry save error:", e);
  }
}

export async function updateInquiryStatus(id: string, status: string): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("inquiries").updateOne({ id }, { $set: { status, updatedAt: new Date() } });
      }
    }
  } catch (err) {
    console.error("MongoDB inquiry update error:", err);
  }

  try {
    ensureDir();
    const list = await getInquiriesList();
    const updated = list.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.error("Local inquiry update error:", e);
  }
}

export async function deleteInquiryItem(id: string): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("inquiries").deleteOne({ id });
      }
    }
  } catch (err) {
    console.error("MongoDB inquiry delete error:", err);
  }

  try {
    ensureDir();
    const list = await getInquiriesList();
    const filtered = list.filter((i) => i.id !== id);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (e) {
    console.error("Local inquiry delete error:", e);
  }
}

// --------------------------------------------------------------------------
// 4. ANALYTICS (REAL TRACKING)
// --------------------------------------------------------------------------
export async function getAnalyticsData(): Promise<any> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const doc = await db.collection("analytics").findOne({ key: "site_analytics" }, { projection: { _id: 0 } });
        if (doc) return doc.data || { daily: {}, pages: {}, recent: [] };
      }
    }
  } catch (err) {
    console.error("MongoDB analytics fetch error:", err);
  }

  try {
    ensureDir();
    if (!fs.existsSync(ANALYTICS_FILE)) return { daily: {}, pages: {}, recent: [] };
    return JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8") || "{}");
  } catch {
    return { daily: {}, pages: {}, recent: [] };
  }
}

export async function saveAnalyticsData(data: any): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("analytics").updateOne(
          { key: "site_analytics" },
          { $set: { key: "site_analytics", data, updatedAt: new Date() } },
          { upsert: true }
        );
      }
    }
  } catch (err) {
    console.error("MongoDB analytics update error:", err);
  }

  try {
    ensureDir();
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Local analytics save error:", e);
  }
}

// --------------------------------------------------------------------------
// 5. SITE SETTINGS & CONTROL
// --------------------------------------------------------------------------
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export async function getSiteSettings(): Promise<any> {
  const defaultSettings = {
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
    notificationEmail: "helplooksbay@gmail.com",
    gmailSender: "helplooksbay@gmail.com",
    gmailAppPassword: "",
    emailNotificationsEnabled: true,
  };

  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const doc = await db.collection("settings").findOne({ key: "site_settings" }, { projection: { _id: 0 } });
        if (doc && doc.data) return doc.data;
      }
    }
  } catch (err) {
    console.error("MongoDB settings fetch error:", err);
  }

  try {
    ensureDir();
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), "utf-8");
      return defaultSettings;
    }
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8") || JSON.stringify(defaultSettings));
  } catch {
    return defaultSettings;
  }
}

export async function saveSiteSettings(data: any): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("settings").updateOne(
          { key: "site_settings" },
          { $set: { key: "site_settings", data, updatedAt: new Date() } },
          { upsert: true }
        );
      }
    }
  } catch (err) {
    console.error("MongoDB settings update error:", err);
  }

  try {
    ensureDir();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Local settings save error:", e);
  }
}

// --------------------------------------------------------------------------
// 6. BLOG CMS
// --------------------------------------------------------------------------
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        const items = await db.collection("blogs").find({}, { projection: { _id: 0 } }).toArray();
        if (items.length > 0) return items as unknown as BlogPost[];
        if (defaultBlogPosts.length > 0) {
          await db.collection("blogs").insertMany(defaultBlogPosts as any);
          return defaultBlogPosts;
        }
      }
    }
  } catch (err) {
    console.error("MongoDB blogs fetch error:", err);
  }

  try {
    ensureDir();
    if (!fs.existsSync(BLOGS_FILE)) {
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(defaultBlogPosts, null, 2), "utf-8");
      return defaultBlogPosts;
    }
    const data = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8") || "[]");
    return data.length > 0 ? data : defaultBlogPosts;
  } catch {
    return defaultBlogPosts;
  }
}

export async function addBlogPost(post: BlogPost): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("blogs").updateOne(
          { slug: post.slug },
          { $set: { ...post, updatedAt: new Date() } },
          { upsert: true }
        );
      }
    }
  } catch (err) {
    console.error("MongoDB blog insert error:", err);
  }

  try {
    ensureDir();
    const list = await getBlogPosts();
    const existing = list.filter((p) => p.slug !== post.slug);
    existing.unshift(post);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (e) {
    console.error("Local blog save error:", e);
  }
}

export async function deleteBlogPost(slug: string): Promise<void> {
  try {
    if (isMongoConfigured()) {
      const db = await getMongoDb();
      if (db) {
        await db.collection("blogs").deleteOne({ slug });
      }
    }
  } catch (err) {
    console.error("MongoDB blog delete error:", err);
  }

  try {
    ensureDir();
    const list = await getBlogPosts();
    const updated = list.filter((p) => p.slug !== slug);
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.error("Local blog delete error:", e);
  }
}


