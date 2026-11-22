import type { Metadata } from "next";
import { Icon } from "@/components/home/icons";
import { Badge, PageTitle, Panel, StatCard } from "@/components/dashboard/ui";
import { CarLabel } from "@/components/portal/ui";
import { invoices } from "@/data/portal";

export const metadata: Metadata = { title: "Рахунки" };

const downloadClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800";

export default function PortalInvoicesPage() {
  return (
    <>
      <PageTitle title="Рахунки" text="Усі рахунки в PDF — для вас, вашої фірми або Steuerberater." />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard icon="receipt" label="До оплати" value="0,00 €" hint="Немає відкритих рахунків" />
        <StatCard icon="euro" label="Сплачено у 2026" value="657,30 €" hint="4 рахунки" />
        <div className="col-span-2 lg:col-span-1">
          <StatCard icon="clock" label="Очікується" value="≈ 627,30 €" hint="Поточний ремонт, після видачі" />
        </div>
      </div>

      <Panel title="Історія рахунків">
        {/* Phones: stacked cards. */}
        <ul className="divide-y divide-slate-100 sm:hidden dark:divide-slate-800">
          {invoices.map((inv) => (
            <li key={inv.no} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink dark:text-white">{inv.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {inv.no} · {inv.date}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-ink dark:text-white">{inv.sum}</p>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <CarLabel carId={inv.carId} />
                <div className="flex items-center gap-2">
                  <Badge tone={inv.status.tone}>{inv.status.label}</Badge>
                  <button type="button" className={downloadClass} aria-label={`Завантажити PDF ${inv.no}`}>
                    PDF
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Tablets and up: table. */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Номер</th>
                <th className="px-5 py-3 font-medium">Дата</th>
                <th className="px-5 py-3 font-medium">Авто / роботи</th>
                <th className="px-5 py-3 text-right font-medium">Сума</th>
                <th className="px-5 py-3 font-medium">Статус</th>
                <th className="px-5 py-3">
                  <span className="sr-only">Завантажити</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv.no}>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{inv.no}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-600 dark:text-slate-300">{inv.date}</td>
                  <td className="px-5 py-3">
                    <p className="text-ink dark:text-white">{inv.title}</p>
                    <div className="mt-1">
                      <CarLabel carId={inv.carId} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-medium tabular-nums text-ink dark:text-white">
                    {inv.sum}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={inv.status.tone}>{inv.status.label}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button type="button" className={downloadClass}>
                      <Icon name="receipt" className="size-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
