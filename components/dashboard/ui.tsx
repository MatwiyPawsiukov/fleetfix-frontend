import { Icon, type IconName } from "@/components/home/icons";

// Small building blocks shared by the role dashboards (static mock data for now).

export function PageTitle({ title, text }: { title: React.ReactNode; text: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink dark:text-white">{title}</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p>
    </div>
  );
}

export function StatCard({ icon, label, value, hint }: { icon: IconName; label: string; value: string; hint?: string }) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-2 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
        <Icon name={icon} className="mt-px size-4 shrink-0" />
        {label}
      </div>
      <p className="mt-2 text-xl font-semibold tracking-tight text-ink sm:mt-3 sm:text-2xl dark:text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <h2 className="text-sm font-semibold text-ink dark:text-white">{title}</h2>
        {action && <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">{action}</span>}
      </div>
      {children}
    </section>
  );
}

export type Tone = "blue" | "amber" | "emerald" | "violet" | "slate" | "red";

const tones: Record<Tone, string> = {
  blue: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300",
  red: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

export function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Plate({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-xs font-semibold text-ink dark:border-slate-600 dark:bg-slate-950 dark:text-white">
      {children}
    </span>
  );
}
