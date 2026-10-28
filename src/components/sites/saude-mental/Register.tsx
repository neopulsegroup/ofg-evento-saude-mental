"use client";

import { useState, type FormEvent } from "react";
import { EVENT } from "./content";
import { Toast } from "./Toast";
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
  const [done, setDone] = useState<null | { already: boolean }>(null);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of FIELDS) if (!String(data.get(f.name) ?? "").trim()) next[f.name] = "Campo obrigatório";
    const email = String(data.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "E-mail inválido";
    if (String(data.get("captcha") ?? "").trim() !== "11") next.captcha = "Resposta incorreta";
    if (!data.get("consentimento")) next.consentimento = "É necessário autorizar para concluir a inscrição";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; alreadyRegistered?: boolean };
      if (!res.ok) throw new Error(json.error ?? "Não foi possível concluir a inscrição.");
      setDone({ already: !!json.alreadyRegistered });
      setToastOpen(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Não foi possível concluir a inscrição.");
    } finally {
      setSending(false);
    }
  };

  const input = "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-white placeholder:text-white/50 outline-none transition focus:border-[#008cff] ";

  return (
    <section id="inscricao" className="relative bg-[#00294d] py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionTag>Inscrições</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl lg:text-6xl">Garanta <span className="text-[#008cff]">sua vaga</span></h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-white/75">Preencha o formulário e participe deste encontro exclusivo. <strong className="text-white">Vagas limitadas.</strong></p>
          <div className="mt-6 max-w-[480px] rounded-2xl border border-[#008cff]/40 bg-[#008cff]/10 p-5">
            <p className="font-display text-xl font-bold uppercase text-[#008cff]">Inscrição gratuita</p>
            <p className="mt-2 leading-relaxed text-white/80">
              Você não paga para participar. Pedimos apenas um gesto de generosidade: uma doação de qualquer valor ao projeto <strong className="text-white">Um Saque para a Vida</strong>, que transforma a vida de crianças do Recife pelo esporte. Você pode doar no ato da inscrição ou no dia do evento.
            </p>
            <a href={EVENT.donateUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-white underline underline-offset-4 hover:text-[#008cff]">Quero doar agora</a>
          </div>
          <div className="mt-8 inline-block rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-display text-2xl font-bold uppercase">3 de novembro de 2026</p>
            <p className="mt-1 text-white/70">16h00 · Hub Plural Espinheiro, Recife · Presencial</p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          {done ? (
            <div role="status" className="py-10 text-center">
              <p className="font-display text-3xl font-bold uppercase text-[#008cff]">
                {done.already ? "Você já está inscrito!" : "Inscrição confirmada!"}
              </p>
              <p className="mt-3 text-white/75">
                Para acessar o app do evento, entre com o e-mail cadastrado: use o login com Google ou crie sua senha em &quot;Esqueci minha senha&quot;.
              </p>

            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-4" aria-labelledby="form-title">
              <h3 id="form-title" className="sr-only">Formulário de inscrição</h3>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
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
              <div>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <input type="checkbox" name="consentimento" aria-invalid={!!errors.consentimento} className="mt-1 h-4 w-4 shrink-0 accent-[#008cff]" />
                  <span>
                    Autorizo o uso da minha imagem (fotos e vídeos) captada durante o evento para fins de divulgação institucional do Oporto Forte Group e do projeto Um Saque para a Vida, e o tratamento dos meus dados pessoais para organização do evento e comunicações relacionadas, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
                  </span>
                </label>
                {errors.consentimento && <p className="mt-1 text-sm text-red-300">{errors.consentimento}</p>}
              </div>
              {serverError && <p role="alert" className="text-center text-sm text-red-300">{serverError}</p>}
              <button type="submit" disabled={sending} className="group flex w-full disabled:opacity-60 items-center justify-center gap-2 rounded-xl bg-[#008cff] px-6 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-[#004680]">
                {sending ? "Enviando..." : "Quero participar"} <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="text-center text-sm text-white/70">Inscrição gratuita. Vagas limitadas. Doe ao projeto Um Saque para a Vida no ato da inscrição ou no dia do evento: <a href={EVENT.donateUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-4">doar online agora</a>.</p>
              <p className="text-center text-sm text-white/60">Seus dados estão seguros. Você pode solicitar a correção ou a exclusão deles a qualquer momento.</p>
            </form>
          )}
        </div>
      </div>
      {toastOpen && (
        <Toast
          title={done?.already ? "Você já está inscrito!" : "Inscrição confirmada!"}
          description="Acesse o app do evento com o e-mail cadastrado."
          onClose={() => setToastOpen(false)}
        />
      )}
    </section>
  );
}
