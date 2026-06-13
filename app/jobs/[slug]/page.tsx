import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Clock, DollarSign, Briefcase, Globe,
  ArrowLeft, ExternalLink, Tag, CheckCircle
} from "lucide-react";
import { getJobBySlug, getRecentJobs } from "@/lib/jobs";
import { Badge } from "@/components/ui/Badge";
import { JobCard } from "@/components/jobs/JobCard";
import { NewsletterBanner } from "@/components/jobs/NewsletterBanner";
import { formatSalary, timeAgo } from "@/lib/utils";
import { CATEGORIES, SENIORITY_LABELS, CONTRACT_LABELS, LANGUAGE_LABELS } from "@/lib/constants";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) return {};
  return {
    title: `${job.title} en ${job.company}`,
    description: `${job.title} — ${job.company}. Posición remota para LATAM. ${job.is_remote ? "100% remoto." : ""} Aplicá ahora en Empleoon.`,
  };
}

export const revalidate = 600;

export default async function JobDetailPage({ params }: Props) {
  const [job, related] = await Promise.all([
    getJobBySlug(params.slug),
    getRecentJobs(3),
  ]);

  if (!job) notFound();

  const category = CATEGORIES.find((c) => c.slug === job.category);
  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);

  const META_ITEMS = [
    { icon: MapPin, label: "Ubicación", value: job.is_remote ? "100% remoto" : job.location },
    { icon: Briefcase, label: "Seniority", value: SENIORITY_LABELS[job.seniority] },
    { icon: Clock, label: "Tipo", value: CONTRACT_LABELS[job.contract_type] },
    { icon: Globe, label: "Idioma", value: LANGUAGE_LABELS[job.language] },
    ...(salary ? [{ icon: DollarSign, label: "Salario", value: salary }] : []),
    { icon: Clock, label: "Publicado", value: timeAgo(job.published_at) },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a vacantes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            {/* Header */}
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
                {job.company_logo ? (
                  <Image src={job.company_logo} alt={job.company} width={64} height={64} className="object-contain" />
                ) : (
                  <span className="text-2xl font-bold text-slate-400">
                    {job.company.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">{job.title}</h1>
                <p className="text-slate-600 mt-1 font-medium">
                  {job.company_url ? (
                    <a href={job.company_url} target="_blank" rel="noopener noreferrer"
                      className="hover:text-brand-600 inline-flex items-center gap-1">
                      {job.company} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : job.company}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {category && <Badge variant="category">{category.icon} {category.label}</Badge>}
                  {job.is_featured && <Badge variant="featured">⚡ Destacada</Badge>}
                </div>
              </div>
            </div>

            {/* Tags */}
            {job.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8 prose-jobs">
              <h2>Descripción del puesto</h2>
              <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, "<br/>") }} />
            </div>

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Requisitos</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Beneficios</h2>
                <ul className="space-y-2">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-emerald-500">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply CTA */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <a
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base shadow-sm hover:shadow-md"
              >
                Aplicar ahora <ExternalLink className="w-4 h-4" />
              </a>
              <p className="mt-3 text-xs text-slate-400">
                Serás redirigido al sitio de la empresa para completar tu aplicación.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Meta card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-24">
            <h3 className="font-semibold text-slate-900 mb-4">Detalles del puesto</h3>
            <div className="space-y-3">
              {META_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{label}</p>
                    <p className="text-sm text-slate-800 font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
            >
              Aplicar ahora <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Related jobs */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-5">Más vacantes recientes</h2>
          <div className="space-y-3">
            {related.filter((j) => j.id !== job.id).map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <NewsletterBanner />
      </div>
    </div>
  );
}
