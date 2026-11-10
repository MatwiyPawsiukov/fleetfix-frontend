import Link from "next/link";
import { Logo } from "@/components/home/Logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <Logo />
      <p className="mt-10 font-mono text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">
        Сторінку не знайдено
      </h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
        Можливо, адресу введено з помилкою або сторінку перенесли.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
      >
        На головну
      </Link>
    </main>
  );
}
