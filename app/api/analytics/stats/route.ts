import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({
        todayVisitors: 0,
        todayPageviews: 0,
        yesterdayVisitors: 0,
        totalVisitors: 0,
        totalPageviews: 0,
        dailyTrend: [],
        topPages: [],
        recentVisits: [],
      });
    }

    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(content || "{}");

    const todayKey = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split("T")[0];

    const todayStats = data.daily?.[todayKey] || { visitors: 0, pageviews: 0 };
    const yesterdayStats = data.daily?.[yesterdayKey] || { visitors: 0, pageviews: 0 };

    // Calculate 100% real totals from saved records
    let totalVisitors = 0;
    let totalPageviews = 0;
    const dailyKeys = Object.keys(data.daily || {});

    dailyKeys.forEach((k) => {
      totalVisitors += data.daily[k].visitors || 0;
      totalPageviews += data.daily[k].pageviews || 0;
    });

    // Real Last 7 Days window
    const last7Days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = d.toISOString().split("T")[0];
      const dayStats = data.daily?.[k] || { visitors: 0, pageviews: 0 };
      last7Days.push({
        date: k,
        day: daysOfWeek[d.getDay()],
        visitors: dayStats.visitors || 0,
        pageviews: dayStats.pageviews || 0,
      });
    }

    // Real Top Pages (strictly from real visits)
    const topPages = Object.entries(data.pages || {})
      .map(([pathname, views]) => ({ path: pathname, views: Number(views) || 0 }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return NextResponse.json({
      todayVisitors: todayStats.visitors || 0,
      todayPageviews: todayStats.pageviews || 0,
      yesterdayVisitors: yesterdayStats.visitors || 0,
      totalVisitors,
      totalPageviews,
      dailyTrend: last7Days,
      topPages,
      recentVisits: (data.recent || []).slice(0, 20),
    });
  } catch (error) {
    return NextResponse.json({
      todayVisitors: 0,
      todayPageviews: 0,
      yesterdayVisitors: 0,
      totalVisitors: 0,
      totalPageviews: 0,
      dailyTrend: [],
      topPages: [],
      recentVisits: [],
    });
  }
}
