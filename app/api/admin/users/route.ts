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

function saveUsers(users: any[]) {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing subscribers file:", error);
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    let users = getStoredUsers();
    users = users.filter((u) => u.id !== userId);
    saveUsers(users);

    return NextResponse.json({ message: "User deleted successfully", count: users.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
