"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type SplitTextRevealConfig = {
  delay?: number;
  stagger?: number;
  start?: string;
  y?: number;
  rotateX?: number;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSplitTextReveal(
  titleRef: RefObject<HTMLElement | null>,
  triggerRef?: RefObject<HTMLElement | null>,
  config: SplitTextRevealConfig = {}
) {
  useLayoutEffect(() => {
    const title = titleRef.current;
    const trigger = triggerRef?.current ?? title;

    if (!title || !trigger || prefersReducedMotion()) {
      return;
    }

    const split = SplitText.create(title, {
      type: "words",
      wordsClass: "split-word",
      aria: "auto",
      reduceWhiteSpace: true,
    });

    const tween = gsap.fromTo(
      split.words,
      {
        opacity: 0,
        y: config.y ?? 24,
        rotateX: config.rotateX ?? 45,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay: config.delay ?? 0,
        stagger: config.stagger ?? 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger,
          start: config.start ?? "top 78%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [
    config.delay,
    config.rotateX,
    config.stagger,
    config.start,
    config.y,
    titleRef,
    triggerRef,
  ]);
}
