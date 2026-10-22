import InquiryForm from "@/app/(pages)/contact/components/inquiry-form";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-16 desktop:py-20" id="contact">
      <div className="site-container">
        
        {/* Clean Left-Aligned Header Aligned with Form */}
        <div className="mb-6 text-left">
          <h2 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-[#1D1D1F]">
            Contact Us
          </h2>
        </div>

        {/* Form Container */}
        <div className="w-full">
          <InquiryForm />
        </div>

      </div>
    </section>
  );
}