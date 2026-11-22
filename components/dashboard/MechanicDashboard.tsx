import { UserName } from "./UserName";
import { Icon } from "@/components/home/icons";
import { Badge, PageTitle, Panel, Plate, StatCard, type Tone } from "./ui";

// Demo data — replace with API data once the backend exists.

const current = {
  plate: "S-MU 2021",
  car: "Audi A4 B9 · 2.0 TDI",
  job: "Заміна зчеплення",
  bay: "Бокс 2",
  checklist: [
    { text: "Зняти КПП", done: true },
    { text: "Замінити диск і кошик зчеплення", done: true },
    { text: "Замінити вижимний підшипник", done: false },
    { text: "Встановити КПП, прокачати привід", done: false },
    { text: "Тест-драйв", done: false },
  ],
};

const queue: { time: string; plate: string; job: string; status: string; tone: Tone }[] = [
  { time: "13:30", plate: "B-KL 552", job: "Гальма, перед", status: "Наступне", tone: "blue" },
  { time: "15:00", plate: "F-DE 318", job: "Олива + фільтри", status: "У черзі", tone: "slate" },
  { time: "16:00", plate: "A-ZZ 13", job: "Балансування", status: "У черзі", tone: "slate" },
];

const parts: { name: string; status: string; tone: Tone }[] = [
  { name: "Вижимний підшипник LuK 500 0158 10", status: "Їде · 14:00", tone: "amber" },
  { name: "Гальмівні колодки ATE 13.0460-7184.2", status: "На складі", tone: "emerald" },
];

export function MechanicDashboard() {
  const done = current.checklist.filter((c) => c.done).length;
  const progress = Math.round((done / current.checklist.length) * 100);

  return (
    <>
      <PageTitle title={<>Привіт, <UserName /></>} text="Ваші завдання на сьогодні." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard icon="wrench" label="Завдань сьогодні" value="4" hint="1 в роботі" />
        <StatCard icon="clock" label="Відпрацьовано" value="4 год 20 хв" hint="Із 8 год" />
        <StatCard icon="box" label="Чекаю запчастини" value="1" hint="Прибуде о 14:00" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <Panel title="Зараз у роботі" className="xl:col-span-3">
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Plate>{current.plate}</Plate>
              <span className="text-sm text-slate-600 dark:text-slate-300">{current.car}</span>
              <Badge tone="violet">{current.bay}</Badge>
            </div>
            <p className="mt-3 text-lg font-semibold text-ink dark:text-white">{current.job}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {done}/{current.checklist.length}
              </span>
            </div>

            <ul className="mt-5 space-y-2">
              {current.checklist.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                      item.done
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {item.done && <Icon name="check" className="size-3.5" strokeWidth={3} />}
                  </span>
                  <span className={item.done ? "text-slate-400 line-through dark:text-slate-500" : "text-ink dark:text-white"}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Завершити роботу
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Запросити запчастину
              </button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6 xl:col-span-2">
          <Panel title="Далі в черзі">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {queue.map((q) => (
                <li key={q.plate} className="flex items-center gap-3 px-5 py-3">
                  <span className="w-11 shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{q.time}</span>
                  <Plate>{q.plate}</Plate>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-300">{q.job}</span>
                  <Badge tone={q.tone}>{q.status}</Badge>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Мої запчастини">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {parts.map((p) => (
                <li key={p.name} className="flex items-center gap-3 px-5 py-3">
                  <span className="min-w-0 flex-1 text-sm text-ink dark:text-white">{p.name}</span>
                  <Badge tone={p.tone}>{p.status}</Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
