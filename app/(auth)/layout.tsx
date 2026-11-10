import Link from "next/link";
import { Logo } from "@/components/home/Logo";
import { ThemeToggle } from "@/components/home/ThemeToggle";

// Login / registration: no site menu, just the logo (back to home) and a centred card.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="FleetFix — на головну">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          {children}
        </div>
      </main>
    </div>
  );
}
