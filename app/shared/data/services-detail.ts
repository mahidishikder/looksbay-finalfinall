export interface ServiceDetail {
  slug: string;
  aliases?: string[];
  name: string;
  tagline: string;
  description: string;
  price: string;
  timeline: string;
  category: string;
  heroMockup: string;
  heroEyebrow?: string;
  heroTitleLine1?: string;
  heroTitleGradient?: string;
  heroTitleLine3?: string;
  heroBullets?: string[];
  heroButtonText?: string;
  heroImage?: string;
  deliverables: {
    title: string;
    description: string;
    icon?: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  featuresIncluded: string[];
  caseStudies: {
    title: string;
    category: string;
    image: string;
    link: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesDetailData: ServiceDetail[] = [
  {
    slug: "bespoke-web-design",
    aliases: ["custom-design", "custom-website", "web-design"],
    name: "Bespoke Web Design",
    tagline: "Custom Squarespace 7.1 websites crafted from the ground up to reflect your brand identity, captivate clients, and drive sustainable growth.",
    description:
      "We design custom digital homes for modern entrepreneurs, visual artists, and boutique agencies. Built with custom CSS architecture, Fluid Engine precision, and seamless mobile responsiveness.",
    price: "From $3,500",
    timeline: "2–3 Weeks",
    category: "Full-Service Web Design",
    heroEyebrow: "SQUARESPACE CIRCLE PLATINUM · BESPOKE WEB DESIGN",
    heroTitleLine1: "Your Brand's",
    heroTitleGradient: "Digital Flagship.",
    heroTitleLine3: "Built To Convert.",
    heroBullets: [
      "Fluid Engine 7.1 with custom CSS & zero code bloat",
      "Mobile-first responsive layouts across all screen sizes",
      "Extended 6-month free trial + 20% off Squarespace",
    ],
    heroButtonText: "BOOK A CONSULTATION",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w",
    heroMockup: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Bespoke Art Direction",
        description: "Tailored color palettes, custom typography pairings, and layout grids aligned to your brand positioning.",
      },
      {
        title: "Squarespace 7.1 Fluid Engine Build",
        description: "Flexible, drag-and-drop page architecture allowing you to edit text and images effortlessly without code.",
      },
      {
        title: "Custom CSS & Micro-Animations",
        description: "Bespoke hover transitions, frosted-glass accents, and refined styling beyond default template limits.",
      },
      {
        title: "Mobile & Tablet Responsiveness",
        description: "Every page is hand-tuned for iPhone, iPad, and Android viewports for flawless cross-device performance.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Strategy",
        description: "We dive into your brand story, target audience, and business goals to map out a strategic wireframe and page flow.",
      },
      {
        step: "02",
        title: "Bespoke Design & Build",
        description: "We craft your complete Squarespace site with custom CSS, interactive blocks, and conversion-optimized sections.",
      },
      {
        step: "03",
        title: "Technical SEO & Mobile Polish",
        description: "Complete metadata setup, image compression, form testing, and responsiveness calibration across all devices.",
      },
      {
        step: "04",
        title: "Walkthrough & Launch",
        description: "Personalized video training walking you through every click, domain connection, and launch day celebration.",
      },
    ],
    featuresIncluded: [
      "Up to 8 custom page layouts (Home, About, Services, Portfolio, Contact, etc.)",
      "Full custom CSS styling & micro-animations",
      "Interactive inquiry forms & scheduling integration",
      "Technical on-page SEO & XML sitemap generation",
      "Extended 6-month free Squarespace trial timeline",
      "Exclusive 20% discount on your first year annual plan",
      "Personalized recorded video training academy",
      "30 days of direct post-launch email support",
    ],
    caseStudies: [
      {
        title: "Evolving Sanctuary — Architecture & Interior",
        category: "Interior Architecture",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Studio Forma — High-End Design Firm",
        category: "Creative Agency",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Huneebee Project — Organic Goods & Studio",
        category: "Brand & E-commerce",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
    ],
    faqs: [
      {
        question: "How long does a bespoke web design project take?",
        answer: "Most bespoke web design projects take between 2 to 3 weeks from kickoff to launch day, depending on content readiness and feedback speed.",
      },
      {
        question: "Do I need to buy Squarespace before we start?",
        answer: "No! As official Squarespace Circle Platinum Partners, we start your website under an extended 6-month free trial. You only pay for a Squarespace hosting plan when we launch, and you’ll get 20% off your first year.",
      },
      {
        question: "Will I be able to edit my own website after launch?",
        answer: "100% yes. We build strictly on Squarespace 7.1 Fluid Engine with intuitive drag-and-drop ease, and provide custom recorded video tutorials so you can update text, images, and blog posts in minutes.",
      },
      {
        question: "What if I need help after launch?",
        answer: "Every bespoke project includes 30 days of complimentary post-launch support directly from our senior design team via email and Loom.",
      },
    ],
  },
  {
    slug: "technical-seo",
    aliases: ["seo", "squarespace-seo", "seo-performance"],
    name: "Technical SEO Built-In",
    tagline: "Comprehensive on-page and technical search engine optimization engineered to rank your Squarespace site on Google and modern AI search engines.",
    description:
      "We turn Squarespace websites into organic search engines. From schema markup and URL structuring to search console indexing and keyword targeting, we make sure high-intent clients find your business.",
    price: "From $800",
    timeline: "1–2 Weeks",
    category: "Search Engine Optimization",
    heroEyebrow: "SQUARESPACE SEO EXPERT · ORGANIC VISIBILITY",
    heroTitleLine1: "Rank Higher.",
    heroTitleGradient: "Google & AI Search.",
    heroTitleLine3: "Built From Day One.",
    heroBullets: [
      "Structured JSON-LD schema & Rich Snippets integration",
      "Targeted keyword mapping & semantic heading hierarchy",
      "Google Search Console & Bing Webmaster instant verification",
    ],
    heroButtonText: "START YOUR SEO AUDIT",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/f881d89f-f1ab-4cd7-b89d-bc0cc49a9f21/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website?format=750w",
    heroMockup: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Full Technical SEO Audit",
        description: "Exhaustive crawl identifying 404 broken links, duplicate tags, missing alt attributes, and indexation blockers.",
      },
      {
        title: "Keyword Research & Strategy",
        description: "Mapping high-intent keywords with healthy search volume to your primary landing pages and service offerings.",
      },
      {
        title: "Structured Schema Markup",
        description: "Local business, professional service, and FAQ rich snippet JSON-LD code injection for Google search visibility.",
      },
      {
        title: "Google Search Console & Bing Setup",
        description: "Verification, XML sitemap submission, canonical URL cleanup, and organic traffic reporting dashboard.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Technical Site Audit",
        description: "We run deep crawls to identify all indexation barriers, missing meta descriptions, and keyword ranking opportunities.",
      },
      {
        step: "02",
        title: "On-Page Optimization",
        description: "We optimize all H1/H2 header hierarchies, title tags, meta descriptions, image file names, and URL slugs.",
      },
      {
        step: "03",
        title: "Schema & Search Engine Hookup",
        description: "We inject clean JSON-LD structured schema code and submit updated XML sitemaps to Google Search Console.",
      },
      {
        step: "04",
        title: "Reporting & Strategy Handover",
        description: "We deliver an actionable video report explaining your baseline metrics and content recommendations to keep ranking higher.",
      },
    ],
    featuresIncluded: [
      "Full technical crawl of all public website pages",
      "Targeted keyword mapping for high-value services",
      "Handcrafted title tags and meta descriptions",
      "Image compression & ALT text optimization",
      "Google Search Console & Bing Webmaster verification",
      "XML sitemap generation & instant index submission",
      "JSON-LD structured data schema markup injection",
      "30-day post-optimization ranking progress check",
    ],
    caseStudies: [
      {
        title: "Aura Wellness Co. — 240% Organic Traffic Growth",
        category: "Health & Lifestyle",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Lumina Studio — #1 Google Rank for Architectural Photography",
        category: "Commercial Photography",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Engineered Fitness — Local Search & Map Pack Dominance",
        category: "Fitness & Training",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
    ],
    faqs: [
      {
        question: "Can a Squarespace website actually rank on the first page of Google?",
        answer: "Absolutely yes! Squarespace has clean SSL, responsive mobile frameworks, and automatic XML sitemaps. When paired with proper on-page keyword targeting, schema markup, and technical SEO hygiene, our client sites routinely rank #1 for their target queries.",
      },
      {
        question: "How long does it take to see SEO results?",
        answer: "Google typically crawls and re-indexes updated pages within 1 to 3 weeks. Meaningful rank improvements and organic traffic gains usually begin showing between 4 to 12 weeks.",
      },
      {
        question: "Do you touch my live website during the audit?",
        answer: "We perform all initial auditing non-invasively, and implement title tags, schema, and meta updates without causing any downtime or disruption to your current visitors.",
      },
      {
        question: "Does this include AI search engine optimization (ChatGPT & Perplexity)?",
        answer: "Yes! Modern AI search engines rely on structured data, clear semantic heading hierarchies, and authoritative schema—all of which are baked into our technical SEO service.",
      },
    ],
  },
  {
    slug: "lightning-speed",
    aliases: ["speed-optimization", "performance", "speed"],
    name: "Lightning Speed Optimization",
    tagline: "Asset loading optimization, zero layout shift, and performance engineering for an ultra-fast, smooth, Apple-grade browsing experience.",
    description:
      "A slow website bleeds conversions. We audit and optimize code, minify scripts, lazy-load heavy assets, and tune Core Web Vitals to deliver a blazing-fast user experience that ranks higher and converts faster.",
    price: "From $650",
    timeline: "3–5 Business Days",
    category: "Performance Engineering",
    heroEyebrow: "PERFORMANCE ENGINEERING · CORE WEB VITALS",
    heroTitleLine1: "Blazing Fast.",
    heroTitleGradient: "Apple-Grade Speed.",
    heroTitleLine3: "Zero Layout Shift.",
    heroBullets: [
      "Google PageSpeed 90+ mobile & desktop score calibration",
      "Next-gen WebP image compression & smart lazy loading",
      "Elimination of render-blocking code & third-party script lag",
    ],
    heroButtonText: "SPEED UP MY SITE",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w",
    heroMockup: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Core Web Vitals Calibration",
        description: "Optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
      },
      {
        title: "Next-Gen Image Compression",
        description: "Converting heavy uncompressed photography into modern WebP formats with responsive resolution breakpoints.",
      },
      {
        title: "Custom Code & Script Audit",
        description: "Deferring third-party scripts, eliminating render-blocking CSS, and removing dead code clutter.",
      },
      {
        title: "Mobile Loading Acceleration",
        description: "Fine-tuning asset delivery across 4G/5G mobile connections for instant page transitions.",
      },
    ],
    process: [
      {
        step: "01",
        title: "PageSpeed & Network Benchmark",
        description: "We record baseline mobile and desktop speed scores using Google PageSpeed Insights and WebPageTest.",
      },
      {
        step: "02",
        title: "Asset & Script Cleansing",
        description: "We compress all site imagery, purge redundant custom code, and configure asynchronous script loading.",
      },
      {
        step: "03",
        title: "Layout Shift Stabilization",
        description: "We define precise aspect ratio containers for media to prevent jarring visual jumps during page load.",
      },
      {
        step: "04",
        title: "Post-Optimization Verification",
        description: "We re-test across all major browsers and hand over a verified before-and-after speed performance report.",
      },
    ],
    featuresIncluded: [
      "Complete Google Core Web Vitals diagnostic",
      "Full site image re-compression & WebP optimization",
      "Removal of render-blocking custom code",
      "Asynchronous script loading configuration",
      "Font display swapping to eliminate layout jump",
      "Mobile Safari and Chrome loading acceleration",
      "Before & after speed score comparison documentation",
      "30-day performance monitoring guarantee",
    ],
    caseStudies: [
      {
        title: "Verve Editorial — 94 Mobile PageSpeed Score",
        category: "Digital Publishing",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Mode Studio — Under 1.2s Full Page Load Time",
        category: "Creative Agency",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Kinfolk Artisan — 35% Conversion Rate Increase",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
    ],
    faqs: [
      {
        question: "Why does site speed matter for my business?",
        answer: "Google explicitly uses page speed and Core Web Vitals as a search ranking factor. Furthermore, studies show a 1-second delay in page load time reduces conversions by over 20%. Speed directly drives revenue.",
      },
      {
        question: "Will compressing images ruin the visual quality?",
        answer: "Not at all. We utilize lossless next-generation compression that strips hidden metadata and redundant color profiles while retaining pixel-perfect crispness for retina screens.",
      },
      {
        question: "Can custom CSS slow down Squarespace?",
        answer: "Poorly written CSS with excessive !important flags or unoptimized custom webfonts will noticeably slow down load times. We refactor your CSS into lean, clean, hardware-accelerated code.",
      },
      {
        question: "How long does speed optimization take?",
        answer: "Most speed optimization projects are completed and fully tested within 3 to 5 business days without any website downtime.",
      },
    ],
  },
  {
    slug: "dedicated-support",
    aliases: ["support", "maintenance", "dedicated-support-maintenance"],
    name: "Dedicated Support & Maintenance",
    tagline: "Ongoing technical management, routine section updates, custom code adjustments, and priority assistance from certified Squarespace experts.",
    description:
      "Never worry about your website breaking, losing rankings, or falling behind. With Looksbay dedicated studio support, you have an expert Squarespace Circle Platinum designer on speed-dial.",
    price: "From $450/mo",
    timeline: "Ongoing Retainer / 24hr Turnaround",
    category: "Studio Management & Support",
    heroEyebrow: "SQUARESPACE PLATINUM PARTNER · ON-DEMAND CARE",
    heroTitleLine1: "Continuous Care.",
    heroTitleGradient: "Dedicated Support.",
    heroTitleLine3: "Peace Of Mind Always.",
    heroBullets: [
      "Guaranteed 24-business-hour turnaround on requests",
      "Direct Slack & email access to certified senior designers",
      "Monthly layout refreshes, domain health & security checks",
    ],
    heroButtonText: "GET DEDICATED SUPPORT",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/f881d89f-f1ab-4cd7-b89d-bc0cc49a9f21/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website?format=750w",
    heroMockup: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Dedicated Designer On-Call",
        description: "Direct email and Slack access to certified Squarespace specialists with 24-hour turnaround on requests.",
      },
      {
        title: "Monthly Content & Layout Updates",
        description: "Adding new portfolio case studies, publishing blog posts, updating pricing tables, and banners.",
      },
      {
        title: "Custom Code & Plugin Audits",
        description: "Keeping all third-party integrations, booking widgets, and custom CSS running smoothly without glitches.",
      },
      {
        title: "Domain, DNS & Security Monitoring",
        description: "Continuous SSL certificate management, DNS record health, and spam-form protection.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Seamless Onboarding",
        description: "We connect to your Squarespace account via contributor permissions and run an initial health diagnostic.",
      },
      {
        step: "02",
        title: "Dedicated Request Queue",
        description: "Submit any design edit, bug fix, or new layout request directly to your private studio dashboard.",
      },
      {
        step: "03",
        title: "Swift 24-Hour Turnaround",
        description: "Our team implements, tests, and publishes your updates with zero hassle and notifies you upon completion.",
      },
      {
        step: "04",
        title: "Monthly Health & SEO Report",
        description: "Receive a monthly summary of completed tasks, site uptime, and search ranking health.",
      },
    ],
    featuresIncluded: [
      "Direct priority Slack & email access to senior team",
      "Guaranteed 24-business-hour task turnaround",
      "Monthly layout additions and content refreshes",
      "Third-party tool, booking & form integrations",
      "Continuous DNS, domain & SSL certificate monitoring",
      "Quarterly speed & mobile performance re-audits",
      "No long-term contracts — cancel or pause anytime",
      "Emergency rollback & backup assistance",
    ],
    caseStudies: [
      {
        title: "Sol Collective — 18 Months of Continuous Studio Growth",
        category: "Boutique Agency",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Haven Architecture — Monthly Project Portfolio Publishing",
        category: "Architecture Firm",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Nordic Goods — Ongoing E-Commerce Inventory & Banner Setup",
        category: "Luxury E-Commerce",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
    ],
    faqs: [
      {
        question: "How do I submit tasks to your team?",
        answer: "You simply send an email or submit through your private client portal. You can share Loom videos, Figma files, or text copy, and we begin immediately.",
      },
      {
        question: "How fast do you turn around requests?",
        answer: "Standard updates (copy changes, image swaps, new project pages, CSS tweaks) are completed within 24 business hours.",
      },
      {
        question: "Am I locked into a contract?",
        answer: "No. Our support plans are month-to-month. You can upgrade, downgrade, or cancel anytime with zero cancellation fees.",
      },
      {
        question: "Can I use support hours for building a brand new website?",
        answer: "Support plans are designed for maintaining and evolving existing websites. For building a brand new website from scratch, our Bespoke Web Design package is the best fit.",
      },
    ],
  },
  {
    slug: "template-setup",
    aliases: ["template-installation", "custom-installation"],
    name: "Template Setup & Customization",
    tagline: "White-glove Squarespace template customization. Send us your photos, copy, and brand colors—we build and launch your site in 5 business days.",
    description:
      "Skip the learning curve. Our Squarespace Circle Platinum team will take any template and completely customize it with your branding, custom fonts, content, and form connections ready for launch.",
    price: "From $580",
    timeline: "5 Business Days",
    category: "Template Customization",
    heroEyebrow: "TURNKEY LAUNCH · PREMIUM TEMPLATES",
    heroTitleLine1: "Ready To Launch.",
    heroTitleGradient: "Installed In 5 Days.",
    heroTitleLine3: "Tailored To You.",
    heroBullets: [
      "White-glove styling with your brand colors, fonts & photos",
      "Contact form, booking calendar & newsletter hookup",
      "Extended 6-month free trial + 20% off Squarespace",
    ],
    heroButtonText: "START TEMPLATE SETUP",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
    heroMockup: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Full Brand Typography & Color Setup",
        description: "Installing your custom webfonts, color palettes, and logo marks globally across the template.",
      },
      {
        title: "All Content & Photos Populated",
        description: "Inserting your photos, bio copy, service offerings, and pricing into every pre-built page layout.",
      },
      {
        title: "Form, Booking & Newsletter Hookup",
        description: "Connecting your contact forms to your business email, Calendly/Acuity, and mailing list.",
      },
      {
        title: "Domain Connection & Launch",
        description: "Hooking up your custom domain, setting up 301 redirects, and launching live.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Send Your Content",
        description: "Fill out our quick onboarding guide with your brand photos, copy, logos, and color codes.",
      },
      {
        step: "02",
        title: "5-Day White-Glove Build",
        description: "Our senior design team customizes all pages, mobile layouts, and form connections.",
      },
      {
        step: "03",
        title: "Review & Revisions",
        description: "Walk through your completed site, test everything, and request any styling adjustments.",
      },
      {
        step: "04",
        title: "1-Click Launch",
        description: "We connect your custom domain and celebrate your official website launch!",
      },
    ],
    featuresIncluded: [
      "Full template customization across all 8+ pages",
      "Brand color palette & custom font configuration",
      "High-res photo upload & formatting",
      "Inquiry form & newsletter integration",
      "Extended 6-month free Squarespace trial",
      "20% discount on Squarespace annual plan",
      "Domain connection & basic SEO meta setup",
      "30 days post-launch support",
    ],
    caseStudies: [
      {
        title: "Robins Studio — 5-Day Launch for High-Ticket Stylist",
        category: "Fashion & Styling",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        link: "/templates/robins",
      },
      {
        title: "Perfectionist — Minimalist Coaching Platform",
        category: "Executive Coaching",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        link: "/templates/perfectionist",
      },
      {
        title: "Social Motion — Content Creator Studio",
        category: "Content & Media",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        link: "/templates",
      },
    ],
    faqs: [
      {
        question: "What do I need to prepare before starting?",
        answer: "All you need is your text copy, photography/images, logo files, and brand color palette. We guide you through everything with our clean onboarding questionnaire.",
      },
      {
        question: "Can you change the fonts and colors to match my branding?",
        answer: "Yes, 100%! We customize every single color, font, button style, and section layout to match your brand identity perfectly.",
      },
      {
        question: "How long does template setup take?",
        answer: "Our turnaround is strictly 5 business days from the moment we receive your content.",
      },
    ],
  },
  {
    slug: "website-redesign",
    aliases: ["redesign", "squarespace-redesign"],
    name: "Website Redesign & Migration",
    tagline: "Transform your outdated website into a modern, high-converting digital experience with cleaner layouts, elevated typography, and seamless Fluid Engine architecture.",
    description:
      "Is your current site clunky, outdated, or difficult to edit? We migrate and redesign existing Squarespace 7.0, WordPress, or Wix websites into modern Squarespace 7.1 with zero loss of SEO rankings.",
    price: "From $2,800",
    timeline: "2 Weeks",
    category: "Full Redesign & Migration",
    heroEyebrow: "MODERNIZE & GROW · 7.0 TO 7.1 UPGRADE",
    heroTitleLine1: "Elevate Your Site.",
    heroTitleGradient: "Squarespace Redesign.",
    heroTitleLine3: "Fresh, Fast & Modern.",
    heroBullets: [
      "Seamless upgrade to Squarespace 7.1 Fluid Engine",
      "Complete 301 redirect mapping to protect Google SEO",
      "Zero downtime development on private staging site",
    ],
    heroButtonText: "PLAN YOUR REDESIGN",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5fac4b921ca05f08cb315e40/55ed030e-4255-4db5-9297-312d094c6da4/Squarespace+Web+Designer+%2B+Freelance+Squarespace+Web+Designer+%2B+Squarespace+Web+Design+Packages+%2B+Squarespace+Designer+%2B+Best+Squarespace+Designers+%2B+Squarespace+Website+Designer+%2B+Hire+Squarespace+Designer+%2B+Best+Squarespace+Web+Designers+%2B+Custom+Squarespace+Website+%2B+Squarespace+for+Designers+%2B+Website+Designer+Squarespace%2C+Web+Designer+Squarespace%2C+Squarespace+Web+Developer%2C+squarespace+site+designer?format=750w",
    heroMockup: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      {
        title: "Squarespace 7.0 to 7.1 Migration",
        description: "Seamlessly transitioning legacy 7.0 sites to modern Fluid Engine without losing content or domain authority.",
      },
      {
        title: "Elevated Visual Design",
        description: "Fresh typography, generous white space, bespoke CSS accents, and modern conversion sections.",
      },
      {
        title: "SEO Protection & 301 Redirects",
        description: "Ensuring all existing Google search ranking URLs are preserved with proper 301 redirect mapping.",
      },
      {
        title: "Simplified Backend Management",
        description: "Re-organizing your pages and blog architecture so your team can make updates in seconds.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Current Site Audit",
        description: "We review what's working on your current site, what needs improvement, and map all active SEO URLs.",
      },
      {
        step: "02",
        title: "Modern Redesign Build",
        description: "We rebuild your website on a private Squarespace 7.1 development site with zero downtime to your live visitors.",
      },
      {
        step: "03",
        title: "301 Redirects & Quality Check",
        description: "We test all forms, verify mobile views, and map 301 redirects to protect all your Google rankings.",
      },
      {
        step: "04",
        title: "Seamless Switchover",
        description: "We switch your domain seamlessly to the new site, ensuring an instantaneous, zero-downtime launch.",
      },
    ],
    featuresIncluded: [
      "Complete visual & UX design overhaul",
      "Squarespace 7.1 Fluid Engine upgrade",
      "Zero-downtime development staging process",
      "Full 301 redirect map for Google ranking protection",
      "Content migration for all existing pages & blog posts",
      "Mobile & tablet precision responsiveness",
      "Recorded video walkthrough academy",
      "30 days post-redesign support",
    ],
    caseStudies: [
      {
        title: "Studio Forma — 7.0 to 7.1 Architecture Redesign",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Huneebee Project — WordPress to Squarespace 7.1",
        category: "Brand & E-Commerce",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
      {
        title: "Evolving Sanctuary — Mobile Redesign & Conversion",
        category: "Interior Design",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
        link: "/portfolio",
      },
    ],
    faqs: [
      {
        question: "Will my website go down while you redesign it?",
        answer: "Never! We build the entire redesign on a private staging site under our Circle Platinum extended trial. Your live site remains 100% operational until launch day, when we switch the domain in minutes.",
      },
      {
        question: "Will I lose my existing Google search rankings?",
        answer: "No. We map all your existing URLs and create comprehensive 301 redirects so Google and your visitors are seamlessly routed without any 404 errors or ranking drops.",
      },
      {
        question: "Can you migrate my existing blog posts?",
        answer: "Yes, we migrate your blog posts, images, and formatting into the new 7.1 blogging system cleanly.",
      },
    ],
  },
];
