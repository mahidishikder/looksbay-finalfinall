import {
  BlogSection,
  ContactSection,
  AgencySection,
  FAQSection,
  FeaturedProjectSection,
  HeroSection,
  IntroBenefitsSection,
  PortfolioProjectsSection,
  SquarespaceTemplatesSection,
  ServicesSection,
  TestimonialsSection,
} from "./components";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroBenefitsSection />
      <ServicesSection />
      <PortfolioProjectsSection />
      <SquarespaceTemplatesSection />
      <FeaturedProjectSection />
      <AgencySection />
      <FAQSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
