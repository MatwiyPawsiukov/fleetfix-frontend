import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Реєстрація" };

export default function RegisterPage() {
  return (
    <AuthForm
      title="Зареєструвати СТО"
      text="30 днів повного доступу — без картки й без зобовʼязань."
      fields={[
        { name: "company", label: "Назва СТО", type: "text", autoComplete: "organization" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Пароль", type: "password", autoComplete: "new-password" },
      ]}
      submitLabel="Створити акаунт"
      switchText="Вже маєте акаунт?"
      switchLabel="Увійти"
      switchHref="/login"
    />
  );
}
