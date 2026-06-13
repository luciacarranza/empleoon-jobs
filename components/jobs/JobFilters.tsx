"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, SENIORITY_LABELS, CONTRACT_LABELS, LANGUAGE_LABELS, SALARY_RANGES } from "@/lib/constants";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const select =
    "w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent hover:border-brand-400 transition-colors";

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        className={select}
        value={searchParams.get("category") || ""}
        onChange={(e) => handleChange("category", e.target.value)}
        style={{ maxWidth: 200 }}
      >
        <option value="">Todas las categorías</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.icon} {c.label}
          </option>
        ))}
      </select>

      <select
        className={select}
        value={searchParams.get("seniority") || ""}
        onChange={(e) => handleChange("seniority", e.target.value)}
        style={{ maxWidth: 160 }}
      >
        <option value="">Seniority</option>
        {Object.entries(SENIORITY_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>

      <select
        className={select}
        value={searchParams.get("contract_type") || ""}
        onChange={(e) => handleChange("contract_type", e.target.value)}
        style={{ maxWidth: 160 }}
      >
        <option value="">Tipo contrato</option>
        {Object.entries(CONTRACT_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>

      <select
        className={select}
        value={searchParams.get("language") || ""}
        onChange={(e) => handleChange("language", e.target.value)}
        style={{ maxWidth: 180 }}
      >
        <option value="">Idioma</option>
        {Object.entries(LANGUAGE_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>

      <select
        className={select}
        value={searchParams.get("salary") || ""}
        onChange={(e) => handleChange("salary", e.target.value)}
        style={{ maxWidth: 180 }}
      >
        <option value="">Salario</option>
        {SALARY_RANGES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
    </div>
  );
}
