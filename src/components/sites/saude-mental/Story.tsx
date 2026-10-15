"use client";

import { useRef } from "react";
import { GALLERY } from "./content";
import { SectionTag } from "./ui";

export function Story() {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };
  return (
    <section id="historia" className="bg-[#11082B] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[760px]">
            <SectionTag>História de impacto</SectionTag>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl">Mais que um projeto, uma transformação.</h2>
            <p className="mt-5 text-lg font-semibold text-[#FBFF51]">125 crianças, 125 oportunidades de dar o primeiro passo.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" aria-label="Anterior" onClick={() => scrollBy(-1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-[#FBFF51] hover:text-[#11082B]">←</button>
            <button type="button" aria-label="Próximo" onClick={() => scrollBy(1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-[#FBFF51] hover:text-[#11082B]">→</button>
          </div>
        </div>

        <div ref={track} className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GALLERY.map((g, i) => (
            <figure key={g.src} className="relative h-[420px] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[44%] lg:w-[32%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#11082B]/80 px-3 py-1 text-sm font-bold backdrop-blur">
                {String(i + 1).padStart(2, "0")} <span className="text-white/50">/ {String(GALLERY.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-white/75">
            <p>Para muitas crianças, entrar em uma quadra de tênis é mais do que começar a praticar um esporte. É descobrir novas possibilidades, desenvolver confiança, criar vínculos e construir sonhos.</p>
            <p>Há quase 40 anos, o projeto <strong className="text-white">Um Saque para a Vida</strong> transforma a realidade de crianças e adolescentes de comunidades do Recife por meio do esporte.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-display text-2xl font-bold uppercase text-[#FBFF51]">É aqui que você entra.</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/80">
              Ao participar do evento, você poderá adquirir um Passe de Ouro e transformar o valor da sua contribuição em um par de tênis para uma criança que sonha em entrar em quadra.
            </p>
            <p className="mt-5 font-display text-xl font-bold uppercase">Esporte é futuro. Juntos vamos mais longe.</p>
          </div>
        </div>
        <p className="mt-10 text-center text-white/60">Às vezes, tudo o que uma criança precisa para começar a transformar sua história é de alguém que a ajude a dar o primeiro passo.</p>
      </div>
    </section>
  );
}
