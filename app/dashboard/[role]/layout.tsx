import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { isStaffRole, roleInfo, staffRoles } from "@/lib/roles";

// Only the three staff roles have a dashboard; anything else is a 404.
export function generateStaticParams() {
  return staffRoles.map((role) => ({ role }));
}

export async function generateMetadata({ params }: LayoutProps<"/dashboard/[role]">): Promise<Metadata> {
  const { role } = await params;
  return { title: isStaffRole(role) ? `Кабінет — ${roleInfo[role].label}` : "Кабінет" };
}

export default async function DashboardLayout({ params, children }: LayoutProps<"/dashboard/[role]">) {
  const { role } = await params;
  if (!isStaffRole(role)) notFound();
  return <DashboardShell role={role}>{children}</DashboardShell>;
}
