import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorías de Trabajo Remoto para LATAM",
  description:
    "Explorá vacantes remotas por categoría: programación, data, diseño, marketing, ventas, soporte y más para talento latinoamericano.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Explorar por categoría
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Encontrá vacantes remotas en el área que más te interesa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-50 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-brand-100 transition-colors">
              {cat.icon}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                {cat.label}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
