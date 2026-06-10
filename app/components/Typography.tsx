import React from "react";
import { twMerge } from "tailwind-merge";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type Opacity = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

/**
 * Tailwind color base tokens (extendible).
 * Puedes agregar más: "violet", "sky", "teal", etc.
 */
type ColorBase =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "white"
  | "black";

/**
 * Tailwind font-size tokens (extendible).
 */
type SizeToken =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Elemento HTML + estilos base. Default: "h1" */
  variant?: Variant;
  /** Token de color de Tailwind. Default: "gray" */
  color?: ColorBase;
  /** Opacidad del color (0-100 en pasos de 10). Default: 90 */
  opacity?: Opacity;
  /** Tamaño de fuente Tailwind. Si se omite se usa el default del variant. */
  size?: SizeToken;
  /** Clases adicionales para override total */
  className?: string;
  children?: React.ReactNode;
}

// ─── Facade map ───────────────────────────────────────────────────────────────

/**
 * Configuración base por variant.
 * Aquí defines tag, tamaño y peso por defecto de cada nivel tipográfico.
 */
type HTMLTextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

const VARIANT_CONFIG: Record<
  Variant,
  { tag: HTMLTextTag; defaultSizeClass: string; defaultWeight: string }
> = {
  h1: {
    tag: "h1",
    defaultSizeClass: "text-4xl sm:text-5xl lg:text-7xl",
    defaultWeight: "font-extrabold",
  },
  h2: {
    tag: "h2",
    defaultSizeClass: "text-3xl sm:text-4xl lg:text-5xl",
    defaultWeight: "font-bold",
  },
  h3: {
    tag: "h3",
    defaultSizeClass: "text-2xl sm:text-3xl lg:text-4xl",
    defaultWeight: "font-bold",
  },
  h4: {
    tag: "h4",
    defaultSizeClass: "text-xl sm:text-2xl lg:text-3xl",
    defaultWeight: "font-semibold",
  },
  h5: {
    tag: "h5",
    defaultSizeClass: "text-lg sm:text-xl lg:text-2xl",
    defaultWeight: "font-semibold",
  },
  h6: {
    tag: "h6",
    defaultSizeClass: "text-base sm:text-lg",
    defaultWeight: "font-medium",
  },
  p: {
    tag: "p",
    defaultSizeClass: "text-base sm:text-lg",
    defaultWeight: "font-normal",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Construye la clase de color con opacidad usando la sintaxis moderna de Tailwind:
 * text-{color}-500/{opacity}
 *
 * Para "white" y "black" no se aplica shade (500), solo la opacidad.
 */
const COLOR_CLASS_MAP: Record<ColorBase, string> = {
  slate: "text-slate-500",
  gray: "text-gray-500",
  zinc: "text-zinc-500",
  neutral: "text-neutral-500",
  stone: "text-stone-500",
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  lime: "text-lime-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  violet: "text-violet-500",
  purple: "text-purple-500",
  fuchsia: "text-fuchsia-500",
  pink: "text-pink-500",
  rose: "text-rose-500",
  white: "text-white",
  black: "text-black",
};

const SIZE_CLASS_MAP: Record<SizeToken, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

function buildColorClass(color: ColorBase): string {
  return COLOR_CLASS_MAP[color];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * <Typography>
 *
 * Componente de texto basado en el patrón Facade:
 * la prop `variant` selecciona la configuración interna
 * (tag HTML + estilos base) sin que el consumidor necesite conocerla.
 *
 * @example
 * // Uso básico
 * <Typography variant="h1">Hola mundo</Typography>
 *
 * @example
 * // Personalizado
 * <Typography variant="h3" color="indigo" opacity={70} size="4xl">
 *   Subtítulo
 * </Typography>
 *
 * @example
 * // Override con className
 * <Typography variant="p" className="italic leading-relaxed">
 *   Párrafo personalizado
 * </Typography>
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = "h1",
  color = "gray",
  opacity = 90,
  size,
  className = "",
  children,
  ...rest
}) => {
  const { tag, defaultSizeClass, defaultWeight } = VARIANT_CONFIG[variant];
  const Tag = tag as React.ElementType<React.HTMLAttributes<HTMLElement>>;

  const sizeClass = size ? SIZE_CLASS_MAP[size] : defaultSizeClass;
  const colorClass = buildColorClass(color);

  const classes = twMerge("m-0", sizeClass, defaultWeight, colorClass, className);

  const style = opacity < 100
    ? { ...(rest.style ?? {}), opacity: opacity / 100 }
    : rest.style;

  return (
    <Tag className={classes} {...rest} style={style}>
      {children}
    </Tag>
  );
};

export default Typography;
