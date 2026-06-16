"use client";

import gsap from "gsap";
import { Boxes, FileText, Globe2, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type EcosystemId = "custom" | "ecommerce" | "branding" | "blog";
type Tone = "cyan" | "orange" | "magenta" | "green";

type SceneCard = {
  id: EcosystemId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: Tone;
  x: number;
  y: number;
  w: number;
  h: number;
  lineX: number;
  lineY: number;
};

type EcosystemSceneProps = {
  focusedId: EcosystemId | null;
  onPreviewChange: (id: EcosystemId | null) => void;
};

const CENTER = { x: 240, y: 317 };

const CARDS: SceneCard[] = [
  {
    id: "custom",
    title: "Desarrollo Personalizado",
    subtitle: "Webs, sistemas y plataformas",
    icon: Boxes,
    tone: "cyan",
    x: 28,
    y: 18,
    w: 188,
    h: 126,
    lineX: 88,
    lineY: 88,
  },
  {
    id: "ecommerce",
    title: "eCommerce",
    subtitle: "Catalogos, checkout y conversion",
    icon: Globe2,
    tone: "orange",
    x: 264,
    y: 22,
    w: 180,
    h: 126,
    lineX: 372,
    lineY: 104,
  },
  {
    id: "branding",
    title: "Registro de Marcas",
    subtitle: "Asesoramiento y proteccion",
    icon: Palette,
    tone: "magenta",
    x: 24,
    y: 472,
    w: 190,
    h: 124,
    lineX: 84,
    lineY: 532,
  },
  {
    id: "blog",
    title: "Blogs",
    subtitle: "Contenido, SEO y edicion",
    icon: FileText,
    tone: "green",
    x: 268,
    y: 476,
    w: 176,
    h: 124,
    lineX: 372,
    lineY: 530,
  },
];

const TONE_MAP: Record<Tone, { color: string; border: string; glow: string; fill: string }> = {
  cyan: {
    color: "#06b6d4",
    border: "rgba(6, 182, 212, 0.28)",
    glow: "rgba(6, 182, 212, 0.22)",
    fill: "rgba(6, 182, 212, 0.14)",
  },
  orange: {
    color: "#f59e0b",
    border: "rgba(245, 158, 11, 0.28)",
    glow: "rgba(245, 158, 11, 0.22)",
    fill: "rgba(245, 158, 11, 0.14)",
  },
  magenta: {
    color: "#d946ef",
    border: "rgba(217, 70, 239, 0.28)",
    glow: "rgba(217, 70, 239, 0.22)",
    fill: "rgba(217, 70, 239, 0.14)",
  },
  green: {
    color: "#22c55e",
    border: "rgba(34, 197, 94, 0.28)",
    glow: "rgba(34, 197, 94, 0.22)",
    fill: "rgba(34, 197, 94, 0.14)",
  },
};

const PATHS = [
  { id: "top-left", cardId: "custom" as const, d: "M 240 317 C 205 270, 168 176, 116 108" },
  { id: "top-right", cardId: "ecommerce" as const, d: "M 240 317 C 274 264, 320 186, 360 110" },
  { id: "bottom-left", cardId: "branding" as const, d: "M 240 317 C 203 376, 159 450, 110 532" },
  { id: "bottom-right", cardId: "blog" as const, d: "M 240 317 C 280 384, 321 453, 370 532" },
] as const;

const BALL_PHASES = [0, 0.33, 0.66];

export function EcosystemScene({
  focusedId,
  onPreviewChange,
}: EcosystemSceneProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<EcosystemId, HTMLButtonElement | null>>({
    custom: null,
    ecommerce: null,
    branding: null,
    blog: null,
  });
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const ballRefs = useRef<Record<string, SVGCircleElement[]>>({});
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const haloTween = useRef<gsap.core.Tween | null>(null);
  const ballTweens = useRef<gsap.core.Tween[]>([]);
  const [centerHovered, setCenterHovered] = useState(false);
  const [sceneScale, setSceneScale] = useState(1);
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => {
      const width = frame.getBoundingClientRect().width;
      if (!width) return;
      setIsCompactLayout(width < 420);
      setSceneScale(Math.min(1, width / 480));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  const stopBalls = () => {
    ballTweens.current.forEach((tween) => tween.kill());
    ballTweens.current = [];
  };

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      const halo = scene.querySelector<HTMLElement>("[data-halo]");
      if (halo) {
        haloTween.current = gsap.to(halo, {
          scale: 1.08,
          opacity: 1,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      floatTweens.current = CARDS.map((card, index) => {
        const el = cardRefs.current[card.id];
        if (!el) return null as unknown as gsap.core.Tween;

        return gsap.to(el, {
          y: index % 2 === 0 ? -6 : 6,
          x: index % 2 === 0 ? 4 : -4,
          rotate: index % 2 === 0 ? 1.25 : -1.25,
          duration: 4.4 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }).filter(Boolean);
    }, scene);

    return () => {
      stopBalls();
      haloTween.current?.kill();
      haloTween.current = null;
      floatTweens.current.forEach((tween) => tween.kill());
      floatTweens.current = [];
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!haloTween.current) return;

    if (centerHovered) {
      haloTween.current.resume();
    } else {
      haloTween.current.pause();
    }
  }, [centerHovered]);

  useEffect(() => {
    stopBalls();

    PATHS.forEach((path) => {
      const svgPath = pathRefs.current[path.id];
      const balls = ballRefs.current[path.id] ?? [];
      if (!svgPath || balls.length === 0) return;

      const total = svgPath.getTotalLength();
      const state = { progress: 0 };

      const tween = gsap.to(state, {
        progress: 1,
        duration: 2.2,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          balls.forEach((ball, index) => {
            const phase = BALL_PHASES[index] ?? 0;
            const point = svgPath.getPointAtLength(
              total * ((state.progress + phase) % 1)
            );
            ball.setAttribute("cx", `${point.x}`);
            ball.setAttribute("cy", `${point.y}`);
            ball.setAttribute("opacity", index === 1 ? "0.92" : "0.5");
            const scale = index === 1 ? 1 : 0.72 + index * 0.12;
            ball.setAttribute("transform", `scale(${scale})`);
          });
        },
      });

      ballTweens.current.push(tween);
    });

    return () => stopBalls();
  }, []);

  const handleCardEnter = (id: EcosystemId) => {
    onPreviewChange(id);
  };

  const handleCardLeave = () => {
    onPreviewChange(null);
  };

  return (
    <div
      ref={frameRef}
      className="relative mx-auto w-full max-w-[480px] select-none overflow-visible [contain:layout_style]"
      style={{ aspectRatio: "480 / 640" }}
    >
      <div
        ref={sceneRef}
        className="absolute left-0 top-0 h-[640px] w-[480px] origin-top-left"
        style={{
          transform: `scale(${sceneScale})`,
          willChange: "transform",
        }}
      >
        <div
          data-halo
          className="pointer-events-none absolute left-1/2 top-[317px] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[32px]"
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
          <radialGradient id="core-halo-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-halo-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.05" />
            <stop offset="55%" stopColor="#6366f1" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {PATHS.map((path) => (
          <g key={path.id}>
            <path
              ref={(el) => {
                pathRefs.current[path.id] = el;
              }}
              d={path.d}
              fill="none"
              stroke={TONE_MAP[CARDS.find((card) => card.id === path.cardId)?.tone ?? "cyan"].color}
              strokeOpacity={centerHovered ? 0.8 : 0.18}
              strokeWidth={centerHovered ? 1.5 : 1}
              strokeDasharray="1px 1px"
              pathLength={1}
              className="transition-[stroke-opacity,stroke-width] duration-300"
            />
            {BALL_PHASES.map((phase, index) => (
              <circle
                key={`${path.id}-${phase}`}
                ref={(el) => {
                  if (!ballRefs.current[path.id]) {
                    ballRefs.current[path.id] = [];
                  }
                  ballRefs.current[path.id][index] = el as SVGCircleElement;
                }}
                r={3.5}
                fill={TONE_MAP[CARDS.find((card) => card.id === path.cardId)?.tone ?? "cyan"].color}
                opacity={0}
              />
            ))}
          </g>
        ))}

        <g>
          <circle cx={CENTER.x} cy={CENTER.y} r="50" fill="url(#core-halo-1)" />
          <circle cx={CENTER.x} cy={CENTER.y} r="86" fill="url(#core-halo-2)" />
          <circle cx={CENTER.x} cy={CENTER.y} r="11" fill="#c4b5fd" opacity="0.82" />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="19"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.8"
            strokeOpacity="0.18"
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="34"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.4"
            strokeOpacity="0.07"
          />
        </g>
        </svg>

        {CARDS.map((card) => {
          const Icon = card.icon;
          const tone = TONE_MAP[card.tone];
          const isSelected = focusedId === card.id;
          const isPreview = focusedId === card.id;

          return (
            <button
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              type="button"
              onMouseEnter={() => handleCardEnter(card.id)}
              onMouseLeave={handleCardLeave}
              onFocus={() => handleCardEnter(card.id)}
              onBlur={handleCardLeave}
              onClick={() => handleCardEnter(card.id)}
              className={twMerge(
                "group absolute z-20 overflow-hidden rounded-[1.35rem] border bg-[rgba(10,10,28,0.84)] p-4 text-left backdrop-blur-[28px] transition-[transform,opacity,border-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                isCompactLayout || !focusedId
                  ? "opacity-100"
                  : !isPreview
                    ? "opacity-55"
                    : "opacity-100",
                isPreview && "scale-[1.02]"
              )}
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                width: `${card.w}px`,
                minHeight: `${card.h}px`,
                borderColor: isSelected ? tone.border : "rgba(255,255,255,0.08)",
                boxShadow: isSelected
                  ? `0 0 32px ${tone.glow}, 0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset`
                  : `0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset`,
                transform: "translateY(0px)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    card.id === "custom"
                      ? "radial-gradient(circle at top left, rgba(6,182,212,0.22), transparent 50%)"
                      : card.id === "ecommerce"
                        ? "radial-gradient(circle at top right, rgba(245,158,11,0.22), transparent 50%)"
                        : card.id === "branding"
                          ? "radial-gradient(circle at bottom left, rgba(217,70,239,0.22), transparent 52%)"
                          : "radial-gradient(circle at top right, rgba(34,197,94,0.22), transparent 52%)",
                }}
              />
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border"
                style={{
                  background: tone.fill,
                  borderColor: tone.border,
                  color: tone.color,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white sm:text-[0.82rem]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-[0.8rem]">
                {card.subtitle}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: tone.color,
                    boxShadow: `0 0 6px ${tone.color}`,
                  }}
                />
                <span className="text-[9px] uppercase tracking-[0.08em] text-slate-400">
                  activo
                </span>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          onFocus={() => setCenterHovered(true)}
          onBlur={() => setCenterHovered(false)}
          onClick={() => {
            onPreviewChange(null);
          }}
          className="group absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.9rem] border border-violet-500/35 bg-[rgba(10,10,28,0.86)] px-6 py-8 text-center shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_24px_80px_-30px_rgba(139,92,246,0.35)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          style={{
            width: "192px",
            minHeight: "146px",
          }}
        >
          <div className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
          <div className="relative">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-violet-500/10 shadow-[0_0_44px_rgba(167,139,250,0.45)]" />
            <span className="block bg-gradient-to-b from-white via-violet-100 to-violet-300 bg-clip-text text-[32px] font-black tracking-[-0.06em] text-transparent leading-none">
              NodoApp
            </span>
            <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-300/90">
              Hub central
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
