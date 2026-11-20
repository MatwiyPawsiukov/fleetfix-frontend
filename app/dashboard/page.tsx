import { DashboardRedirect } from "@/components/dashboard/DashboardRedirect";

// /dashboard → the current user's own workspace (or /profile if no role chosen yet).
export default function DashboardIndexPage() {
  return <DashboardRedirect />;
}
