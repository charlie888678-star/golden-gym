"use client";

import { useSyncExternalStore } from "react";

export type MemberWebsiteOverride = { image?: string; showOnWebsite?: boolean };
export type MemberWebsiteOverrides = Record<string, MemberWebsiteOverride>;

const STORAGE_KEY = "golden-gym-member-website";
const EVENT_NAME = "golden-gym-member-website-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT_NAME, callback); };
}

function getSnapshot() { return window.localStorage.getItem(STORAGE_KEY) ?? "{}"; }
function getServerSnapshot() { return "{}"; }

export function useMemberWebsiteOverrides(): MemberWebsiteOverrides {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  try { return JSON.parse(raw) as MemberWebsiteOverrides; } catch { return {}; }
}

export function saveMemberWebsiteOverride(id: string, value: MemberWebsiteOverride) {
  const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as MemberWebsiteOverrides;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [id]: { ...current[id], ...value } }));
  window.dispatchEvent(new Event(EVENT_NAME));
}
