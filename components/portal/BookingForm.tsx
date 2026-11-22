"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/home/icons";
import { Plate } from "@/components/dashboard/ui";
import { bookingDays, bookingTimes, cars, services, workshop } from "@/data/portal";

// Slots already taken in the demo — the real list will come from the workshop calendar.
const taken = new Set(["2026-11-24 08:00", "2026-11-24 09:00", "2026-11-25 10:30", "2026-11-27 14:00", "2026-11-28 12:00", "2026-11-28 14:00", "2026-11-28 15:30"]);

const choiceBase =
  "cursor-pointer rounded-xl border transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brand-500/40";
const choiceOn = "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10";
const choiceOff =
  "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden="true" className="flex items-center gap-2.5 text-sm font-semibold text-ink dark:text-white">
        <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-xs text-white">{n}</span>
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

export function BookingForm() {
  const [carId, setCarId] = useState(cars[0].id);
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState(bookingDays[0].id);
  const [time, setTime] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const car = cars.find((c) => c.id === carId)!;
  const dayInfo = bookingDays.find((d) => d.id === day)!;
  const serviceInfo = services.find((s) => s.id === service);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!service) return setError("Оберіть, що потрібно зробити.");
    if (!time) return setError("Оберіть зручний час.");
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Icon name="check" className="size-7" strokeWidth={2.25} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-ink dark:text-white">Заявку надіслано</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {serviceInfo?.label} для {car.plate}, {dayInfo.label} {dayInfo.date} о {time}. {workshop.name} підтвердить запис
          SMS-повідомленням — зазвичай протягом години.
        </p>
        <div className="mt-6 grid gap-2 sm:flex sm:justify-center">
          <Link
            href="/portal/visits"
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Мої візити
          </Link>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setService(null);
              setTime(null);
              setNote("");
            }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Ще один запис
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      <div className="min-w-0 space-y-4 lg:col-span-2">
        <Step n={1} title="Авто">
          <div className="grid gap-3 sm:grid-cols-2">
            {cars.map((c) => (
              <label key={c.id} className={`${choiceBase} flex items-center gap-3 p-3.5 ${carId === c.id ? choiceOn : choiceOff}`}>
                <input type="radio" name="car" value={c.id} checked={carId === c.id} onChange={() => setCarId(c.id)} className="sr-only" />
                <Icon name="car" className="size-5 shrink-0 text-slate-500 dark:text-slate-400" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink dark:text-white">{c.model}</span>
                  <span className="mt-1 block">
                    <Plate>{c.plate}</Plate>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Step>

        <Step n={2} title="Що потрібно зробити?">
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <label key={s.id} className={`${choiceBase} p-3.5 ${service === s.id ? choiceOn : choiceOff}`}>
                <input type="radio" name="service" value={s.id} checked={service === s.id} onChange={() => setService(s.id)} className="sr-only" />
                <Icon
                  name={s.icon}
                  className={`size-5 ${service === s.id ? "text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400"}`}
                />
                <span className="mt-2 block text-sm font-medium text-ink dark:text-white">{s.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{s.hint}</span>
              </label>
            ))}
          </div>
        </Step>

        <Step n={3} title="Коли зручно?">
          <div className="grid grid-cols-5 gap-2">
            {bookingDays.map((d) => (
              <label
                key={d.id}
                className={`${choiceBase} flex min-w-0 flex-col items-center px-1 py-2.5 ${day === d.id ? choiceOn : choiceOff}`}
              >
                <input
                  type="radio"
                  name="day"
                  value={d.id}
                  checked={day === d.id}
                  onChange={() => {
                    setDay(d.id);
                    if (time && taken.has(`${d.id} ${time}`)) setTime(null);
                  }}
                  className="sr-only"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">{d.label}</span>
                <span className="text-sm font-semibold text-ink dark:text-white">{d.date}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {bookingTimes.map((t) => {
              const busy = taken.has(`${day} ${t}`);
              return (
                <label
                  key={t}
                  className={`${choiceBase} py-2.5 text-center font-mono text-sm ${
                    busy
                      ? "cursor-not-allowed border-dashed border-slate-200 text-slate-300 line-through dark:border-slate-700 dark:text-slate-600"
                      : time === t
                        ? `${choiceOn} font-semibold text-brand-700 dark:text-brand-300`
                        : `${choiceOff} text-ink dark:text-white`
                  }`}
                >
                  <input
                    type="radio"
                    name="time"
                    value={t}
                    disabled={busy}
                    checked={time === t}
                    onChange={() => setTime(t)}
                    className="sr-only"
                  />
                  {t}
                  {busy && <span className="sr-only"> (зайнято)</span>}
                </label>
              );
            })}
          </div>
        </Step>

        <Step n={4} title="Коментар (необовʼязково)">
          <textarea
            name="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-label="Коментар"
            placeholder="Напр. стукіт спереду справа на нерівностях"
            className="block w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </Step>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-ink dark:text-white">Ваш запис</h2>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            { label: "Авто", value: `${car.plate} · ${car.model}` },
            { label: "Послуга", value: serviceInfo?.label ?? "—" },
            { label: "Дата й час", value: time ? `${dayInfo.label} ${dayInfo.date}, ${time}` : "—" },
            { label: "Сервіс", value: workshop.name },
          ].map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-slate-500 dark:text-slate-400">{row.label}</dt>
              <dd className="text-right font-medium text-ink dark:text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
        >
          Надіслати заявку
        </button>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Ціну ремонту ви побачите в кошторисі й погодите онлайн — до початку робіт.
        </p>
      </aside>
    </form>
  );
}
