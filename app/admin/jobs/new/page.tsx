"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { createAdminClient } from "@/lib/supabase";

const inputClass =
  "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    company_logo: "",
    company_url: "",
    category: "programacion",
    seniority: "senior",
    contract_type: "full-time",
    language: "espanol",
    salary_min: "",
    salary_max: "",
    salary_currency: "USD",
    location: "Remoto",
    is_remote: true,
    description: "",
    requirements: "",
    benefits: "",
    tags: "",
    apply_url: "",
    is_featured: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const slug = slugify(`${form.title}-${form.company}-${Date.now()}`);
    const payload = {
      ...form,
      slug,
      salary_min: form.salary_min ? parseInt(form.salary_min) : null,
      salary_max: form.salary_max ? parseInt(form.salary_max) : null,
      requirements: form.requirements.split("\n").filter(Boolean),
      benefits: form.benefits.split("\n").filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_active: true,
      published_at: new Date().toISOString(),
    };

    const supabase = createAdminClient();
    const { error } = await supabase.from("jobs").insert(payload);

    setLoading(false);
    if (error) alert("Error: " + error.message);
    else router.push("/admin/jobs");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Publicar nueva vacante</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-2xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Título del puesto *</label>
            <input name="title" required value={form.title} onChange={handleChange} className={inputClass} placeholder="Senior Full-Stack Engineer" />
          </div>
          <div>
            <label className={labelClass}>Empresa *</label>
            <input name="company" required value={form.company} onChange={handleChange} className={inputClass} placeholder="Acme Inc." />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Logo (URL)</label>
            <input name="company_logo" value={form.company_logo} onChange={handleChange} className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className={labelClass}>Website empresa</label>
            <input name="company_url" value={form.company_url} onChange={handleChange} className={inputClass} placeholder="https://acme.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Categoría *</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Seniority *</label>
            <select name="seniority" value={form.seniority} onChange={handleChange} className={inputClass}>
              {["junior","semi-senior","senior","lead","staff"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tipo contrato *</label>
            <select name="contract_type" value={form.contract_type} onChange={handleChange} className={inputClass}>
              {["full-time","part-time","freelance","contrato"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Idioma *</label>
            <select name="language" value={form.language} onChange={handleChange} className={inputClass}>
              <option value="espanol">Solo español</option>
              <option value="ingles">Inglés requerido</option>
              <option value="bilingue">Bilingüe</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Salario mínimo (USD/mes)</label>
            <input name="salary_min" type="number" value={form.salary_min} onChange={handleChange} className={inputClass} placeholder="1000" />
          </div>
          <div>
            <label className={labelClass}>Salario máximo (USD/mes)</label>
            <input name="salary_max" type="number" value={form.salary_max} onChange={handleChange} className={inputClass} placeholder="3000" />
          </div>
        </div>

        <div>
          <label className={labelClass}>URL de aplicación *</label>
          <input name="apply_url" required value={form.apply_url} onChange={handleChange} className={inputClass} placeholder="https://jobs.example.com/apply/..." />
        </div>

        <div>
          <label className={labelClass}>Descripción *</label>
          <textarea name="description" required rows={6} value={form.description} onChange={handleChange} className={inputClass} placeholder="Descripción completa del puesto..." />
        </div>

        <div>
          <label className={labelClass}>Requisitos (uno por línea)</label>
          <textarea name="requirements" rows={4} value={form.requirements} onChange={handleChange} className={inputClass} placeholder="3+ años de experiencia en React&#10;Conocimientos en TypeScript&#10;Inglés avanzado" />
        </div>

        <div>
          <label className={labelClass}>Beneficios (uno por línea)</label>
          <textarea name="benefits" rows={3} value={form.benefits} onChange={handleChange} className={inputClass} placeholder="Equity&#10;Seguro médico&#10;Home office 100%" />
        </div>

        <div>
          <label className={labelClass}>Tags (separados por coma)</label>
          <input name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="React, TypeScript, Node.js, Remote" />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_featured"
            id="is_featured"
            checked={form.is_featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="is_featured" className="text-sm font-medium text-slate-700">
            ⚡ Marcar como vacante destacada (aparece primero)
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-70"
          >
            {loading ? "Publicando..." : "Publicar vacante"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
