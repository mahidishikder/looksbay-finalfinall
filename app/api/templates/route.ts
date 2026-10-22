import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { allTemplates as defaultTemplates, type TemplateData } from "@/app/shared/data/templates-data";

const DATA_FILE = path.join(process.cwd(), "data", "templates.json");

function getStoredTemplates(): TemplateData[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultTemplates, null, 2), "utf-8");
      return defaultTemplates;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    return defaultTemplates;
  }
}

function saveTemplates(items: TemplateData[]) {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving templates:", error);
  }
}

export async function GET() {
  const items = getStoredTemplates();
  return NextResponse.json({ count: items.length, templates: items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, price, categories, description, image, demoUrl } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Template name and price are required" }, { status: 400 });
    }

    const cleanSlug =
      slug?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const items = getStoredTemplates();
    const newTemplate: TemplateData = {
      id: "tmpl_" + Date.now(),
      slug: cleanSlug,
      name: name.trim(),
      tagline: "Fluid Engine 7.1 Template",
      description: description || "Modern, luxury Squarespace 7.1 template built for conversions.",
      price: price.toString().replace(/[^0-9.]/g, "") || "189",
      originalPrice: (parseFloat(price) * 1.3).toFixed(0),
      customizationPrice: "1,200",
      categories: Array.isArray(categories) && categories.length > 0 ? categories : ["Studio & Agency", "Services & Consultancies"],
      image: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
      alt: `${name} Squarespace template preview`,
      demoUrl: demoUrl || `https://${cleanSlug}.squarespace.com`,
      accentColor: "#0077ED",
      pagesIncluded: ["Home", "About", "Services", "Portfolio", "Contact"],
      features: [
        { title: "Fluid Engine 7.1", description: "Fully drag and drop grid system" },
        { title: "Custom CSS Included", description: "Pre-installed code plugins" },
        { title: "Instant Transfer", description: "Transferred to your Squarespace account within 24h" },
      ],
      mockups: {
        desktop: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        mobile: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        tablet: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        gallery: [],
      },
    };

    items.unshift(newTemplate);
    saveTemplates(items);

    return NextResponse.json({ message: "Template created successfully", template: newTemplate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrSlug = searchParams.get("id");

    if (!idOrSlug) {
      return NextResponse.json({ error: "Template ID or slug is required" }, { status: 400 });
    }

    let items = getStoredTemplates();
    items = items.filter((t) => t.id !== idOrSlug && t.slug !== idOrSlug);
    saveTemplates(items);

    return NextResponse.json({ message: "Template deleted successfully", count: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
