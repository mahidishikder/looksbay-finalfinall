export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  title: string;
  category: "Design" | "Development" | "SEO & Speed" | "E-Commerce" | "Domains & Hosting" | "Pricing & Hiring" | "Troubleshooting" | "General";
  answer: string;
  link?: {
    label: string;
    href: string;
  };
}

export const SQUARESPACE_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- 1. SERVICES & WHAT WE DO ---
  {
    id: "services-overview",
    keywords: [
      "service", "services", "offer", "what do you do", "ki service", "ki ki service", "kaj", "kaj koren",
      "squarespace", "looksbay", "web design", "developer", "agency", "studio", "bespoke"
    ],
    title: "Looksbay Squarespace Services",
    category: "Design",
    answer:
      "Looksbay Studio provides end-to-end bespoke Squarespace solutions:\n\n• Bespoke 7.1 Website Design & Development (crafted in Figma & built in Fluid Engine)\n• Technical SEO & Core Web Vitals Optimization (guaranteed 90+ PageSpeed)\n• Custom CSS, JavaScript & Feature Plugins (custom megamenus, animations, calculators)\n• E-Commerce Setup & Checkout Optimization\n• Seamless Site Migrations from WordPress, Wix, or Shopify\n• Rapid 48-Hour Template Customization & Setup\n• Ongoing Maintenance & VIP Tech Support",
    link: { label: "Explore Bespoke Web Design", href: "/services/bespoke-web-design" },
  },

  // --- 2. PRICING & COST ---
  {
    id: "pricing-cost",
    keywords: [
      "price", "pricing", "cost", "how much", "rate", "quote", "budget", "dam", "khoroch", "koto",
      "taka", "dollar", "payment", "fee", "package", "packages", "invest", "investment"
    ],
    title: "Project Pricing & Investment",
    category: "Pricing & Hiring",
    answer:
      "Our project pricing is transparent, fixed, and milestone-based so there are never any hidden costs:\n\n• Bespoke Websites: Custom-scoped based on page count, interactive features, and e-commerce needs. We provide a detailed fixed-price proposal after our discovery call.\n• Squarespace Templates: Flat, one-time investment with an optional 48-hour setup package.\n• SEO & Performance Overhauls: Fixed-scope optimization package.\n• Payment terms: Typically 50% deposit upon project kickoff, and 50% upon final approval and site launch.",
    link: { label: "Request a Custom Proposal", href: "/contact" },
  },

  // --- 3. TIMELINE & TURNAROUND ---
  {
    id: "project-timeline",
    keywords: [
      "time", "timeline", "how long", "duration", "fast", "speed", "delivery", "koto din", "somoy",
      "turnaround", "schedule", "deadline", "hours", "weeks", "days"
    ],
    title: "Project Turnaround & Milestones",
    category: "Pricing & Hiring",
    answer:
      "We take pride in delivering top-tier websites quickly and reliably:\n\n• Bespoke Custom Websites: Typically 2 to 4 weeks from discovery kickoff to official launch.\n• Template Customization & Express Setup: Ready in 48 to 72 hours.\n• Technical SEO & Performance Audits: Completed in 3 to 5 business days.\n\nYou receive structured milestone previews and direct feedback cycles throughout the entire process.",
    link: { label: "Check Timeline & Availability", href: "/contact" },
  },

  // --- 4. FLUID ENGINE & 7.1 CAPABILITIES ---
  {
    id: "fluid-engine",
    keywords: [
      "fluid engine", "grid", "7.1", "version", "drag and drop", "layout", "mobile view",
      "classic editor", "blocks", "section", "sections"
    ],
    title: "Squarespace 7.1 & Fluid Engine",
    category: "Development",
    answer:
      "Squarespace 7.1 features the revolutionary Fluid Engine grid editor:\n\n• Freedom of Layout: Drag and drop blocks anywhere on a flexible 24-column grid.\n• Independent Mobile Editing: You can customize block placement and ordering on mobile devices without altering your desktop design.\n• Z-Index Layering: Overlap images, text boxes, and buttons with full depth control.\n• Looksbay builds exclusively on 7.1 Fluid Engine to give you maximum visual elegance and easy DIY management.",
    link: { label: "See Our Work", href: "/portfolio" },
  },

  // --- 5. CUSTOM CSS, JAVASCRIPT & PLUGINS ---
  {
    id: "custom-code-css",
    keywords: [
      "custom css", "javascript", "code", "coding", "css", "plugins", "plugin", "html",
      "code injection", "script", "developer", "animation", "animations", "hover effect"
    ],
    title: "Custom CSS, JavaScript & Plugins",
    category: "Development",
    answer:
      "Yes! While Squarespace is intuitive for beginners, Looksbay takes it to the next level with bespoke code:\n\n• Custom CSS: Unique typography scales, glassmorphism cards, micro-animations, custom cursors, and responsive adjustments.\n• Code Injection: Header/footer scripts, external widgets, and API integrations.\n• Bespoke Plugins: Mega-menus, accordion FAQ drawers, dynamic filterable portfolio galleries, and interactive calculators.\n• Everything is written cleanly so your site remains fast and update-friendly.",
    link: { label: "Explore Bespoke Services", href: "/services/bespoke-web-design" },
  },

  // --- 6. CUSTOM FONTS & TYPOGRAPHY ---
  {
    id: "custom-fonts",
    keywords: [
      "font", "fonts", "typography", "custom font", "google fonts", "adobe fonts",
      "font-face", "upload font", "otf", "ttf", "woff", "woff2", "text style"
    ],
    title: "Custom Fonts in Squarespace",
    category: "Design",
    answer:
      "Squarespace includes hundreds of Google and Adobe Fonts natively. For custom proprietary brand fonts:\n\n1. Upload your font files (.woff or .woff2 format) via Website > Pages > Custom CSS > Manage Custom Files.\n2. Add custom `@font-face` CSS rules targeting H1, H2, H3, and body text.\n3. Looksbay sets up complete fluid typography hierarchies so your headings scale smoothly across all screen sizes.",
    link: { label: "Contact Us for Styling", href: "/contact" },
  },

  // --- 7. SEO & GOOGLE RANKING ---
  {
    id: "seo-optimization",
    keywords: [
      "seo", "google", "ranking", "search engine", "rank", "traffic", "keywords", "meta",
      "alt tag", "sitemap", "xml", "search console", "indexing", "google search", "seo review"
    ],
    title: "Squarespace SEO & Google Optimization",
    category: "SEO & Speed",
    answer:
      "Squarespace has world-class built-in SEO, and Looksbay supercharges it for competitive niches:\n\n• Semantic HTML5: Proper single H1 tags, H2-H4 hierarchy, and crawlable navigation.\n• Metadata: Custom page titles, meta descriptions, and OpenGraph social share previews.\n• Automatic XML Sitemaps: Automatically generated and submitted to Google Search Console.\n• Structured Data Schemas: Local business schemas, organization schemas, and product rich snippets.\n• 301 Redirects: Safe URL mapping during redesigns or domain switches.",
    link: { label: "Learn About Technical SEO", href: "/services/technical-seo" },
  },

  // --- 8. SPEED & CORE WEB VITALS ---
  {
    id: "speed-optimization",
    keywords: [
      "speed", "fast", "slow", "loading", "performance", "pagespeed", "lighthouse",
      "core web vitals", "lcp", "cls", "fid", "gzip", "webp", "heavy", "boost speed"
    ],
    title: "Lightning Speed & Performance Tuning",
    category: "SEO & Speed",
    answer:
      "To achieve 90+ mobile PageSpeed scores on Squarespace, we implement our proven performance protocol:\n\n• Next-Gen Image Compression: Converting assets to WebP under 250KB without sacrificing retina sharpness.\n• Code Optimization: Removing unused CSS and deferring non-critical third-party scripts.\n• Lazy Loading: Ensuring images load as users scroll, reducing initial payload.\n• Clean Section Architecture: Eliminating excessive DOM elements and redundant blocks.",
    link: { label: "Lightning Speed Service", href: "/services/lightning-speed" },
  },

  // --- 9. E-COMMERCE & SELLING ONLINE ---
  {
    id: "ecommerce-store",
    keywords: [
      "ecommerce", "e-commerce", "store", "shop", "sell", "products", "inventory",
      "cart", "checkout", "digital products", "subscriptions", "members", "courses"
    ],
    title: "Squarespace E-Commerce & Online Stores",
    category: "E-Commerce",
    answer:
      "Squarespace is an all-in-one powerhouse for modern e-commerce:\n\n• Physical & Digital Goods: Sell apparel, merchandise, digital downloads, eBooks, or templates.\n• Subscriptions & Memberships: Recurring billing, paid courses, and private Member Areas.\n• Inventory & Orders: Real-time stock alerts, order fulfillment, and automated customer emails.\n• We design high-converting product pages, quick-view modals, and frictionless checkouts.",
    link: { label: "Discuss Your Shop", href: "/contact" },
  },

  // --- 10. PAYMENT GATEWAYS ---
  {
    id: "payment-gateways",
    keywords: [
      "payment", "gateway", "stripe", "paypal", "apple pay", "afterpay", "clearpay",
      "credit card", "debit card", "transaction fee", "fees", "currency", "taka", "dollar"
    ],
    title: "Supported Payment Gateways",
    category: "E-Commerce",
    answer:
      "Squarespace natively connects with global industry-standard payment processors:\n\n• Stripe: Accepts Visa, Mastercard, American Express, Apple Pay, and Google Pay.\n• PayPal: Connects directly for one-click PayPal checkout.\n• Afterpay / Clearpay: Buy-Now-Pay-Later installment plans for eligible countries.\n• Transaction Fees: 0% Squarespace transaction fee on Commerce Basic and Advanced plans (only standard processor fees apply).",
    link: { label: "Get E-Commerce Advice", href: "/contact" },
  },

  // --- 11. CUSTOM DOMAINS & EMAIL ---
  {
    id: "domain-email",
    keywords: [
      "domain", "domains", "godaddy", "namecheap", "cloudflare", "dns", "custom domain",
      "url", "email", "google workspace", "gmail", "business email", "connect domain", "ssl"
    ],
    title: "Custom Domains & Google Workspace Email",
    category: "Domains & Hosting",
    answer:
      "Setting up your domain and professional email is seamless on Squarespace:\n\n• External Domains: Connect existing domains from GoDaddy, Namecheap, Cloudflare, or Google with 1-click DNS authentication.\n• Free Domain: Annual Squarespace plans include a free custom domain for the first year.\n• Professional Email: Integrated with Google Workspace so you get `hello@yourdomain.com` with full Gmail and Calendar capabilities.\n• Free SSL: Every site includes an automated 2048-bit SSL certificate for HTTPS security.",
    link: { label: "Dedicated Support", href: "/services/dedicated-support" },
  },

  // --- 12. SITE MIGRATION (WORDPRESS / WIX / SHOPIFY) ---
  {
    id: "site-migration",
    keywords: [
      "migration", "migrate", "wordpress", "wix", "shopify", "weebly", "webflow",
      "switch", "transfer", "redesign", "move", "old site"
    ],
    title: "Migrating to Squarespace with Zero SEO Loss",
    category: "Development",
    answer:
      "We handle complete migrations from WordPress, Wix, or Shopify into Squarespace 7.1:\n\n• Full Content Transfer: Pages, blog posts, high-res images, and product catalogs.\n• 301 Redirect Mapping: We map all old URLs to new pages so you never lose Google search rankings or backlinks.\n• Elimination of Maintenance: Say goodbye to broken WordPress plugins, PHP database errors, and hosting vulnerability hacks.\n• Fast, clean, and modern design that you can easily maintain yourself.",
    link: { label: "Plan Your Migration", href: "/contact" },
  },

  // --- 13. SQUAREDSPACE TEMPLATES ---
  {
    id: "templates-info",
    keywords: [
      "template", "templates", "theme", "themes", "setup", "buy template", "fluid templates",
      "template setup", "customize template", "squarespace template"
    ],
    title: "Looksbay Premium Squarespace Templates",
    category: "Design",
    answer:
      "Our templates are custom-engineered for ambitious creative businesses, consultants, and agencies:\n\n• Built on 7.1 Fluid Engine: Fully customizable without writing any code.\n• Mobile-Perfect: Tested on iPhones, Androids, iPads, and large 4K displays.\n• Video Tutorials Included: Step-by-step guidance on updating text, images, and colors.\n• 48-Hour Setup Service: We can personally install the template and style your branding for you in two business days.",
    link: { label: "Browse Premium Templates", href: "/templates" },
  },

  // --- 14. BOOKING CALLS & CONTACTING US ---
  {
    id: "contact-booking",
    keywords: [
      "contact", "call", "book", "meeting", "discovery call", "hire", "phone", "email",
      "inquiry", "how to hire", "shuru", "kivabe", "kotha bolbo", "appointment"
    ],
    title: "How to Book a Call & Start a Project",
    category: "Pricing & Hiring",
    answer:
      "Starting your project is straightforward and friendly:\n\n1. Visit our Contact page and fill in your project details.\n2. Book a complimentary 20-minute video or phone discovery call with our lead designer.\n3. We review your goals and deliver a fixed-price proposal with timeline milestones.\n4. You can also email us directly at hello@looksbay.com.",
    link: { label: "Book a Discovery Call", href: "/contact" },
  },

  // --- 15. MOBILE VIEW & RESPONSIVENESS ---
  {
    id: "mobile-responsiveness",
    keywords: [
      "mobile", "responsive", "phone", "tablet", "ipad", "screen size", "mobile layout",
      "fluid mobile", "mobile broken", "adjust mobile"
    ],
    title: "Mobile Responsiveness in Squarespace",
    category: "Design",
    answer:
      "In Squarespace 7.1 Fluid Engine, mobile view is completely independent:\n\n• You can resize, reorder, or reposition blocks on mobile without affecting desktop.\n• We customize font sizes, padding, and image aspect ratios specifically for smaller screens.\n• Looksbay tests every design across modern iOS and Android devices to guarantee a flawless touch experience.",
    link: { label: "View Portfolio", href: "/portfolio" },
  },

  // --- 16. TROUBLESHOOTING SLOW SITE ---
  {
    id: "troubleshoot-slow",
    keywords: [
      "slow site", "why slow", "site loading slow", "fix slow", "speed issue",
      "image size", "optimize speed", "page speed low"
    ],
    title: "Troubleshooting Slow Squarespace Sites",
    category: "Troubleshooting",
    answer:
      "If your Squarespace site is loading slowly, here are the most common culprits:\n\n1. Uncompressed Images: Compress photos using TinyPNG or WebP before uploading (keep them under 250KB–500KB).\n2. Too Many Custom Code / Third-Party Scripts: Tracking pixels, heatmaps, and chat widgets can block page rendering.\n3. Too Many Videos on One Page: Use YouTube/Vimeo lazy embeds or cover images.\n4. Looksbay offers a dedicated Lightning Speed optimization service to fix slow sites within 3 business days.",
    link: { label: "Speed Optimization Service", href: "/services/lightning-speed" },
  },

  // --- 17. 301 REDIRECTS & URL MAPPINGS ---
  {
    id: "url-redirects",
    keywords: [
      "301 redirect", "url mapping", "redirect", "404", "broken link", "change url",
      "slug", "old url", "new url"
    ],
    title: "Setting Up 301 Redirects in Squarespace",
    category: "SEO & Speed",
    answer:
      "To redirect old URLs to new pages in Squarespace:\n\n1. Go to Settings > Developer Tools > URL Mappings.\n2. Enter the redirect in this exact format:\n`/old-page -> /new-page 301`\n3. Click Save. This preserves your SEO link juice and ensures visitors never see 404 errors.",
    link: { label: "SEO Consultation", href: "/services/technical-seo" },
  },

  // --- 18. MEMBERSHIPS, COURSES & SCHEDULING ---
  {
    id: "memberships-courses",
    keywords: [
      "members", "member area", "course", "courses", "booking", "appointments", "acuity",
      "scheduling", "paywall", "subscriptions"
    ],
    title: "Courses, Memberships & Acuity Scheduling",
    category: "E-Commerce",
    answer:
      "Squarespace provides built-in tools for knowledge businesses and service providers:\n\n• Member Areas: Create gated, paywalled content for premium subscribers.\n• Course Builder: Structure video lessons, chapters, and downloadable resources.\n• Acuity Scheduling: Enable clients to book appointments, pay deposits, and sync with your Google or Outlook calendar seamlessly.",
    link: { label: "Talk to Our Team", href: "/contact" },
  },

  // --- 19. SQUAREDSPACE VS WORDPRESS / WIX ---
  {
    id: "squarespace-vs-others",
    keywords: [
      "vs wordpress", "vs wix", "vs shopify", "why squarespace", "which is better",
      "squarespace better", "wordpress naki squarespace", "bhalo kina", "pros cons"
    ],
    title: "Why Choose Squarespace?",
    category: "General",
    answer:
      "Why ambitious businesses choose Squarespace over other platforms:\n\n• Vs WordPress: Zero plugin updates, zero database hacks, zero maintenance nightmares, and built-in cloud hosting with 99.9% uptime.\n• Vs Wix: Cleaner code structure, superior typography rendering, and professional agency-level aesthetics.\n• Vs Shopify: Far better content marketing, blogging, and brand storytelling, with integrated e-commerce.\n• You can easily edit text and images yourself without needing a developer for everyday changes.",
    link: { label: "Book a Discovery Call", href: "/contact" },
  },

  // --- 20. BANGLADESH & INTERNATIONAL SUPPORT ---
  {
    id: "bangladesh-international",
    keywords: [
      "bangladesh", "bangladeshi", "international", "bd", "dhaka", "remote", "client",
      "clients", "time zone", "payment bd", "dollar payment"
    ],
    title: "Working with Looksbay Worldwide & in Bangladesh",
    category: "General",
    answer:
      "Looksbay Studio operates globally, working with clients across the US, UK, Europe, Australia, and Bangladesh:\n\n• International Payments: We accept secure bank transfers, Wise, Stripe, and global cards.\n• Seamless Remote Collaboration: We use Figma, Loom video updates, and Slack/WhatsApp/Google Meet.\n• Dedicated Support: Flexible scheduling tailored to your local time zone.",
    link: { label: "Start a Conversation", href: "/contact" },
  },
];

