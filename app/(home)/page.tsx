import Link from "next/link";
import { ArrowRight, Globe, TrendingUp, Users } from "lucide-react";
import { getRecentJobs, getFeaturedJobs } from "@/lib/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { SearchBar } from "@/components/jobs/SearchBar";
import { NewsletterBanner } from "@/components/jobs/NewsletterBanner";
import { CATEGORIES } from "@/lib/constants";
import { Suspense } from "react";

export const revalidate = 300; // revalidar cada 5 minutos

const STATS = [
  { icon: Globe, value: "100%", label: "Posiciones remotas" },
  { icon: TrendingUp, value: "USD", label: "Salarios en dólares" },
  { icon: Users, value: "LATAM", label: "Talento bienvenido" },
];

export default async function HomePage() {
  const [featured, recent] = await Promise.all([
    getFeaturedJobs(3),
    getRecentJobs(8),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero border-b border-brand-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-200/40 via-cream to-brand-100/30 opacity-80" />
        <div className="relative max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Nuevas vacantes cada semana
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
            Vacantes remotas para{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              talento LATAM
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Encontrá oportunidades internacionales curadas en tecnología, data,
            marketing, ventas, soporte, operaciones y más.
          </p>

          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-600">
                <Icon className="w-5 h-5 text-brand-500" />
                <span className="font-bold text-slate-900">{value}</span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Categorías */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Explorar por categoría</h2>
            <Link
              href="/categories"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-md hover:shadow-brand-50 transition-all duration-200 text-center group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-700 leading-tight">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Vacantes destacadas */}
        {featured.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">⚡ Vacantes destacadas</h2>
            <div className="space-y-3">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {/* Últimas vacantes */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Últimas vacantes</h2>
            <Link
              href="/jobs"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg">Próximamente las primeras vacantes 🚀</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>

        {/* Banco de talento */}
        <section className="mt-16">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                ¿No encontraste la vacante ideal todavía?
              </h2>
              <p className="text-slate-500 mt-1.5 max-w-lg">
                Subí tu CV a nuestro banco de talento y te contactamos cuando
                surja una oportunidad que coincida con tu perfil.
              </p>
            </div>
            <Link
              href="/candidatos"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              Subir mi CV <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 mb-8">
          <NewsletterBanner />
        </section>
      </div>
    </div>
  );
}
