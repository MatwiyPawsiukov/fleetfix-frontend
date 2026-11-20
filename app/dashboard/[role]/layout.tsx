import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { isRole, roleInfo, roles } from "@/lib/roles";

// Only the three known roles exist; anything else is a 404.
export function generateStaticParams() {
  return roles.map((role) => ({ role }));
}

export async function generateMetadata({ params }: LayoutProps<"/dashboard/[role]">): Promise<Metadata> {
  const { role } = await params;
  return { title: isRole(role) ? `Кабінет — ${roleInfo[role].label}` : "Кабінет" };
}

export default async function DashboardLayout({ params, children }: LayoutProps<"/dashboard/[role]">) {
  const { role } = await params;
  if (!isRole(role)) notFound();
  return <DashboardShell role={role}>{children}</DashboardShell>;
}
