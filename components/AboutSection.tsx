"use client";

import { CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div
          className="text-xs font-mono font-semibold text-[#ff3b2f] tracking-widest uppercase flex items-center gap-2"
          data-build="type"
        >
          <UserCheck className="w-3.5 h-3.5" />
          PHILOSOPHY &amp; CAPABILITIES
        </div>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight text-white"
          data-build="wipe"
        >
          Engineering Taste
        </h2>
      </div>

      {/* 2 Short Paragraphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-zinc-300 text-base sm:text-lg leading-relaxed">
        <div
          className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80"
          data-build="type"
        >
          <p>{about.paragraphs[0]}</p>
        </div>
        <div
          className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80"
          data-build="type"
        >
          <p>{about.paragraphs[1]}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mb-20">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4 text-[#ff3b2f]" />
          <span>TECHNICAL DOMAINS &amp; EXPERTISE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {about.skillsGrid.map((group) => (
            <div
              key={group.category}
              data-build="pop"
              className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition"
            >
              <h3 className="text-sm font-mono font-semibold text-[#ff3b2f] tracking-wide mb-4 uppercase">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-sans"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Principles I Work By */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
          <span>4 PRINCIPLES I WORK BY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {about.principles.map((pr) => (
            <div
              key={pr.number}
              data-build="pop"
              className="p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-zinc-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-[family-name:var(--font-anton)] text-zinc-700 mb-3">
                  {pr.number}
                </div>
                <h3 className="text-xl font-[family-name:var(--font-anton)] uppercase tracking-wide text-white mb-2">
                  {pr.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {pr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
