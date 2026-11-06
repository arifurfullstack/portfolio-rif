"use client";

import { Award, Briefcase, GraduationCap, History } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function RecordSection() {
  const { timeline } = portfolioData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return <Briefcase className="w-4 h-4 text-[#ff3b2f]" />;
      case "hackathon":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      default:
        return <History className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="record" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-3 mb-16">
        <div
          className="text-xs font-mono font-semibold text-[#ff3b2f] tracking-widest uppercase flex items-center gap-2"
          data-build="type"
        >
          <History className="w-3.5 h-3.5" />
          CHRONOLOGICAL RECORD
        </div>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight text-white"
          data-build="wipe"
        >
          Experience, Hackathons &amp; Education
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl" data-build="type">
          Milestones across high-scale engineering roles, competitive hackathons, and academic foundations.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-zinc-800 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
        {timeline.map((item) => (
          <div key={item.id} data-build="pop" className="relative group">
            {/* Timeline Dot with Glow */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center group-hover:border-[#ff3b2f] group-hover:shadow-[0_0_12px_rgba(255,59,47,0.4)] transition">
              <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                  {item.year}
                </span>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ff3b2f]/10 border border-[#ff3b2f]/30 text-[#ff3b2f] text-[10px] font-mono font-semibold uppercase">
                      {item.badge}
                    </span>
                  )}
                  <span className="p-1 rounded-md bg-zinc-900 border border-zinc-800">
                    {getTypeIcon(item.type)}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-anton)] text-white tracking-wide uppercase">
                {item.title}
              </h3>
              <div className="text-sm font-mono text-[#ff3b2f] font-medium mt-0.5 mb-3">
                {item.organization}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

