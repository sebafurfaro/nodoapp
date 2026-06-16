"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealConfig = {
  delay?: number;
  y?: number;
  stagger?: number;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  config: RevealConfig = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: config.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: config.stagger ?? 0.08,
          delay: config.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 72%",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [config.delay, config.stagger, config.y, ref]);
}
