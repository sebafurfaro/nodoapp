"use client";

import { Switch } from "@heroui/react";
import { MoonStar, SunMedium } from "lucide-react";
import { useSiteTheme } from "../providers/ThemeProvider";

type ThemeSwitchProps = {
  className?: string;
  ariaLabel?: string;
};

export function ThemeSwitch({
  className = "shrink-0 block cursor-pointer",
  ariaLabel = "Cambiar tema visual",
}: ThemeSwitchProps) {
  const { resolvedTheme, toggleTheme } = useSiteTheme();

  return (
    <Switch
      isSelected={resolvedTheme === "dark"}
      onChange={toggleTheme}
      aria-label={ariaLabel}
      className={className}
    >
      <Switch.Content className="gap-2 text-sm font-medium text-foreground">
        <span aria-hidden="true" className="flex items-center gap-2">
          {resolvedTheme === "dark" ? (
            <MoonStar className="h-4 w-4" />
          ) : (
            <SunMedium className="h-4 w-4" />
          )}
        </span>
      </Switch.Content>
      <Switch.Control className="bg-surface-muted">
        <Switch.Thumb className="bg-background" />
      </Switch.Control>
    </Switch>
  );
}
