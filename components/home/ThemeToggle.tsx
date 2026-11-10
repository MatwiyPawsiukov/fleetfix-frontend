"use client";

import { useLayoutEffect } from "react";
import { Icon } from "./icons";

type Theme = "light" | "dark";

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // The inline script in layout.tsx sets the theme before paint. In dev, Strict Mode's
  // remount resets <html> attributes, so re-apply it here (no-op in production).
  useLayoutEffect(() => {
    applyTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons are rendered and swapped via CSS, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Змінити тему"
      title="Світла / темна тема"
      className={`rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${className}`}
    >
      <Icon name="moon" className="size-5 dark:hidden" />
      <Icon name="sun" className="hidden size-5 dark:block" />
    </button>
  );
}
