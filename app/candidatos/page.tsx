import type { Metadata } from "next";
import { CandidateForm } from "@/components/candidates/CandidateForm";

export const metadata: Metadata = {
  title: "Subí tu CV — Banco de Talento Empleoon",
  description:
    "Sumate al banco de talento de Empleoon. Subí tu CV y te tendremos en cuenta para futuras vacantes remotas en LATAM acordes a tu perfil.",
};

export default function CandidatosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          🗂️ Banco de talento
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Subí tu CV y sumate a nuestra base de talento
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Guardamos tu perfil para contactarte cuando surja una vacante remota
          que coincida con tu experiencia. No es necesario crear una cuenta.
        </p>
      </div>

      <CandidateForm />

      <p className="mt-6 text-center text-xs text-slate-400">
        Al enviar tu CV aceptás que Empleoon almacene tus datos para contactarte
        sobre oportunidades laborales relevantes. No compartimos tu información
        con terceros sin tu consentimiento.
      </p>
    </div>
  );
}
