"use client";

import {
  BadgeCheck,
  ChartColumn,
  ShieldAlert,
  Signal,
  Wifi,
} from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, type ComponentType } from "react";

type Tone = "emerald" | "red" | "indigo" | "cyan" | "violet";

type NodeCard = {
  id: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
  variant: "card" | "pill" | "stack" | "center";
  icon?: ComponentType<{ className?: string }>;
};

const PATHS = [
  {
    id: "g-tl",
    d: "M 205 228 C 175 188, 140 112, 87 72",
    color: "#10b981",
  },
  {
    id: "g-fl",
    d: "M 190 310 C 148 305, 105 295, 48 280",
    color: "#ef4444",
  },
  {
    id: "g-bl",
    d: "M 195 357 C 168 415, 132 472, 94 523",
    color: "#6366f1",
  },
  {
    id: "g-br",
    d: "M 285 357 C 315 415, 355 472, 394 525",
    color: "#06b6d4",
  },
  {
    id: "g-tpsr",
    d: "M 284 302 C 320 285, 362 268, 418 250",
    color: "#8b5cf6",
  },
];

const LINK_DOTS = [
  { cx: 177.7, cy: 186.4, tone: "emerald" as const, r: 3.5, opacity: 0.06 },
  { cx: 97.6, cy: 80.8, tone: "emerald" as const, r: 3.5, opacity: 0.5 },
  { cx: 155.4, cy: 151.3, tone: "emerald" as const, r: 3.5, opacity: 0.9 },
  { cx: 56.3, cy: 282.2, tone: "red" as const, r: 3.5, opacity: 0.44 },
  { cx: 122.2, cy: 298.2, tone: "red" as const, r: 3.5, opacity: 0.9 },
  { cx: 179.4, cy: 308.6, tone: "red" as const, r: 3.5, opacity: 0.28 },
  { cx: 176.4, cy: 394.1, tone: "indigo" as const, r: 3.5, opacity: 0.71 },
  { cx: 113.5, cy: 495.9, tone: "indigo" as const, r: 3.5, opacity: 0.85 },
  { cx: 163.1, cy: 418.3, tone: "indigo" as const, r: 3.5, opacity: 0.9 },
  { cx: 366.6, cy: 487.1, tone: "cyan" as const, r: 3.5, opacity: 0.9 },
  { cx: 316.8, cy: 412.7, tone: "cyan" as const, r: 3.5, opacity: 0.9 },
  { cx: 389.6, cy: 519.0, tone: "cyan" as const, r: 3.5, opacity: 0.4 },
  { cx: 380.9, cy: 262.5, tone: "violet" as const, r: 3.5, opacity: 0.9 },
  { cx: 321.0, cy: 285.5, tone: "violet" as const, r: 3.5, opacity: 0.9 },
  { cx: 411.9, cy: 252.0, tone: "violet" as const, r: 3.5, opacity: 0.4 },
];

const AMBIENT_DOTS = [
  { cx: 452, cy: 200, tone: "indigo" as const, r: 1.6, opacity: 0.54 },
  { cx: 454, cy: 350, tone: "cyan" as const, r: 1.4, opacity: 0.48 },
  { cx: 24, cy: 380, tone: "violet" as const, r: 1.4, opacity: 0.45 },
  { cx: 185, cy: 612, tone: "indigo" as const, r: 1.4, opacity: 0.13 },
  { cx: 300, cy: 616, tone: "violet" as const, r: 1.4, opacity: 0.3 },
];

