"use client";

import { Button } from "@heroui/react";
import { Menu, MoonStar, SunMedium, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteTheme } from "../providers/ThemeProvider";
import { ThemeSwitch } from "../ui/ThemeSwitch";
import { twMerge } from "tailwind-merge";

const MENU_ITEMS = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useSiteTheme();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <>
    <div className="hidden md:flex fixed bottom-8 right-5 z-50 border-1 border-white/20 dark:border-black/20 bg-surface/80 w-10 h-10 items-center justify-center rounded-full cursor-pointer shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
        <ThemeSwitch />
    </div>    
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-[1.5rem] border border-border bg-surface/80 px-4 py-3 text-foreground shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
        <Link
          href="#hero"
          className="group flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="Ir al inicio de NodoApp"
        >
          <span className="flex leading-tight">
            <span className="text-base font-bold text-foreground uppercase">Nodo App</span>
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 rounded-full border border-border bg-surface-muted/70 px-2 py-1 md:flex"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="block md:hidden">
            <ThemeSwitch />
          </div>

          <Link
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-contrast shadow-[0_16px_40px_-20px_rgba(34,211,238,0.75)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Empezar ahora
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-surface-muted text-foreground"
            onPress={toggleTheme}
            aria-label="Cambiar tema visual"
          >
            {resolvedTheme === "dark" ? (
              <SunMedium className="h-4 w-4" />
            ) : (
              <MoonStar className="h-4 w-4" />
            )}
          </Button>

          <button
            type="button"
            className={twMerge(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              menuOpen && "bg-surface"
            )}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Cerrar navegacion" : "Abrir navegacion"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={twMerge(
          "mx-auto mt-2 w-full max-w-7xl overflow-hidden rounded-[1.25rem] border border-border bg-surface/95 px-4 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 md:hidden",
          menuOpen
            ? "max-h-80 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Movil" className="flex flex-col gap-1 py-3">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-contrast focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Empezar ahora
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}
