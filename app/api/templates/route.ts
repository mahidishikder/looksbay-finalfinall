import { NextResponse } from "next/server";
import { getTemplateItems, addTemplateItem, deleteTemplateItem } from "@/lib/db";
import type { TemplateData } from "@/app/shared/data/templates-data";

export async function GET() {
  const items = await getTemplateItems();
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

    const newTemplate: TemplateData = {
      id: "tmpl_" + Date.now(),
      slug: cleanSlug,
      name: name.trim(),
      tagline: "Fluid Engine 7.1 Template",
      description: description || "Modern Squarespace 7.1 template built for conversions.",
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
      ],
      mockups: {
        desktop: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        mobile: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        tablet: image || "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
        gallery: [],
      },
    };

    await addTemplateItem(newTemplate);

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

    await deleteTemplateItem(idOrSlug);
    const items = await getTemplateItems();

    return NextResponse.json({ message: "Template deleted successfully", count: items.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
