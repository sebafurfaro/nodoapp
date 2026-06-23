"use client";

import { Card } from "@heroui/react";
import { Mail, MessageCircleMore, Rocket } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useGsapReveal } from "../ui/useGsapReveal";
import { useSplitTextReveal } from "../ui/useSplitTextReveal";

export function Contact() {
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
      id="contacto"
      className="relative scroll-mt-28 border-t border-border bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Card className="overflow-hidden rounded-[2rem] border border-border bg-surface/80 p-6 shadow-[0_30px_100px_-40px_rgba(34,211,238,0.22)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p
                data-reveal
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70"
              >
                Contacto
              </p>
              <h2
                ref={titleRef}
                className="mt-5 text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
              >
                Si querés una presencia digital que se sienta futurista, empecemos
                hoy.
              </h2>
              <p data-reveal className="mt-5 max-w-xl text-base leading-7 text-foreground/70 ff-saira">
                Contanos qué estás construyendo y te ayudamos a definir una
                experiencia web con identidad, velocidad y una base técnica lista
                para escalar.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="mailto:hola@nodoapp.com"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-contrast transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Mail className="mr-2 h-4 w-4" />
                Escribir por email
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
