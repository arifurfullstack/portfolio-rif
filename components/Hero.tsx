"use client";

import Image from "next/image";
import { ArrowDownRight, MapPin, FileDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal, heroStats } = portfolioData;

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Soft Red Radial Background Glow behind Headshot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[720px] h-[340px] sm:h-[560px] md:h-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 59, 47, 0.22) 0%, rgba(255, 59, 47, 0.06) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Giant Word PORTFOLIO in Anton with Metallic Gradient & Sweeping Light Sheen */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <div className="relative text-center w-full px-2" data-build="wipe">
          <h1 className="font-[family-name:var(--font-anton)] text-[17vw] sm:text-[18vw] leading-none uppercase tracking-tighter portfolio-metallic">
            PORTFOLIO
          </h1>
          <div className="portfolio-sheen font-[family-name:var(--font-anton)] text-[17vw] sm:text-[18vw] leading-none uppercase tracking-tighter">
            PORTFOLIO
          </div>
        </div>
      </div>

      {/* Headshot Centered in Front of PORTFOLIO Word */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center items-end pointer-events-none">
        <div
          data-build="pop"
          className="relative w-[300px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[480px] sm:h-[620px] md:h-[720px] lg:h-[800px] flex justify-center items-end pointer-events-auto group cursor-pointer"
          style={{
            maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
          }}
          title="Md. Arifur Rahman (Hover to reveal natural color)"
        >
          <Image
            src="/headshot.png"
            alt={personal.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 340px, 580px"
            className="object-contain object-bottom filter grayscale contrast-115 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>

      {/* Hero Foreground Content Grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mt-12 sm:mt-0">
        {/* Left Column: Hello, I'm, Name, Role, Bio, View Work, City */}
        <div className="w-full lg:max-w-xl space-y-5 text-left">
          {/* Handwritten Line */}
          <div
            className="font-[family-name:var(--font-caveat-brush)] text-2xl sm:text-3xl text-zinc-300 tracking-wide"
            data-build="type"
          >
            Hello, I&apos;m
          </div>

          {/* Huge Name */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-[family-name:var(--font-anton)] uppercase"
            data-build="wipe"
          >
            {personal.name}
          </h2>

          {/* Role in Red */}
          <div
            className="inline-block text-lg sm:text-xl font-mono font-semibold text-[#ff3b2f] tracking-wide"
            data-build="type"
          >
            {personal.role}
          </div>

          {/* 2-line Bio */}
          <p
            className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-lg font-normal"
            data-build="type"
          >
            {personal.tagline}
          </p>

          {/* Actions & City */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToWork}
              data-build="pop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff3b2f] text-white font-medium text-sm hover:bg-[#e03126] active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none shadow-[0_4px_20px_rgba(255,59,47,0.35)] cursor-pointer"
            >
              <span>View work</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <a
              href={personal.resumeUrl}
              download
              data-build="pop"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-sm hover:bg-zinc-800 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-[#ff3b2f] focus-visible:outline-none cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-zinc-400" />
              <span>Resume PDF</span>
            </a>

            <div
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 pl-1"
              data-build="type"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ff3b2f]" />
              <span>Based in {personal.city}</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Real Stats from Resume */}
        <div className="w-full lg:w-auto flex flex-row lg:flex-col gap-3 sm:gap-4 lg:items-end justify-start sm:justify-end">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              data-build="pop"
              className="flex-1 lg:flex-initial w-full lg:w-64 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-lg hover:border-zinc-700 transition"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-anton)] text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#ff3b2f] font-mono mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 hidden sm:block">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

