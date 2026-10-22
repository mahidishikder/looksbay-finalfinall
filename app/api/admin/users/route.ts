import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

function getStoredUsers(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const users = getStoredUsers();

  if (format === "csv") {
    // Generate CSV for export to Mailchimp, Klaviyo, Brevo, or Flodesk
    const header = "ID,Name,Email,Interest,MarketingConsent,Source,CreatedAt\n";
    const rows = users
      .map(
        (u) =>
          `"${u.id}","${u.name || ""}","${u.email}","${u.interest || ""}","${
            u.marketingConsent ? "Yes" : "No"
          }","${u.source || "Web"}","${u.createdAt}"`
      )
      .join("\n");

    const csv = header + rows;
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="looksbay-subscribers-${new Date()
          .toISOString()
          .slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({
    count: users.length,
    users,
  });
}
