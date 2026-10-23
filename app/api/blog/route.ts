import { NextResponse } from "next/server";
import { getBlogPosts, addBlogPost, deleteBlogPost } from "@/lib/db";
import type { BlogPost } from "@/app/shared/data/blog-posts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const post: BlogPost = {
      slug: body.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      title: body.title.trim(),
      excerpt: body.excerpt?.trim() || "Insights from Looksbay Studio.",
      category: body.category || "Design & Code",
      categoryColor: body.categoryColor || "bg-blue-50 text-blue-700 border-blue-200",
      date: body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: body.readTime || "5 min read",
      author: {
        name: body.author?.name || "Looksbay Editorial Team",
        role: body.author?.role || "Squarespace Circle Specialists",
        avatar: body.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      image: body.image || "photo-1460925895917-afdab827c52f",
      imageAlt: body.imageAlt || body.title,
      tags: Array.isArray(body.tags) ? body.tags : ["Squarespace", "Web Design"],
      content: body.content || {
        intro: body.excerpt || "Welcome to this article from Looksbay Studio.",
        sections: [
          {
            heading: "Overview",
            body: [body.body || "Detailed guide and insights for ambitious brands."],
          },
        ],
        conclusion: "Have questions or need help executing this on your Squarespace website? Contact our studio today.",
      },
    };

    await addBlogPost(post);
    return NextResponse.json({ message: "Blog post published successfully", post });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json({ error: "Failed to publish blog post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await deleteBlogPost(slug);
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
