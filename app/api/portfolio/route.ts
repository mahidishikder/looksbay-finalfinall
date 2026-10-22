import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { projects as defaultProjects, type Project } from "@/app/(pages)/portfolio/data";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

function getStoredProjects(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultProjects, null, 2), "utf-8");
      return defaultProjects;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    return defaultProjects;
  }
}

function saveProjects(items: Project[]) {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving portfolio projects:", error);
  }
}

export async function GET() {
  const items = getStoredProjects();
  return NextResponse.json({ count: items.length, projects: items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, kind, industry, image, alt, description, tags, hearts } = body;

    if (!name || !image) {
      return NextResponse.json({ error: "Project name and image URL are required" }, { status: 400 });
    }

    const items = getStoredProjects();
    const newProject: Project = {
      name: name.trim(),
      kind: kind || "Custom Squarespace Website",
      industry: industry || "Creative",
      image: image.trim(),
      alt: alt || `${name} website design`,
      description: description || "Bespoke Squarespace 7.1 website built with fluid engine.",
      tags: tags && tags.length > 0 ? tags : ["Squarespace 7.1", "Fluid Engine", "Custom CSS"],
      hearts: hearts || 500 + Math.floor(Math.random() * 400),
    };

    items.unshift(newProject);
    saveProjects(items);

    return NextResponse.json({ message: "Portfolio project created successfully", project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectName = searchParams.get("name");

    if (!projectName) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    let items = getStoredProjects();
    items = items.filter((p) => p.name.toLowerCase() !== projectName.toLowerCase());
    saveProjects(items);

    return NextResponse.json({ message: "Project deleted successfully", count: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
