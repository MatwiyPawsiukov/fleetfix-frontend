import { notFound } from "next/navigation";
import { MechanicDashboard } from "@/components/dashboard/MechanicDashboard";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";
import { ReceptionistDashboard } from "@/components/dashboard/ReceptionistDashboard";
import { isStaffRole, staffRoles } from "@/lib/roles";

export function generateStaticParams() {
  return staffRoles.map((role) => ({ role }));
}

export default async function DashboardPage({ params }: PageProps<"/dashboard/[role]">) {
  const { role } = await params;
  if (!isStaffRole(role)) notFound();

  switch (role) {
    case "owner":
      return <OwnerDashboard />;
    case "receptionist":
      return <ReceptionistDashboard />;
    case "mechanic":
      return <MechanicDashboard />;
  }
}
