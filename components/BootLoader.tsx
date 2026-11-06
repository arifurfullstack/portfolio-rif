"use client";

import { useEffect, useState } from "react";

export default function BootLoader() {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if agents are disabled via URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("agents") === "off") {
        setMounted(false);
        return;
      }
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => setMounted(false), 380);
          return 100;
        }
        return prev + 15;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#09090b] flex flex-col items-center justify-center transition-all duration-300 ${
        fading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-sm px-6 font-mono text-xs">
        <div className="flex items-center justify-between text-zinc-500 mb-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3b2f] animate-ping" />
            SYS_BOOT // AGENT_MESH_v4
          </span>
          <span className="text-[#ff3b2f] font-bold">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-3 border border-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-[#ff3b2f] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>SPAWNING 12 ROBOT CURSORS</span>
          <span className="text-zinc-500">CANVAS MOUNTED</span>
        </div>
      </div>
    </div>
  );
}

