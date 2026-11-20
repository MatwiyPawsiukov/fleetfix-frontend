import { UserName } from "./UserName";
import { Icon } from "@/components/home/icons";
import { Badge, PageTitle, Panel, Plate, StatCard, type Tone } from "./ui";

// Demo data — replace with API data once the backend exists.

const requests = [
  { client: "Олег Петренко", car: "VW Golf VII", text: "Стукіт у передній підвісці", time: "8 хв тому", channel: "Сайт" },
  { client: "Anna Weber", car: "BMW 320d", text: "Заміна шин на зимові", time: "32 хв тому", channel: "WhatsApp" },
  { client: "Schmidt Logistik", car: "Mercedes Sprinter ×3", text: "Планове ТО автопарку", time: "1 год тому", channel: "Email" },
];

const today: { time: string; plate: string; job: string; status: string; tone: Tone }[] = [
  { time: "08:00", plate: "M-AB 1234", job: "Inspektion", status: "В роботі", tone: "blue" },
  { time: "09:00", plate: "K-RT 900", job: "Діагностика", status: "Прийнято", tone: "violet" },
  { time: "10:30", plate: "B-KL 552", job: "Гальма, перед", status: "Очікується", tone: "slate" },
  { time: "11:00", plate: "F-DE 318", job: "Олива + фільтри", status: "Очікується", tone: "slate" },
  { time: "13:00", plate: "N-OP 66", job: "Сезонні шини", status: "Очікується", tone: "slate" },
];

const pickup = [
  { plate: "M-ÜL 47", client: "Klaus Bauer", sum: "120,00 €" },
  { plate: "HH-TS 87", client: "Ірина Савчук", sum: "455,80 €" },
];

export function ReceptionistDashboard() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle title={<>Доброго дня, <UserName /></>} text="Заявки та записи на сьогодні." />
        <button
          type="button"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
        >
          + Нова заявка
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="inbox" label="Нові заявки" value="3" hint="Без відповіді" />
        <StatCard icon="calendar" label="Записів сьогодні" value="12" hint="2 вільні слоти" />
        <StatCard icon="check" label="Готові до видачі" value="2" hint="Клієнтів повідомлено" />
        <StatCard icon="bell" label="Нагадування TÜV" value="7" hint="На цей тиждень" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <Panel title="Нові заявки" action="Усі заявки" className="xl:col-span-3">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {requests.map((r) => (
              <li key={r.client} className="flex items-start gap-3 px-5 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <Icon name="message" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <p className="text-sm font-semibold text-ink dark:text-white">{r.client}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">· {r.car}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{r.text}</p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {r.channel} · {r.time}
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Записати
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Розклад на сьогодні" action="Календар" className="xl:col-span-2">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {today.map((s) => (
              <li key={s.time + s.plate} className="flex items-center gap-3 px-5 py-3">
                <span className="w-11 shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{s.time}</span>
                <Plate>{s.plate}</Plate>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-300">{s.job}</span>
                <Badge tone={s.tone}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Готові до видачі" className="mt-6">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {pickup.map((p) => (
            <li key={p.plate} className="flex flex-wrap items-center gap-3 px-5 py-3">
              <Plate>{p.plate}</Plate>
              <span className="flex-1 text-sm text-ink dark:text-white">{p.client}</span>
              <span className="text-sm font-medium text-ink dark:text-white">{p.sum}</span>
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Видати й виставити рахунок
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
