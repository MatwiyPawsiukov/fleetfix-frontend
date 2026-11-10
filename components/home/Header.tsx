"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/home";
import { Icon } from "./icons";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so it closes by itself
  // as soon as the route changes (link click, back button, etc.).
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
  const open = menuOpenedOn === pathname;
  const closeMenu = () => setMenuOpenedOn(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="FleetFix — на головну" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Головне меню" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Увійти
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
          >
            Спробувати безкоштовно
          </Link>
        </div>

        <div className="-mr-2 flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpenedOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-5 pb-6 pt-3 sm:px-8 lg:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <nav aria-label="Мобільне меню">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-base font-medium ${
                        active
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-4 grid gap-2">
            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Увійти
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Спробувати безкоштовно
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
