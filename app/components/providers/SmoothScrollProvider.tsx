"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { LenisRef } from "lenis/react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href]",
      );

      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const isCurrentPage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;

      if (!isCurrentPage || !url.hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));

      if (!target) {
        return;
      }

      event.preventDefault();
      const lenis = lenisRef.current?.lenis;

      if (lenis) {
        lenis.scrollTo(target, { offset: -96 });
        return;
      }

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 96,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleAnchorClick, { capture: true });
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
