import QRCode from "qrcode";
import { EVENT } from "./content";
import { Arrow, SectionTag } from "./ui";

const STATS = [
  { value: "+ de 5.000", label: "beneficiários atendidos" },
  { value: "+ de 200", label: "crianças acolhidas hoje" },
  { value: "~ 40 anos", label: "transformando vidas pelo esporte" },
];

export async function Donation() {
  const qr = await QRCode.toString(EVENT.donateUrl, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#00294d", light: "#ffffff" } });
  return (
    <section id="doacao" className="relative overflow-hidden bg-gradient-to-b from-[#00294d] to-[#00355f] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5">
        <SectionTag>Um Saque para a Vida</SectionTag>
        <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.08] sm:text-5xl lg:text-6xl">
          Sua inscrição é gratuita. <span className="text-[#008cff]">Seu gesto vale uma vida.</span>
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1240px] items-center gap-12 px-5 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[340px]">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl shadow-black/40">
            <video className="aspect-[9/16] w-full object-cover" src="/sites/saude-mental/videos/uspv.mp4" poster="/sites/saude-mental/images/uspv-poster.jpg" controls playsInline preload="none" aria-label="Vídeo do projeto Um Saque para a Vida" />
          </div>
        </div>

        <div>
          <div className="max-w-[620px] space-y-4 text-lg leading-relaxed text-white/80">
            <p>
              Participar deste encontro não custa nada. Pedimos apenas um ato de generosidade: uma doação ao projeto <strong className="text-white">Um Saque para a Vida</strong>, a ONG que o evento apoia.
            </p>
            <p>
              Há quase 40 anos, o esporte é a porta de saída para crianças e famílias do Recife que lutam todos os dias pelo pódio em suas vidas. Cada contribuição vira quadra, material esportivo, acolhimento e, para uma criança, a chance de acreditar em um futuro diferente.
            </p>
            <p className="font-semibold text-white">Quanto você doaria para que alguém dê o primeiro passo?</p>
          </div>

          <dl className="mt-8 grid max-w-[620px] grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="font-display text-xl font-bold text-[#008cff] sm:text-2xl">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href={EVENT.donateUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-xl bg-[#008cff] px-7 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#004680]">
              Quero doar agora
              <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={EVENT.donateUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir página de doação" className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-3 transition hover:bg-white/10">
              <span className="block h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 [&>svg]:h-full [&>svg]:w-full" role="img" aria-label="QR Code para doar ao projeto Um Saque para a Vida" dangerouslySetInnerHTML={{ __html: qr }} />
              <span className="max-w-[140px] text-sm leading-snug text-white/80">Aponte a câmera do celular para doar pelo QR Code</span>
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Conheça o projeto em <a href={EVENT.ongUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-4">umsaqueparavida.ong.br</a>
          </p>
        </div>
      </div>
    </section>
  );
}
