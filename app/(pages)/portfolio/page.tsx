import type { Metadata } from "next";
import { NewsletterCTA, PageIntro } from "@/app/shared/components/site-components";
import PortfolioShowcase from "./components/portfolio-showcase";

const description =
  "Explore the creative directions, thoughtful details, and Squarespace websites our small specialist studio loves to make.";

export const metadata: Metadata = {
  title: "Portfolio — Squarespace studio",
  description,
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        eyebrow="A FEW THINGS WE LOVE"
        title={<>Work made with<br /><span className="bg-gradient-to-r from-blue via-[#7257ff] to-[#d94d9a] bg-clip-text text-transparent">feeling.</span></>}
        description={description}
      />
      <PortfolioShowcase />
      <NewsletterCTA />
    </>
  );
}
