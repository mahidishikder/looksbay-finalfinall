import {
  BlogSection,
  ContactSection,
  ExpertSection,
  FAQSection,
  FeaturedProjectSection,
  HeroSection,
  IntroBenefitsSection,
  PackageSection,
  PortfolioSection,
  ServicesSection,
  StudioQuoteSection,
  TestimonialsSection,
} from "./components";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroBenefitsSection />
      <ServicesSection />
      <PortfolioSection />
      <FeaturedProjectSection />
      <PackageSection />
      <StudioQuoteSection />
      <ExpertSection />
      <FAQSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
