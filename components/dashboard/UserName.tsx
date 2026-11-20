"use client";

import { useProfile } from "@/lib/profile";

// The profile lives in localStorage, so the name is filled in on the client.
// Dashboards render only inside DashboardShell, after the profile is known.
export function UserName() {
  const profile = useProfile();
  return <>{profile?.name.split(" ")[0]}</>;
}
