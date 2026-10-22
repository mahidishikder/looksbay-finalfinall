"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Send,
  RotateCcw,
  Zap,
  Mic,
  MicOff,
  Paperclip,
  Smile,
  ArrowRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { findBestSquarespaceAnswer } from "../data/squarespace-knowledge";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  attachmentName?: string;
  link?: {
    label: string;
    href: string;
  };
}

const EMOJI_LIST = [
  "👋", "✨", "🚀", "💡", "🎨", "💻",
  "⚡", "🔥", "👍", "❤️", "🎯", "📈",
  "🤝", "📞", "⭐", "🎉", "😊", "🙏"
];

const QUICK_PROMPTS = [
  { label: "Bespoke Services & Offerings", query: "What Squarespace services do you offer?" },
  { label: "Project Pricing & Milestones", query: "How much does a custom website cost?" },
  { label: "Turnaround & Delivery Timeline", query: "How long does a website take to build?" },
  { label: "SEO & 90+ PageSpeed Guarantee", query: "How do you optimize speed & Google SEO?" },
  { label: "Site Migration from WordPress/Wix", query: "Can you migrate my site from WordPress or Wix?" },
  { label: "Book a Free 20-Min Call", query: "I would like to book a discovery call" },
];

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Utility popovers state
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! Welcome to Looksbay Studio. We design bespoke Squarespace websites, optimize speed & SEO, and build custom templates. How can I assist you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isTyping, isOpen]);

  // Voice speech-to-text setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const displaySize = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
      setAttachedFile({ name: file.name, size: displaySize });
    }
  };

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const sendMessage = (queryText: string) => {
    const trimmed = queryText.trim();
    if ((!trimmed && !attachedFile) || isTyping) return;

    const currentAttachment = attachedFile?.name;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: trimmed || `Shared document: ${currentAttachment}`,
      attachmentName: currentAttachment,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachedFile(null);
    setShowQuickPrompts(false);
    setShowEmojiPicker(false);
    setIsTyping(true);

    setTimeout(() => {
      const result = findBestSquarespaceAnswer(trimmed);
      let replyText = result.answer;

      if (currentAttachment) {
        replyText = `Thank you! I've noted your attachment "${currentAttachment}".\n\n${result.answer}\n\nOur team can review your document in detail on our discovery call!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "a-" + Date.now(),
          sender: "ai",
          text: replyText,
          link: result.link,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "Hello! Welcome to Looksbay Studio. We design bespoke Squarespace websites, optimize speed & SEO, and build custom templates. How can I assist you today?",
      },
    ]);
    setAttachedFile(null);
    setShowQuickPrompts(false);
    setShowEmojiPicker(false);
  };

  return (
    <>
      {/* Hidden file input for Paperclip */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
        className="hidden"
      />

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open Chat AI"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#5046E5] pl-2.5 pr-4 py-2 text-white shadow-[0_10px_28px_rgba(80,70,229,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#4338CA] hover:shadow-[0_14px_34px_rgba(80,70,229,0.5)] active:scale-95"
      >
        <div className="relative size-[34px] shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center">
          <Image
            src="/assets/favicon.png"
            alt="Looksbay Logo"
            width={34}
            height={34}
            className="size-full rounded-full object-cover"
          />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-white">Chat AI</span>
        <span className="size-2.5 rounded-full bg-emerald-400" />
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat AI Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[590px] max-h-[85vh] w-[calc(100vw-32px)] sm:w-[385px] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] border border-black/[0.06] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Solid Indigo/Purple Header */}
          <div className="relative flex items-center justify-between bg-[#5046E5] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative size-[34px] shrink-0 overflow-hidden rounded-full bg-white/20 p-0.5 flex items-center justify-center">
                <Image
                  src="/assets/favicon.png"
                  alt="Chat AI"
                  width={34}
                  height={34}
                  className="size-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-white leading-tight">
                  Chat AI
                </h3>
                <span className="text-[11px] text-white/80 font-medium">
                  Looksbay Studio
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                title="Restart chat"
                className="grid size-7 place-items-center rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="grid size-7 place-items-center rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/10">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 items-end ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Avatar */}
                {m.sender === "ai" && (
                  <div className="size-8 shrink-0 overflow-hidden rounded-full bg-[#27273E] p-1 flex items-center justify-center shadow-xs">
                    <Image
                      src="/assets/favicon.png"
                      alt="AI"
                      width={24}
                      height={24}
                      className="size-full rounded-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[78%] px-4 py-3 text-[13px] leading-[1.55] shadow-2xs ${
                    m.sender === "user"
                      ? "rounded-[18px] rounded-br-[4px] bg-[#5046E5] text-white font-normal"
                      : "rounded-[18px] rounded-tl-[4px] bg-[#F2F4F7] text-[#1E232E]"
                  }`}
                >
                  <p className="m-0 whitespace-pre-wrap">{m.text}</p>

                  {/* Attached Document Pill in User Bubble */}
                  {m.attachmentName && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white">
                      <FileText size={12} />
                      <span className="truncate max-w-[170px]">{m.attachmentName}</span>
                    </div>
                  )}

                  {/* Action Link */}
                  {m.link && (
                    <div className="mt-2.5 pt-2 border-t border-black/[0.06]">
                      <Link
                        href={m.link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#5046E5] hover:underline text-[12px]"
                      >
                        <span>{m.link.label}</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator Bubble */}
            {isTyping && (
              <div className="flex gap-2.5 items-end justify-start">
                <div className="size-8 shrink-0 overflow-hidden rounded-full bg-[#27273E] p-1 flex items-center justify-center shadow-xs">
                  <Image
                    src="/assets/favicon.png"
                    alt="AI"
                    width={24}
                    height={24}
                    className="size-full rounded-full object-cover"
                  />
                </div>
                <div className="rounded-[18px] rounded-tl-[4px] bg-[#F2F4F7] px-4 py-3 flex items-center gap-1.5 shadow-2xs">
                  <span className="size-2 rounded-full bg-[#5046E5] animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-2 rounded-full bg-[#5046E5] animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-2 rounded-full bg-[#5046E5] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Popover (Triggered by Zap ⚡) */}
          {showQuickPrompts && (
            <div className="mx-3 mb-2 rounded-2xl border border-[#5046E5]/20 bg-white p-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.05] mb-2">
                <span className="text-[12px] font-bold text-[#1E232E] flex items-center gap-1.5">
                  <Zap size={13} className="text-[#5046E5]" />
                  Instant Quick Prompts
                </span>
                <button
                  type="button"
                  onClick={() => setShowQuickPrompts(false)}
                  className="text-[#9CA3AF] hover:text-[#1E232E]"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {QUICK_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(p.query)}
                    className="flex items-center justify-between rounded-lg bg-[#F8F9FB] px-2.5 py-1.5 text-left text-[11.5px] font-medium text-[#2D3142] transition hover:bg-[#EEF2FF] hover:text-[#5046E5]"
                  >
                    <span>{p.label}</span>
                    <ArrowRight size={11} className="shrink-0 text-[#9CA3AF]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Picker Popover (Triggered by Smile 😊) */}
          {showEmojiPicker && (
            <div className="mx-3 mb-2 rounded-2xl border border-black/[0.08] bg-white p-2.5 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.05] mb-2">
                <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">
                  Select an Emoji
                </span>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(false)}
                  className="text-[#9CA3AF] hover:text-[#1E232E]"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2 text-center text-[18px]">
                {EMOJI_LIST.map((emoji, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="hover:scale-125 transition-transform p-1 rounded-md hover:bg-[#F3F4F6]"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Listening Voice Banner */}
          {isListening && (
            <div className="mx-3 mb-2 flex items-center justify-between rounded-xl bg-red-50 border border-red-200 px-3 py-1.5 text-red-600 text-[12px] font-medium animate-pulse">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-500 animate-ping" />
                Listening to your voice... Speak now!
              </span>
              <button
                type="button"
                onClick={toggleListening}
                className="text-red-700 font-bold hover:underline"
              >
                Done
              </button>
            </div>
          )}

          {/* Attached File Preview Pill (Triggered by Paperclip 📎) */}
          {attachedFile && (
            <div className="mx-3 mb-2 flex items-center justify-between rounded-xl bg-[#EEF2FF] border border-[#5046E5]/30 px-3 py-1.5 text-[12px] text-[#5046E5]">
              <span className="flex items-center gap-1.5 font-medium truncate max-w-[280px]">
                <FileText size={14} className="shrink-0" />
                <span className="truncate">{attachedFile.name}</span>
                <span className="text-[10px] text-[#6B7280]">({attachedFile.size})</span>
              </span>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-[#6B7280] hover:text-[#1E232E] p-0.5"
                title="Remove attachment"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* Reference Input Area (Card Container with Top Text Field & Fully Functional Bottom Icons) */}
          <div className="p-3 bg-white border-t border-black/[0.06]">
            <form
              onSubmit={handleFormSubmit}
              className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-2.5 transition-all focus-within:border-[#5046E5] focus-within:bg-white focus-within:shadow-[0_2px_12px_rgba(80,70,229,0.08)]"
            >
              <textarea
                ref={inputRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder={isListening ? "Listening..." : "Write your message here..."}
                className="w-full resize-none border-0 bg-transparent text-[13px] text-[#1E232E] placeholder:text-[#9CA3AF] focus:outline-none"
              />

              <div className="mt-1 flex items-center justify-between border-t border-black/[0.04] pt-2">
                {/* 4 Fully Functional Action Icons on Left */}
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  {/* 1. Lightning Zap Icon (Quick Prompts Menu) */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickPrompts((prev) => !prev);
                      setShowEmojiPicker(false);
                    }}
                    title="Quick Prompts"
                    className={`p-1.5 rounded-full transition-colors ${
                      showQuickPrompts ? "text-[#5046E5] bg-[#EEF2FF]" : "hover:text-[#5046E5] hover:bg-black/[0.04]"
                    }`}
                  >
                    <Zap size={16} />
                  </button>

                  {/* 2. Microphone Icon (Voice Speech-To-Text) */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={isListening ? "Stop listening" : "Speak your message"}
                    className={`p-1.5 rounded-full transition-colors ${
                      isListening ? "text-red-500 bg-red-100 animate-pulse" : "hover:text-[#5046E5] hover:bg-black/[0.04]"
                    }`}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>

                  {/* 3. Paperclip Attachment Icon (Select Project File) */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach project brief or logo"
                    className={`p-1.5 rounded-full transition-colors ${
                      attachedFile ? "text-[#5046E5] bg-[#EEF2FF]" : "hover:text-[#5046E5] hover:bg-black/[0.04]"
                    }`}
                  >
                    <Paperclip size={16} />
                  </button>

                  {/* 4. Smile Emoji Picker Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmojiPicker((prev) => !prev);
                      setShowQuickPrompts(false);
                    }}
                    title="Insert emoji"
                    className={`p-1.5 rounded-full transition-colors ${
                      showEmojiPicker ? "text-[#5046E5] bg-[#EEF2FF]" : "hover:text-[#5046E5] hover:bg-black/[0.04]"
                    }`}
                  >
                    <Smile size={16} />
                  </button>
                </div>

                {/* Send Button on Right */}
                <button
                  type="submit"
                  disabled={(!input.trim() && !attachedFile) || isTyping}
                  aria-label="Send message"
                  className="grid size-8 place-items-center rounded-full bg-[#5046E5] text-white transition hover:bg-[#4338CA] disabled:opacity-30 disabled:hover:bg-[#5046E5] active:scale-95 shadow-xs"
                >
                  <Send size={13} className="translate-x-[-1px] translate-y-[1px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
