import { NextResponse } from "next/server";
import { getAnalyticsData, saveAnalyticsData } from "@/lib/db";

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

    const data = await getAnalyticsData();
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

    // Real Pageview Increment
    data.daily[today].pageviews += 1;

    // Real Unique Visitor Check
    const cleanVid = visitorId || "v_real_" + Date.now().toString(36);
    if (!data.daily[today].visitorIds) data.daily[today].visitorIds = [];
    if (!data.daily[today].visitorIds.includes(cleanVid)) {
      data.daily[today].visitorIds.push(cleanVid);
      data.daily[today].visitors += 1;
    }

    // Real Page Route Count
    data.pages[pagePath] = (data.pages[pagePath] || 0) + 1;

    // Real Recent Visitor Log
    data.recent.unshift({
      path: pagePath,
      timestamp: new Date().toISOString(),
      referrer: referrer || "Direct",
    });
    if (data.recent.length > 50) data.recent.pop();

    await saveAnalyticsData(data);

    return NextResponse.json({
      success: true,
      realTodayVisitors: data.daily[today].visitors,
      realTodayPageviews: data.daily[today].pageviews,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record pageview" }, { status: 500 });
  }
}
