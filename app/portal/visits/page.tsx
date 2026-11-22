import type { Metadata } from "next";
import { Icon } from "@/components/home/icons";
import { Badge, PageTitle, Panel } from "@/components/dashboard/ui";
import { CarLabel, PrimaryLink } from "@/components/portal/ui";
import { pastVisits, upcomingVisits } from "@/data/portal";

export const metadata: Metadata = { title: "Візити" };

export default function PortalVisitsPage() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle title="Візити" text="Майбутні записи та історія обслуговування ваших авто." />
        <div className="hidden md:block">
          <PrimaryLink href="/portal/book">
            <Icon name="plus" className="size-4" />
            Новий запис
          </PrimaryLink>
        </div>
      </div>

      <Panel title="Заплановано">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {upcomingVisits.map((v) => (
            <li key={v.date + v.title} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center gap-3 sm:w-44">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <Icon name="calendar" className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink dark:text-white">{v.date}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">о {v.time}</span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink dark:text-white">{v.title}</p>
                <div className="mt-1">
                  <CarLabel carId={v.carId} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <Badge tone={v.status.tone}>{v.status.label}</Badge>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Перенести
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Історія обслуговування" className="mt-6">
        <ol className="divide-y divide-slate-100 dark:divide-slate-800">
          {pastVisits.map((v) => (
            <li key={v.date + v.title} className="flex items-start gap-4 px-5 py-4">
              <span className="w-20 shrink-0 pt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">{v.date}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <p className="text-sm font-medium text-ink dark:text-white">{v.title}</p>
                  {v.sum ? (
                    <span className="text-sm font-medium tabular-nums text-ink dark:text-white">{v.sum}</span>
                  ) : (
                    <Badge tone={v.status.tone}>{v.status.label}</Badge>
                  )}
                </div>
                <div className="mt-1.5">
                  <CarLabel carId={v.carId} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
