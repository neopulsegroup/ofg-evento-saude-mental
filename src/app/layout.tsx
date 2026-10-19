import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const sans = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Encontro de Líderes e Gestores em Recife | 3 de novembro de 2026 | OFG",
  description:
    "Encontro exclusivo para líderes e gestores sobre saúde mental, NR-1 e gestão de pessoas. 3 de novembro de 2026, Hub Plural Espinheiro, Recife.",
  icons: { icon: "/sites/saude-mental/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#00294d] font-[family-name:var(--font-figtree)]">{children}</body>
    </html>
  );
}
