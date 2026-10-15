"use client";

import { useEffect, useState } from "react";
import { NAV } from "./content";
import { Pill } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className={`mx-auto flex max-w-[1240px] items-center justify-between rounded-2xl border border-white/10 px-5 py-3 backdrop-blur-md transition-colors duration-300 ${scrolled || open ? "bg-[#11082B]/90" : "bg-white/5"}`}>
        <a href="#home" aria-label="Oporto Forte Group" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sites/saude-mental/images/logo-ofg-bandeiras.png" alt="Oporto Forte Group" width={735} height={310} className="h-11 w-auto" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[15px] font-semibold text-white/90 transition-colors hover:text-[#FBFF51]">{n.label}</a>
          ))}
        </nav>
        <div className="hidden lg:block"><Pill href="#inscricao">Garanta sua vaga</Pill></div>
        <button type="button" className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 lg:hidden" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 flex max-w-[1240px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#11082B]/95 p-4 backdrop-blur-md lg:hidden" aria-label="Menu móvel">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-white hover:bg-white/10">{n.label}</a>
          ))}
          <div className="pt-2"><Pill href="#inscricao" >Garanta sua vaga</Pill></div>
        </nav>
      )}
    </header>
  );
}
