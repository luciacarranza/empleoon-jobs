"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/jobs";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-gradient-brand rounded-3xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-5">
          <Mail className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Recibí nuevas vacantes remotas todas las semanas
        </h2>
        <p className="text-white/80 mb-7 text-base">
          Más de 500 profesionales de LATAM ya reciben las mejores oportunidades en su inbox.
          Gratis, sin spam.
        </p>

        {status === "success" ? (
          <div className="bg-white/20 rounded-2xl px-6 py-4 text-white font-semibold">
            ✅ ¡Listo! Te suscribiste correctamente. Revisá tu email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-5 py-3.5 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-brand-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-50 transition-colors disabled:opacity-70 text-sm whitespace-nowrap"
            >
              {status === "loading" ? "Suscribiendo..." : "Suscribirme gratis"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-white/70 text-sm">Hubo un error. Intentá de nuevo.</p>
        )}
      </div>
    </section>
  );
}
