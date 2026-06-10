"use client";

import type {
  CSSProperties,
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  spotlightTone?: "cyan" | "violet" | "rose" | "amber" | "emerald";
  spotlightRadius?: number;
  spotlightOpacity?: number;
  borderClassName?: string;
  contentClassName?: string;
};

export function SpotlightCard({
  children,
  className,
  spotlightTone,
  spotlightRadius = 260,
  spotlightOpacity = 0.22,
  borderClassName = "border border-white/10",
  contentClassName,
  style,
  ...rest
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSpotVisible, setIsSpotVisible] = useState(false);
  const [spotPosition, setSpotPosition] = useState({ x: 0, y: 0 });
  const toneRgbMap: Record<
    NonNullable<SpotlightCardProps["spotlightTone"]>,
    string
  > = {
    cyan: "0, 240, 255",
    violet: "139, 92, 246",
    rose: "251, 113, 133",
    amber: "251, 191, 36",
    emerald: "52, 211, 153",
  };
  const spotlightRgb = toneRgbMap[spotlightTone ?? "cyan"];

  const setSpotlightPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSpotPosition({ x, y });

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
  };

  const resetSpotlight = () => {
    setIsSpotVisible(false);
  };

  const mergedStyle = {
    ...(style as CSSProperties),
    ["--spotlight-radius" as string]: `${spotlightRadius}px`,
    ["--spotlight-opacity" as string]: String(spotlightOpacity),
    ["--spot-x" as string]: `${spotPosition.x}px`,
    ["--spot-y" as string]: `${spotPosition.y}px`,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      onPointerMove={setSpotlightPosition}
      onPointerEnter={(event) => {
        setIsSpotVisible(true);
        setSpotlightPosition(event);
      }}
      onPointerLeave={resetSpotlight}
      className={twMerge(
        "group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm shadow-md",
        borderClassName,
        className
      )}
      style={mergedStyle}
      {...rest}
      >
      <div
        aria-hidden="true"
        className={twMerge(
          "spotlight-overlay pointer-events-none absolute inset-0 transition-opacity duration-300",
          isSpotVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle var(--spotlight-radius) at var(--spot-x) var(--spot-y), rgba(${spotlightRgb}, var(--spotlight-opacity)), transparent 70%)`,
        }}
      />
      <div className={twMerge("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
