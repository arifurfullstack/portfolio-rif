"use client";

import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function ContactSection() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Big Call-To-Action Card */}
      <div
        data-build="pop"
        className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl mb-16"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#ff3b2f]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
            data-build="type"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AVAILABLE FOR CONTRACTS &amp; FOUNDING ROLES
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight text-white leading-tight"
            data-build="wipe"
          >
            Let&apos;s build something <span className="text-[#ff3b2f]">extraordinary</span> together.
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed" data-build="type">
            Whether you&apos;re architecting an autonomous agent runtime, designing real-time infrastructure, or need an elite engineer to ship zero-to-one.
          </p>

          {/* Action Buttons: Direct Email & One-Click Copy */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={`mailto:${personal.email}`}
              data-build="pop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff3b2f] text-white font-medium text-sm hover:bg-[#e03126] active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none shadow-[0_4px_24px_rgba(255,59,47,0.4)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </a>

            <button
              onClick={copyEmail}
              data-build="pop"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs hover:bg-zinc-800 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied {personal.email}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy {personal.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links Row */}
          <div className="pt-6 flex items-center justify-center gap-4">
            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                data-build="pop"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-build="pop"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            {personal.twitter && (
              <a
                href={personal.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-build="pop"
                aria-label="Twitter Profile"
                className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            )}
            {personal.instagram && (
              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-build="pop"
                aria-label="Instagram Profile"
                className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              data-build="pop"
              aria-label="Email Direct"
              className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span>&copy; 2026 {personal.name}</span>
          <span>&bull;</span>
          <span className="text-[#ff3b2f]">Made with Next.js 15</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span>Keyboard: <strong className="text-zinc-300">T</strong> Tour</span>
          <span><strong className="text-zinc-300">A</strong> Agents</span>
          <span><strong className="text-zinc-300">P</strong> Pause</span>
        </div>
      </div>
    </footer>
  );
}
