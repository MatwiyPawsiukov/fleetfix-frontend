import type { IconName } from "@/components/home/icons";
import type { Tone } from "@/components/dashboard/ui";

// Demo data for the client portal — replace with API data once the backend exists.

export const workshop = {
  name: "Autohaus Weber",
  address: "Leopoldstraße 112, 80802 München",
  phone: "+49 89 123 456 70",
  hours: "Пн–Пт 8:00–18:00, Сб 9:00–13:00",
};

export type Car = {
  id: string;
  plate: string;
  model: string;
  year: number;
  vin: string;
  mileage: string;
  tuv: string;
  tuvSoon: boolean;
  nextService: string;
  tires: string;
  status: { label: string; tone: Tone };
};

export const cars: Car[] = [
  {
    id: "golf",
    plate: "M-OK 2718",
    model: "VW Golf VII 1.4 TSI",
    year: 2017,
    vin: "WVWZZZAUZHW••••21",
    mileage: "118 400 км",
    tuv: "12.2026",
    tuvSoon: true,
    nextService: "через 1 600 км",
    tires: "Зимові · на авто",
    status: { label: "У ремонті", tone: "blue" },
  },
  {
    id: "octavia",
    plate: "M-OK 404",
    model: "Škoda Octavia Combi 2.0 TDI",
    year: 2020,
    vin: "TMBJJ7NE3L••••87",
    mileage: "64 900 км",
    tuv: "08.2027",
    tuvSoon: false,
    nextService: "03.2027",
    tires: "Літні · зберігання в СТО",
    status: { label: "Усе гаразд", tone: "emerald" },
  },
];

/** Steps every order goes through; `current` is the index of the active one. */
export const repairSteps = ["Прийнято", "Діагностика", "Кошторис", "Ремонт", "Готово"] as const;

export const currentRepair = {
  carId: "golf",
  order: "AU-2026-1187",
  job: "Гальма та планове ТО",
  current: 3,
  mechanic: "Андрій Б.",
  readyBy: "Сьогодні до 17:00",
  approved: "386,00 €",
  updates: [
    { time: "13:05", text: "Механік знайшов знос задніх гальмівних дисків — надіслано додатковий кошторис." },
    { time: "11:20", text: "Кошторис на 386,00 € погоджено вами онлайн." },
    { time: "10:40", text: "Діагностику завершено." },
    { time: "08:15", text: "Авто прийнято, пробіг 118 400 км." },
  ],
};

/** Extra work found during the repair: needs the client's approval (the 15% rule). */
export const pendingEstimate = {
  no: "KV-2026-0533-2",
  title: "Задні гальмівні диски та колодки",
  items: [
    { name: "Диски гальмівні задні ATE, 2 шт.", sum: "96,40 €" },
    { name: "Колодки гальмівні задні ATE", sum: "42,90 €" },
    { name: "Робота, 1,2 год", sum: "102,00 €" },
  ],
  total: "241,30 €",
};

export type Visit = {
  date: string;
  time?: string;
  carId: string;
  title: string;
  status: { label: string; tone: Tone };
  sum?: string;
};

export const upcomingVisits: Visit[] = [
  { date: "Чт, 10.12.2026", time: "09:00", carId: "golf", title: "TÜV / HU + AU", status: { label: "Підтверджено", tone: "emerald" } },
  { date: "Пн, 15.03.2027", time: "10:30", carId: "octavia", title: "Заміна шин на літні", status: { label: "Очікує підтвердження", tone: "amber" } },
];

export const pastVisits: Visit[] = [
  { date: "22.11.2026", carId: "golf", title: "Гальма та планове ТО", status: { label: "У роботі", tone: "blue" } },
  { date: "28.10.2026", carId: "golf", title: "Заміна шин на зимові", status: { label: "Виконано", tone: "slate" }, sum: "60,00 €" },
  { date: "28.10.2026", carId: "octavia", title: "Заміна шин на зимові + зберігання", status: { label: "Виконано", tone: "slate" }, sum: "95,00 €" },
  { date: "14.03.2026", carId: "octavia", title: "Inspektion, олива + фільтри", status: { label: "Виконано", tone: "slate" }, sum: "312,40 €" },
  { date: "02.02.2026", carId: "golf", title: "Діагностика, заміна акумулятора", status: { label: "Виконано", tone: "slate" }, sum: "189,90 €" },
];

export type Invoice = { no: string; date: string; carId: string; title: string; sum: string; status: { label: string; tone: Tone } };

export const invoices: Invoice[] = [
  { no: "RE-2026-0398", date: "28.10.2026", carId: "octavia", title: "Шини + зберігання", sum: "95,00 €", status: { label: "Оплачено", tone: "emerald" } },
  { no: "RE-2026-0397", date: "28.10.2026", carId: "golf", title: "Заміна шин", sum: "60,00 €", status: { label: "Оплачено", tone: "emerald" } },
  { no: "RE-2026-0152", date: "14.03.2026", carId: "octavia", title: "Inspektion", sum: "312,40 €", status: { label: "Оплачено", tone: "emerald" } },
  { no: "RE-2026-0071", date: "02.02.2026", carId: "golf", title: "Акумулятор", sum: "189,90 €", status: { label: "Оплачено", tone: "emerald" } },
];

export const services: { id: string; icon: IconName; label: string; hint: string }[] = [
  { id: "service", icon: "wrench", label: "ТО / Inspektion", hint: "Олива, фільтри, огляд" },
  { id: "tuv", icon: "shield", label: "TÜV / HU + AU", hint: "Техогляд з партнером" },
  { id: "tires", icon: "tire", label: "Шини", hint: "Заміна, балансування" },
  { id: "diag", icon: "clipboard", label: "Діагностика", hint: "Шум, помилка, стук" },
];

export const bookingDays = [
  { id: "2026-11-24", label: "Вт", date: "24.11" },
  { id: "2026-11-25", label: "Ср", date: "25.11" },
  { id: "2026-11-26", label: "Чт", date: "26.11" },
  { id: "2026-11-27", label: "Пт", date: "27.11" },
  { id: "2026-11-28", label: "Сб", date: "28.11" },
];

export const bookingTimes = ["08:00", "09:00", "10:30", "12:00", "14:00", "15:30"];

export function carById(id: string) {
  return cars.find((c) => c.id === id)!;
}
