import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 200;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

async function sendToRdStation(lead: { name: string; email: string; phone: string; company: string; role: string }) {
  const apiKey = process.env.RD_API_KEY;
  if (!apiKey) return;
  try {
    const res = await fetch(`https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: process.env.RD_CONVERSION_ID ?? "formulario-evento-saude-mental-03-11-2026",
          email: lead.email,
          name: lead.name,
          personal_phone: lead.phone,
          company_name: lead.company,
          job_title: lead.role,
        },
      }),
    });
    if (!res.ok) console.error("rd station failed", res.status, await res.text());
  } catch (err) {
    console.error("rd station failed", err instanceof Error ? err.message : err);
  }
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Cadastro indisponível no momento." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Campo isca: bots preenchem, pessoas não veem.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.nome);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.telefone);
  const company = clean(body.empresa);
  const role = clean(body.cargo);
  if (!name || !phone || !company || !role || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Preencha todos os campos corretamente." }, { status: 400 });
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

  try {
    const existing = await fetch(
      `${url}/rest/v1/users?select=id&email=ilike.${encodeURIComponent(email.replace(/[%*_]/g, ""))}&limit=1`,
      { headers, cache: "no-store" },
    );
    if (!existing.ok) throw new Error(`lookup ${existing.status}`);
    if ((await existing.json()).length > 0) {
      await sendToRdStation({ name, email, phone, company, role });
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }

    const created = await fetch(`${url}/rest/v1/users`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ id: randomUUID(), name, email, phone, company, role, created_at: Date.now() }),
    });
    if (!created.ok) throw new Error(`insert ${created.status}`);
  } catch (err) {
    console.error("register failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Não foi possível concluir a inscrição. Tente novamente." }, { status: 502 });
  }

  await sendToRdStation({ name, email, phone, company, role });
  return NextResponse.json({ ok: true });
}
