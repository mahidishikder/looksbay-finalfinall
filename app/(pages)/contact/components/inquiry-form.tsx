"use client";

import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  ChevronDown,
  Paperclip,
  ArrowRight,
  X,
  FileText,
  CheckCircle2,
  MessageCircle,
  Loader2,
  Mail,
  RotateCcw,
} from "lucide-react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

  const handleReset = () => {
    setName("");
    setEmail("");
    setWhatsapp("");
    setProject("");
    setBudget("");
    setMessage("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsSubmitted(false);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!name.trim() || !email.trim() || !whatsapp.trim() || !project || !budget || !message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, WhatsApp, Project, Budget, and Details).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          project,
          budget,
          message: message.trim(),
          template: selectedTemplate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit inquiry. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEmailDraft = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${project || "General"} — ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
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
    window.open(mailtoUrl, "_blank");
  };

  const cleanWhatsappNumber = whatsapp.replace(/[^0-9]/g, "");

  const inputClasses =
    "w-full h-[48px] rounded-[10px] border border-black/[0.12] bg-white px-3.5 text-[15px] text-[#1D1D1F] outline-none transition-all duration-200 placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:ring-4 focus:ring-[#0077ED]/10";
  const labelClasses = "block text-[13px] font-semibold text-[#1D1D1F] mb-1.5";

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full rounded-[20px] border border-emerald-500/20 bg-white p-8 sm:p-12 shadow-md text-center animate-fade-in">
        <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
          <CheckCircle2 size={36} />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
          Inquiry Successfully Received
        </span>

        <h2 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight text-[#1D1D1F] mb-3">
          Thank you, {name}!
        </h2>

        <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-[#6E6E73] mb-8">
          Your project inquiry has been delivered directly to our lead designers. We typically review requirements and respond within 24 to 48 hours via Email or WhatsApp.
        </p>

        {/* Quick Contact Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {cleanWhatsappNumber && (
            <a
              href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(`Hi ${name}! Thanks for reaching out to Looksbay Studio about your ${project} project.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#20BD5A] hover:shadow"
            >
              <MessageCircle size={17} />
              <span>Verified WhatsApp Connected</span>
            </a>
          )}

          <button
            type="button"
            onClick={openEmailDraft}
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full border border-black/10 bg-[#F5F5F7] px-6 text-sm font-semibold text-[#1D1D1F] hover:bg-[#EBEBEF] transition"
          >
            <Mail size={16} className="text-[#0077ED]" />
            <span>Open Email Draft</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-[46px] items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition"
          >
            <RotateCcw size={15} />
            <span>Submit Another</span>
          </button>
        </div>
      </div>
    );
  }

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
          Tell us what’s on your mind. All fields marked with <span className="text-[#0077ED] font-bold">*</span> are required so we can give you an accurate roadmap and estimate.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600 flex items-center justify-between">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-700">
            <X size={15} />
          </button>
        </div>
      )}

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

        {/* WhatsApp Number (Required) */}
        <div>
          <label className={labelClasses} htmlFor="contact-whatsapp">
            <span className="inline-flex items-center gap-1.5">
              <span>WhatsApp / Phone number</span>
              <span className="inline-flex items-center gap-1 rounded bg-[#25D366]/15 px-1.5 py-0.2 text-[10px] font-bold text-[#1DA851]">
                <MessageCircle size={11} /> WhatsApp
              </span>
            </span>
            <span className="text-[#0077ED] ml-1">*</span>
          </label>
          <input
            className={inputClasses}
            id="contact-whatsapp"
            name="WhatsApp"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 019-2834"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
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
              <option value="" disabled>Choose a project type</option>
              <option value="Custom website">Custom website</option>
              <option value="Template purchase">Template purchase</option>
              <option value="Template setup">Template setup</option>
              <option value="Website redesign">Website redesign</option>
              <option value="SEO & performance">SEO &amp; performance</option>
              <option value="Brand & website">Brand &amp; website</option>
              <option value="Platform Migration">Platform Migration</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]"
            />
          </div>
        </div>

        {/* Budget Dropdown */}
        <div className="col-span-2 mobile:col-span-1">
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
              <option value="" disabled>Select an investment budget</option>
              <option value="$500 – $1,500">$500 – $1,500 (Starter / Fixes)</option>
              <option value="$1,500 – $3,500">$1,500 – $3,500 (Full Template & Custom Setup)</option>
              <option value="$3,500 – $7,500">$3,500 – $7,500 (Bespoke Studio Website)</option>
              <option value="$7,500+">$7,500+ (Enterprise / Advanced E-Commerce)</option>
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
            className="w-full min-h-[130px] rounded-[10px] border border-black/[0.12] bg-white p-3.5 text-[15px] text-[#1D1D1F] outline-none transition-all duration-200 placeholder:text-[#8E8E93] focus:border-[#0077ED] focus:ring-4 focus:ring-[#0077ED]/10 resize-y"
            id="contact-message"
            name="Project details"
            placeholder="Tell us about your brand, what you want to achieve, any deadline, or reference links…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Custom Styled File Upload */}
        <div className="col-span-2 mobile:col-span-1">
          <label className={labelClasses}>
            Have a brief or design reference? <span className="text-xs font-normal text-[#8E8E93]">(Optional)</span>
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
                <span className="text-xs text-[#8E9BB0] mobile:hidden">(PDF, DOCX, PNG up to 10MB)</span>
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
        <p className="col-span-2 mobile:col-span-1 m-0 text-xs leading-[1.6] text-[#8E9BB0]">
          Submitting saves your project details instantly to our studio queue. We will get in touch with you directly via WhatsApp or Email.
        </p>
      </div>

      {/* Submit Button & Confirmation */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#0077ED] px-8 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0066CC] hover:shadow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending inquiry...</span>
            </>
          ) : (
            <>
              <span>Send inquiry</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}