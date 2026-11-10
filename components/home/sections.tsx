import Link from "next/link";
import {
  faq,
  features,
  footerColumns,
  heroHighlights,
  plans,
  problems,
  roles,
  workflowSteps,
} from "@/data/home";
import { DashboardPreview } from "./DashboardPreview";
import { Icon } from "./icons";
import { Logo } from "./Logo";

// On a sub-page the first section's title is rendered as the page's <h1>.
type TitleProps = { titleAs?: "h1" | "h2" };

function SectionHeading({
  eyebrow,
  title,
  text,
  inverted = false,
  as: Title = "h2",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  inverted?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-wider ${
          inverted ? "text-brand-300" : "text-brand-600 dark:text-brand-400"
        }`}
      >
        {eyebrow}
      </p>
      <Title
        className={`mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          inverted ? "text-white" : "text-ink dark:text-white"
        }`}
      >
        {title}
      </Title>
      {text && (
        <p className={`mt-4 text-lg text-pretty ${inverted ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:pb-32 lg:pt-20">
        <div>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 py-1 pl-1 pr-3 text-xs font-medium text-brand-800 transition-colors hover:bg-brand-100 dark:border-brand-400/30 dark:bg-brand-500/10 dark:text-brand-200 dark:hover:bg-brand-500/20"
          >
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-semibold text-white">
              Нове
            </span>
            Рахунки за правилами GoBD
            <Icon name="arrow-right" className="size-3.5" />
          </Link>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl dark:text-white">
            Уся робота СТО —{" "}
            <span className="bg-linear-to-r from-brand-600 to-violet-600 bg-clip-text dark:from-brand-400 dark:to-violet-400 text-transparent">
              в одній програмі
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-400">
            Заявки, календар по боксах, кошториси, екран механіка та рахунки за німецькими
            правилами. Без паперу, Excel і програм з 2000-х. Клієнту нічого не треба
            встановлювати — він отримує лише SMS та email.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Почати 30 днів безкоштовно
              <Icon name="arrow-right" className="size-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              Як це працює
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {heroHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Icon name="check" className="size-4 text-emerald-600 dark:text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

/* ───────────────────────── Trust strip ───────────────────────── */

export function TrustStrip() {
  const items = [
    { icon: "shield" as const, label: "DSGVO + договір AVV" },
    { icon: "receipt" as const, label: "GoBD-сумісні рахунки" },
    { icon: "globe" as const, label: "Сервери в Німеччині" },
    { icon: "lock" as const, label: "2FA для власника" },
  ];
  return (
    <section aria-label="Гарантії" className="border-y border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Icon name={item.icon} className="size-5 text-slate-400 dark:text-slate-500" />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────────────────── Problems → Solutions ───────────────────────── */

export function Problems() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Чому FleetFix"
          title="Маленькі СТО втрачають гроші на хаосі"
          text="Загублені заявки, рахунки з помилками й клієнти, які забули про TÜV. FleetFix закриває ці дірки."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p.before}
              className="group grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30"
            >
              <p className="text-sm text-slate-400 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-slate-600">{p.before}</p>
              <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform dark:bg-brand-500/15 dark:text-brand-300 group-hover:translate-x-0.5">
                <Icon name="arrow-right" className="size-4" />
              </span>
              <p className="text-sm font-medium text-ink dark:text-slate-100">{p.after}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Workflow ───────────────────────── */

export function Workflow({ titleAs }: TitleProps = {}) {
  return (
    <section id="workflow" className="relative isolate overflow-hidden bg-ink py-24 sm:py-28 dark:border-y dark:border-slate-800 dark:bg-slate-900/60">
      <div
        aria-hidden="true"
        className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          inverted
          as={titleAs}
          eyebrow="Як це працює"
          title="Від дзвінка клієнта до оплаченого рахунку"
          text="Кожне замовлення (Auftrag) проходить чіткий шлях. Ремонт починається тільки після зафіксованого погодження клієнта."
        />

        <ol className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, i) => {
            const accent = "accent" in step && step.accent;
            return (
              <li
                key={step.label}
                className={`relative rounded-2xl border p-5 ${
                  accent
                    ? "border-brand-400/60 bg-brand-600/20 ring-1 ring-brand-400/30"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-8 place-items-center rounded-full font-mono text-xs font-semibold ${
                      accent ? "bg-brand-500 text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-white">{step.label}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-400">{step.hint}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Правило 15%",
              text: "Сума під час ремонту зросла більше ніж на 15%? Програма зупиняє замовлення і просить нове погодження.",
            },
            {
              title: "Без подвійних записів",
              text: "Дві машини в один бокс на той самий час поставити неможливо — навіть якщо двоє клікнули одночасно.",
            },
            {
              title: "Живі оновлення",
              text: "Механік натиснув «Готово» — приймальник бачить це на своєму екрані за секунду, без перезавантаження.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Features ───────────────────────── */

export function Features({ titleAs }: TitleProps = {}) {
  return (
    <section id="features" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as={titleAs}
          eyebrow="Можливості"
          title="Усе, що потрібно майстерні щодня"
          text="Від першого дзвінка до експорту для Steuerberater — без зайвих програм і табличок."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40 dark:hover:shadow-black/30"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-400/20">
                  <Icon name={f.icon} className="size-5" />
                </span>
                {f.plan && (
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 ring-1 ring-violet-100 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/20">
                    {f.plan}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-semibold text-ink dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Roles ───────────────────────── */

export function Roles() {
  return (
    <section id="roles" className="bg-slate-50 py-24 sm:py-28 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Для кого"
          title="Кожен бачить тільки своє"
          text="Ролі перевіряються на сервері: механік не бачить рахунки й звіти, а власник — бачить усе."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/25">
                  <Icon name={role.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink dark:text-white">{role.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{role.subtitle}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                {role.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-600 dark:text-brand-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Customer messages ───────────────────────── */

export function CustomerMessages() {
  const messages = [
    { time: "09:12", text: "Ваш запис на чт, 14.11 о 10:00 підтверджено. Autohaus Weber" },
    { time: "13:47", text: "Ваша машина M-ÜL 47 готова. Рахунок надіслано на email." },
    { time: "10:00", text: "У вас скоро TÜV (грудень). Записатись? Відповідайте «ТАК»." },
  ];

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Для ваших клієнтів</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl dark:text-white">
            Клієнт нічого не встановлює
          </h2>
          <p className="mt-4 text-lg text-pretty text-slate-600 dark:text-slate-400">
            Він дзвонить, пише в WhatsApp чи приходить, як звик. А далі отримує лише короткі SMS та
            email — і повертається до вас знову.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: "calendar" as const, text: "Підтвердження запису і нагадування за 24 години" },
              { icon: "receipt" as const, text: "Рахунок у PDF з вашим логотипом на email" },
              { icon: "bell" as const, text: "TÜV, сервіс і сезонні шини — тільки зі згодою (DSGVO)" },
              { icon: "clock" as const, text: "Повідомлення лише в робочий час, 9:00–19:00" },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <Icon name={item.icon} className="size-4" />
                </span>
                <span className="pt-1 text-slate-700 dark:text-slate-300">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phone mock */}
        <div className="relative mx-auto w-full max-w-xs">
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-brand-300/30 to-violet-300/30 blur-3xl dark:from-brand-500/20 dark:to-violet-500/20"
          />
          <div
            role="img"
            aria-label="Приклад SMS, які отримує клієнт СТО"
            className="rounded-[2.5rem] border-8 border-ink bg-ink shadow-2xl shadow-slate-900/20 dark:border-slate-800 dark:bg-slate-800 dark:shadow-black/50"
          >
            <div className="overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center justify-center pb-3 pt-4">
                <span className="h-5 w-20 rounded-full bg-ink dark:bg-slate-800" />
              </div>
              <div className="border-b border-slate-200 px-5 pb-3 text-center dark:border-slate-800">
                <span className="mx-auto grid size-10 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
                  AW
                </span>
                <p className="mt-1 text-xs font-semibold text-ink dark:text-white">Autohaus Weber</p>
              </div>
              <div className="space-y-4 px-4 py-5">
                {messages.map((m) => (
                  <div key={m.time + m.text}>
                    <p className="mb-1 text-center text-[10px] text-slate-400 dark:text-slate-500">{m.time}</p>
                    <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[13px] leading-snug text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                      {m.text}
                    </p>
                  </div>
                ))}
                <p className="ml-auto max-w-[40%] rounded-2xl rounded-br-md bg-brand-600 px-3.5 py-2.5 text-[13px] text-white">
                  ТАК 👍
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Explore (home teasers) ───────────────────────── */

const exploreCards = [
  {
    href: "/features",
    icon: "clipboard",
    title: "Можливості",
    text: "Календар, кошториси, екран механіка, рахунки GoBD і склад — що вміє FleetFix і для кого.",
  },
  {
    href: "/how-it-works",
    icon: "wrench",
    title: "Як це працює",
    text: "Шлях замовлення від дзвінка до оплати та повідомлення, які отримує клієнт.",
  },
  {
    href: "/pricing",
    icon: "receipt",
    title: "Тарифи",
    text: "Start і Pro: фіксована ціна на місяць, без комісій і прихованих платежів.",
  },
] as const;

export function Explore() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Дізнайтеся більше"
          title="Подивіться, як FleetFix працює у вашій майстерні"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {exploreCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40 dark:hover:shadow-black/30"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Icon name={card.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold text-ink dark:text-white">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{card.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                Детальніше
                <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Pricing ───────────────────────── */

export function Pricing({ titleAs }: TitleProps = {}) {
  return (
    <section id="pricing" className="bg-slate-50 py-24 sm:py-28 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as={titleAs}
          eyebrow="Тарифи"
          title="Проста підписка без комісій"
          text="Гроші клієнта йдуть напряму на ваш рахунок. Ви платите лише фіксовану суму на місяць."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.featured
                  ? "bg-ink text-white shadow-2xl shadow-brand-900/20 ring-1 ring-ink dark:bg-slate-900 dark:ring-brand-500/50"
                  : "border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-linear-to-r from-brand-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
                  Найпопулярніший
                </span>
              )}
              <h3 className={`text-lg font-semibold ${plan.featured ? "text-white" : "text-ink dark:text-white"}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.featured ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight">{plan.price} €</span>
                <span className={plan.featured ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}>/міс</span>
              </p>
              <p
                className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  plan.featured ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <Icon name="users" className="size-3.5" />
                {plan.staff}
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Icon
                      name="check"
                      className={`mt-0.5 size-4 shrink-0 ${plan.featured ? "text-brand-300" : "text-brand-600 dark:text-brand-400"}`}
                    />
                    <span className={plan.featured ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-brand-500 text-white hover:bg-brand-400"
                    : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                }`}
              >
                Спробувати {plan.name} безкоштовно
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          30 днів безкоштовно, без картки · SMS-пакет включено в тариф · Ціни без MwSt
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export function Faq({ titleAs }: TitleProps = {}) {
  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading as={titleAs} eyebrow="Питання" title="Часті запитання" />
        <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {faq.map((item) => (
            <details key={item.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-ink dark:text-white">
                {item.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-45 dark:bg-slate-800 dark:text-slate-400">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

export function CallToAction() {
  return (
    <section id="start" className="px-5 pb-24 sm:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-brand-700 to-violet-700 px-6 py-16 text-center shadow-2xl shadow-brand-900/20 sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
        />
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
          Наведіть лад у майстерні вже цього тижня
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-brand-100">
          Реєстрація за 2 хвилини. 30 днів повного доступу — без картки й без зобовʼязань.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Зареєструвати СТО
            <Icon name="arrow-right" className="size-4" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Замовити демо
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Link href="/" aria-label="FleetFix — на головну" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Робоча програма для автосервісів у Німеччині. Зроблено для СТО, а не для бухгалтерів.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-ink dark:text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-ink dark:text-slate-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-400 dark:text-slate-500">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-slate-400 sm:flex-row sm:px-8 dark:text-slate-500">
          <p>© 2026 FleetFix. Усі права захищено.</p>
          <p className="flex items-center gap-1.5">
            <Icon name="globe" className="size-3.5" />
            Hosted in Germany 🇩🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
