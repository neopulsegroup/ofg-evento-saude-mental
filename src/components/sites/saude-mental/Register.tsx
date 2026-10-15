"use client";

import { useState, type FormEvent } from "react";
import { Arrow, SectionTag } from "./ui";

const FIELDS = [
  { name: "nome", label: "Nome completo", type: "text", auto: "name" },
  { name: "email", label: "E-mail corporativo", type: "email", auto: "email" },
  { name: "telefone", label: "Telefone", type: "tel", auto: "tel" },
  { name: "empresa", label: "Empresa", type: "text", auto: "organization" },
  { name: "cargo", label: "Cargo", type: "text", auto: "organization-title" },
] as const;

export function Register() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of FIELDS) if (!String(data.get(f.name) ?? "").trim()) next[f.name] = "Campo obrigatório";
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "E-mail inválido";
    if (String(data.get("captcha") ?? "").trim() !== "11") next.captcha = "Resposta incorreta";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  const input = "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder:text-white/50 outline-none transition focus:border-[#008cff] ";

  return (
    <section id="inscricao" className="relative bg-[#00294d] py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionTag>Inscrições</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl lg:text-6xl">Garanta <span className="text-[#008cff]">sua vaga</span></h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-white/75">Preencha o formulário e participe deste encontro exclusivo.</p>
          <div className="mt-8 inline-block rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-display text-2xl font-bold uppercase">3 de novembro de 2026</p>
            <p className="mt-1 text-white/70">Ponteio, Recife · Presencial</p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          {done ? (
            <div role="status" className="py-10 text-center">
              <p className="font-display text-3xl font-bold uppercase text-[#008cff]">Inscrição recebida!</p>
              <p className="mt-3 text-white/75">Obrigado pelo interesse. Entraremos em contato pelo e-mail informado.</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-4" aria-labelledby="form-title">
              <h3 id="form-title" className="sr-only">Formulário de inscrição</h3>
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <label htmlFor={`f-${f.name}`} className="sr-only">{f.label}</label>
                  <input id={`f-${f.name}`} name={f.name} type={f.type} autoComplete={f.auto} placeholder={`${f.label}*`} aria-invalid={!!errors[f.name]} className={input + (errors[f.name] ? "border-red-400" : "border-white/15")} />
                  {errors[f.name] && <p className="mt-1 text-sm text-red-300">{errors[f.name]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="f-captcha" className="mb-2 block text-sm text-white/70">Verificação: quanto é 8 + 3?</label>
                <input id="f-captcha" name="captcha" inputMode="numeric" placeholder="8 + 3 =" aria-invalid={!!errors.captcha} className={input + (errors.captcha ? "border-red-400" : "border-white/15")} />
                {errors.captcha && <p className="mt-1 text-sm text-red-300">{errors.captcha}</p>}
              </div>
              <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#008cff] px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-[#004680]">
                Quero participar <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="text-center text-sm text-white/60">Seus dados estão seguros.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
