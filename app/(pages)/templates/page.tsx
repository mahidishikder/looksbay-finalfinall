import type { Metadata } from "next";
import TemplateMarketplace from "./components/template-marketplace";
import TrustBanner from "./components/trust-banner";
import { TestimonialsSection } from "@/app/(home)/components";
import { NewsletterCTA } from "@/app/shared/components/site-components";

const description =
  "Thoughtfully designed Squarespace 7.1 templates. Pick your starting point, then make it yours.";

export const metadata: Metadata = {
  title: "Custom Squarespace Templates — Premium 7.1 Designs | Looksbay Studio",
  description,
};

export default function TemplatesPage() {
  return (
    <main className="bg-white">
      <TemplateMarketplace />
      <TrustBanner />
      <TestimonialsSection />
      <NewsletterCTA />
    </main>
  );
}
