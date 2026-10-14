import InquiryForm from "@/app/(pages)/contact/components/inquiry-form";

export function ContactSection() {
  return (
    <section className="bg-paper px-5 py-[100px] mobile:px-[18px] mobile:py-[60px]">
      <div className="mx-auto mb-[25px] max-w-[760px] text-center">
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">LET’S MAKE A GOOD THING</span>
        <h2 className="mb-0 mt-1.5 text-[29px] font-semibold leading-[1.14] mobile:text-2xl">Get Started on Your Squarespace<br />Website Design Project Today</h2>
        <p className="mx-auto mt-[9px] max-w-[620px] text-[15px] leading-[1.5] text-muted">Tell us a little about your project and what you’re hoping to build. We’ll be in touch within two working days.</p>
      </div>
      <InquiryForm />
    </section>
  );
}