// --- SMART SEMANTIC MATCHING ENGINE ---
export function findBestSquarespaceAnswer(query: string): {
  answer: string;
  link?: { label: string; href: string };
  matchedTopic?: string;
} {
  const cleaned = query.toLowerCase().replace(/[^\w\s\u0980-\u09FF]/g, " ").trim();
  const queryTokens = cleaned.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) {
    return {
      answer: "Hello! Welcome to Looksbay Studio. How can I assist you with your Squarespace project today?",
      link: { label: "Book a discovery call", href: "/contact" },
    };
  }

  // Greeting detector
  const greetings = ["hello", "hi", "hey", "salam", "kemon", "assalamu", "good morning", "good evening"];
  if (queryTokens.length <= 2 && queryTokens.some((t) => greetings.includes(t))) {
    return {
      answer:
        "Hello! 👋 Welcome to Looksbay Studio. We are a specialized Squarespace 7.1 design & development studio. You can ask us anything about custom website design, e-commerce, speed & SEO, or booking a project!",
      link: { label: "Book a 20-min free call", href: "/contact" },
      matchedTopic: "Greetings",
    };
  }

  // Score each knowledge entry
  let bestEntry: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of SQUARESPACE_KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      // Exact substring match in query
      if (cleaned.includes(kwLower)) {
        score += kwLower.split(" ").length * 5; // multi-word keyword bonus
      }

      // Token-level match
      const kwTokens = kwLower.split(" ");
      for (const qToken of queryTokens) {
        if (kwTokens.includes(qToken)) {
          score += 3;
        } else if (qToken.length > 3 && kwTokens.some((kt) => kt.startsWith(qToken) || qToken.startsWith(kt))) {
          score += 1.5;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // If match score is strong enough, return verified expert knowledge
  if (bestEntry && highestScore >= 3) {
    return {
      answer: bestEntry.answer,
      link: bestEntry.link,
      matchedTopic: bestEntry.title,
    };
  }

  // Smart fallback for any complex or custom inquiry
  return {
    answer:
      "Great question! Looksbay Studio specializes in bespoke Squarespace 7.1 design, custom CSS/JavaScript features, Core Web Vitals speed optimization, and seamless site migrations.\n\nWhether you need a custom build, template customization, or technical troubleshooting, our lead designer can provide exact guidance tailored to your specific project.",
    link: { label: "Book a 20-min Free Call with Lead Designer", href: "/contact" },
    matchedTopic: "General Squarespace Support",
  };
}
