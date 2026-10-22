import type { Metadata } from "next";
import { Footer, Header } from "./shared/components/site-components";
import { AiAssistant } from "./shared/components/ai-assistant";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Looksbay Studio — Thoughtful Squarespace design.",
    template: "%s — Looksbay Studio",
  },
  description:
    "Independent Squarespace studio building unmistakable brands, beautiful websites, and practical templates for ambitious people.",
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[94px] motion-reduce:scroll-auto">
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AiAssistant />
      </body>
    </html>
  );
}