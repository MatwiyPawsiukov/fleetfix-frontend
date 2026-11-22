import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { Plate } from "@/components/dashboard/ui";
import { carById, repairSteps } from "@/data/portal";

/** Plate + model of a client's car, on one line that wraps on narrow screens. */
export function CarLabel({ carId }: { carId: string }) {
  const car = carById(carId);
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <Plate>{car.plate}</Plate>
      <span className="text-xs text-slate-500 dark:text-slate-400">{car.model}</span>
    </span>
  );
}

/** Horizontal stepper on wide screens, compact vertical list on phones. */
export function RepairProgress({ current }: { current: number }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-5 sm:gap-0">
      {repairSteps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="relative flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`absolute right-1/2 top-3.5 hidden h-0.5 w-full sm:block ${
                  done || active ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            )}
            <span
              className={`relative grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                done
                  ? "bg-brand-600 text-white"
                  : active
                    ? "bg-white text-brand-700 ring-2 ring-brand-500 dark:bg-slate-900 dark:text-brand-300"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
              }`}
            >
              {done ? <Icon name="check" className="size-4" strokeWidth={2.5} /> : i + 1}
            </span>
            <span
              className={`text-sm sm:text-xs ${
                active
                  ? "font-semibold text-ink dark:text-white"
                  : done
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {step}
              {active && <span className="sr-only"> (зараз)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
    >
      {children}
    </Link>
  );
}

export function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">{children}</p>;
}
