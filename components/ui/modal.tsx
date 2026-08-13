"use client";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">Golden Gym</span><h2>{title}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close modal"><X size={20} /></button></div>{children}</section></div>;
}
