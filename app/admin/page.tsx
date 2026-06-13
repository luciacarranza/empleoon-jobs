// Panel admin simple — proteger con Basic Auth en Vercel o middleware
// Para un admin más robusto, usar Supabase Dashboard directamente
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Panel Admin — Empleoon</h1>
        <p className="text-slate-500 mt-1">
          Desde acá gestionás las vacantes. También podés usar el dashboard de Supabase
          directamente para operaciones más rápidas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/jobs/new"
          className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-400 hover:shadow-md transition-all group"
        >
          <div className="text-3xl mb-3">➕</div>
          <h2 className="font-semibold text-slate-900 group-hover:text-brand-700">
            Publicar nueva vacante
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Completá el formulario y la vacante se publica de inmediato.
          </p>
        </Link>

        <Link
          href="/admin/jobs"
          className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-400 hover:shadow-md transition-all group"
        >
          <div className="text-3xl mb-3">📋</div>
          <h2 className="font-semibold text-slate-900 group-hover:text-brand-700">
            Administrar vacantes
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Ver, editar o desactivar vacantes existentes.
          </p>
        </Link>
      </div>

      <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
        <strong>💡 Tip:</strong> Para gestión rápida, abrí{" "}
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          className="underline font-medium"
        >
          Supabase Dashboard
        </a>{" "}
        → Table Editor → tabla <code>jobs</code> y editá directamente.
      </div>
    </div>
  );
}
