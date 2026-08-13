import type { Status } from "@/types";

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
export const currency = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
export const shortDate = (value: string) => new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
export const daysFromNow = (days: number) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
export const membershipStatus = (expiryDate: string): Status => { const diff = Math.ceil((new Date(expiryDate).getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000); return diff < 0 ? "expired" : diff <= 7 ? "expiring" : "active"; };
export const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
