"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const packages = [{ id: "setup", label: "Template setup", price: 650 }, { id: "custom", label: "Custom website", price: 3500 }, { id: "redesign", label: "Website redesign", price: null }, { id: "seo", label: "SEO & performance", price: 800 }, { id: "brand", label: "Brand & website", price: 6500 }];
const addons = [{ id: "copy", label: "Website copywriting", price: 550 }, { id: "shop", label: "Online shop setup", price: 400 }, { id: "training", label: "A private handover session", price: 180 }];

export default function ServicesPlanner() {
  const [selectedPackage, setSelectedPackage] = useState("setup");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const selectedService = packages.find((item) => item.id === selectedPackage)!;
  const estimate = selectedService.price === null ? null : selectedService.price + addons.filter((item) => selectedAddons.includes(item.id)).reduce((total, item) => total + item.price, 0);

  function toggleAddon(id: string) { setSelectedAddons((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }

  return (
    <div className="rounded-[10px] border border-black/[0.08] bg-white p-[25px] mobile:p-[18px]">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-[13px] text-sm font-semibold">1. What can we help with?</legend>
        <div className="grid grid-cols-2 gap-2 mobile:grid-cols-1">
          {packages.map((item) => <label className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-[10px] border px-2.5 py-[9px] transition ${selectedPackage === item.id ? "border-blue bg-[#f2f8ff]" : "border-line"}`} key={item.id}><input className="accent-blue" type="radio" name="package" value={item.id} checked={selectedPackage === item.id} onChange={() => setSelectedPackage(item.id)} /><span className="text-sm">{item.label}</span></label>)}
        </div>
      </fieldset>
      <fieldset className="mt-[21px] grid gap-3 border-0 p-0">
        <legend className="mb-1 text-sm font-semibold">2. Anything else?</legend>
        {addons.map((item) => <label className="flex items-center gap-2 text-sm text-muted" key={item.id}><input className="accent-blue" type="checkbox" checked={selectedAddons.includes(item.id)} onChange={() => toggleAddon(item.id)} /><span>{item.label} (+${item.price.toLocaleString()})</span></label>)}
      </fieldset>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-[17px]"><span className="text-sm text-muted">Your starting estimate</span><strong className="text-2xl font-semibold">{estimate === null ? "Custom quote" : `$${estimate.toLocaleString()}`}</strong></div>
      <p className="mb-[15px] mt-2 text-sm leading-[1.7] text-muted">{estimate === null ? "Every redesign starts from a different website and set of goals. Tell us what needs to change and we’ll prepare a tailored proposal." : "A helpful starting point, not a quote. We’ll tailor your final proposal to your actual needs and goals."}</p>
      <Link className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0077ED] px-[22px] font-semibold text-white transition-colors" href={`/contact?project=${encodeURIComponent(selectedService.label)}`}>Talk through your project</Link>
    </div>
  );
}