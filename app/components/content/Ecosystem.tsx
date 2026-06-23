"use client";

import { Badge } from "@heroui/react";
import {
  ArrowUpRight,
  Boxes,
  Globe2,
  Palette,
  Type,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useGsapReveal } from "../ui/useGsapReveal";
import { useSplitTextReveal } from "../ui/useSplitTextReveal";
import { EcosystemScene } from "./EcosystemScene";

type EcosystemId = "custom" | "ecommerce" | "branding" | "blog";

const CONTENT: Record<
  EcosystemId,
  {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  custom: {
    eyebrow: "Desarrollo Personalizado",
    title: "Productos hechos a medida para procesos que no entran en plantillas.",
    description:
      "Construimos plataformas, dashboards y experiencias operativas pensadas para escalar con la lógica de tu negocio.",
    points: [
      "Arquitectura modular y mantenible.",
      "Integraciones con sistemas internos y externos.",
      "Performance y accesibilidad desde el inicio.",
    ],
    icon: Boxes,
  },
  ecommerce: {
    eyebrow: "eCommerce",
    title: "Tiendas y catálogos con foco en conversión, velocidad y confianza.",
    description:
      "Diseñamos sistemas de venta/compra limpios, estables y orientados a la decisión del usuario en cada punto.",
    points: [
      "Home comercial, PDP y checkout optimizados.",
      "Bundles, promociones y catálogos vivos.",
      "Base preparada para SEO y analítica.",
    ],
    icon: Globe2,
  },
  branding: {
    eyebrow: "Registro de Marcas",
    title: "Protegemos el valor de tu marca con una presencia seria y legible.",
    description:
      "Unificamos estrategia, identidad y comunicación para que la marca se vea consistente en todos los soportes.",
    points: [
      "Estructura clara para trámites y seguimiento.",
      "Mensajes formales, confiables y concretos.",
      "Diseño visual sobrio con un toque tecnológico.",
    ],
    icon: Palette,
  },
  blog: {
    eyebrow: "Blogs",
    title: "Contenido editorial pensado para posicionar y construir autoridad.",
    description:
      "Creamos espacios de blog con lectura fluida, jerarquía tipográfica y rendimiento para publicar de forma constante.",
    points: [
      "Plantillas listas para redactar y publicar.",
      "SEO técnico y estructura semántica.",
      "Imagen editorial alineada a la marca.",
    ],
    icon: Type,
  },
};

export function Ecosystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [previewId, setPreviewId] = useState<EcosystemId | null>(null);

  const activeContent = useMemo(
    () => (previewId ? CONTENT[previewId] : null),
    [previewId]
  );

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
      id="ecosistema"
      className="relative scroll-mt-28 border-t border-border bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <p
            data-reveal
            className="inline-flex rounded-full border border-border bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70"
          >
            Ecosistema
          </p>
          <h2
            ref={titleRef}
            className="text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Una experiencia unificada para producto, marca y tecnología.
          </h2>
          <p data-reveal className="max-w-xl text-base leading-7 text-foreground/70 ff-saira">
            NodoApp no se limita a entregar pantallas. Construimos un sistema
            visual y técnico que alinea negocio, operación y experiencia de usuario.
          </p>
          <a
            href="#contacto"
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Hablemos de tu proyecto
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <div className="hidden lg:block">
            {activeContent ? (
              <ContentReveal activeContent={activeContent} />
            ) : null}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <EcosystemScene focusedId={previewId} onPreviewChange={setPreviewId} />
        </div>

      </div>
    </section>
  );
}

function ContentReveal({
  activeContent,
}: {
  activeContent: (typeof CONTENT)[keyof typeof CONTENT];
}) {
  return (
    <div
      id="data-reveal"
      data-reveal
      className="rounded-[1.75rem] border border-border bg-surface/80 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <activeContent.icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/55">
            {activeContent.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-foreground">
            {activeContent.title}
          </h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-foreground/72">
        {activeContent.description}
      </p>
      <ul className="mt-5 space-y-3">
        {activeContent.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-foreground/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
