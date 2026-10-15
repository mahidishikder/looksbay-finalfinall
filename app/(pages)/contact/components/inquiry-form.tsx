"use client";

import { useEffect, useState } from "react";

export default function InquiryForm() {
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const project = params.get("project");
    const template = params.get("template");
    if (project) setProject(project);
    if (template) {
      setSelectedTemplate(template);
      setProject("Template purchase");
    }
  }, []);

  const fieldClassName = "mt-1.5 min-h-[46px] w-full rounded-[10px] border border-line bg-white px-3 text-base text-ink outline-none transition placeholder:text-muted focus:border-blue focus:ring-[3px] focus:ring-blue/15";
  const labelClassName = "text-sm font-medium text-ink";

  return (
    <form className="mx-auto w-full rounded-[10px] border border-black/[0.08] bg-[#F5F5F7] p-8 mobile:p-5" action="mailto:hello@looksbay.com" method="post" encType="text/plain">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><span className="size-[7px] rounded-full bg-blue" />A little introduction</span>
        <h2 className="mb-1.5 mt-3 text-[26px] font-semibold">Let’s get to know your project.</h2>
        <p className="m-0 text-base leading-[1.6] text-muted">Tell us what’s on your mind. We’ll get back to you within two working days.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
        <div className="grid gap-1.5"><label className={labelClassName} htmlFor="contact-name">Your name</label><input className={fieldClassName} id="contact-name" name="Name" autoComplete="name" placeholder="Jane Smith" required /></div>
        <div className="grid gap-1.5"><label className={labelClassName} htmlFor="contact-email">Email address</label><input className={fieldClassName} id="contact-email" name="Email" type="email" autoComplete="email" placeholder="jane@example.com" required /></div>
        <div className="grid gap-1.5"><label className={labelClassName} htmlFor="contact-project">I’m looking for</label><select className={fieldClassName} id="contact-project" name="Project type" value={project} onChange={(event) => setProject(event.target.value)} required><option value="" disabled>Choose a project</option><option>Template purchase</option><option>Template setup</option><option>Custom website</option><option>Website redesign</option><option>SEO &amp; performance</option><option>Brand &amp; website</option><option>Not sure yet</option></select></div>
        <div className="grid gap-1.5"><label className={labelClassName} htmlFor="contact-budget">Comfortable investment</label><select className={fieldClassName} id="contact-budget" name="Budget" value={budget} onChange={(event) => setBudget(event.target.value)} required><option value="" disabled>Select a budget</option><option>$500 – $1,500</option><option>$1,500 – $3,500</option><option>$3,500 – $7,500</option><option>$7,500+</option><option>Let’s discuss</option></select></div>
        {selectedTemplate && <input type="hidden" name="Selected template" value={selectedTemplate} />}
        <div className="grid gap-1.5 mobile:col-span-1 col-span-2"><label className={labelClassName} htmlFor="contact-message">A little about what you’re dreaming of</label><textarea className={`${fieldClassName} min-h-[120px] py-3`} id="contact-message" name="Project details" placeholder="The idea, the deadline, or even just what isn’t quite working yet…" required /></div>
        <div className="grid gap-1.5 mobile:col-span-1 col-span-2"><label className={labelClassName} htmlFor="contact-file">Have a brief? (Optional)</label><input className={fieldClassName} id="contact-file" name="Project brief" type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" /></div>
        <p className="col-span-2 m-0 text-sm leading-[1.5] text-muted mobile:col-span-1">Sending your inquiry opens your email app with your project details. You can attach a brief to the email before sending.</p>
      </div>
      <button type="submit" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-blue px-[22px] font-semibold text-white transition hover:bg-blue-hover">Say hello <span aria-hidden="true">→</span></button>
    </form>
  );
}