import type { Metadata } from "next";
import { PageTitle } from "@/components/dashboard/ui";
import { BookingForm } from "@/components/portal/BookingForm";

export const metadata: Metadata = { title: "Запис на сервіс" };

export default function PortalBookPage() {
  return (
    <>
      <PageTitle title="Запис на сервіс" text="Оберіть авто, послугу й вільний час — ми підтвердимо запис SMS." />
      <BookingForm />
    </>
  );
}
