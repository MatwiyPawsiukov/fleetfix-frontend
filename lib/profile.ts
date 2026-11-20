"use client";

import { useMemo, useSyncExternalStore } from "react";
import { isRole, type Role } from "./roles";

// Temporary client-only profile: there is no backend yet, so the chosen
// name and role live in localStorage. Replace with the real API later.
// TODO: only one owner per workshop — enforce on the server once it exists.

export type Profile = { name: string; role: Role };

const KEY = "fleetfix-profile";
const EVENT = "fleetfix-profile-change";

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Profile | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (typeof data?.name === "string" && isRole(data?.role)) return { name: data.name, role: data.role };
  } catch {}
  return null;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function saveProfile(profile: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function clearProfile() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/**
 * `undefined` while not yet known (server render / before hydration),
 * `null` when there is no profile, otherwise the saved profile.
 */
export function useProfile(): Profile | null | undefined {
  // The raw string is a stable snapshot; parsing happens in useMemo.
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined);
  return useMemo(() => (raw === undefined ? undefined : parse(raw)), [raw]);
}
