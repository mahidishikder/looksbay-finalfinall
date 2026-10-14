import Link from "next/link";
import { ArrowRight, CodeXml, Gauge, Layers2, RefreshCw, Search, Sparkles } from "lucide-react";
import { services } from "../../data";

const serviceIcons = { layers: Layers2, code: CodeXml, refresh: RefreshCw, search: Search, sparkles: Sparkles };

export function ServicesSection() {
  return (
    <section className="bg-white px-6 py-[100px] mobile:px-[18px] mobile:py-[60px]">
      <div className="mb-6 text-center">
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">MADE FOR YOUR NEXT CHAPTER</span>
        <h2 className="mb-0 mt-1.5 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Squarespace Website Services</h2>
      </div>
      <div className="mx-auto grid max-w-[1480px] grid-cols-3 gap-7 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-[13px]">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon];
          return (
            <article className="overflow-hidden rounded-lg border border-line bg-gradient-to-br from-white to-[#fbfcff] shadow-card" key={service.name}>
              <div className="relative grid h-[230px] place-items-center bg-gradient-to-br from-[#eaf3ff] via-paper to-[#f8efff] text-blue mobile:h-[210px]">
                <Icon size={49} strokeWidth={1.2} />
                <span className="absolute inset-x-3 bottom-3 bg-white/90 p-2 text-center text-[10px] font-semibold tracking-[.08em]">{service.cardLabel}</span>
              </div>
              <div className="px-[26px] pb-[30px] pt-7 text-center">
                <h3 className="mb-2 text-lg font-semibold">{service.cardTitle}</h3>
                <p className="mb-[15px] min-h-[110px] text-[15px] leading-[1.5] text-muted">{service.description}</p>
                <Link href={service.href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue px-[22px] text-[15px] font-bold text-white transition hover:bg-blue-hover">VIEW SERVICE <ArrowRight size={14} /></Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
