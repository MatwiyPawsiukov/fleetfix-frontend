import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: { default: "Кабінет клієнта", template: "%s — Кабінет клієнта FleetFix" },
};

// Client (car owner) portal: own cars, booking, repair status and invoices.
export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return <PortalShell>{children}</PortalShell>;
}
