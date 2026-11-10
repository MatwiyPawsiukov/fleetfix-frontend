import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/sections";

// Public site: every page in (site) shares this header and footer.
// The layout stays mounted while navigating, so only <main> changes.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
