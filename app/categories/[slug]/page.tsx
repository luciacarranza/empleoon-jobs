import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getJobs } from "@/lib/jobs";
import { CATEGORIES } from "@/lib/constants";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { NewsletterBanner } from "@/components/jobs/NewsletterBanner";
import type { Category } from "@/types";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return { title: cat.seoTitle, description: cat.seoDescription };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export const revalidate = 300;

export default async function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const jobs = await getJobs({ category: params.slug as Category }, 30);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl">
            {cat.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{cat.label}</h1>
            <p className="text-slate-500 mt-1">{cat.seoDescription}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-500">
          {jobs.length === 0
            ? "Sin vacantes activas en este momento."
            : `${jobs.length} vacante${jobs.length !== 1 ? "s" : ""} disponible${jobs.length !== 1 ? "s" : ""}`}
        </div>
      </div>

      <Suspense fallback={null}>
        <div className="mb-6">
          <JobFilters />
        </div>
      </Suspense>

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔎</p>
          <p className="text-lg font-semibold text-slate-700">No hay vacantes en este momento</p>
          <p className="text-slate-500 mt-2">
            Suscribite a la newsletter y te avisamos cuando haya nuevas oportunidades.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <div className="mt-16">
        <NewsletterBanner />
      </div>
    </div>
  );
}
