import { TOPICS } from "./content";
import { Pill, SectionTag } from "./ui";

export function About() {
  return (
    <>
      <section id="sobre" className="bg-[#11082B] py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20">
          <div className="relative pb-16 pr-10 sm:pr-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sites/saude-mental/images/plateia.jpg" alt="Plateia em evento corporativo" className="aspect-[4/5] w-full rounded-3xl object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sites/saude-mental/images/grupo.jpg" alt="Grupo do projeto social" className="absolute bottom-0 right-0 aspect-[4/3] w-3/5 rounded-3xl border-8 border-[#11082B] object-cover" />
          </div>
          <div>
            <SectionTag>Sobre o evento</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl lg:text-[56px]">Pessoas movem negócios.</h2>
            <p className="mt-3 font-semibold text-[#FBFF51]">3 de novembro de 2026 | Ponteio, Recife</p>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              No dia 3 de novembro, vamos reunir profissionais e decisores para conversar sobre saúde mental, riscos psicossociais, NR-1 e os desafios da gestão de pessoas para 2027, a partir de experiências do Brasil e da Europa.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              E, neste encontro, cada participação também poderá fazer a diferença fora do ambiente corporativo.
            </p>
            <div className="mt-8"><Pill href="#inscricao">Garanta sua vaga</Pill></div>
          </div>
        </div>
      </section>

      <section id="temas" className="bg-[#11082B] pb-20 text-white lg:pb-28">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="max-w-[760px]">
            <SectionTag>Programação</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl">Vamos conversar sobre</h2>
          </div>
          <ol className="mt-12 border-t border-white/15">
            {TOPICS.map((t, i) => (
              <li key={t} className="group flex items-center gap-6 border-b border-white/15 py-7 transition-colors hover:bg-white/5 sm:gap-10 sm:px-4">
                <span className="font-display text-3xl font-bold text-[#FBFF51] sm:text-5xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold leading-snug sm:text-2xl">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
