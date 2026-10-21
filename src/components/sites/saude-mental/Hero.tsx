import { EVENT } from "./content";
import { Pill } from "./ui";

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#00294d] pb-14 pt-36 text-white">
      <video className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_30%]" src="/sites/saude-mental/videos/hero.mp4" poster="/sites/saude-mental/images/hero.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00294d] via-[#00294d]/75 to-[#00294d]/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#00294d] to-transparent" />
      <div className="mx-auto w-full max-w-[1240px] px-5">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#008cff]">{EVENT.name}</p>
          <h1 className="font-display text-[34px] font-bold uppercase leading-[1.08] sm:text-5xl lg:text-[56px]">
            Grande Encontro de Gestores e Líderes de RH e Gestão de Pessoas
            <span className="mt-3 block text-[#008cff]">Saúde Mental nas Empresas</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/80">
            O que 2026 ensinou e como se preparar para 2027
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Pill href="#inscricao">Garanta sua vaga</Pill>
            <Pill href="#sobre" variant="ghost">Saiba mais</Pill>
          </div>
          <a href="#local" className="mt-12 flex max-w-[560px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase sm:text-4xl">
                {EVENT.dateLong} <span className="text-[#008cff]">· {EVENT.time}</span>
              </h2>
              <p className="mt-3 flex items-start gap-2 text-sm text-white/80 sm:text-base">
                <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#008cff" strokeWidth="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{EVENT.venue}, Recife · {EVENT.mode}<br />Av. Gov. Agamenon Magalhães, 2939 - Recife</span>
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#008cff] text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
