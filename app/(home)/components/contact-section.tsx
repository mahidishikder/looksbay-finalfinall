import InquiryForm from "@/app/(pages)/contact/components/inquiry-form";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-24 md:py-32 lg:px-12">
      {/* Container with max-w-[1480px] */}
      <div className="mx-auto w-full max-w-[1480px]">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-[820px] text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#2761EB]">
            LET’S MAKE A GOOD THING
          </p>
          <h2 className="mb-4 text-[34px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[42px] md:text-[48px] leading-[1.08] mobile:text-[28px]">
            Get Started on Your Squarespace<br className="hidden sm:inline" /> Website Design Project Today
          </h2>
          <p className="mx-auto mt-3 max-w-[660px] text-[17px] leading-[1.6] text-[#515154]">
            Tell us a little about your project and what you’re hoping to build. We’ll be in touch within two working days.
          </p>
        </div>

        {/* Form Container with 1480px Context Width */}
        <div className="w-full">
          <InquiryForm />
        </div>

      </div>
    </section>
  );
}