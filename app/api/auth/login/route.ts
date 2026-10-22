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
    console.error("Error reading subscribers file:", error);
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    let user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      // Auto-register to ensure we capture the email for marketing purposes even on first login attempt!
      user = {
        id: "usr_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        name: normalizedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        email: normalizedEmail,
        interest: "General Member",
        marketingConsent: true,
        source: "Looksbay Quick Login",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      saveUsers(users);
    }

    return NextResponse.json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        interest: user.interest,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error during login." },
      { status: 500 }
    );
  }
}
