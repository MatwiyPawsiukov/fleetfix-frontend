import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Вхід" };

export default function LoginPage() {
  return (
    <AuthForm
      title="Вхід у FleetFix"
      text="Увійдіть до робочого простору вашого СТО."
      fields={[
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Пароль", type: "password", autoComplete: "current-password" },
      ]}
      submitLabel="Увійти"
      switchText="Ще немає акаунта?"
      switchLabel="Зареєструвати СТО"
      switchHref="/register"
    />
  );
}
