import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Pill({ href, children, variant = "primary", type, onClick }: { href?: string; children: ReactNode; variant?: "primary" | "ghost"; type?: "submit"; onClick?: () => void }) {
  const cls =
    "group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold transition duration-300 " +
    (variant === "primary"
      ? "bg-[#008cff] text-white hover:bg-[#004680]"
      : "bg-white/10 text-white backdrop-blur hover:bg-white/20");
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{inner}</button>;
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#008cff" aria-hidden="true"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></svg>
      {children}
    </span>
  );
}
