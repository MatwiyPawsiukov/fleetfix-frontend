import type { Metadata } from "next";
import { CallToAction, Features, Roles } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Можливості",
  description:
    "Календар по боксах, кошториси, екран механіка, рахунки за правилами GoBD, склад шин і запчастин, звіти для власника.",
};

export default function FeaturesPage() {
  return (
    <>
      <Features titleAs="h1" />
      <Roles />
      <div className="pt-24 sm:pt-28">
        <CallToAction />
      </div>
    </>
  );
}
