"use client";

import React, { useEffect, useState } from "react";
import { Download, Mail, Users, Check, Copy, RefreshCw, Sparkles } from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  interest: string;
  source?: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setSubscribers(data.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="site-container max-w-[1100px] py-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-8 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0077ed]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0077ed] mb-2">
            <Sparkles size={13} />
            <span>Marketing Lead Management</span>
          </div>
          <h1 className="text-3xl font-black text-[#1d1d1f] tracking-tight">
            Registered Users & Email Leads
          </h1>
          <p className="mt-1 text-sm text-[#515154]">
            All visitors who signed in or created an account. Export anytime for marketing campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={copyAllEmails}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-xs font-bold text-[#1d1d1f] shadow-xs transition hover:bg-[#f5f5f7] active:scale-95 disabled:opacity-50"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Emails"}</span>
          </button>

          <a
            href="/api/admin/users?format=csv"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-[#0077ed] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0062c4] active:scale-95"
          >
            <Download size={14} />
            <span>Download CSV</span>
          </a>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-[#86868b]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <Users size={18} className="text-[#0077ed]" />
          </div>
          <p className="mt-3 text-3xl font-black text-[#1d1d1f]">{subscribers.length}</p>
          <span className="mt-1 block text-xs text-emerald-600 font-semibold">Ready for email marketing</span>
        </div>

        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-[#86868b]">
            <span className="text-xs font-bold uppercase tracking-wider">Marketing Consent</span>
            <Mail size={18} className="text-[#7928ca]" />
          </div>
          <p className="mt-3 text-3xl font-black text-[#1d1d1f]">100%</p>
          <span className="mt-1 block text-xs text-[#515154]">Opted-in via portal login</span>
        </div>

        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-[#86868b]">
            <span className="text-xs font-bold uppercase tracking-wider">Integrations</span>
            <RefreshCw size={18} className="text-[#0077ed]" />
          </div>
          <p className="mt-3 text-sm font-bold text-[#1d1d1f]">CSV / Mailchimp / Klaviyo</p>
          <span className="mt-1 block text-xs text-[#515154]">Instant 1-click import compatible</span>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#fbfbfd] px-6 py-4">
          <h2 className="text-sm font-bold text-[#1d1d1f]">Subscribers & Captured Emails</h2>
          <button
            type="button"
            onClick={fetchSubscribers}
            className="text-xs font-semibold text-[#0077ed] hover:underline flex items-center gap-1"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-[#86868b]">Loading subscribers...</div>
        ) : subscribers.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#86868b]">
            No emails captured yet. Test the new Login/Sign Up button in the navigation!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/5 bg-[#f5f5f7] text-[#515154] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email Address</th>
                  <th className="py-3 px-6">Primary Interest</th>
                  <th className="py-3 px-6">Source</th>
                  <th className="py-3 px-6">Date Captured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {subscribers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#fbfbfd] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#1d1d1f]">{user.name}</td>
                    <td className="py-3.5 px-6 text-[#0077ed] font-medium">{user.email}</td>
                    <td className="py-3.5 px-6">
                      <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#515154]">
                        {user.interest || "General"}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-[#86868b]">{user.source || "Website Nav"}</td>
                    <td className="py-3.5 px-6 text-[#86868b]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
