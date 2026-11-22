"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/home/icons";
import { Logo } from "@/components/home/Logo";
import { ThemeToggle } from "@/components/home/ThemeToggle";
import { clearProfile, useProfile } from "@/lib/profile";
import { homePath, roleInfo, type StaffRole } from "@/lib/roles";

// Shows a role's workspace only to a user whose profile has that role:
// no profile → /profile, another role → that role's own dashboard.
export function DashboardShell({ role, children }: { role: StaffRole; children: React.ReactNode }) {
  const router = useRouter();
  const profile = useProfile();
  const allowed = profile?.role === role;

  useEffect(() => {
    if (profile === null) router.replace("/profile");
    else if (profile && profile.role !== role) router.replace(homePath(profile.role));
  }, [profile, role, router]);

  if (!allowed) {
    return (
      <div className="flex flex-1 items-center justify-center" aria-busy="true">
        <span className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
      </div>
    );
  }

  const info = roleInfo[role];

  function logout() {
    clearProfile();
    router.replace("/");
  }

  return (
    <div className="flex flex-1 bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-4 lg:flex dark:border-slate-800 dark:bg-slate-900">
        <Link href="/" aria-label="FleetFix — на головну" className="px-2 py-1">
          <Logo />
        </Link>
        <nav aria-label="Меню кабінету" className="mt-8 flex-1">
          <ul className="space-y-1">
            {info.nav.map((item, i) => (
              <li key={item.label}>
                <span
                  aria-current={i === 0 ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    i === 0
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Icon name={item.icon} className="size-5" />
                  {item.label}
                  {i > 0 && (
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      скоро
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink dark:text-white">{profile.name}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">{info.label} · змінити</span>
          </span>
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-lg sm:px-8 dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" aria-label="FleetFix — на головну" className="shrink-0 lg:hidden">
              <Logo />
            </Link>
            <span className="hidden items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline-flex dark:bg-brand-500/10 dark:text-brand-300">
              <Icon name={info.icon} className="size-4" />
              {info.label}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              aria-label="Сповіщення"
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Icon name="bell" className="size-5" />
            </button>
            <ThemeToggle />
            <Link
              href="/profile"
              aria-label={`Профіль: ${profile.name}`}
              title="Профіль"
              className="ml-1 grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 lg:hidden"
            >
              {profile.name.charAt(0).toUpperCase()}
            </Link>
            <button
              type="button"
              onClick={logout}
              aria-label="Вийти"
              title="Вийти"
              className="inline-flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:px-3 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon name="logout" className="size-5" />
              <span className="hidden sm:inline">Вийти</span>
            </button>
          </div>
        </header>
        {/* Phones / tablets: the sidebar is hidden, so show the sections as a scrollable strip. */}
        <nav aria-label="Меню кабінету" className="border-b border-slate-200 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-900">
          <ul className="flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-8">
            {info.nav.map((item, i) => (
              <li key={item.label} className="shrink-0">
                <span
                  aria-current={i === 0 ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                    i === 0
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <Icon name={item.icon} className="size-4" />
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
