import { Suspense } from "react";
import { getJobs } from "@/lib/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { SearchBar } from "@/components/jobs/SearchBar";
import { NewsletterBanner } from "@/components/jobs/NewsletterBanner";
import type { Metadata } from "next";
import type { Category, Seniority, ContractType, Language } from "@/types";

export const metadata: Metadata = {
  title: "Vacantes Remotas LATAM",
  description:
    "Explorá todas las vacantes remotas para talento latinoamericano. Filtrá por categoría, seniority, salario e idioma.",
};

export const revalidate = 300;

interface PageProps {
  searchParams: {
    search?: string;
    category?: string;
    seniority?: string;
    contract_type?: string;
    language?: string;
    salary?: string;
    page?: string;
  };
}

export default async function JobsPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  const salaryMap: Record<string, number> = {
    "0-1000": 0,
    "1000-2000": 1000,
    "2000-4000": 2000,
    "4000-8000": 4000,
    "8000+": 8000,
  };

  const jobs = await getJobs(
    {
      search: searchParams.search,
      category: searchParams.category as Category,
      seniority: searchParams.seniority as Seniority,
      contract_type: searchParams.contract_type as ContractType,
      language: searchParams.language as Language,
      salary_min: searchParams.salary ? salaryMap[searchParams.salary] : undefined,
    },
    limit,
    offset
  );

  const hasFilters = Object.keys(searchParams).some(
    (k) => k !== "page" && searchParams[k as keyof typeof searchParams]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Vacantes remotas para LATAM
        </h1>
        <p className="text-slate-500">
          {jobs.length === 0
            ? "Sin resultados para estos filtros."
            : `${jobs.length}${jobs.length === limit ? "+" : ""} vacantes disponibles`}
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <Suspense fallback={null}>
          <SearchBar />
          <JobFilters />
        </Suspense>
      </div>

      {hasFilters && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <span>Filtros activos</span>
          <a href="/jobs" className="text-brand-600 hover:underline font-medium">
            Limpiar filtros
          </a>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-slate-700">No encontramos vacantes</p>
          <p className="text-slate-500 mt-2">
            Intentá con otros filtros o{" "}
            <a href="/newsletter" className="text-brand-600 hover:underline">
              suscribite a la newsletter
            </a>{" "}
            para recibir alertas.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Paginación simple */}
      {jobs.length === limit && (
        <div className="mt-8 flex justify-center gap-3">
          {page > 1 && (
            <a
              href={`?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
              className="px-5 py-2 border border-slate-300 rounded-xl text-sm font-medium hover:border-brand-400 hover:bg-brand-50 transition-colors"
            >
              ← Anterior
            </a>
          )}
          <a
            href={`?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
            className="px-5 py-2 border border-slate-300 rounded-xl text-sm font-medium hover:border-brand-400 hover:bg-brand-50 transition-colors"
          >
            Siguiente →
          </a>
        </div>
      )}

      <div className="mt-16">
        <NewsletterBanner />
      </div>
    </div>
  );
}