const CARDS: NodeCard[] = [
  {
    id: "approved",
    title: "Aprobada",
    subtitle: "#847",
    x: 10,
    y: 20,
    w: 155,
    h: 104,
    tone: "emerald",
    variant: "card",
    icon: BadgeCheck,
  },
  {
    id: "fraud",
    title: "Fraude",
    subtitle: "Blocked",
    x: -22,
    y: 220,
    w: 110,
    h: 112,
    tone: "red",
    variant: "card",
    icon: ShieldAlert,
  },
  {
    id: "volume",
    title: "Vol. Procesado",
    subtitle: "+18%",
    x: 10,
    y: 468,
    w: 168,
    h: 140,
    tone: "indigo",
    variant: "stack",
    icon: ChartColumn,
  },
  {
    id: "terminals",
    title: "Terminales",
    subtitle: "Checkout",
    x: 286,
    y: 468,
    w: 152,
    h: 136,
    tone: "cyan",
    variant: "card",
    icon: Wifi,
  },
  {
    id: "uptime",
    title: "99.99% uptime",
    x: 284,
    y: 100,
    w: 150,
    h: 46,
    tone: "emerald",
    variant: "pill",
  },
  {
    id: "latency",
    title: "Latency < 80ms",
    x: 312,
    y: 390,
    w: 128,
    h: 38,
    tone: "violet",
    variant: "pill",
  },
  {
    id: "tps",
    title: "TPS en vivo",
    subtitle: "transactions / sec",
    x: 330,
    y: 195,
    w: 162,
    h: 162,
    tone: "violet",
    variant: "stack",
    icon: Signal,
  },
];

function toneToColor(tone: Tone) {
  switch (tone) {
    case "emerald":
      return "#10b981";
    case "red":
      return "#ef4444";
    case "indigo":
      return "#818cf8";
    case "cyan":
      return "#06b6d4";
    case "violet":
      return "#8b5cf6";
  }
}

function toneToBorder(tone: Tone) {
  switch (tone) {
    case "emerald":
      return "rgba(16, 185, 129, 0.25)";
    case "red":
      return "rgba(239, 68, 68, 0.25)";
    case "indigo":
      return "rgba(129, 140, 248, 0.25)";
    case "cyan":
      return "rgba(6, 182, 212, 0.25)";
    case "violet":
      return "rgba(139, 92, 246, 0.25)";
  }
}

function toneToGlow(tone: Tone) {
  switch (tone) {
    case "emerald":
      return "rgba(16, 185, 129, 0.28)";
    case "red":
      return "rgba(239, 68, 68, 0.28)";
    case "indigo":
      return "rgba(129, 140, 248, 0.28)";
    case "cyan":
      return "rgba(6, 182, 212, 0.28)";
    case "violet":
      return "rgba(139, 92, 246, 0.28)";
  }
}

