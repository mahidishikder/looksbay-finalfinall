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
  Bot,
  UserCheck,
  Sparkles,
  Loader2,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  User,
  Phone,
} from "lucide-react";
import { findBestSquarespaceAnswer } from "../data/squarespace-knowledge";

interface AIMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  attachmentName?: string;
  link?: {
    label: string;
    href: string;
  };
}

interface DevChatMessage {
  id: string;
  sender: "client" | "developer" | "system";
  senderName?: string;
  text: string;
  attachmentName?: string;
  timestamp: string;
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

export const MAHIDI_PROFILE = {
  id: "mahidi",
  name: "Mahidi Shikder",
  role: "Lead Squarespace Architect",
  title: "Squarespace Expert · Circle Platinum Member",
  avatar: "/assets/favicon.png",
  status: "Online Now",
  responseTime: "< 1 min",
  badges: ["Squarespace Expert", "Circle Platinum", "90+ PageSpeed"],
  welcomeText:
    "Hello! I'm Mahidi Shikder, lead Squarespace architect at Looksbay Studio. I am online in the studio right now — feel free to ask me anything about your website project, custom code, design, or pricing!",
};

// Realistic Web Audio API synthesizers for instant sensory feedback
function playSentSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {}
}

function playReceivedSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    // 3-note harmonic bell chime
    const notes = [587.33, 783.99, 1046.5]; // D5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      const startTime = ctx.currentTime + idx * 0.07;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.09, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  } catch {}
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"ai" | "developer">("ai");

  // AI chat state
  const [input, setInput] = useState("");
  const [isTypingAI, setIsTypingAI] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! Welcome to Looksbay Studio. We design bespoke Squarespace websites, optimize speed & SEO, and build custom templates. How can I assist you today? You can also switch above to chat live with Mahidi Shikder anytime!",
    },
  ]);

  // Live Developer chat state (Direct with Mahidi Shikder)
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [showContactFields, setShowContactFields] = useState(false);
  const [devSessionId, setDevSessionId] = useState<string>("");
  const [devMessages, setDevMessages] = useState<DevChatMessage[]>([
    {
      id: "dev-welcome-init",
      sender: "developer",
      senderName: MAHIDI_PROFILE.name,
      text: MAHIDI_PROFILE.welcomeText,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isSendingDevMsg, setIsSendingDevMsg] = useState(false);
  const [isDeveloperTyping, setIsDeveloperTyping] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(1);

  // Popovers & utilities
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Session ID and cached info
  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedSessionId = localStorage.getItem("looksbay_chat_session_id");
      if (!savedSessionId) {
        savedSessionId = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        localStorage.setItem("looksbay_chat_session_id", savedSessionId);
      }
      setDevSessionId(savedSessionId);

      const savedName = localStorage.getItem("looksbay_chat_client_name");
      if (savedName) setClientName(savedName);

      const savedContact = localStorage.getItem("looksbay_chat_client_contact");
      if (savedContact) setClientContact(savedContact);
    }
  }, []);

  // Poll for developer messages and live typing status
  useEffect(() => {
    if (!devSessionId) return;

    let isMounted = true;

    const fetchDevSession = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${devSessionId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.session) {
          if (!isMounted) return;

          // Check if Mahidi is typing live
          const typingUntil = data.session.developerTypingUntil || 0;
          setIsDeveloperTyping(typingUntil > Date.now());

          if (data.session.messages && data.session.messages.length > 0) {
            const newMsgs: DevChatMessage[] = data.session.messages;

            // If a new reply from Mahidi arrived, play pleasant chime sound!
            if (newMsgs.length > lastMessageCount) {
              const lastMsg = newMsgs[newMsgs.length - 1];
              if (lastMsg.sender === "developer") {
                playReceivedSound();
              }
            }

            setDevMessages(newMsgs);
            setLastMessageCount(newMsgs.length);

            // Mark read for client if open
            if (isOpen && chatMode === "developer" && data.session.unreadForClient > 0) {
              fetch("/api/chat", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: devSessionId, action: "read", reader: "client" }),
              }).catch(() => {});
            }
          }
        }
      } catch (err) {
        // silent fail during poll
      }
    };

    fetchDevSession();
    const interval = setInterval(fetchDevSession, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [devSessionId, isOpen, chatMode, lastMessageCount]);

  // Auto-scroll on new message or typing
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [aiMessages, devMessages, isTypingAI, isDeveloperTyping, isOpen, chatMode]);

  // Voice speech-to-text
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

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

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

  // Send message
  const sendMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if ((!trimmed && !attachedFile) || isTypingAI || isSendingDevMsg) return;

    const currentAttachment = attachedFile?.name;
    setInput("");
    setAttachedFile(null);
    setShowQuickPrompts(false);
    setShowEmojiPicker(false);

    // Play subtle sent sound immediately
    playSentSound();

    // AI Mode
    if (chatMode === "ai") {
      const userMsg: AIMessage = {
        id: "u-" + Date.now(),
        sender: "user",
        text: trimmed || `Shared document: ${currentAttachment}`,
        attachmentName: currentAttachment,
      };

      setAiMessages((prev) => [...prev, userMsg]);
      setIsTypingAI(true);

      setTimeout(() => {
        const result = findBestSquarespaceAnswer(trimmed);
        let replyText = result.answer;

        if (currentAttachment) {
          replyText = `Thank you! I've noted your attachment "${currentAttachment}".\n\n${result.answer}\n\nMahidi and our engineering team can review your document on our discovery call!`;
        }

        setAiMessages((prev) => [
          ...prev,
          {
            id: "a-" + Date.now(),
            sender: "ai",
            text: replyText,
            link: result.link,
          },
        ]);
        setIsTypingAI(false);
        playReceivedSound();
      }, 450);
      return;
    }

    // Developer Mode (Live with Mahidi Shikder)
    if (chatMode === "developer") {
      setIsSendingDevMsg(true);
      const senderDisplayName = clientName.trim() || "Visitor";

      if (clientName) localStorage.setItem("looksbay_chat_client_name", clientName.trim());
      if (clientContact) localStorage.setItem("looksbay_chat_client_contact", clientContact.trim());

      const optimisticMsg: DevChatMessage = {
        id: "temp-" + Date.now(),
        sender: "client",
        senderName: senderDisplayName,
        text: trimmed || `[Shared attachment: ${currentAttachment}]`,
        attachmentName: currentAttachment,
        timestamp: new Date().toISOString(),
      };
      setDevMessages((prev) => [...prev, optimisticMsg]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: devSessionId,
            text: trimmed || `[Shared attachment: ${currentAttachment}]`,
            attachmentName: currentAttachment,
            sender: "client",
            clientName: senderDisplayName,
            clientContact: clientContact.trim(),
            developerId: MAHIDI_PROFILE.id,
            developerName: MAHIDI_PROFILE.name,
            developerRole: MAHIDI_PROFILE.role,
            developerAvatar: MAHIDI_PROFILE.avatar,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.session && data.session.messages) {
            setDevMessages(data.session.messages);
            setLastMessageCount(data.session.messages.length);
          }
        }
      } catch (err) {
        console.error("Failed to send message to Mahidi:", err);
      } finally {
        setIsSendingDevMsg(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    if (chatMode === "ai") {
      setAiMessages([
        {
          id: "welcome-reset",
          sender: "ai",
          text: "Hello! Welcome to Looksbay Studio. We design bespoke Squarespace websites, optimize speed & SEO, and build custom templates. How can I assist you today?",
        },
      ]);
    } else {
      if (confirm("Restart chat with Mahidi Shikder?")) {
        const newId = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        setDevSessionId(newId);
        localStorage.setItem("looksbay_chat_session_id", newId);
        setDevMessages([
          {
            id: "dev-welcome-init",
            sender: "developer",
            senderName: MAHIDI_PROFILE.name,
            text: MAHIDI_PROFILE.welcomeText,
            timestamp: new Date().toISOString(),
          },
        ]);
        setLastMessageCount(1);
      }
    }
    setAttachedFile(null);
    setShowQuickPrompts(false);
    setShowEmojiPicker(false);
  };

  return (
    <>
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
        aria-label="Open Chat with AI and Mahidi Shikder"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#5046E5] pl-2.5 pr-4 py-2 text-white shadow-[0_10px_28px_rgba(80,70,229,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#4338CA] hover:shadow-[0_14px_34px_rgba(80,70,229,0.5)] active:scale-95"
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
        <div className="flex flex-col text-left">
          <span className="text-[14px] font-bold tracking-tight text-white leading-tight">
            Chat with Mahidi
          </span>
          <span className="text-[10px] text-white/80 font-medium">Squarespace Expert · Online</span>
        </div>
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
        </span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Looksbay AI & Live Developer Chat"
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[620px] max-h-[88vh] w-[calc(100vw-32px)] sm:w-[415px] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] border border-black/[0.08] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="relative bg-[#5046E5] px-5 pt-4 pb-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative size-[38px] shrink-0 overflow-hidden rounded-full bg-white/20 p-0.5 flex items-center justify-center border border-white/20">
                  <Image
                    src={MAHIDI_PROFILE.avatar}
                    alt={MAHIDI_PROFILE.name}
                    width={38}
                    height={38}
                    className="size-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#5046E5] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
                    {chatMode === "ai" ? "Looksbay AI Assistant" : MAHIDI_PROFILE.name}
                    <span className="rounded bg-white/20 px-1 py-0.2 text-[9.5px] font-semibold text-white">
                      Expert
                    </span>
                  </h3>
                  <span className="text-[11px] text-white/85 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {chatMode === "ai"
                      ? "Squarespace AI · Instant 24/7"
                      : "Squarespace Expert · Online Now"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Restart conversation"
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

            {/* Segmented Mode Switcher: AI Assistant vs Live Developer */}
            <div className="mt-3 flex rounded-xl bg-black/20 p-1 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => setChatMode("ai")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  chatMode === "ai"
                    ? "bg-white text-[#5046E5] shadow-xs"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Bot size={13} />
                <span>AI Assistant</span>
              </button>
              <button
                type="button"
                onClick={() => setChatMode("developer")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  chatMode === "developer"
                    ? "bg-white text-[#5046E5] shadow-xs"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <UserCheck size={13} />
                <span>Live Developer (Mahidi)</span>
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MODE 1: AI ASSISTANT                                      */}
          {/* ========================================================= */}
          {chatMode === "ai" && (
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/10">
              <div className="rounded-xl border border-[#5046E5]/15 bg-[#EEF2FF] p-2.5 flex items-center justify-between text-[11.5px] text-[#3730A3]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles size={13} className="text-[#5046E5] shrink-0" />
                  Want to discuss a custom build directly with Mahidi?
                </span>
                <button
                  type="button"
                  onClick={() => setChatMode("developer")}
                  className="rounded-lg bg-[#5046E5] px-2.5 py-1 font-bold text-white shadow-2xs hover:bg-[#4338CA] transition"
                >
                  Talk Live →
                </button>
              </div>

              {aiMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 items-end ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
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

                    {m.attachmentName && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white">
                        <FileText size={12} />
                        <span className="truncate max-w-[170px]">{m.attachmentName}</span>
                      </div>
                    )}

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

              {isTypingAI && (
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
          )}

          {/* ========================================================= */}
          {/* MODE 2: LIVE DEVELOPER (MAHIDI SHIKDER PROFILE & CHAT)   */}
          {/* ========================================================= */}
          {chatMode === "developer" && (
            <div className="flex-1 overflow-y-auto bg-[#FBFBFE] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/10 flex flex-col">
              {/* Mahidi Shikder Official Profile Header Card */}
              <div className="m-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-zinc-900 border-2 border-[#5046E5]/20 p-0.5">
                      <Image
                        src={MAHIDI_PROFILE.avatar}
                        alt={MAHIDI_PROFILE.name}
                        width={44}
                        height={44}
                        className="size-full rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[13.5px] font-bold text-[#111827] leading-tight">
                          {MAHIDI_PROFILE.name}
                        </h4>
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700">
                          Active Now
                        </span>
                      </div>
                      <span className="text-[11px] text-[#4F46E5] font-semibold block leading-tight mt-0.5">
                        {MAHIDI_PROFILE.role}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium block mt-0.5">
                        Squarespace Circle Platinum · Replies in {MAHIDI_PROFILE.responseTime}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowContactFields((prev) => !prev)}
                    className="text-[10.5px] text-[#5046E5] font-semibold hover:underline bg-[#EEF2FF] px-2 py-1 rounded-md"
                  >
                    {showContactFields ? "Hide Info" : "+ Add My Info"}
                  </button>
                </div>

                {/* Optional Client Contact Bar (Name & WhatsApp) */}
                {showContactFields && (
                  <div className="mt-2.5 pt-2.5 border-t border-black/[0.05] grid grid-cols-2 gap-2 animate-in fade-in duration-150">
                    <div>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Your Name (e.g. Alex)"
                        className="w-full rounded-lg border border-zinc-200 px-2 py-1 text-[11.5px] text-zinc-900 focus:outline-none focus:border-[#5046E5]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        placeholder="WhatsApp/Email"
                        className="w-full rounded-lg border border-zinc-200 px-2 py-1 text-[11.5px] text-zinc-900 focus:outline-none focus:border-[#5046E5]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Message Feed with Mahidi */}
              <div className="flex-1 px-4 py-2 space-y-3.5">
                {devMessages.map((m) => {
                  const isClient = m.sender === "client";
                  const isSystem = m.sender === "system";

                  if (isSystem) {
                    return (
                      <div key={m.id} className="text-center my-1.5">
                        <span className="inline-block rounded-full bg-zinc-200/70 px-3 py-0.5 text-[10.5px] text-zinc-600 font-medium">
                          {m.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2.5 items-end ${
                        isClient ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isClient && (
                        <div className="size-8 shrink-0 overflow-hidden rounded-full bg-zinc-900 border border-black/10 p-0.5 flex items-center justify-center shadow-xs">
                          <Image
                            src={MAHIDI_PROFILE.avatar}
                            alt={MAHIDI_PROFILE.name}
                            width={26}
                            height={26}
                            className="size-full rounded-full object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[78%] px-4 py-2.5 text-[13px] leading-[1.55] shadow-2xs ${
                          isClient
                            ? "rounded-[18px] rounded-br-[4px] bg-[#5046E5] text-white font-normal"
                            : "rounded-[18px] rounded-tl-[4px] bg-white text-[#1E232E] border border-black/[0.05]"
                        }`}
                      >
                        {!isClient && (
                          <span className="block text-[10.5px] font-bold text-[#5046E5] mb-0.5">
                            {m.senderName || MAHIDI_PROFILE.name} · Lead Developer
                          </span>
                        )}

                        <p className="m-0 whitespace-pre-wrap">{m.text}</p>

                        {m.attachmentName && (
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-black/10 px-2.5 py-1 text-[11px] font-medium">
                            <FileText size={12} />
                            <span className="truncate max-w-[170px]">{m.attachmentName}</span>
                          </div>
                        )}

                        <span
                          className={`block text-[9.5px] mt-1 text-right ${
                            isClient ? "text-white/60" : "text-zinc-400"
                          }`}
                        >
                          {new Date(m.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Real-Time "Mahidi Shikder is typing..." Live Presence Indicator */}
                {isDeveloperTyping && (
                  <div className="flex gap-2 items-center justify-start py-1 animate-in fade-in duration-200">
                    <div className="size-7 shrink-0 overflow-hidden rounded-full bg-zinc-900 p-0.5 border border-[#5046E5]/30">
                      <Image
                        src={MAHIDI_PROFILE.avatar}
                        alt="Mahidi"
                        width={24}
                        height={24}
                        className="size-full rounded-full object-cover"
                      />
                    </div>
                    <div className="rounded-[16px] rounded-tl-[4px] bg-white border border-[#5046E5]/20 px-3.5 py-2 flex items-center gap-2 shadow-2xs">
                      <span className="text-[11.5px] font-bold text-[#5046E5]">
                        Mahidi Shikder is typing live
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-[#5046E5] animate-bounce [animation-delay:-0.3s]" />
                        <span className="size-1.5 rounded-full bg-[#5046E5] animate-bounce [animation-delay:-0.15s]" />
                        <span className="size-1.5 rounded-full bg-[#5046E5] animate-bounce" />
                      </span>
                    </div>
                  </div>
                )}

                {isSendingDevMsg && (
                  <div className="flex items-center justify-end gap-1.5 text-[11px] text-[#5046E5] font-medium pr-1">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Delivering to Mahidi...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Quick Prompts & Emoji Popovers */}
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

          {/* Bottom Message Input Box */}
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
                placeholder={
                  isListening
                    ? "Listening..."
                    : chatMode === "developer"
                    ? `Message Mahidi Shikder live... (Press Enter)`
                    : "Ask AI or inquire about website design..."
                }
                className="w-full resize-none border-0 bg-transparent text-[13px] text-[#1E232E] placeholder:text-[#9CA3AF] focus:outline-none"
              />

              <div className="mt-1 flex items-center justify-between border-t border-black/[0.04] pt-2">
                <div className="flex items-center gap-1 text-[#9CA3AF]">
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

                <button
                  type="submit"
                  disabled={(!input.trim() && !attachedFile) || isTypingAI || isSendingDevMsg}
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
