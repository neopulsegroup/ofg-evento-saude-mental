"use client";

import { useEffect, useState } from "react";
import { EVENT } from "./content";

type ToastProps = { title: string; description: string; onClose: () => void };

export function Toast({ title, description, onClose }: ToastProps) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-[420px] overflow-hidden rounded-xl bg-[#001a33] text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <svg className="shrink-0 text-[#008cff]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m8.5 12.5 2.5 2.5 4.5-5" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          <p className="mt-0.5 text-sm leading-snug text-white/60">{description}</p>
        </div>
        <a
          href={EVENT.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#001a33] transition hover:bg-[#008cff] hover:text-white"
        >
          Visitar APP
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar aviso"
          className="shrink-0 rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#008cff] to-transparent" aria-hidden="true" />
    </div>
  );
}
