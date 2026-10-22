"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

export type TemplateItem = {
  id: string;
  name: string;
  categories: string[];
  price: string;
  originalPrice: string;
  image: string;
  alt: string;
  demoUrl: string;
};

export const templateList: TemplateItem[] = [
  {
    id: "robins",
    name: "Robins",
    categories: ["Designer", "Creative", "Photography", "Social Media"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Robins Squarespace website template demo",
    demoUrl: "https://robins-template.squarespace.com",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    categories: ["Designer", "Photography", "Startup", "Coaching"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Perfectionist Squarespace website template demo",
    demoUrl: "https://perfectionist-template.squarespace.com",
  },
  {
    id: "launchday",
    name: "Launchday",
    categories: ["Sales Pages", "Startup", "Finance", "Course Creator"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Launchday Squarespace website template demo",
    demoUrl: "https://launchday-template.squarespace.com",
  },
  {
    id: "stories",
    name: "Stories",
    categories: ["Blogging", "Interior Design", "Wedding", "Course Creator"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Stories Squarespace website template demo",
    demoUrl: "https://stories-template.squarespace.com",
  },
  {
    id: "good-vibes",
    name: "Good Vibes",
    categories: ["Wellness", "Therapist", "Coaching", "Non-profit"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Good Vibes Squarespace website template demo",
    demoUrl: "https://goodvibes-template.squarespace.com",
  },
  {
    id: "social-motion",
    name: "Social Motion",
    categories: ["Social Media", "E-Commerce", "Photography", "Designer"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Social Motion Squarespace website template demo",
    demoUrl: "https://socialmotion-template.squarespace.com",
  },
  {
    id: "vanguard",
    name: "Vanguard",
    categories: ["Lawyer", "Finance", "Consultancy", "Real Estate"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Vanguard Squarespace website template demo",
    demoUrl: "https://vanguard-template.squarespace.com",
  },
  {
    id: "haven",
    name: "Haven",
    categories: ["Real Estate", "Interior Design", "Lawyer", "Consultancy"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Haven Squarespace website template demo",
    demoUrl: "https://haven-template.squarespace.com",
  },
  {
    id: "common-ground",
    name: "Common Ground",
    categories: ["Non-profit", "Consultancy", "Wellness", "Therapist"],
    price: "180.00",
    originalPrice: "225.00",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=750w",
    alt: "Common Ground Squarespace website template demo",
    demoUrl: "https://commonground-template.squarespace.com",
  },
];

const userCategories = [
  "All Templates",
  "Lawyer",
  "Real Estate",
  "Non-profit",
  "Therapist",
  "Consultancy",
  "Wellness",
  "Finance",
  "Startup",
  "Interior Design",
  "Sales Pages",
  "Course Creator",
  "Coaching",
  "Blogging",
  "E-Commerce",
  "Photography",
  "Wedding",
  "Designer",
  "Social Media",
];

export default function TemplateMarketplace() {
  const [items, setItems] = useState<TemplateItem[]>(templateList);
  const [activeCategory, setActiveCategory] = useState("All Templates");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        if (data?.templates && Array.isArray(data.templates)) {
          setItems(data.templates);
        }
      })
      .catch((err) => console.error("Error loading templates:", err));
  }, []);

  const filteredTemplates = items.filter((item) => {
    if (activeCategory === "All Templates") return true;
    return item.categories.includes(activeCategory);
  });

  function openPreview(template: TemplateItem) {
    setPreviewTemplate(template);
    previewDialog.current?.showModal();
  }

  return (
    <div className="w-full">
      {/* Light Hero Section — Apple-style soft neutral background */}
      <section className="w-full border-b border-black/[0.06] bg-[#F5F5F7] pt-14 tablet:pt-18 desktop:pt-20 pb-12 desktop:pb-14 text-center">
        <div className="mx-auto max-w-[1480px] px-6">
          <h1 className="mb-4 text-[clamp(26px,3.6vw,44px)] font-extrabold tracking-[-0.025em] leading-[1.12] uppercase">
            <span className="apple-gradient-heading inline-block">
              Custom Squarespace Templates.
            </span>
            <span className="block text-[#1D1D1F] mt-1.5 tracking-[-0.025em]">
              Do more. Effort less.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-base desktop:text-[17px] leading-[1.65] text-[#6E6E73] font-normal">
            Thoughtfully designed Squarespace 7.1 templates. Pick your starting point, then make it yours.
          </p>

          {/* User-Defined Category Pills Bar — Inside light hero with crisp white pills */}
          <div className="mx-auto mt-10 desktop:mt-12 max-w-[1140px] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {userCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-[13px] sm:text-[14px] font-semibold tracking-normal border transition-colors duration-150 ${
                    isActive
                      ? "border-[#0077ED] bg-[#0077ED] text-white shadow-sm"
                      : "border-black/[0.08] bg-white text-[#333336] hover:bg-neutral-50 hover:text-[#000]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Template Cards Grid on Clean White Page */}
      <div className="mx-auto w-[min(1480px,calc(100%_-_48px))] py-14 desktop:py-16 mobile:w-[calc(100%_-_32px)]">
        <div className="grid w-full grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((demo) => (
            <article
              key={demo.id}
              className="group relative flex flex-col items-center justify-between overflow-hidden rounded-[16px] bg-[#F5F5F7] pb-8 text-center transition-all duration-300 hover:bg-[#F0F0F2]"
            >
              {/* 1. TOP: Equal Padding Image Showcase (Top, Left, Right all equal p-6) */}
              <div className="w-full p-6 pb-4 mobile:p-4">
                <div className="overflow-hidden rounded-[10px]">
                  <img
                    className="h-full w-full object-cover object-top rounded-[10px]"
                    src={demo.image}
                    alt={demo.alt}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 2. BOTTOM: Only Name – Squarespace 7.1 Fluid Engine, Price Strikethrough, and Action Buttons */}
              <div className="z-10 flex flex-col items-center px-4">
                <span className="text-[15px] sm:text-[16px] text-[#1D1D1F] font-normal leading-normal">
                  {demo.name} – Squarespace 7.1 Fluid Engine
                </span>
                <div className="mt-1 mb-4 flex items-center justify-center gap-2">
                  <span className="text-base font-bold text-[#1D1D1F]">${demo.price}</span>
                  <span className="text-sm text-[#8E8E93] line-through">${demo.originalPrice}</span>
                </div>

                {/* Apple Pill Style Buttons */}
                <div className="flex items-center justify-center gap-2.5">
                  <a
                    href={demo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#0062C4]"
                  >
                    View Demo
                  </a>
                  <Link
                    href={`/templates/${demo.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#0077ED] px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#0062C4]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-muted">
            <p className="text-base">No templates found in &quot;{activeCategory}&quot; category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory("All Templates")}
              className="mt-3 inline-flex rounded-full bg-[#0077ED] px-5 py-2 text-xs font-bold text-white hover:bg-[#0062C4]"
            >
              Show all templates
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Interactive Template Preview Modal */}
      <dialog
        className="fixed inset-0 m-auto max-h-[min(820px,calc(100dvh_-_40px))] w-[min(880px,calc(100vw_-_36px))] overflow-hidden rounded-[20px] border border-black/10 bg-white p-0 shadow-[0_25px_80px_rgba(0,0,0,.25)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        ref={previewDialog}
        onClose={() => setPreviewTemplate(null)}
        aria-labelledby="preview-title"
      >
        <button
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-black/10 bg-white/95 text-ink shadow-sm transition hover:bg-black/5"
          type="button"
          aria-label="Close template preview"
          onClick={() => previewDialog.current?.close()}
        >
          <X size={18} />
        </button>

        {previewTemplate && (
          <div className="flex flex-col">
            <div className="w-full bg-[#F5F5F7] p-8 pb-4 mobile:p-4">
              <img
                src={previewTemplate.image}
                alt={previewTemplate.alt}
                className="max-h-[460px] w-full rounded-[12px] object-cover object-top shadow-md mobile:max-h-[260px]"
              />
            </div>
            <div className="p-8 mobile:p-5 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0077ED] mb-2">
                <Sparkles size={13} />
                SQUARESPACE 7.1 FLUID ENGINE
              </span>
              <h2 className="gradient-heading mb-1 text-[26px] font-bold" id="preview-title">
                {previewTemplate.name} – Squarespace 7.1 Fluid Engine
              </h2>
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-ink">${previewTemplate.price}</span>
                <span className="text-sm text-muted line-through">${previewTemplate.originalPrice}</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={previewTemplate.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 bg-white px-7 text-sm font-semibold text-[#1D1D1F] transition hover:bg-black/5"
                >
                  Live Demo
                </a>
                <Link
                  href={`/contact?template=${encodeURIComponent(previewTemplate.name)}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0077ED] px-8 text-sm font-bold text-white transition hover:bg-[#0062C4]"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}