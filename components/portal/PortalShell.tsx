"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/home/icons";
import { Logo } from "@/components/home/Logo";
import { ThemeToggle } from "@/components/home/ThemeToggle";
import { clearProfile, useProfile } from "@/lib/profile";
import { homePath } from "@/lib/roles";

const nav: { href: string; label: string; icon: IconName }[] = [
  { href: "/portal", label: "Огляд", icon: "home" },
  { href: "/portal/cars", label: "Мої авто", icon: "car" },
  { href: "/portal/book", label: "Записатися", icon: "plus" },
  { href: "/portal/visits", label: "Візити", icon: "calendar" },
  { href: "/portal/invoices", label: "Рахунки", icon: "receipt" },
];

function isActive(pathname: string, href: string) {
  return href === "/portal" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

// The client portal is shown only to a user whose profile role is "client":
// no profile → /profile, a staff role → that role's dashboard.
export function PortalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const profile = useProfile();
  const allowed = profile?.role === "client";

  useEffect(() => {
    if (profile === null) router.replace("/profile");
    else if (profile && profile.role !== "client") router.replace(homePath(profile.role));
  }, [profile, router]);

  if (!allowed) {
    return (
      <div className="flex flex-1 items-center justify-center" aria-busy="true">
        <span className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
      </div>
    );
  }

  function logout() {
    clearProfile();
    router.replace("/");
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/portal" aria-label="Кабінет клієнта — огляд" className="shrink-0">
              <Logo />
            </Link>
            <span className="hidden rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 lg:inline-block dark:bg-brand-500/10 dark:text-brand-300">
              Кабінет клієнта
            </span>
          </div>

          <nav aria-label="Меню кабінету" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                const cta = item.href === "/portal/book";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        cta
                          ? "ml-1 bg-brand-600 text-white shadow-sm shadow-brand-600/30 hover:bg-brand-700"
                          : active
                            ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                            : "text-slate-600 hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      {cta && <Icon name="plus" className="size-4" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-0.5">
            <ThemeToggle />
            <Link
              href="/profile"
              aria-label={`Профіль: ${profile.name}`}
              title="Профіль"
              className="ml-1 grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {profile.name.charAt(0).toUpperCase()}
            </Link>
            <button
              type="button"
              onClick={logout}
              aria-label="Вийти"
              title="Вийти"
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Icon name="logout" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom padding on mobile keeps content clear of the tab bar. */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-8 md:pb-12">{children}</main>

      <nav
        aria-label="Меню кабінету"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden dark:border-slate-800 dark:bg-slate-900/95"
      >
        <ul className="grid grid-cols-5">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            const cta = item.href === "/portal/book";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[11px] font-medium ${
                    active ? "text-brand-700 dark:text-brand-300" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cta ? (
                    <span className="-mt-1 grid size-8 place-items-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30">
                      <Icon name="plus" className="size-5" />
                    </span>
                  ) : (
                    <Icon name={item.icon} className="size-6" />
                  )}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
