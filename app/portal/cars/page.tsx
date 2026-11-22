import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/home/icons";
import { Badge, PageTitle, Plate } from "@/components/dashboard/ui";
import { PrimaryLink } from "@/components/portal/ui";
import { cars } from "@/data/portal";

export const metadata: Metadata = { title: "Мої авто" };

export default function PortalCarsPage() {
  return (
    <>
      <PageTitle title="Мої авто" text="Пробіг, TÜV, сервіс і шини — усе, що ми знаємо про ваші авто." />

      <div className="grid gap-6 md:grid-cols-2">
        {cars.map((car) => {
          const facts: { icon: IconName; label: string; value: string; warn?: boolean }[] = [
            { icon: "clock", label: "Пробіг", value: car.mileage },
            { icon: "shield", label: "TÜV / HU", value: `до ${car.tuv}`, warn: car.tuvSoon },
            { icon: "wrench", label: "Наступне ТО", value: car.nextService },
            { icon: "tire", label: "Шини", value: car.tires },
          ];
          return (
            <article
              key={car.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start gap-4 p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/25">
                  <Icon name="car" className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Plate>{car.plate}</Plate>
                    <Badge tone={car.status.tone}>{car.status.label}</Badge>
                  </div>
                  <h2 className="mt-2 font-semibold text-ink dark:text-white">{car.model}</h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {car.year} · VIN <span className="font-mono">{car.vin}</span>
                  </p>
                </div>
              </div>

              <dl className="grid flex-1 grid-cols-2 gap-px border-y border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
                {facts.map((f) => (
                  <div key={f.label} className="bg-white p-4 dark:bg-slate-900">
                    <dt className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Icon name={f.icon} className="size-3.5" />
                      {f.label}
                    </dt>
                    <dd
                      className={`mt-1 text-sm font-semibold ${
                        f.warn ? "text-amber-700 dark:text-amber-300" : "text-ink dark:text-white"
                      }`}
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="p-4">
                <PrimaryLink href="/portal/book">
                  <Icon name="plus" className="size-4" />
                  Записати це авто
                </PrimaryLink>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Змінився номер або купили нове авто? Скажіть про це на прийомі — ми оновимо дані.
      </p>
    </>
  );
}
