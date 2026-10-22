import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "inquiries.json");

function getStoredInquiries(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      // Populate with initial sample inquiry if empty
      const initial = [
        {
          id: "inq_1",
          name: "Sophia Vance",
          email: "sophia@vancedesign.co",
          project: "Custom Squarespace Development",
          budget: "$3,000 - $5,000",
          message: "Looking for an expert to build custom fluid engine sections and integrate Momence booking.",
          status: "New",
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
          id: "inq_2",
          name: "Marcus Sterling",
          email: "marcus@sterlinglegal.com",
          project: "Platform Migration (WordPress)",
          budget: "$5,000+",
          message: "We need our law firm site migrated from WordPress to Squarespace 7.1 with 301 redirects.",
          status: "Contacted",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    return [];
  }
}

function saveInquiries(inquiries: any[]) {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing inquiries file:", error);
  }
}

export async function GET() {
  const inquiries = getStoredInquiries();
  return NextResponse.json({ count: inquiries.length, inquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message, template } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const inquiries = getStoredInquiries();
    const newInquiry = {
      id: "inq_" + Date.now(),
      name: name?.trim() || "Visitor",
      email: email.trim().toLowerCase(),
      project: project || (template ? `Template: ${template}` : "Custom Website"),
      budget: budget || "Not specified",
      message: message || "No message provided",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    return NextResponse.json({ message: "Inquiry saved successfully", inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    let inquiries = getStoredInquiries();
    inquiries = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    saveInquiries(inquiries);

    return NextResponse.json({ message: "Status updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let inquiries = getStoredInquiries();
    inquiries = inquiries.filter((inq) => inq.id !== id);
    saveInquiries(inquiries);

    return NextResponse.json({ message: "Inquiry deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
