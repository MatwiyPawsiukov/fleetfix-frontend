import { Icon, type IconName } from "./icons";

// Static mock of the workshop calendar — illustration only, no data fetching.

const bays = ["Бокс 1", "Бокс 2", "Бокс 3", "Шиномонтаж"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

type Slot = {
  bay: number;
  start: number; // hours after 08:00
  length: number; // hours
  plate: string;
  job: string;
  tone: "blue" | "amber" | "emerald" | "violet" | "slate";
  status: string;
};

const slots: Slot[] = [
  { bay: 0, start: 0, length: 2, plate: "M-AB 1234", job: "Inspektion", tone: "emerald", status: "В роботі" },
  { bay: 0, start: 2.5, length: 1.5, plate: "B-KL 552", job: "Гальма, перед", tone: "blue", status: "Записано" },
  { bay: 1, start: 0.5, length: 1, plate: "HH-TS 87", job: "Огляд підвіски", tone: "violet", status: "Кошторис" },
  { bay: 1, start: 2, length: 3, plate: "S-MU 2021", job: "Заміна зчеплення", tone: "amber", status: "Чекає запчастини" },
  { bay: 2, start: 1, length: 1.5, plate: "K-RT 900", job: "Діагностика", tone: "blue", status: "Прийнято" },
  { bay: 2, start: 3, length: 2, plate: "F-DE 318", job: "Олива + фільтри", tone: "slate", status: "Записано" },
  { bay: 3, start: 0, length: 1, plate: "M-ÜL 47", job: "Сезонні шини", tone: "emerald", status: "Готово" },
  { bay: 3, start: 1.5, length: 1, plate: "N-OP 66", job: "Сезонні шини", tone: "blue", status: "Записано" },
  { bay: 3, start: 3, length: 1, plate: "A-ZZ 13", job: "Балансування", tone: "slate", status: "Записано" },
];

const tones: Record<Slot["tone"], string> = {
  blue: "bg-brand-50 border-brand-200 text-brand-900 dark:bg-brand-500/15 dark:border-brand-400/30 dark:text-brand-100 [--bar:var(--color-brand-500)]",
  amber: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/15 dark:border-amber-400/30 dark:text-amber-100 [--bar:var(--color-amber-500)]",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-500/15 dark:border-emerald-400/30 dark:text-emerald-100 [--bar:var(--color-emerald-500)]",
  violet: "bg-violet-50 border-violet-200 text-violet-900 dark:bg-violet-500/15 dark:border-violet-400/30 dark:text-violet-100 [--bar:var(--color-violet-500)]",
  slate: "bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-700/40 dark:border-slate-600/50 dark:text-slate-200 [--bar:var(--color-slate-400)]",
};

const ROW = 52; // px per hour

const sidebar: { icon: IconName; label: string; badge?: string; active?: boolean }[] = [
  { icon: "inbox", label: "Заявки", badge: "3" },
  { icon: "calendar", label: "Календар", active: true },
  { icon: "clipboard", label: "Замовлення" },
  { icon: "receipt", label: "Рахунки" },
  { icon: "tire", label: "Шини" },
  { icon: "chart", label: "Звіти" },
];

export function DashboardPreview() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-linear-to-tr from-brand-400/25 via-sky-300/20 to-violet-300/25 blur-2xl dark:from-brand-500/20 dark:via-sky-500/10 dark:to-violet-500/20"
      />

      <div
        role="img"
        aria-label="Приклад календаря FleetFix: записи по боксах на сьогодні"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80">
          <span className="size-2.5 rounded-full bg-red-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700">
            app.fleetfix.de/calendar
          </span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-40 shrink-0 border-r border-slate-100 bg-slate-50/50 p-3 sm:block dark:border-slate-800 dark:bg-slate-950/40">
            {sidebar.map((item) => (
              <div
                key={item.label}
                className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${
                  item.active ? "bg-white text-brand-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-brand-300 dark:ring-slate-700" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Icon name={item.icon} className="size-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-brand-600 px-1.5 text-[10px] font-semibold leading-4 text-white">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </aside>

          {/* Calendar */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink dark:text-white">Сьогодні, четвер</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">9 записів · 4 бокси</p>
              </div>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-medium dark:bg-slate-800">
                <span className="rounded-md bg-white px-2.5 py-1 text-ink shadow-sm dark:bg-slate-700 dark:text-white">День</span>
                <span className="px-2.5 py-1 text-slate-500 dark:text-slate-400">Тиждень</span>
              </div>
            </div>

            <div className="grid grid-cols-[2.5rem_repeat(4,minmax(0,1fr))] gap-x-1.5">
              <div />
              {bays.map((bay) => (
                <div key={bay} className="truncate pb-2 text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {bay}
                </div>
              ))}

              <div className="relative" style={{ height: ROW * hours.length }}>
                {hours.map((h, i) => (
                  <span
                    key={h}
                    className="absolute left-0 -translate-y-1/2 text-[10px] text-slate-400 dark:text-slate-500"
                    style={{ top: i * ROW }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {bays.map((bay, bayIndex) => (
                <div
                  key={bay}
                  className="relative rounded-lg bg-slate-50/70 [--grid-line:var(--color-slate-200)] dark:bg-slate-800/40 dark:[--grid-line:var(--color-slate-700)]"
                  style={{
                    height: ROW * hours.length,
                    backgroundImage: `repeating-linear-gradient(to bottom, var(--grid-line) 0 1px, transparent 1px ${ROW}px)`,
                  }}
                >
                  {slots
                    .filter((s) => s.bay === bayIndex)
                    .map((s) => (
                      <div
                        key={s.plate}
                        className={`absolute inset-x-1 overflow-hidden rounded-md border px-2 py-1 shadow-sm ${tones[s.tone]}`}
                        style={{ top: s.start * ROW + 2, height: s.length * ROW - 4 }}
                      >
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-(--bar)" />
                        <p className="truncate font-mono text-[10px] font-semibold">{s.plate}</p>
                        <p className="truncate text-[10px] opacity-80">{s.job}</p>
                        {s.length >= 1.5 && (
                          <p className="mt-0.5 truncate text-[9px] font-medium uppercase tracking-wide opacity-60">
                            {s.status}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -bottom-6 -left-4 hidden w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 md:block dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            <Icon name="wrench" className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink dark:text-white">Знайдено нову проблему</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
              S-MU 2021 · знос дисків. Потрібен додатковий кошторис.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 -top-6 hidden w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 md:block dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <Icon name="message" className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink dark:text-white">SMS надіслано</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
              «Ваша машина M-ÜL 47 готова. Чекаємо на вас!»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
