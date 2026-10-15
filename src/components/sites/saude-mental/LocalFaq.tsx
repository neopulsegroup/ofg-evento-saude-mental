"use client";

import { useState } from "react";
import { EVENT, FAQ } from "./content";
import { Pill, SectionTag } from "./ui";

export function LocalFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="local" className="bg-[#170C29] py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 lg:grid-cols-2">
        <div>
          <SectionTag>Local e data</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl">{EVENT.venue}</h2>
          <p className="mt-4 text-lg text-white/80"><b className="text-white">Ponteio, Recife (PE)</b><br /><time dateTime="2026-11-03">{EVENT.dateLong}</time>, terça-feira · {EVENT.mode}</p>
          <div className="mt-6"><Pill href={EVENT.mapsUrl}>Ver no mapa</Pill></div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            <iframe title="Mapa: Ponteio, Recife (PE)" src={EVENT.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-[340px] w-full border-0" />
          </div>
        </div>
        <div>
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-4">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`rounded-2xl border transition-colors ${isOpen ? "border-[#FBFF51]/50 bg-white/10" : "border-white/10 bg-white/5"}`}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold">
                      {f.q}
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBFF51] text-xl leading-none text-[#11082B] transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                  </h3>
                  <div id={`faq-${i}`} className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden px-6 text-white/75"><span className={`block ${isOpen ? "pb-5" : ""}`}>{f.a}</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
