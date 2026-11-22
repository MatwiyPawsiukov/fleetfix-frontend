"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/profile";
import { homePath } from "@/lib/roles";

export function DashboardRedirect() {
  const router = useRouter();
  const profile = useProfile();

  useEffect(() => {
    if (profile === null) router.replace("/profile");
    else if (profile) router.replace(homePath(profile.role));
  }, [profile, router]);

  return (
    <div className="flex flex-1 items-center justify-center" aria-busy="true">
      <span className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
    </div>
  );
}
