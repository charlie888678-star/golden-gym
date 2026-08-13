"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext<(message: string) => void>(() => undefined);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const toast = useCallback((next: string) => { setMessage(next); window.setTimeout(() => setMessage(""), 3200); }, []);
  return <ToastContext.Provider value={toast}>{children}{message && <div className="toast"><CheckCircle2 size={20} /><span>{message}</span><button onClick={() => setMessage("")} aria-label="Close"><X size={16} /></button></div>}</ToastContext.Provider>;
}
