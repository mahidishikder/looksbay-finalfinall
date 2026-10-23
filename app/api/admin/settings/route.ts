import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveSiteSettings(body);
    return NextResponse.json({ message: "Settings saved successfully", settings: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
