"use client";

import { Card } from "@heroui/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { twMerge } from "tailwind-merge";
import { useSplitTextReveal } from "../ui/useSplitTextReveal";

const HERO_METRICS = [
  { value: "12+", label: "Anios de experiencia digital" },
  { value: "98%", label: "Proyectos entregados con foco en rendimiento" },
  { value: "24/7", label: "Monitoreo y acompanamiento operativo" },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 30 });
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)",
  });

  const headline = useMemo(
    () => [
      "Diseñamos",
      "productos digitales",
      "con mentalidad",
      "de futuro.",
    ],
    []
  );

  useSplitTextReveal(headingRef, sectionRef, {
    start: "top 88%",
    stagger: 0.06,
    y: 34,
    rotateX: 52,
  });

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-kicker]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          actionsRef.current?.children ?? [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.15"
        )
        .fromTo(
          statsRef.current?.children ?? [],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    const element = sectionRef.current;
    if (!element || prefersReducedMotion()) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  const handlePanelMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 6;
    const rotateY = (x - 0.5) * 8;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`,
    });
  };

  const resetPanelTilt = () => {
    setTiltStyle({
      transform:
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden bg-background px-4 pt-28 pb-20 text-foreground sm:px-6 lg:px-8 lg:pt-32 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle 480px at ${glowPosition.x}% ${glowPosition.y}%, rgba(34,211,238,0.16), transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="mt-6 text-balance text-4xl font-black tracking-[-0.05em] text-foreground sm:text-5xl lg:text-7xl"
          >
            {headline.map((line, index) => (
              <span
                key={line}
                data-word
                className={twMerge(
                  "block",
                  index === 1 &&
                    "text-primary drop-shadow-[0_0_24px_rgba(34,211,238,0.18)]",
                  index === 3 && "text-foreground/70"
                )}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            ref={copyRef}
            className="mt-6 max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg"
          >
            Construimos experiencias digitales modernas para empresas que quieren
            verse y sentirse futuras. Diseno de interfaces, desarrollo web y
            estrategia de producto en una misma direccion.
          </p>

          <div
            ref={actionsRef}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-contrast shadow-[0_24px_60px_-26px_rgba(34,211,238,0.85)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Quiero empezar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="#soluciones"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/70 px-6 py-3 text-base font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-surface-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver soluciones
            </Link>
          </div>

          <div
            ref={statsRef}
            className="mt-10 grid gap-3 sm:grid-cols-3"
            aria-label="Indicadores clave"
          >
            {HERO_METRICS.map((metric) => (
              <Card
                key={metric.label}
                className="rounded-3xl border border-border bg-surface/75 p-4 text-left shadow-none backdrop-blur-md"
              >
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="mt-1 text-sm leading-6 text-foreground/70">
                  {metric.label}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative" style={{ perspective: "1200px" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.14),_transparent_55%)] blur-3xl"
          />
          <Card
            ref={panelRef}
            onPointerMove={handlePanelMove}
            onPointerLeave={resetPanelTilt}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/80 p-5 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.9)] backdrop-blur-2xl transition-transform duration-200 ease-out"
            style={tiltStyle}
          >
            <></>
          </Card>
        </div>
      </div>
    </section>
  );
}
