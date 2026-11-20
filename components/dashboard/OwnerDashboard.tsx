import { UserName } from "./UserName";
import { Badge, PageTitle, Panel, StatCard, type Tone } from "./ui";

// Demo data — replace with API data once the backend exists.

const bays = [
  { name: "Бокс 1", load: 88 },
  { name: "Бокс 2", load: 72 },
  { name: "Бокс 3", load: 54 },
  { name: "Шиномонтаж", load: 95 },
];

const team: { name: string; role: string; status: string; tone: Tone }[] = [
  { name: "Ірина Мельник", role: "Приймальник", status: "На зміні", tone: "emerald" },
  { name: "Андрій Бойко", role: "Механік", status: "В роботі · S-MU 2021", tone: "blue" },
  { name: "Тарас Ковальчук", role: "Механік", status: "В роботі · K-RT 900", tone: "blue" },
  { name: "Максим Шевчук", role: "Механік", status: "Вихідний", tone: "slate" },
];

const invoices: { no: string; client: string; sum: string; status: string; tone: Tone }[] = [
  { no: "RE-2026-0412", client: "Müller GmbH", sum: "1 284,50 €", status: "Оплачено", tone: "emerald" },
  { no: "RE-2026-0411", client: "Олег Петренко", sum: "386,00 €", status: "Очікує", tone: "amber" },
  { no: "RE-2026-0410", client: "Schmidt Logistik", sum: "2 940,00 €", status: "Прострочено", tone: "red" },
  { no: "RE-2026-0409", client: "Anna Weber", sum: "149,90 €", status: "Оплачено", tone: "emerald" },
];

export function OwnerDashboard() {
  return (
    <>
      <PageTitle title={<>Вітаємо, <UserName /></>} text="Огляд роботи СТО за листопад." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="euro" label="Виручка за місяць" value="48 260 €" hint="+12% до жовтня" />
        <StatCard icon="clipboard" label="Закрито замовлень" value="186" hint="+9 за тиждень" />
        <StatCard icon="calendar" label="Завантаження боксів" value="77%" hint="Середнє за тиждень" />
        <StatCard icon="receipt" label="Середній чек" value="259 €" hint="−3% до жовтня" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Завантаження боксів сьогодні">
          <ul className="space-y-4 p-5">
            {bays.map((bay) => (
              <li key={bay.name}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-300">{bay.name}</span>
                  <span className="font-semibold text-ink dark:text-white">{bay.load}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-brand-500" style={{ width: `${bay.load}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Команда" action="Запросити" className="xl:col-span-2">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {team.map((m) => (
              <li key={m.name} className="flex items-center gap-3 px-5 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {m.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink dark:text-white">{m.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.role}</p>
                </div>
                <Badge tone={m.tone}>{m.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Останні рахунки" action="Усі рахунки" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Номер</th>
                <th className="px-5 py-3 font-medium">Клієнт</th>
                <th className="px-5 py-3 text-right font-medium">Сума</th>
                <th className="px-5 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv.no}>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{inv.no}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-ink dark:text-white">{inv.client}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-medium text-ink dark:text-white">{inv.sum}</td>
                  <td className="px-5 py-3">
                    <Badge tone={inv.tone}>{inv.status}</Badge>
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
