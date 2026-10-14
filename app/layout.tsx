import type { Metadata } from "next";
import { Footer, Header } from "./components";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Looksbay Studio — Thoughtful Squarespace design.",
    template: "%s — Looksbay Studio",
  },
  description:
    "Independent Squarespace studio building unmistakable brands, beautiful websites, and practical templates for ambitious people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[94px] motion-reduce:scroll-auto">
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}