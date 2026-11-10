import type { Metadata } from "next";
import { CallToAction, Faq } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Питання",
  description: "Відповіді на часті запитання про FleetFix: рахунки, зберігання даних, SMS і оплату.",
};

export default function FaqPage() {
  return (
    <>
      <Faq titleAs="h1" />
      <CallToAction />
    </>
  );
}
