"use client";

import { useState } from "react";
import { Upload, CheckCircle2, FileText } from "lucide-react";
import { CATEGORIES, SENIORITY_LABELS } from "@/lib/constants";

const inputClass =
  "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export function CandidateForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/candidates", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Ocurrió un error. Intentá de nuevo.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Ocurrió un error. Intentá de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-brand-200 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">¡Listo, recibimos tu CV!</h2>
        <p className="text-slate-500">
          Quedaste registrado en nuestro banco de talento. Te vamos a contactar
          si surge una vacante que coincida con tu perfil.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre completo *</label>
          <input name="full_name" required className={inputClass} placeholder="Ana Pérez" />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input name="email" type="email" required className={inputClass} placeholder="ana@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Teléfono / WhatsApp</label>
          <input name="phone" className={inputClass} placeholder="+54 9 11 1234 5678" />
        </div>
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input name="linkedin_url" className={inputClass} placeholder="https://linkedin.com/in/..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Área de interés *</label>
          <select name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>Seleccioná una categoría</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Seniority *</label>
          <select name="seniority" required defaultValue="" className={inputClass}>
            <option value="" disabled>Seleccioná tu nivel</option>
            {Object.entries(SENIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Portfolio / Sitio web</label>
        <input name="portfolio_url" className={inputClass} placeholder="https://miportfolio.com" />
      </div>

      <div>
        <label className={labelClass}>Mensaje (opcional)</label>
        <textarea
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Contanos brevemente qué tipo de oportunidades te interesan"
        />
      </div>

      {/* CV upload */}
      <div>
        <label className={labelClass}>Tu CV (PDF o Word, máx. 5MB) *</label>
        <label
          htmlFor="cv"
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors text-center"
        >
          {fileName ? (
            <>
              <FileText className="w-6 h-6 text-brand-600" />
              <span className="text-sm font-medium text-slate-700">{fileName}</span>
              <span className="text-xs text-slate-400">Hacé clic para cambiar el archivo</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">
                Hacé clic para subir tu CV
              </span>
              <span className="text-xs text-slate-400">PDF, DOC o DOCX</span>
            </>
          )}
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-70 text-sm"
      >
        {status === "loading" ? "Enviando..." : "Enviar mi CV"}
      </button>
    </form>
  );
}
