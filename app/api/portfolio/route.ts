import { NextResponse } from "next/server";
import { getPortfolioItems, addPortfolioItem, deletePortfolioItem } from "@/lib/db";
import type { Project } from "@/app/(pages)/portfolio/data";

export async function GET() {
  const items = await getPortfolioItems();
  return NextResponse.json({ count: items.length, projects: items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, kind, industry, image, alt, description, tags, hearts } = body;

    if (!name || !image) {
      return NextResponse.json({ error: "Project name and image URL are required" }, { status: 400 });
    }

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

    await addPortfolioItem(newProject);

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

    await deletePortfolioItem(projectName);
    const items = await getPortfolioItems();

    return NextResponse.json({ message: "Project deleted successfully", count: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
