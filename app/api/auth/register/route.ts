import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

function getStoredUsers(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
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
    const { name, email, password, interest } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    let existingUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      // User exists, return the user
      return NextResponse.json({
        message: "Welcome back!",
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          interest: existingUser.interest,
          createdAt: existingUser.createdAt,
        },
      });
    }

    const newUser = {
      id: "usr_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: name?.trim() || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      interest: interest || "Squarespace Templates",
      marketingConsent: true,
      source: "Looksbay Portal Login",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          interest: newUser.interest,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Server error creating account." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const users = getStoredUsers();
  return NextResponse.json({
    total: users.length,
    users: users.map(({ id, name, email, interest, createdAt }) => ({
      id,
      name,
      email,
      interest,
      createdAt,
    })),
  });
}
