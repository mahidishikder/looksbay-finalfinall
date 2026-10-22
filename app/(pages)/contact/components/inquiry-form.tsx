"use client";

import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { ChevronDown, Paperclip, ArrowRight, X, FileText, CheckCircle2 } from "lucide-react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proj = params.get("project");
    const template = params.get("template");
    if (proj) setProject(proj);
    if (template) {
      setSelectedTemplate(template);
      setProject("Template purchase");
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Persist to admin database
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project,
          budget,
          message,
          template: selectedTemplate,
        }),
      }).catch(console.error);
    } catch (err) {
      console.error(err);
    }

    const subject = encodeURIComponent(`Project Inquiry: ${project || "General"} — ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project Type: ${project || "Not specified"}`,
      `Budget: ${budget || "Not specified"}`,
      selectedTemplate ? `Selected Template: ${selectedTemplate}` : null,
      file ? `Attached File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)` : null,
      "",
      "Project Details:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = `mailto:hello@looksbay.com?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const inputClasses =
    "w-full h-[48px] rounded-[10px] border border-black/[0.12] bg-white px-3.5 text-[15px] text-[#1D1D1F] outline-none transition-all duration-200 placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:ring-4 focus:ring-[#0077ED]/10";
  const labelClasses = "block text-[13px] font-semibold text-[#1D1D1F] mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full rounded-[16px] border border-black/[0.08] bg-[#F5F5F7] p-8 sm:p-10 transition-shadow duration-300 shadow-sm"
    >
      {/* Form Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0077ED] mb-2">
          <span className="h-2 w-2 rounded-full bg-[#0077ED] animate-pulse" />
          A Little Introduction
        </div>
        <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#1D1D1F] mb-1.5">
          Let’s get to know your project.
        </h2>
        <p className="text-[15px] leading-relaxed text-[#6E6E73] m-0">
          Tell us what’s on your mind. We’ll get back to you within two working days.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-2 gap-5 mobile:grid-cols-1">
        {/* Name */}
        <div>
          <label className={labelClasses} htmlFor="contact-name">
            Your name <span className="text-[#0077ED]">*</span>
          </label>
          <input
            className={inputClasses}
            id="contact-name"
            name="Name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClasses} htmlFor="contact-email">
            Email address <span className="text-[#0077ED]">*</span>
          </label>
          <input
            className={inputClasses}
            id="contact-email"
            name="Email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Project Type Dropdown */}
        <div>
          <label className={labelClasses} htmlFor="contact-project">
            I’m looking for <span className="text-[#0077ED]">*</span>
          </label>
          <div className="relative">
            <select
              className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              id="contact-project"
              name="Project type"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
            >
              <option value="" disabled>Choose a project</option>
              <option value="Custom website">Custom website</option>
              <option value="Template purchase">Template purchase</option>
              <option value="Template setup">Template setup</option>
              <option value="Website redesign">Website redesign</option>
              <option value="SEO & performance">SEO &amp; performance</option>
              <option value="Brand & website">Brand &amp; website</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]"
            />
          </div>
        </div>

        {/* Budget Dropdown */}
        <div>
          <label className={labelClasses} htmlFor="contact-budget">
            Comfortable investment <span className="text-[#0077ED]">*</span>
          </label>
          <div className="relative">
            <select
              className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
              id="contact-budget"
              name="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            >
              <option value="" disabled>Select a budget</option>
              <option value="$500 – $1,500">$500 – $1,500</option>
              <option value="$1,500 – $3,500">$1,500 – $3,500</option>
              <option value="$3,500 – $7,500">$3,500 – $7,500</option>
              <option value="$7,500+">$7,500+</option>
              <option value="Let’s discuss">Let’s discuss</option>
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]"
            />
          </div>
        </div>

        {/* Message */}
        <div className="col-span-2 mobile:col-span-1">
          <label className={labelClasses} htmlFor="contact-message">
            A little about what you’re dreaming of <span className="text-[#0077ED]">*</span>
          </label>
          <textarea
            className="w-full min-h-[120px] rounded-[10px] border border-black/[0.12] bg-white p-3.5 text-[15px] text-[#1D1D1F] outline-none transition-all duration-200 placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:ring-4 focus:ring-[#0077ED]/10 resize-y"
            id="contact-message"
            name="Project details"
            placeholder="The idea, the deadline, or even just what isn’t quite working yet…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Custom Styled File Upload */}
        <div className="col-span-2 mobile:col-span-1">
          <label className={labelClasses}>
            Have a brief? <span className="text-xs font-normal text-[#8E8E93]">(Optional)</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            id="contact-file"
            name="Project brief"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="sr-only"
          />

          {!file ? (
            <label
              htmlFor="contact-file"
              className="flex min-h-[50px] w-full cursor-pointer items-center justify-between rounded-[10px] border border-dashed border-black/[0.18] bg-white px-4 py-2.5 transition-all hover:border-[#0077ED] hover:bg-[#F9FAFC]"
            >
              <div className="flex items-center gap-2.5 text-sm text-[#48484A]">
                <Paperclip size={17} className="text-[#0077ED] shrink-0" />
                <span>Upload brief or document</span>
                <span className="text-xs text-[#8E8E93] mobile:hidden">(PDF, DOCX, PNG up to 10MB)</span>
              </div>
              <span className="rounded-md border border-black/15 bg-[#F5F5F7] px-3 py-1 text-xs font-medium text-[#1D1D1F] hover:bg-[#EBEBEF]">
                Browse
              </span>
            </label>
          ) : (
            <div className="flex min-h-[50px] w-full items-center justify-between rounded-[10px] border border-emerald-300 bg-emerald-50/60 px-4 py-2">
              <div className="flex items-center gap-2.5 text-sm text-emerald-900 truncate">
                <FileText size={18} className="text-emerald-600 shrink-0" />
                <span className="font-medium truncate">{file.name}</span>
                <span className="text-xs text-emerald-700 shrink-0">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-emerald-700 hover:bg-emerald-100"
                aria-label="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Note */}
        <p className="col-span-2 mobile:col-span-1 m-0 text-xs leading-[1.6] text-[#8E8E93]">
          Sending your inquiry prepares an email with your project details. You can attach additional files directly in your email client if preferred.
        </p>
      </div>

      {/* Submit Button & Confirmation */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#0077ED] px-7 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0066CC] hover:shadow hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Say hello</span>
          <ArrowRight size={16} />
        </button>

        {isSubmitted && (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <CheckCircle2 size={16} />
            <span>Email drafted! Please send it via your email client.</span>
          </div>
        )}
      </div>
    </form>
  );
}