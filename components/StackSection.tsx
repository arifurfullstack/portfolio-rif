"use client";

import { portfolioData } from "@/data/portfolio";
import { Cpu } from "lucide-react";

export default function StackSection() {
  const { stack } = portfolioData;

  // Split stack into 2 rows for rich visual density
  const half = Math.ceil(stack.length / 2);
  const row1 = stack.slice(0, half);
  const row2 = stack.slice(half);

  // Duplicate items for continuous infinite seamless looping
  const row1Items = [...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2];

  return (
    <section className="py-20 border-y border-zinc-900 bg-zinc-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div
            className="text-xs font-mono font-semibold text-[#ff3b2f] tracking-widest uppercase flex items-center gap-2"
            data-build="type"
          >
            <Cpu className="w-3.5 h-3.5" />
            STACK ARCHITECTURE
          </div>
          <h2
            className="text-2xl sm:text-3xl font-[family-name:var(--font-anton)] text-white uppercase tracking-tight"
            data-build="wipe"
          >
            Technologies &amp; Runtime Tools
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-400" data-build="type">
          Hover to pause inspection
        </div>
      </div>

      {/* Endless Marquee with Faded Edges */}
      <div className="relative w-full marquee-container overflow-hidden space-y-4 py-2">
        {/* Left Faded Edge */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        {/* Right Faded Edge */}
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left to right marquee */}
        <div className="animate-marquee-reverse flex items-center gap-3">
          {row1Items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#ff3b2f]/50 transition-colors shrink-0 shadow-sm select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
              <span className="font-mono text-xs sm:text-sm font-medium">{item.name}</span>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Right to left or offset speed */}
        <div className="animate-marquee flex items-center gap-3">
          {row2Items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors shrink-0 shadow-sm select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="font-mono text-xs sm:text-sm font-medium">{item.name}</span>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
