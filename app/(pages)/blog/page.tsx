import type { Metadata } from "next";
import BlogList from "./components/blog-list";
import { NewsletterCTA } from "@/app/shared/components/site-components";

export const metadata: Metadata = {
  title: "Our Blog — Studio Articles, Inspiration & Guides | Looksbay",
  description:
    "Discover a universe of boundless imagination, design insights, and creative inspiration from the Looksbay studio team.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <BlogList />
      <NewsletterCTA />
    </main>
  );
}
