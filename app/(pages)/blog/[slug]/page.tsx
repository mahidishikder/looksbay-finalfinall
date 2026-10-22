import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Info,
  Lightbulb,
  Share2,
  Sparkles,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { blogPosts } from "@/app/shared/data/blog-posts";
import { NewsletterCTA } from "@/app/shared/components/site-components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Article Not Found | Looksbay" };
  }
  return {
    title: `${post.title} — Looksbay Studio`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-paper">
      {/* Breadcrumbs & Header Bar */}
      <div className="border-b border-line bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-[min(1480px,calc(100%_-_96px))] items-center justify-between text-xs mobile:w-[calc(100%_-_36px)]">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-muted">
            <Link href="/" className="transition hover:text-blue">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-blue">
              Blog
            </Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-[300px] text-ink font-medium">
              {post.title}
            </span>
          </nav>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-blue transition hover:text-blue-hover"
          >
            <ArrowLeft size={14} />
            Back to all guides
          </Link>
        </div>
      </div>

      {/* Article Hero */}
      <header className="border-b border-line bg-white px-6 pb-14 pt-16 mobile:px-4 mobile:pb-10 mobile:pt-10">
        <div className="mx-auto max-w-[860px] text-center">
          {/* Category & Read Time */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${post.categoryColor}`}
            >
              {post.category}
            </span>
            <span className="text-muted">•</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Calendar size={13} className="text-blue" />
              {post.date}
            </span>
            <span className="text-muted">•</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock size={13} className="text-blue" />
              {post.readTime}
            </span>
          </div>

          {/* Heading */}
          <h1 className="gradient-heading mb-6 text-[clamp(30px,4.5vw,52px)] font-extrabold leading-[1.12] tracking-[-.03em] text-ink">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="mx-auto mb-8 max-w-[720px] text-[clamp(16px,2vw,19px)] leading-[1.65] text-muted">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="inline-flex items-center gap-3 rounded-full border border-line bg-paper px-4 py-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="size-9 rounded-full object-cover ring-2 ring-blue/20"
            />
            <div className="text-left">
              <strong className="block text-xs font-bold text-ink">{post.author.name}</strong>
              <span className="block text-[11px] text-muted">{post.author.role}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mx-auto mt-12 max-w-[1020px] overflow-hidden rounded-[18px] border border-black/[0.08] bg-[#e9e6df] shadow-card">
          <img
            src={
              post.image.startsWith("/") || post.image.startsWith("http")
                ? post.image
                : `https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=1600&q=85`
            }
            alt={post.imageAlt}
            className="aspect-[21/9] w-full object-cover mobile:aspect-[16/10]"
          />
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mx-auto grid max-w-[1020px] grid-cols-[1fr_280px] gap-12 px-6 py-16 desktop:grid-cols-[1fr_280px] tablet:grid-cols-1 mobile:grid-cols-1 mobile:px-4 mobile:py-10">
        {/* Main Article Body */}
        <div className="min-w-0">
          {/* Introduction Card */}
          <div className="mb-10 rounded-[14px] border border-blue/20 bg-[#eef5ff]/60 p-6 mobile:p-5">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue">
              <Sparkles size={14} />
              Key Takeaway
            </span>
            <p className="m-0 text-base leading-[1.75] text-[#1c3d5a]">
              {post.content.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {post.content.sections.map((section, idx) => (
              <section key={section.heading} id={`section-${idx + 1}`} className="scroll-mt-24">
                <h2 className="gradient-heading mb-2 text-[clamp(22px,2.5vw,28px)] font-bold leading-[1.25]">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue">
                    {section.subheading}
                  </p>
                )}

                {section.body.map((para, pIdx) => (
                  <p key={pIdx} className="mb-4 text-[16px] leading-[1.8] text-[#2c2d30]">
                    {para}
                  </p>
                ))}

                {/* Optional Code Snippet */}
                {section.codeSnippet && (
                  <div className="my-6 overflow-hidden rounded-[12px] border border-[#2a2a2c] bg-[#1a1a1c] shadow-md">
                    <div className="flex items-center justify-between border-b border-[#2e2e32] bg-[#121214] px-4 py-2.5 text-xs text-[#a0a0a8]">
                      <span className="flex items-center gap-1.5 font-mono uppercase">
                        <Code2 size={13} className="text-blue" />
                        {section.codeSnippet.language}
                      </span>
                      <span className="text-[11px] text-muted">Ready to paste into Custom CSS</span>
                    </div>
                    <pre className="overflow-x-auto p-4 text-[13px] leading-[1.7] text-[#e4e4e7]">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Optional Callout */}
                {section.callout && (
                  <div
                    className={`my-6 rounded-[12px] border p-4 ${
                      section.callout.type === "warning"
                        ? "border-amber-200 bg-amber-50/70 text-amber-900"
                        : "border-blue-200 bg-blue-50/60 text-[#123859]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {section.callout.type === "warning" ? (
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                      ) : (
                        <Lightbulb size={18} className="mt-0.5 shrink-0 text-blue" />
                      )}
                      <div>
                        <strong className="block text-sm font-bold">{section.callout.title}</strong>
                        <p className="mt-1 text-sm leading-[1.65]">{section.callout.text}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional Checklist */}
                {section.checklist && (
                  <div className="my-6 rounded-[14px] border border-line bg-white p-6 shadow-sm">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink">
                      Execution Checklist
                    </h3>
                    <ul className="space-y-2.5">
                      {section.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#2d2e31]">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-[14px] border border-line bg-white p-7 shadow-sm">
            <h3 className="gradient-heading mb-3 text-xl font-bold">Conclusion &amp; Next Steps</h3>
            <p className="m-0 text-base leading-[1.75] text-muted">
              {post.content.conclusion}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            <span className="text-xs font-semibold text-muted">Topics:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink"
              >
                <Tag size={11} className="text-blue" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Table of contents */}
          <div className="sticky top-28 rounded-[14px] border border-line bg-white p-5 shadow-sm">
            <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-blue">
              In this guide
            </span>
            <nav className="space-y-2 text-xs">
              {post.content.sections.map((sec, i) => (
                <a
                  key={sec.heading}
                  href={`#section-${i + 1}`}
                  className="block rounded-md p-1.5 text-muted transition hover:bg-paper hover:text-blue"
                >
                  {sec.heading}
                </a>
              ))}
            </nav>

            {/* Author Box in sidebar */}
            <div className="mt-6 border-t border-line pt-5">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-muted">
                Written by
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="size-11 rounded-full object-cover ring-2 ring-blue/20"
                />
                <div>
                  <strong className="block text-sm font-bold text-ink">{post.author.name}</strong>
                  <span className="block text-xs text-muted">{post.author.role}</span>
                </div>
              </div>
            </div>

            {/* Contact Studio Box */}
            <div className="mt-6 rounded-[10px] bg-[#f5f5f7] p-4 text-center">
              <strong className="block text-sm font-semibold text-ink">Need expert help?</strong>
              <p className="mb-3 mt-1 text-xs text-muted">
                Our studio builds and optimizes high-performance Squarespace websites.
              </p>
              <Link
                href="/contact"
                className="inline-flex min-h-9 w-full items-center justify-center rounded-full bg-[#0077ED] text-xs font-bold text-white transition hover:bg-[#0062C4]"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Posts Section */}
      <section className="border-t border-line bg-white px-6 py-16 mobile:px-4 mobile:py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue">
                KEEP READING
              </span>
              <h2 className="gradient-heading mt-1 text-2xl font-bold">More Studio Guides</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue hover:text-blue-hover"
            >
              All articles
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
            {relatedPosts.map((related) => (
              <Link
                href={`/blog/${related.slug}`}
                key={related.slug}
                className="group flex flex-col overflow-hidden rounded-[14px] border border-black/[0.08] bg-paper transition-all hover:-translate-y-1 hover:border-blue/30 hover:shadow-card"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#e9e6df]">
                  <img
                    src={
                      related.image.startsWith("/") || related.image.startsWith("http")
                        ? related.image
                        : `https://images.unsplash.com/${related.image}?auto=format&fit=crop&w=700&q=80`
                    }
                    alt={related.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 block text-xs font-semibold text-blue">
                    {related.category}
                  </span>
                  <h3 className="gradient-heading mb-2 line-clamp-2 text-base font-bold leading-tight group-hover:text-blue">
                    {related.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-muted">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </article>
  );
}
