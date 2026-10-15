import { EVENT, NAV } from "./content";
import { Pill } from "./ui";

export function Footer() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#004680] to-[#00294d] py-16 text-center text-white">
        <div className="mx-auto max-w-[820px] px-5">
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl">Faça parte deste <span className="text-[#008cff]">movimento.</span></h2>
          <p className="mt-4 text-lg text-white/75">Junte-se a líderes que acreditam no poder das pessoas.</p>
          <div className="mt-8"><Pill href="#inscricao">Garanta sua vaga</Pill></div>
        </div>
      </section>
      <footer className="bg-[#001a33] py-10 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-5 md:flex-row">
          <a href={EVENT.siteUrl} aria-label="Oporto Forte Group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sites/saude-mental/images/logo-ofg-bandeiras.png" alt="Oporto Forte Group" width={735} height={310} className="h-14 w-auto" />
          </a>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Rodapé">
            {NAV.map((n) => <a key={n.href} href={n.href} className="text-white/70 transition hover:text-[#008cff]">{n.label}</a>)}
          </nav>
          <div className="text-center text-sm text-white/60 md:text-right">
            <p>Oporto Forte Group · © 2026 Todos os direitos reservados.</p>
            <p className="mt-1 font-semibold text-white/80">Pessoas constroem o amanhã.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
