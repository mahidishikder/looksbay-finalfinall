import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

interface AnalyticsData {
  daily: {
    [date: string]: {
      visitors: number;
      pageviews: number;
      visitorIds: string[];
    };
  };
  pages: {
    [pathname: string]: number;
  };
  recent: {
    path: string;
    timestamp: string;
    referrer?: string;
  }[];
}

function getStoredAnalytics(): AnalyticsData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const initial: AnalyticsData = { daily: {}, pages: {}, recent: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "{}");
  } catch (error) {
    return { daily: {}, pages: {}, recent: [] };
  }
}

function saveAnalytics(data: AnalyticsData) {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving analytics:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path: pagePath, visitorId, referrer } = body;

    if (!pagePath) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Never track admin pages, internal assets, or API routes
    if (
      pagePath.startsWith("/admin") ||
      pagePath.startsWith("/api") ||
      pagePath.includes("_next") ||
      pagePath.includes("favicon")
    ) {
      return NextResponse.json({ ignored: true });
    }

    const data = getStoredAnalytics();
    if (!data.daily) data.daily = {};
    if (!data.pages) data.pages = {};
    if (!data.recent) data.recent = [];

    const today = new Date().toISOString().split("T")[0];

    if (!data.daily[today]) {
      data.daily[today] = {
        visitors: 0,
        pageviews: 0,
        visitorIds: [],
      };
    }

    // 100% Real Pageview Increment
    data.daily[today].pageviews += 1;

    // 100% Real Unique Visitor Check
    const cleanVid = visitorId || "v_real_" + Date.now().toString(36);
    if (!data.daily[today].visitorIds) data.daily[today].visitorIds = [];
    if (!data.daily[today].visitorIds.includes(cleanVid)) {
      data.daily[today].visitorIds.push(cleanVid);
      data.daily[today].visitors += 1;
    }

    // 100% Real Page Route Count
    data.pages[pagePath] = (data.pages[pagePath] || 0) + 1;

    // 100% Real Recent Visitor Log
    data.recent.unshift({
      path: pagePath,
      timestamp: new Date().toISOString(),
      referrer: referrer || "Direct",
    });
    if (data.recent.length > 50) data.recent.pop();

    saveAnalytics(data);

    return NextResponse.json({
      success: true,
      realTodayVisitors: data.daily[today].visitors,
      realTodayPageviews: data.daily[today].pageviews,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record pageview" }, { status: 500 });
  }
}