export function NetworkScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);
  const totalBars = 10;

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      const halo = scene.querySelector<HTMLElement>("[data-halo]");
      if (halo) {
        gsap.to(halo, {
          scale: 1.12,
          opacity: 0.95,
          duration: 4.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: index % 2 === 0 ? -6 : 6,
          x: index % 3 === 0 ? 5 : -5,
          rotate: index % 2 === 0 ? 1.1 : -1.1,
          duration: 4 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      dotRefs.current.forEach((dot, index) => {
        if (!dot) return;
        gsap.to(dot, {
          scale: 1.45,
          opacity: 0.95,
          duration: 1.8 + (index % 3) * 0.25,
          repeat: -1,
          yoyo: true,
          delay: index * 0.04,
          ease: "sine.inOut",
        });
      });
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center opacity-100">
      <div
        ref={sceneRef}
        className="relative mx-auto aspect-[3/4] h-[640px] w-full max-w-full select-none [contain:layout_style]"
        style={{
          width: "min(100%, 480px)",
          margin: "0 auto",
        }}
      >
        <div
          data-halo
          className="pointer-events-none absolute left-1/2 top-[317px] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 blur-[32px] will-change-transform"
          style={{
            background:
              "radial-gradient(rgba(124, 58, 237, 0.32) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 70%)",
          }}
        />

        <svg
          viewBox="0 0 480 640"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        >
          <defs>
            <linearGradient id="g-tl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="g-bl" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="55%" stopColor="#6366f1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="g-br" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="g-fl" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
              <stop offset="55%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="g-tpsr" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="core-halo-1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="core-halo-2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.03" />
              <stop offset="55%" stopColor="#6366f1" stopOpacity="0.01" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {PATHS.map((path) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke={`url(#${path.id})`}
              strokeWidth="1.5"
              strokeDasharray="1px 1px"
              opacity="1"
              pathLength="1"
              strokeDashoffset="0px"
            />
          ))}

          {LINK_DOTS.map((dot, index) => {
            const color = toneToColor(dot.tone);
            return (
              <circle
                key={`${dot.cx}-${dot.cy}-${index}`}
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
                r={dot.r}
                fill={color}
                cx={dot.cx}
                cy={dot.cy}
                opacity={dot.opacity ?? 0.9}
                style={{
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              />
            );
          })}

          {AMBIENT_DOTS.map((dot, index) => (
            <circle
              key={`${dot.cx}-${dot.cy}-${index}`}
              r={dot.r}
              fill={toneToColor(dot.tone)}
              cx={dot.cx}
              cy={dot.cy}
              opacity={dot.opacity}
            />
          ))}

          <g>
            <circle cx="240" cy="317" r="50" fill="url(#core-halo-1)" />
            <circle cx="240" cy="317" r="86" fill="url(#core-halo-2)" />
            <circle
              cx="240"
              cy="317"
              r="11"
              fill="#c4b5fd"
              opacity="0.8"
              style={{
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            />
            <circle
              cx="240"
              cy="317"
              r="19"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
            <circle
              cx="240"
              cy="317"
              r="34"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="0.4"
              strokeOpacity="0.07"
            />
          </g>
        </svg>

        {CARDS.map((card, index) => {
          const border = toneToBorder(card.tone);
          const glow = toneToGlow(card.tone);
          const color = toneToColor(card.tone);
          const positionStyle = {
            left: `${card.x}px`,
            top: `${card.y}px`,
            width: `${card.w}px`,
            minHeight: `${card.h}px`,
          } as const;

          if (card.variant === "pill") {
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-float-card
                className="absolute z-20"
                style={positionStyle}
              >
                <div
                  className="flex items-center gap-3 rounded-full border backdrop-blur-[20px] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)] whitespace-nowrap"
                  style={{
                    background: "rgba(10, 10, 28, 0.8)",
                    borderColor: border,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 28px ${glow}`,
                  }}
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                  <span
                    className="text-sm font-extrabold"
                    style={{ color }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-float-card
              className="absolute z-20"
              style={positionStyle}
            >
              <div
                className="absolute inset-0 rounded-[24px] border pointer-events-none"
                style={{
                  borderColor: border,
                  boxShadow: `0 0 32px ${glow}, 0 0 24px rgba(255,255,255,0.06) inset`,
                  transform: "scale(1.04)",
                }}
              />
              <div
                className="absolute inset-[-18px] rounded-[32px] border pointer-events-none"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              />
              <div
                className="relative overflow-hidden rounded-[16px] border backdrop-blur-[28px] p-[13px_15px]"
                style={{
                  background: "rgba(10, 10, 28, 0.8)",
                  borderColor: border,
                  boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 28px ${glow}, 0 1px 0 rgba(255,255,255,0.06) inset`,
                }}
              >
                <div
                  className="absolute top-0 left-[12%] right-[12%] h-px"
                  style={{
                    background:
                      `linear-gradient(90deg, transparent, ${border.replace("0.25", "0.565")}, transparent)`,
                  }}
                />

                {card.id === "approved" && (
                  <>
                    <div className="flex items-center justify-between mb-[7px]">
                      <div className="flex items-center gap-[5px]">
                        <BadgeCheck className="h-[11px] w-[11px]" style={{ color }} />
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.05em]"
                          style={{ color }}
                        >
                          Approved
                        </span>
                      </div>
                      <div
                        className="rounded-[4px] border px-[5px] py-[2px] text-[9px] font-bold"
                        style={{
                          color,
                          background: "rgba(16, 185, 129, 0.14)",
                          borderColor: "rgba(16, 185, 129, 0.24)",
                        }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <div className="flex h-[14px] w-[20px] shrink-0 items-center justify-center rounded-[3px] bg-gradient-to-br from-amber-300 to-amber-600">
                        <div className="h-[7px] w-[11px] rounded-[1px] border border-black/25" />
                      </div>
                      <span className="text-[10px] text-slate-500">•••• 4521</span>
                    </div>
                  </>
                )}

                {card.id === "fraud" && (
                  <>
                    <div className="mb-[8px] flex items-center gap-1.5">
                      <ShieldAlert className="h-[11px] w-[11px]" style={{ color }} />
                      <span
                        className="text-[8px] font-bold uppercase tracking-[0.04em]"
                        style={{ color }}
                      >
                        Fraud
                      </span>
                    </div>
                    <div className="mb-[6px]">
                      <div
                        className="mb-[3px] text-[8px] font-semibold"
                        style={{ color: "rgb(252,165,165)" }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                    <div className="mb-[6px] h-px w-full" style={{ background: "rgba(239,68,68,0.15)" }} />
                    <div className="flex items-center gap-[3px]">
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                      />
                      <span className="text-[7px] text-slate-500">Attempt rejected</span>
                    </div>
                  </>
                )}

                {card.id === "volume" && (
                  <>
                    <div className="mb-[7px] flex items-center justify-between">
                      <div className="flex items-center gap-[4px]">
                        <ChartColumn className="h-[10px] w-[10px]" style={{ color }} />
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.05em]"
                          style={{ color }}
                        >
                          Volume processed
                        </span>
                      </div>
                      <div className="flex items-center gap-[2px] text-[10px] font-bold text-emerald-500">
                        ↑ {card.subtitle}
                      </div>
                    </div>
                    <div className="flex items-end gap-[3px] h-[30px]">
                      {Array.from({ length: totalBars }).map((_, barIndex) => {
                        const heights = [38, 52, 44, 62, 55, 70, 64, 80, 74, 100];
                        const active = barIndex >= 7;
                        return (
                          <div
                            key={barIndex}
                            className="flex-1 rounded-t-[2px]"
                            style={{
                              height: `${heights[barIndex]}%`,
                              background: active
                                ? "linear-gradient(rgb(167, 139, 250), rgb(109, 40, 217))"
                                : "rgba(139, 92, 246, 0.18)",
                              boxShadow: active ? "0 0 8px rgba(139,92,246,0.65)" : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                )}

                {card.id === "terminals" && (
                  <>
                    <div className="mb-[9px] flex items-center gap-[5px]">
                      <Wifi className="h-[11px] w-[11px]" style={{ color }} />
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.05em]"
                        style={{ color }}
                      >
                        Terminals
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-[5px] min-h-[24px]">
                      <div
                        className="rounded-[6px] border px-2 py-[3px] text-[10px] font-semibold"
                        style={{
                          color: "#8b5cf6",
                          background: "rgba(139, 92, 246, 0.08)",
                          borderColor: "rgba(139, 92, 246, 0.16)",
                        }}
                      >
                        Checkout
                      </div>
                    </div>
                  </>
                )}

                {card.id === "tps" && (
                  <>
                    <div
                      className="mb-[9px] rounded-[12px] border px-[10px] py-[8px]"
                      style={{
                        background: "rgba(139, 92, 246, 0.09)",
                        borderColor: "rgba(139, 92, 246, 0.22)",
                      }}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Signal className="h-[9px] w-[9px]" style={{ color }} />
                          <span
                            className="text-[9px] font-bold uppercase tracking-[0.06em]"
                            style={{ color }}
                          >
                            Live TPS
                          </span>
                        </div>
                        <div
                          className="h-[6px] w-[6px] rounded-full"
                          style={{ background: "#10b981", boxShadow: "0 0 5px #10b981" }}
                        />
                      </div>
                      <div className="mt-[2px] text-[9px]" style={{ color: "rgb(71,85,105)" }}>
                        transactions / sec
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[4px]">
                      {["Auth", "Clearing", "Settlement", "Monitor"].map((chip) => (
                        <div
                          key={chip}
                          className="flex items-center gap-[3px] rounded-[6px] border px-[7px] py-[3px] text-[7px] font-semibold"
                          style={{
                            background: "rgba(16, 185, 129, 0.07)",
                            borderColor: "rgba(16, 185, 129, 0.145)",
                            color: "#10b981",
                          }}
                        >
                          <div className="h-1 w-1 rounded-full bg-emerald-500" />
                          {chip}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
