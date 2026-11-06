"use client";

import { ExternalLink, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function WorkSection() {
  const { projects } = portfolioData;

  const workStats = [
    { label: "Systems Deployed", value: "4 Core" },
    { label: "Peak Realtime Latency", value: "24ms" },
    { label: "Avg Token Optimization", value: "48%" },
  ];

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header Row: Heading + short line + 3 stats on the right */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-zinc-800/80">
        <div className="space-y-3">
          <div
            className="text-xs font-mono font-semibold text-[#ff3b2f] tracking-widest uppercase flex items-center gap-2"
            data-build="type"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
            SELECTED WORK
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight text-white"
            data-build="wipe"
          >
            Work that ships
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md" data-build="type">
            Battle-tested systems built for autonomy, scale, and uncompromising reliability.
          </p>
        </div>

        {/* 3 Stats on Right */}
        <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-auto">
          {workStats.map((st) => (
            <div
              key={st.label}
              data-build="pop"
              className="px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left"
            >
              <div className="text-lg sm:text-xl font-bold font-mono text-white">
                {st.value}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono uppercase mt-0.5">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid: Text Cards with 3-4 bullets, chips, links, NO screenshots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
        {projects.map((project) => (
          <article
            key={project.id}
            data-build="pop"
            className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-200"
          >
            {/* Accent Corner Glow on Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3b2f]/5 rounded-tr-2xl blur-2xl pointer-events-none group-hover:bg-[#ff3b2f]/10 transition" />

            <div>
              {/* Header meta */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                <span className="flex items-center gap-1.5 text-[#ff3b2f] font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  {project.role}
                </span>
                <span className="text-zinc-500">{project.period}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-anton)] text-white uppercase tracking-tight group-hover:text-[#ff3b2f] transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mt-2 mb-6">
                {project.tagline}
              </p>

              {/* 3 to 4 Bullet Points */}
              <ul className="space-y-2.5 mb-8">
                {project.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: Tech Chips + Live & Code Links */}
            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
                    aria-label={`Source code for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff3b2f]/10 border border-[#ff3b2f]/30 text-[#ff3b2f] hover:bg-[#ff3b2f] hover:text-white active:scale-95 text-xs font-mono font-medium focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer transition-colors"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
