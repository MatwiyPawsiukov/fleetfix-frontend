"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/home/icons";
import { saveProfile, useProfile } from "@/lib/profile";
import { homePath, roleInfo, roles, type Role } from "@/lib/roles";

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export function ProfileForm() {
  const profile = useProfile();
  // Wait until the saved profile (if any) is read, so the form starts pre-filled.
  if (profile === undefined) return <div className="h-96" aria-busy="true" />;
  return <Form initialName={profile?.name ?? ""} initialRole={profile?.role ?? null} editing={profile !== null} />;
}

function Form({ initialName, initialRole, editing }: { initialName: string; initialRole: Role | null; editing: boolean }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState<Role | null>(initialRole);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Вкажіть імʼя.");
    if (!role) return setError("Оберіть, хто ви.");
    saveProfile({ name: name.trim(), role });
    router.push(homePath(role));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
        {editing ? "Ваш профіль" : "Створіть профіль"}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Працюєте в СТО чи ви клієнт? Від цього залежить, який кабінет ви побачите.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Імʼя
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Напр. Олександр Коваль"
            className={inputClass}
          />
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">Хто ви?</legend>
          <div className="mt-2 grid gap-3">
            {roles.map((r) => {
              const info = roleInfo[r];
              const selected = role === r;
              return (
                <label
                  key={r}
                  className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brand-500/40 ${
                    selected
                      ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={selected}
                    onChange={() => setRole(r)}
                    className="sr-only"
                  />
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                      selected
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <Icon name={info.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink dark:text-white">{info.label}</span>
                    <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">{info.description}</span>
                  </span>
                  <Icon
                    name="check"
                    className={`size-5 shrink-0 text-brand-600 dark:text-brand-400 ${selected ? "" : "invisible"}`}
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700"
        >
          {editing ? "Зберегти й перейти" : "Продовжити"}
        </button>
      </form>
    </>
  );
}
