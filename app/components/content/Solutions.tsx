"use client";

import { Card } from "@heroui/react";
import {
  Code2,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { useGsapReveal } from "../ui/useGsapReveal";
import { useSplitTextReveal } from "../ui/useSplitTextReveal";

const SOLUTIONS = [
  {
    title: "Desarrollo a medida",
    description:
      "Creamos productos digitales pensados para resolver problemas reales con una base técnica sólida y sostenible.",
    icon: Code2,
    tone: "cyan" as const,
  },
  {
    title: "Interfaces de alto impacto",
    description:
      "Diseño visual moderno, accesible y enfocado en conversión, claridad y consistencia de marca.",
    icon: Sparkles,
    tone: "violet" as const,
  },
  {
    title: "Plataformas web escalables",
    description:
      "Arquitecturas listas para crecer, con performance, modularidad y un flujo de mantenimiento simple.",
    icon: MonitorSmartphone,
    tone: "rose" as const,
  },
  {
    title: "Consultoría y resguardo",
    description:
      "Acompañamos decisiones de producto, tecnología y seguridad para cuidar cada etapa del proceso.",
    icon: ShieldCheck,
    tone: "amber" as const,
  },
];

export function Solutions() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  useSplitTextReveal(titleRef, sectionRef, {
    start: "top 82%",
    stagger: 0.05,
    y: 26,
    rotateX: 46,
  });
  useGsapReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="soluciones"
      className="relative scroll-mt-28 border-t border-border bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div className="space-y-5">
          <p
            data-reveal
            className="inline-flex rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70"
          >
            Soluciones
          </p>
          <h2
            ref={titleRef}
            className="max-w-xl text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Un ecosistema de servicios que acompaña desde la idea hasta la
            ejecución.
          </h2>
          <p data-reveal className="max-w-xl text-base leading-7 text-foreground/70 ff-saira">
            La experiencia de NodoApp se construye sobre una mezcla de estrategia,
            diseño y desarrollo. Cada pieza esta pensada para que el producto
            final se sienta rápido, claro y confiable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SOLUTIONS.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <SpotlightCard
                key={solution.title}
                className="rounded-[1.5rem] border-border bg-surface/70 p-0"
                contentClassName="flex h-full flex-col gap-5 p-6"
                spotlightTone={solution.tone}
                spotlightRadius={320}
                spotlightOpacity={0.16}
              >
                <Card className="border-0 bg-transparent shadow-none">
                  <div
                    data-reveal
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/80 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <h3 data-reveal className="text-xl font-semibold text-foreground">
                      {solution.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.26em] text-foreground/50">
                      0{index + 1}
                    </span>
                  </div>
                  <p data-reveal className="mt-3 text-sm leading-7 text-foreground/70 ff-saira">
                    {solution.description}
                  </p>
                </Card>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-7xl gap-4 md:grid-cols-3">
        {[
          "Arquitectura y performance",
          "Diseño centrado en conversión",
          "Soporte continuo y evolutivo",
        ].map((item) => (
          <div
            key={item}
            data-reveal
            className="rounded-2xl border border-border bg-surface/70 px-5 py-4 text-sm font-medium text-foreground backdrop-blur-md"
          >
            <Layers3 className="mb-3 h-4 w-4 text-primary" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
