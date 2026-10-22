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
        gradientTitle="Selected Studio Work."
        secondaryTitle="Work Made With Feeling."
        description={description}
      />
      <PortfolioShowcase />
      <NewsletterCTA />
    </>
  );
}
