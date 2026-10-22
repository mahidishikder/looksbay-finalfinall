export type Project = {
  name: string;
  kind: string;
  industry: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  hearts: number;
};

export const projects: Project[] = [
  {
    name: "Sunday Supply",
    kind: "Independent Retail",
    industry: "E-Commerce",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
    alt: "Bright independent clothing boutique with considered window displays",
    description:
      "A considered digital storefront for the small things that make an ordinary day feel special. Built on Squarespace 7.1 with seamless inventory management and Stripe checkout.",
    tags: ["Squarespace 7.1", "Custom Shop", "Fluid Engine"],
    hearts: 842,
  },
  {
    name: "Still Life Studio",
    kind: "Creative Practice",
    industry: "Creative",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/928774f4-b66c-4833-9a06-5c2bcc2726a6/vivienne-squarespace-template-cover.jpg?format=1000w",
    alt: "Naturally lit independent creative studio",
    description:
      "A welcoming, picture-led digital home for the people and stories behind the work. Editorial typography paired with interactive project filter galleries.",
    tags: ["Squarespace 7.1", "Brand & Web", "Custom CSS"],
    hearts: 915,
  },
  {
    name: "The Good Practice",
    kind: "Wellness Clinic",
    industry: "Wellness",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/c856ab54-ce43-402d-ba25-383e0d7e685a/good-vibes-squarespace-template.png?format=1000w",
    alt: "Quiet light-filled spa and wellness studio",
    description:
      "A gentle online first impression that feels like walking into the real studio. Pre-integrated with Acuity Scheduling for instant client appointments.",
    tags: ["Squarespace 7.1", "SEO Strategy", "Acuity Booking"],
    hearts: 730,
  },
  {
    name: "Oona Objects",
    kind: "Ceramics & Homewares",
    industry: "E-Commerce",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=1000w",
    alt: "Editorial fashion campaign for an independent considered brand",
    description:
      "An editorial storefront with generous whitespace and artisanal aesthetics. Tailored for small-batch releases with automated sold-out badges.",
    tags: ["Squarespace 7.1", "Editorial Store", "Stripe Checkout"],
    hearts: 688,
  },
  {
    name: "Studio Forma Architects",
    kind: "Architecture Firm",
    industry: "Studio",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/fd0aff35-a3ae-40de-9979-d61848e5b68f/launchday-squarespace-template.png?format=1000w",
    alt: "Contemporary architectural portfolio showcase",
    description:
      "Large-scale horizontal project sliders and blueprint case studies highlighting high-end residential and commercial architectural achievements.",
    tags: ["Squarespace 7.1", "Portfolio Grid", "Micro-Interactions"],
    hearts: 940,
  },
  {
    name: "Evolving Sanctuary",
    kind: "Therapy & Retreats",
    industry: "Wellness",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/20b9bad3-232d-4276-9946-2d208e02c3e0/stories-squarespace-template.png?format=1000w",
    alt: "Sanctuary retreat and mindful wellness portal",
    description:
      "An immersive digital portal for wellness practitioners, retreat bookings, and digital guide downloads with bespoke pastel aesthetic styling.",
    tags: ["Squarespace 7.1", "Booking System", "Custom Layouts"],
    hearts: 812,
  },
  {
    name: "Huneebee Brand Agency",
    kind: "Creative Agency",
    industry: "Creative",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/928774f4-b66c-4833-9a06-5c2bcc2726a6/vivienne-squarespace-template-cover.jpg?format=1000w",
    alt: "Vibrant creative branding agency website",
    description:
      "Dynamic typography, interactive client case study modals, and animated lead capture funnels for an ambitious modern branding team.",
    tags: ["Squarespace 7.1", "Fluid Engine", "Copywriting"],
    hearts: 864,
  },
  {
    name: "Haven Realty Group",
    kind: "Luxury Properties",
    industry: "Real Estate",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/efd626fb-6145-4420-915b-81b7633b5070/perfectionist-squarespace-template.png?format=1000w",
    alt: "Luxury real estate property listings website",
    description:
      "High-definition video backgrounds, interactive floor-plan downloads, and VIP property preview lead capture forms.",
    tags: ["Squarespace 7.1", "MLS Ready", "Lead Funnel"],
    hearts: 795,
  },
  {
    name: "Kabanuk Ceramic Arts",
    kind: "Sculptural Gallery",
    industry: "Creative",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/744cada9-9614-4053-b913-94168433649a/social-motion-squarespace-template-cover.jpg?format=1000w",
    alt: "Fine art ceramic studio and gallery",
    description:
      "Curated ceramic exhibition catalog, integrated workshop calendar, and direct-to-collector art sales with global shipping calculations.",
    tags: ["Squarespace 7.1", "Online Gallery", "Workshops"],
    hearts: 890,
  },
  {
    name: "Engineered Fitness Co.",
    kind: "Performance Studio",
    industry: "Wellness",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e4becf684e6d079db61533d/c856ab54-ce43-402d-ba25-383e0d7e685a/good-vibes-squarespace-template.png?format=1000w",
    alt: "Fitness performance coaching and training studio",
    description:
      "High-energy fitness coaching platform featuring membership tier subscriptions, trainer rosters, and automated onboarding email sequences.",
    tags: ["Squarespace 7.1", "Memberships", "Local SEO"],
    hearts: 928,
  },
];
