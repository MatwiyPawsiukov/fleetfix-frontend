import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { Badge, PageTitle, Panel, Plate } from "@/components/dashboard/ui";
import { UserName } from "@/components/dashboard/UserName";
import { EstimateApproval } from "@/components/portal/EstimateApproval";
import { CarLabel, PrimaryLink, RepairProgress } from "@/components/portal/ui";
import { carById, cars, currentRepair, upcomingVisits, workshop } from "@/data/portal";

export default function PortalHomePage() {
  const repairCar = carById(currentRepair.carId);
  const nextVisit = upcomingVisits[0];
  const tuvCar = cars.find((c) => c.tuvSoon);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle title={<>Вітаємо, <UserName /></>} text={`Ваш сервіс — ${workshop.name}.`} />
        <div className="hidden md:block">
          <PrimaryLink href="/portal/book">
            <Icon name="plus" className="size-4" />
            Записатися на сервіс
          </PrimaryLink>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Зараз у ремонті">
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex flex-wrap items-center gap-2">
                  <Plate>{repairCar.plate}</Plate>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{repairCar.model}</span>
                </span>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{currentRepair.order}</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-ink dark:text-white">{currentRepair.job}</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="size-4" />
                  {currentRepair.readyBy}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="wrench" className="size-4" />
                  Механік: {currentRepair.mechanic}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" className="size-4" />
                  Погоджено: {currentRepair.approved}
                </span>
              </div>
              <div className="mt-6">
                <RepairProgress current={currentRepair.current} />
              </div>
            </div>
            <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Оновлення
              </h3>
              <ol className="mt-3 space-y-3">
                {currentRepair.updates.map((u) => (
                  <li key={u.time} className="flex gap-3 text-sm">
                    <span className="w-11 shrink-0 font-mono text-xs leading-5 text-slate-400 dark:text-slate-500">{u.time}</span>
                    <span className="text-slate-700 dark:text-slate-300">{u.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Panel>

          <EstimateApproval />
        </div>

        <div className="space-y-6">
          {tuvCar && (
            <section className="rounded-2xl bg-linear-to-br from-brand-600 to-violet-700 p-5 text-white shadow-lg shadow-brand-900/20">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-100">
                <Icon name="bell" className="size-4" />
                Нагадування
              </div>
              <p className="mt-2 text-lg font-semibold">TÜV для {tuvCar.plate} — до {tuvCar.tuv}</p>
              <p className="mt-1 text-sm text-brand-100">Запис уже є на 10.12. Потрібно змінити час?</p>
              <Link
                href="/portal/visits"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/25"
              >
                Мої візити
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </section>
          )}

          <Panel title="Наступний візит">
            <div className="p-5">
              <p className="text-sm font-semibold text-ink dark:text-white">{nextVisit.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {nextVisit.date} · {nextVisit.time}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <CarLabel carId={nextVisit.carId} />
                <Badge tone={nextVisit.status.tone}>{nextVisit.status.label}</Badge>
              </div>
            </div>
          </Panel>

          <Panel title="Мої авто">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {cars.map((car) => (
                <li key={car.id}>
                  <Link
                    href="/portal/cars"
                    className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Icon name="car" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink dark:text-white">{car.model}</span>
                      <span className="block font-mono text-xs text-slate-500 dark:text-slate-400">{car.plate}</span>
                    </span>
                    <Badge tone={car.status.tone}>{car.status.label}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Ваш сервіс">
            <div className="space-y-3 p-5 text-sm">
              <p className="font-semibold text-ink dark:text-white">{workshop.name}</p>
              <p className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0" />
                {workshop.address}
              </p>
              <p className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
                {workshop.hours}
              </p>
              <a
                href={`tel:${workshop.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <Icon name="phone" className="size-4 shrink-0" />
                {workshop.phone}
              </a>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
