import Link from "next/link";
import { ArrowRight, Layers2, Search, Smartphone, Wrench } from "lucide-react";

const benefits = [
  { icon: Layers2, title: "Custom design", copy: "A considered visual identity and website that feels unmistakably yours." },
  { icon: Smartphone, title: "Mobile responsive", copy: "A thoughtful experience that works beautifully on every screen." },
  { icon: Search, title: "SEO & search", copy: "A strong technical foundation to help the right people find you." },
  { icon: Wrench, title: "Easy to maintain", copy: "A flexible Squarespace site you can confidently manage yourself." },
];

export function IntroBenefitsSection() {
  return (
    <>
      <section className="bg-white px-5 py-[100px] text-center">
        <div className="mx-auto max-w-[740px]">
          <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">WEB DESIGN · SEO · SQUARESPACE</span>
          <h2 className="my-2 text-[30px] font-semibold leading-[1.14]">Custom Squarespace Web Design + SEO</h2>
          <p className="mx-auto mb-[18px] mt-0 max-w-[680px] text-base leading-[1.6] text-muted">From first idea to launch day, we make thoughtful Squarespace websites that work beautifully and help your business grow. Get custom design, technical SEO, and ongoing support from one specialist team.</p>
          <Link href="/services" className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-[22px] text-[15px] font-bold tracking-[.03em] text-blue transition hover:bg-[#eef5ff]">EXPLORE OUR SERVICES <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="bg-paper px-5 py-[100px]">
        <div className="mx-auto grid w-[min(1480px,calc(100%_-_48px))] grid-cols-4 gap-7 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-[9px]">
          {benefits.map(({ icon: Icon, title, copy }) => (
            <article className="min-h-[220px] rounded-lg border border-line bg-gradient-to-br from-white to-[#fbfcff] px-7 py-[34px] text-center mobile:min-h-[200px] mobile:px-4 mobile:py-6" key={title}>
              <Icon className="mx-auto text-blue" size={28} strokeWidth={1.5} />
              <h3 className="mb-1.5 mt-[9px] text-base font-semibold mobile:text-sm">{title}</h3>
              <p className="m-0 text-[15px] leading-[1.45] text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
