"use client";

import { useState } from "react";
import { Icon } from "@/components/home/icons";
import { pendingEstimate as estimate } from "@/data/portal";

type Decision = "approved" | "declined" | null;

// Extra work found during the repair needs the client's online approval
// before the mechanic continues. No backend yet: the decision is local state.
export function EstimateApproval() {
  const [decision, setDecision] = useState<Decision>(null);

  if (decision) {
    const ok = decision === "approved";
    return (
      <section
        role="status"
        className={`flex items-start gap-3 rounded-2xl border p-5 ${
          ok
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        }`}
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-xl ${
            ok ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          <Icon name={ok ? "check" : "close"} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink dark:text-white">
            {ok ? `Додаткові роботи на ${estimate.total} погоджено` : "Додаткові роботи відхилено"}
          </p>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
            {ok ? "Механік продовжує ремонт. Ми повідомимо, коли авто буде готове." : "Ми завершимо лише погоджені роботи й зателефонуємо вам."}
          </p>
          <button
            type="button"
            onClick={() => setDecision(null)}
            className="mt-2 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Скасувати рішення
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-amber-200 bg-white dark:border-amber-500/30 dark:bg-slate-900">
      <div className="flex items-start gap-3 bg-amber-50 px-5 py-4 dark:bg-amber-500/10">
        <Icon name="alert" className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-ink dark:text-white">Потрібне ваше погодження</h2>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
            Під час ремонту знайдено ще одну проблему. Без вашої згоди ми її не ремонтуємо.
          </p>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="font-semibold text-ink dark:text-white">{estimate.title}</p>
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500">{estimate.no}</p>
        </div>
        <ul className="mt-3 space-y-2">
          {estimate.items.map((item) => (
            <li key={item.name} className="flex justify-between gap-4 text-sm">
              <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
              <span className="shrink-0 tabular-nums text-ink dark:text-white">{item.sum}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-sm font-semibold dark:border-slate-800">
          <span className="text-ink dark:text-white">Разом, з MwSt</span>
          <span className="tabular-nums text-ink dark:text-white">{estimate.total}</span>
        </div>
        <div className="mt-4 grid gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setDecision("approved")}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Погодити {estimate.total}
          </button>
          <button
            type="button"
            onClick={() => setDecision("declined")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Відхилити
          </button>
        </div>
      </div>
    </section>
  );
}
