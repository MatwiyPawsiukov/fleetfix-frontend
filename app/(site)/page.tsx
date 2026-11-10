import {
  CallToAction,
  CustomerMessages,
  Explore,
  Hero,
  Problems,
  TrustStrip,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problems />
      <Explore />
      <CustomerMessages />
      <CallToAction />
    </>
  );
}
