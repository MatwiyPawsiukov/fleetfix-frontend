import type { IconName } from "@/components/home/icons";

export const roles = ["owner", "receptionist", "mechanic"] as const;

export type Role = (typeof roles)[number];

export type RoleInfo = {
  label: string;
  description: string;
  icon: IconName;
  nav: { icon: IconName; label: string }[];
};

export const roleInfo: Record<Role, RoleInfo> = {
  owner: {
    label: "Власник",
    description: "Фінанси, завантаження боксів, команда та звіти по всьому СТО.",
    icon: "chart",
    nav: [
      { icon: "chart", label: "Огляд" },
      { icon: "euro", label: "Фінанси" },
      { icon: "users", label: "Команда" },
      { icon: "receipt", label: "Рахунки" },
      { icon: "shield", label: "Налаштування" },
    ],
  },
  receptionist: {
    label: "Приймальник",
    description: "Заявки клієнтів, запис у календар, прийом і видача авто.",
    icon: "inbox",
    nav: [
      { icon: "inbox", label: "Заявки" },
      { icon: "calendar", label: "Календар" },
      { icon: "users", label: "Клієнти" },
      { icon: "receipt", label: "Рахунки" },
      { icon: "message", label: "Повідомлення" },
    ],
  },
  mechanic: {
    label: "Механік",
    description: "Мої завдання на сьогодні, чек-листи робіт і запит запчастин.",
    icon: "wrench",
    nav: [
      { icon: "wrench", label: "Мої завдання" },
      { icon: "clipboard", label: "Замовлення" },
      { icon: "box", label: "Запчастини" },
      { icon: "clock", label: "Мій час" },
    ],
  },
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (roles as readonly string[]).includes(value);
}
