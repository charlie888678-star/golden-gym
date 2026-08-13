import Image from "next/image";
import type { ReactNode } from "react";
import type { Status } from "@/types";
import { cn, initials } from "@/lib/utils";

export function Badge({ status, children }: { status: Status | string; children?: ReactNode }) {
  const tone: Record<string, string> = { active: "badge-green", paid: "badge-green", joined: "badge-green", completed: "badge-green", expiring: "badge-amber", pending: "badge-amber", contacted: "badge-blue", scheduled: "badge-blue", trial: "badge-violet", "trial booked": "badge-violet", "trial completed": "badge-violet", lead: "badge-blue", "new lead": "badge-blue", expired: "badge-red", missed: "badge-red", lost: "badge-red", inactive: "badge-gray", converted: "badge-green" };
  return <span className={cn("badge", tone[status.toLowerCase()] ?? "badge-gray")}><span className="badge-dot" />{children ?? status}</span>;
}

export function Avatar({ src, name, size = 42 }: { src?: string; name: string; size?: number }) {
  return <div className="avatar" style={{ width: size, height: size }}>{src ? <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" /> : <span>{initials(name)}</span>}</div>;
}

export function StatCard({ label, value, detail, icon, tone = "lime" }: { label: string; value: string; detail?: string; icon: ReactNode; tone?: "lime" | "blue" | "violet" | "orange" }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><p>{label}</p><h3>{value}</h3>{detail && <small>{detail}</small>}</div></article>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

export function EmptyState({ title, text }: { title: string; text: string }) { return <div className="empty"><div>◎</div><h3>{title}</h3><p>{text}</p></div>; }

export function ProgressBar({ value, max = 100, className }: { value: number; max?: number; className?: string }) { return <div className={cn("progress-track", className)}><span style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>; }
