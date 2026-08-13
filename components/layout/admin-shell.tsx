"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Activity, Apple, BadgeIndianRupee, BarChart3, CalendarDays, ChevronLeft, ClipboardList, Dumbbell, Gift, Images, LayoutDashboard, LogOut, Menu, QrCode, Settings, Target, UserRound, Users, UsersRound, Video, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/ui/toast-provider";

const groups = [
  { label: "Overview", items: [["Dashboard", "/dashboard", LayoutDashboard]] },
  { label: "Gym", items: [["Members", "/members", Users], ["Membership Plans", "/memberships", Zap], ["Attendance", "/attendance", QrCode], ["Payments", "/payments", BadgeIndianRupee]] },
  { label: "Fitness", items: [["Trainers", "/trainers", UserRound], ["Workout Plans", "/workouts", Dumbbell], ["Diet Plans", "/diets", Apple], ["Progress", "/progress", Activity]] },
  { label: "Operations", items: [["Leads & Trials", "/leads", Target], ["Staff", "/staff", UsersRound], ["Schedule", "/schedule", CalendarDays], ["Slot Booking", "/slots", ClipboardList]] },
  { label: "Growth", items: [["Gallery", "/gallery", Images], ["Exercise Library", "/exercises", Video], ["Offers", "/offers", Gift], ["Reports", "/reports", BarChart3], ["Settings", "/settings", Settings]] },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname(); const [collapsed, setCollapsed] = useState(false); const [mobile, setMobile] = useState(false);
  return <ToastProvider><div className={cn("admin-shell", collapsed && "sidebar-collapsed")}>
    {mobile && <button className="nav-scrim" aria-label="Close menu" onClick={() => setMobile(false)} />}
    <aside className={cn("sidebar", mobile && "mobile-open")}>
      <div className="brand"><span className="brand-mark"><Dumbbell size={22} /></span><span className="brand-copy"><b>GOLDEN</b><small>GYM OS</small></span><button className="mobile-close" onClick={() => setMobile(false)}><X size={20} /></button></div>
      <nav>{groups.map((group) => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(([label, href, Icon]) => <Link key={href} href={href} onClick={() => setMobile(false)} className={cn("nav-item", (path === href || (href !== "/dashboard" && path.startsWith(href))) && "active")} title={label}><Icon size={18} /><span>{label}</span></Link>)}</div>)}</nav>
      <div className="sidebar-foot"><Link href="/member-portal" className="member-switch"><UserRound size={18} /><span>Member portal</span></Link><Link href="/login" className="nav-item"><LogOut size={18} /><span>Sign out</span></Link></div>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar"><ChevronLeft size={16} /></button>
    </aside>
    <main className="admin-main"><header className="topbar"><button className="menu-btn" onClick={() => setMobile(true)}><Menu size={21} /></button><div><span className="topbar-date">THU, 13 AUG</span><strong>Good morning, Arjun</strong></div><div className="top-actions"><Link href="/" className="text-link">View website</Link><button className="avatar-button">AK</button></div></header><div className="page-container">{children}</div></main>
  </div></ToastProvider>;
}
