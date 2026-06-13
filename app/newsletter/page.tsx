import { NewsletterBanner } from "@/components/jobs/NewsletterBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — Recibí vacantes remotas LATAM",
  description:
    "Suscribite gratis y recibí las mejores vacantes remotas para talento latinoamericano directamente en tu email.",
};

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          📬 Newsletter de Empleoon
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Cada semana curada las mejores vacantes remotas para talento de LATAM.
          Gratis, sin spam.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { emoji: "🎯", title: "Curada", desc: "Solo vacantes remotas reales, sin ruido" },
          { emoji: "💰", title: "En USD", desc: "Oportunidades con salarios internacionales" },
          { emoji: "🌎", title: "Para LATAM", desc: "Empresas que aceptan talento latinoamericano" },
        ].map((item) => (
          <div key={item.title} className="text-center p-6 bg-white rounded-2xl border border-slate-200">
            <div className="text-3xl mb-3">{item.emoji}</div>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <NewsletterBanner />
    </div>
  );
}
