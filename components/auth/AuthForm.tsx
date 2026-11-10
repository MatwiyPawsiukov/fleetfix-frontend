import Link from "next/link";

type Field = { name: string; label: string; type: string; autoComplete: string };

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

// Visual-only form: there is no backend yet, so the submit button does nothing.
export function AuthForm({
  title,
  text,
  fields,
  submitLabel,
  switchText,
  switchLabel,
  switchHref,
}: {
  title: string;
  text: string;
  fields: Field[];
  submitLabel: string;
  switchText: string;
  switchLabel: string;
  switchHref: string;
}) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{text}</p>

      <form className="mt-8 space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              className={inputClass}
            />
          </label>
        ))}
        <button
          type="button"
          className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
        >
          {submitLabel}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        {switchText}{" "}
        <Link href={switchHref} className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
          {switchLabel}
        </Link>
      </p>
    </>
  );
}
