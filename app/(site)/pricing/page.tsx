import type { Metadata } from "next";
import { CallToAction, Faq, Pricing } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Тарифи",
  description: "Тарифи Start і Pro: фіксована щомісячна підписка без комісій. 30 днів безкоштовно, без картки.",
};

export default function PricingPage() {
  return (
    <>
      <Pricing titleAs="h1" />
      <Faq />
      <CallToAction />
    </>
  );
}
