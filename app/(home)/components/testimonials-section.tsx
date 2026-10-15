import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    company: "Evolving Sanctuary",
    quote:
      "It was so easy working with you! I appreciated the speed and attention to detail with the assets I needed. Especially on short notice. The work went smoothly and I feel taken care of.",
    author: "Max Kabanuk",
    role: "Evolving Sanctuary",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-[#E0F2FE]", // Soft pastel blue
  },
  {
    company: "Huneebee Project",
    quote:
      "I'm very grateful to have learned so much about design and its impact on businesses. I'm looking forward to building the Huneebee Project brand with your expertise by my side.",
    author: "Sarah Taylor",
    role: "Huneebee Project",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-[#FEF08A]", // Soft pastel yellow
  },
  {
    company: "Engineered Fitness",
    quote:
      "We were happy and impressed by the website! We love how it looks and how it's worked for the business! Looksbay made sure to understand our needs and then execute what we needed.",
    author: "Ben Chaffee",
    role: "EngineeredFitness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-[#FCE7F3]", // Soft pastel pink
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-24 md:py-32 px-6 lg:px-12">
      <div className="mx-auto w-full max-w-[1480px]">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#2761EB]">
            Kind Words
          </p>
          <h2 className="mb-4 text-[40px] font-extrabold tracking-tight text-[#1D1D1F] sm:text-[50px] md:text-[58px] leading-[1.05]">
            Reviews that speak volumes.
          </h2>
          <p className="mx-auto max-w-[580px] text-[17px] text-[#515154]">
            Don’t just take our word for it, hear what people have to say about us.
          </p>
        </div>

        {/* Testimonials Cards Grid with Slider Controls */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button 
            type="button" 
            aria-label="Previous Testimonial"
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-[#1D1D1F] p-3 text-white shadow-lg transition-transform hover:scale-110 lg:flex"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* 3-Column Responsive Grid (No Border Radius) */}
          <div className="grid grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className={`flex min-h-[420px] flex-col justify-between ${item.bgColor} p-8 text-left transition-all duration-300 rounded-none hover:shadow-lg`}
              >
                <div>
                  {/* Company/Brand Name */}
                  <div className="mb-6 text-[18px] font-bold tracking-tight text-[#1D1D1F]">
                    {item.company}
                  </div>

                  {/* Review Quote */}
                  <p className="mb-6 text-[15px] sm:text-[16px] leading-[1.6] text-[#1D1D1F]/90 font-medium">
                    “{item.quote}”
                  </p>
                </div>

                <div>
                  {/* 5-Star Rating */}
                  <div className="mb-6 flex gap-1 text-[#1D1D1F]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-[#1D1D1F]" />
                    ))}
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="h-11 w-11 rounded-full object-cover border border-black/10"
                    />
                    <div>
                      <h4 className="text-[15px] font-bold text-[#1D1D1F]">
                        {item.author}
                      </h4>
                      <p className="text-[13px] text-[#515154]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button 
            type="button" 
            aria-label="Next Testimonial"
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-[#1D1D1F] p-3 text-white shadow-lg transition-transform hover:scale-110 lg:flex"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

        </div>

      </div>
    </section>
  );
}