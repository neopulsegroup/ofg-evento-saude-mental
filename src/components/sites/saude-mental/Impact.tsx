"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

export function Impact() {
  return (
    <section id="impacto" className="relative overflow-hidden bg-gradient-to-r from-[#FBFF51] to-[#d9ff4a] py-14 text-[#11082B]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:grid-cols-[1fr_1fr_1.4fr]">
        <div>
          <p className="font-display text-7xl font-bold leading-none"><Counter to={125} /></p>
          <p className="mt-2 text-xl font-bold">crianças <span className="font-medium">em um projeto social de tênis</span></p>
        </div>
        <div>
          <p className="font-display text-7xl font-bold leading-none"><Counter to={125} /></p>
          <p className="mt-2 text-xl font-bold">oportunidades <span className="font-medium">de dar o primeiro passo.</span></p>
        </div>
        <div className="md:border-l md:border-[#11082B]/25 md:pl-10">
          <h2 className="font-display text-3xl font-bold leading-tight">Mais do que um evento, um impacto real.</h2>
          <p className="mt-3 text-base leading-relaxed">
            Para muitas crianças, entrar em uma quadra de tênis é mais do que começar a praticar um esporte. É descobrir novas possibilidades, desenvolver confiança, criar vínculos e construir sonhos.
          </p>
          <a href="#historia" className="mt-4 inline-block font-bold underline underline-offset-4">Conheça o projeto</a>
        </div>
      </div>
    </section>
  );
}
