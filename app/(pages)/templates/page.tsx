import type { Metadata } from "next";
import { PageIntro } from "@/app/shared/components/site-components";
import TemplateMarketplace from "./components/template-marketplace";

const description =
  "Thoughtful Squarespace 7.1 templates for good people with good ideas. Find your starting point, then make it yours.";

export const metadata: Metadata = {
  title: "Templates — Squarespace studio",
  description,
};

export default function TemplatesPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE LOOKS BAY EDIT"
        title={<>A very good place<br />to <span className="bg-gradient-to-r from-blue via-[#7257ff] to-[#d94d9a] bg-clip-text text-transparent">start.</span></>}
        description={description}
      />
      <TemplateMarketplace />
    </>
  );
}
