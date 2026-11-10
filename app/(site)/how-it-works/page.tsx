import type { Metadata } from "next";
import { CallToAction, CustomerMessages, Workflow } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Як це працює",
  description:
    "Шлях замовлення від дзвінка клієнта до оплаченого рахунку та повідомлення, які клієнт отримує по SMS і email.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Workflow titleAs="h1" />
      <CustomerMessages />
      <CallToAction />
    </>
  );
}
