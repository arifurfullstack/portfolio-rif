"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

export interface AgentConfig {
  id: string;
  name: string;
  color: string;
  badgeBg: string;
  border: string;
  role: string;
}

const ALL_AGENTS: AgentConfig[] = [
  { id: "scout", name: "Scout", color: "#38bdf8", badgeBg: "rgba(56, 189, 248, 0.15)", border: "#38bdf8", role: "Locating nodes" },
  { id: "layout", name: "Layout", color: "#818cf8", badgeBg: "rgba(129, 140, 248, 0.15)", border: "#818cf8", role: "Framing wireframe" },
  { id: "typeset", name: "Typeset", color: "#f43f5e", badgeBg: "rgba(244, 63, 94, 0.15)", border: "#f43f5e", role: "Streaming glyphs" },
  { id: "motion", name: "Motion", color: "#f59e0b", badgeBg: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", role: "Easing transforms" },
  { id: "qa", name: "QA", color: "#10b981", badgeBg: "rgba(16, 185, 129, 0.15)", border: "#10b981", role: "Verifying layout" },
  { id: "deploy", name: "Deploy", color: "#ec4899", badgeBg: "rgba(236, 72, 153, 0.15)", border: "#ec4899", role: "Mounting artifact" },
  { id: "copy", name: "Copy", color: "#a855f7", badgeBg: "rgba(168, 85, 247, 0.15)", border: "#a855f7", role: "Validating text" },
  { id: "lint", name: "Lint", color: "#14b8a6", badgeBg: "rgba(20, 184, 166, 0.15)", border: "#14b8a6", role: "AST conformance" },
  { id: "index", name: "Index", color: "#6366f1", badgeBg: "rgba(99, 102, 241, 0.15)", border: "#6366f1", role: "Cataloging keys" },
  { id: "render", name: "Render", color: "#eab308", badgeBg: "rgba(234, 179, 8, 0.15)", border: "#eab308", role: "Compositing GPU" },
  { id: "palette", name: "Palette", color: "#06b6d4", badgeBg: "rgba(6, 182, 212, 0.15)", border: "#06b6d4", role: "Contrast check" },
  { id: "review", name: "Review", color: "#84cc16", badgeBg: "rgba(132, 204, 22, 0.15)", border: "#84cc16", role: "Approval cycle" },
];

interface ActiveCursor {
  agent: AgentConfig;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  currentAction: string;
  isBuilding: boolean;
  boxRect: { top: number; left: number; width: number; height: number } | null;
  boxProgress: number; // 0 to 1
}

interface BuildQueueItem {
  el: HTMLElement;
  type: "type" | "pop" | "wipe";
  originalText?: string;
  order: number;
}

export default function RobotCursors() {
  const [enabled, setEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouring, setIsTouring] = useState(false);
  const [activeAgentsCount, setActiveAgentsCount] = useState(12);

  const cursorsRef = useRef<ActiveCursor[]>([]);
  const queueRef = useRef<BuildQueueItem[]>([]);
  const buildingSetRef = useRef<Set<HTMLElement>>(new Set());
  const isTouringRef = useRef(false);
  const isPausedRef = useRef(false);
  const tourRafRef = useRef<number | null>(null);

  // Canvas / Overlay state
  const [, setFrameTick] = useState(0);

  // Check URL params and localStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const agentsParam = params.get("agents");
    const stored = localStorage.getItem("portfolio_agents_mode");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isEnabled = true;
    if (agentsParam === "off") {
      isEnabled = false;
    } else if (agentsParam === "on") {
      isEnabled = true;
    } else if (stored !== null) {
      isEnabled = stored === "true";
    } else if (prefersReduced) {
      isEnabled = false;
    }

    setEnabled(isEnabled);
    if (!isEnabled) {
      document.documentElement.classList.remove("build-mode");
      // Mark all elements built immediately
      document.querySelectorAll("[data-build]").forEach((el) => {
        el.classList.add("built");
      });
      return;
    }

    document.documentElement.classList.add("build-mode");

    const isMobile = window.innerWidth < 768;
    const agentList = isMobile ? ALL_AGENTS.slice(0, 6) : ALL_AGENTS;
    setActiveAgentsCount(agentList.length);

    cursorsRef.current = agentList.map((agent, i) => ({
      agent,
      x: 100 + (i % 4) * 220,
      y: 120 + Math.floor(i / 4) * 160,
      targetX: 100 + (i % 4) * 220,
      targetY: 120 + Math.floor(i / 4) * 160,
      currentAction: "Standby",
      isBuilding: false,
      boxRect: null,
      boxProgress: 0,
    }));
  }, []);

  // Sync pause state ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTour();
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        toggleAgents();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePause();
      } else if (e.key === "Escape") {
        if (isTouringRef.current) {
          stopTour();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, isPaused]);

  // Toggle Agents ON/OFF
  const toggleAgents = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio_agents_mode", String(next));
      if (!next) {
        document.documentElement.classList.remove("build-mode");
        document.querySelectorAll("[data-build]").forEach((el) => {
          el.classList.add("built");
          el.classList.remove("building");
        });
        cursorsRef.current = [];
      } else {
        window.location.reload();
      }
      return next;
    });
  }, []);

  // Toggle Pause
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Auto-scroll Tour
  const startTour = useCallback(() => {
    if (isTouringRef.current) return;
    isTouringRef.current = true;
    setIsTouring(true);

    // Scroll to top first
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for hero to build a bit, then begin slow smooth cruise
    const startTimeout = setTimeout(() => {
      if (!isTouringRef.current) return;

      const duration = 24000; // 24 seconds smooth tour
      const startY = window.scrollY;
      const targetY = document.documentElement.scrollHeight - window.innerHeight;
      const startTime = performance.now();

      const scrollStep = (currentTime: number) => {
        if (!isTouringRef.current) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease in, steady linear, ease out
        let ease = progress;
        if (progress < 0.15) {
          ease = (progress / 0.15) * (progress / 0.15) * 0.15;
        } else if (progress > 0.85) {
          const p = (progress - 0.85) / 0.15;
          ease = 0.85 + (1 - (1 - p) * (1 - p)) * 0.15;
        }

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) {
          tourRafRef.current = requestAnimationFrame(scrollStep);
        } else {
          stopTour();
        }
      };

      tourRafRef.current = requestAnimationFrame(scrollStep);
    }, 1800);

    const handleUserInterrupt = () => {
      stopTour();
    };

    window.addEventListener("wheel", handleUserInterrupt, { once: true });
    window.addEventListener("touchmove", handleUserInterrupt, { once: true });

    return () => clearTimeout(startTimeout);
  }, []);

  const stopTour = useCallback(() => {
    isTouringRef.current = false;
    setIsTouring(false);
    if (tourRafRef.current) {
      cancelAnimationFrame(tourRafRef.current);
      tourRafRef.current = null;
    }
  }, []);

  const toggleTour = useCallback(() => {
    if (isTouringRef.current) {
      stopTour();
    } else {
      startTour();
    }
  }, [startTour, stopTour]);

  // Main Build Engine & IntersectionObserver
  useEffect(() => {
    if (!enabled) return;

    // Collect elements
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));

    // Prepare original text for type elements
    elements.forEach((el, index) => {
      const type = (el.getAttribute("data-build") as "type" | "pop" | "wipe") || "pop";
      let originalText = "";
      if (type === "type") {
        originalText = el.textContent || "";
        el.setAttribute("data-raw-text", originalText);
        // Reserve height to prevent layout shift
        el.style.minHeight = `${el.offsetHeight || 20}px`;
        el.textContent = "";
      }
      el.setAttribute("data-build-order", String(index));
    });

    // Observer: build elements as they scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (!target.classList.contains("built") && !buildingSetRef.current.has(target)) {
              const type = (target.getAttribute("data-build") as "type" | "pop" | "wipe") || "pop";
              const rawText = target.getAttribute("data-raw-text") || target.textContent || "";
              const order = parseInt(target.getAttribute("data-build-order") || "0", 10);

              // Check if not already queued
              if (!queueRef.current.some((item) => item.el === target)) {
                queueRef.current.push({ el: target, type, originalText: rawText, order });
                // Sort queue by DOM reading order
                queueRef.current.sort((a, b) => a.order - b.order);
              }
            }
          } else {
            // If already scrolled past (bounding rect top < 0), reveal immediately
            const rect = target.getBoundingClientRect();
            if (rect.bottom < 0 && !target.classList.contains("built")) {
              target.classList.add("built");
              const rawText = target.getAttribute("data-raw-text");
              if (rawText) target.textContent = rawText;
            }
          }
        });
      },
      {
        rootMargin: "100px 0px 50px 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // RequestAnimationFrame main loop
    let lastTime = performance.now();
    let animId: number;

    const buildElementWithCursor = (cursor: ActiveCursor, item: BuildQueueItem) => {
      const { el, type, originalText } = item;
      cursor.isBuilding = true;
      cursor.currentAction = `Building: ${type.toUpperCase()}`;
      buildingSetRef.current.add(el);
      el.classList.add("building");

      const rect = el.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      cursor.targetX = rect.left + scrollX + 10;
      cursor.targetY = rect.top + scrollY - 12;

      cursor.boxRect = {
        left: rect.left + scrollX - 4,
        top: rect.top + scrollY - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      };
      cursor.boxProgress = 0;

      // Stage 1: Draw wireframe box
      const wireframeDuration = 220;
      const startTime = performance.now();

      const animateBox = (now: number) => {
        if (isPausedRef.current) {
          requestAnimationFrame(animateBox);
          return;
        }

        const elapsed = now - startTime;
        cursor.boxProgress = Math.min(elapsed / wireframeDuration, 1);

        if (cursor.boxProgress < 1) {
          requestAnimationFrame(animateBox);
        } else {
          // Stage 2: Reveal content
          revealContent();
        }
      };

      const revealContent = () => {
        if (type === "type" && originalText) {
          let charIndex = 0;
          const chars = originalText.split("");
          const typeInterval = setInterval(() => {
            if (isPausedRef.current) return;
            if (charIndex <= chars.length) {
              el.textContent = chars.slice(0, charIndex).join("");
              charIndex++;
            } else {
              clearInterval(typeInterval);
              finish();
            }
          }, 14);
        } else if (type === "wipe") {
          el.style.clipPath = "inset(0 100% 0 0)";
          el.classList.add("built");
          el.style.transition = "clip-path 450ms cubic-bezier(0.16, 1, 0.3, 1)";
          requestAnimationFrame(() => {
            el.style.clipPath = "inset(0 0% 0 0)";
          });
          setTimeout(finish, 480);
        } else {
          // "pop"
          el.style.transform = "scale(0.85)";
          el.style.opacity = "0.2";
          el.classList.add("built");
          el.style.transition = "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 240ms ease";
          requestAnimationFrame(() => {
            el.style.transform = "scale(1)";
            el.style.opacity = "1";
          });
          setTimeout(finish, 350);
        }
      };

      const finish = () => {
        el.classList.remove("building");
        el.classList.add("built");
        el.style.transform = "";
        el.style.transition = "";
        buildingSetRef.current.delete(el);

        // Fade wireframe
        setTimeout(() => {
          cursor.boxRect = null;
          cursor.boxProgress = 0;
          cursor.isBuilding = false;
          cursor.currentAction = "Standby";
        }, 150);
      };

      requestAnimationFrame(animateBox);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isPausedRef.current) {
        // Assign items to free cursors (max 6 building simultaneously)
        const activeBuildingCount = cursorsRef.current.filter((c) => c.isBuilding).length;

        if (activeBuildingCount < 6 && queueRef.current.length > 0) {
          const availableCursor = cursorsRef.current.find((c) => !c.isBuilding);
          if (availableCursor) {
            const nextItem = queueRef.current.shift();
            if (nextItem && !nextItem.el.classList.contains("built")) {
              buildElementWithCursor(availableCursor, nextItem);
            }
          }
        }

        // Smoothly interpolate cursors toward targetX, targetY
        cursorsRef.current.forEach((c) => {
          const speed = c.isBuilding ? 12 : 7;
          c.x += (c.targetX - c.x) * Math.min(speed * dt, 1);
          c.y += (c.targetY - c.y) * Math.min(speed * dt, 1);
        });
      }

      setFrameTick(now);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [enabled]);

  return (
    <>
      {/* Robot Cursors & Wireframes Canvas Layer */}
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {cursorsRef.current.map((c) => {
            // Screen relative position
            const screenX = c.x - (typeof window !== "undefined" ? window.scrollX : 0);
            const screenY = c.y - (typeof window !== "undefined" ? window.scrollY : 0);

            const box = c.boxRect
              ? {
                  left: c.boxRect.left - (typeof window !== "undefined" ? window.scrollX : 0),
                  top: c.boxRect.top - (typeof window !== "undefined" ? window.scrollY : 0),
                  width: c.boxRect.width,
                  height: c.boxRect.height,
                }
              : null;

            return (
              <React.Fragment key={c.agent.id}>
                {/* Blue Wireframe Box with Corner Handles */}
                {box && (
                  <div
                    className="absolute pointer-events-none transition-opacity duration-150"
                    style={{
                      left: `${box.left}px`,
                      top: `${box.top}px`,
                      width: `${box.width}px`,
                      height: `${box.height}px`,
                      border: "1.5px dashed #38bdf8",
                      backgroundColor: "rgba(56, 189, 248, 0.05)",
                      opacity: c.boxProgress,
                      boxShadow: "0 0 15px rgba(56, 189, 248, 0.25)",
                    }}
                  >
                    {/* Corner Handles */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#38bdf8] border border-black shadow" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#38bdf8] border border-black shadow" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#38bdf8] border border-black shadow" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#38bdf8] border border-black shadow" />

                    {/* Wireframe Tag */}
                    <div className="absolute -top-5 left-1 px-1.5 py-0.5 rounded bg-zinc-900 border border-sky-400 text-[10px] font-mono text-sky-400 font-semibold tracking-wider flex items-center gap-1 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                      {c.agent.name}: {c.currentAction}
                    </div>
                  </div>
                )}

                {/* Robot Cursor Pointer + Tag */}
                <div
                  className="absolute pointer-events-none transition-transform will-change-transform"
                  style={{
                    transform: `translate3d(${screenX}px, ${screenY}px, 0)`,
                  }}
                >
                  {/* High-precision Arrow Pointer */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter"
                    style={{ transform: "rotate(-15deg)" }}
                  >
                    <path
                      d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
                      fill={c.agent.color}
                      stroke="#09090b"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Robot Head Badge */}
                  <div
                    className="absolute left-4 top-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-2xl backdrop-blur-md whitespace-nowrap text-xs font-mono"
                    style={{
                      backgroundColor: "rgba(10, 10, 14, 0.92)",
                      borderColor: c.agent.border,
                      boxShadow: `0 4px 14px ${c.agent.badgeBg}`,
                    }}
                  >
                    {/* Micro Robot Head with LED blinking eyes & pulsing antenna */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        {/* Antenna with pulsing tip */}
                        <line x1="8" y1="1" x2="8" y2="4" stroke={c.agent.color} strokeWidth="1.2" />
                        <circle cx="8" cy="1.2" r="1.4" fill={c.agent.color} className="animate-antenna" />
                        {/* Head */}
                        <rect
                          x="2"
                          y="4"
                          width="12"
                          height="10"
                          rx="2.5"
                          fill="#18181b"
                          stroke={c.agent.color}
                          strokeWidth="1.2"
                        />
                        {/* Blinking LED eyes */}
                        <circle cx="5.5" cy="8.5" r="1.1" fill={c.agent.color} className="animate-blink" />
                        <circle cx="10.5" cy="8.5" r="1.1" fill={c.agent.color} className="animate-blink" />
                        {/* Mouth bar */}
                        <line x1="5.5" y1="11.5" x2="10.5" y2="11.5" stroke={c.agent.color} strokeWidth="1" />
                      </svg>
                    </div>

                    <span className="font-bold tracking-wide" style={{ color: c.agent.color }}>
                      {c.agent.name}
                    </span>

                    {c.isBuilding && (
                      <span className="text-[10px] text-zinc-400 font-normal border-l border-zinc-700 pl-1.5">
                        {c.currentAction}
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Floating Control Dock */}
      <nav aria-label="Build controls" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full bg-zinc-950/90 border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl text-xs font-mono">
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-zinc-400">
            <span
              className={`w-2 h-2 rounded-full ${
                enabled && !isPaused ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-zinc-600"
              }`}
            />
            <span className="hidden sm:inline font-medium">
              {enabled ? (isPaused ? "PAUSED" : `${activeAgentsCount} AGENTS`) : "MANUAL"}
            </span>
          </div>

          <div className="w-[1px] h-4 bg-zinc-800" />

          {/* Pause / Resume */}
          <button
            onClick={togglePause}
            disabled={!enabled}
            title="Press P to Pause / Resume"
            className={`px-3 py-1.5 rounded-full font-medium transition cursor-pointer flex items-center gap-1.5 ${
              isPaused
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-95 disabled:opacity-40"
            }`}
          >
            {isPaused ? "Resume (P)" : "Pause (P)"}
          </button>

          {/* Agents ON / OFF */}
          <button
            onClick={toggleAgents}
            title="Press A to toggle Agents animation"
            className={`px-3 py-1.5 rounded-full font-medium transition cursor-pointer ${
              enabled
                ? "bg-[#ff3b2f]/15 text-[#ff3b2f] border border-[#ff3b2f]/40 hover:bg-[#ff3b2f]/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/80 active:scale-95"
            }`}
          >
            Agents: {enabled ? "ON" : "OFF"} (A)
          </button>

          {/* Tour Mode */}
          <button
            onClick={toggleTour}
            title="Press T to start auto-scrolling Tour for screen recording"
            className={`px-3.5 py-1.5 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              isTouring
                ? "bg-[#ff3b2f] text-white shadow-[0_0_15px_rgba(255,59,47,0.5)] animate-pulse"
                : "bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-md"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isTouring ? "bg-white" : "bg-red-500"}`} />
            {isTouring ? "Touring (Esc)" : "Tour (T)"}
          </button>
        </div>
      </nav>
    </>
  );
}

