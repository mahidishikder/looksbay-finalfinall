import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFrame } from "@/app/shared/components/site-components";
import { articles } from "../data";

export function BlogSection() {
  return (
    <section className="bg-paper px-[max(24px,calc((100%_-_1480px)/2))] py-[100px] mobile:px-[18px] mobile:py-[60px]">
      <div className="mb-6 text-center">
        <span className="inline-block text-[15px] font-bold tracking-[.12em] text-blue">NOTES FROM THE STUDIO</span>
        <h2 className="mb-0 mt-1.5 text-[30px] font-semibold leading-[1.14] mobile:text-[25px]">Latest on the Blog</h2>
      </div>
      <div className="grid grid-cols-4 gap-7 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-[9px]">
        {articles.map((article) => (
          <Link href="/templates" className="min-w-0 overflow-hidden rounded-[10px] border border-black/[0.08] bg-white p-3.5 transition hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] mobile:p-[7px]" key={article.title}>
            <ImageFrame className="h-[250px] mobile:h-[135px]" image={article.image} imageAlt={article.title} />
            <span className="mb-1 mt-2.5 block text-[15px] font-semibold text-blue">{article.category}</span>
            <h3 className="mb-2.5 mt-0 min-h-[76px] text-lg leading-[1.4] mobile:min-h-[73px] mobile:text-sm">{article.title}</h3>
            <span className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#eef5ff] text-[15px] font-semibold text-blue">READ ARTICLE <ArrowRight size={13} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
