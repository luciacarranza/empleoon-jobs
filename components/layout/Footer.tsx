import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-200 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            {/* Logo versión footer — texto blanco sobre fondo oscuro */}
            <span className="flex items-center gap-0 select-none">
              <span className="text-[1.35rem] font-extrabold tracking-tight text-white">
                emple
              </span>
              <span className="inline-flex items-center justify-end mx-[1px] w-7 h-[18px] bg-white/20 rounded-full relative border border-white/30">
                <span className="absolute right-[3px] w-3 h-3 bg-brand-400 rounded-full" />
              </span>
              <span className="text-[1.35rem] font-extrabold tracking-tight text-white">
                n
              </span>
            </span>
            <p className="mt-4 text-sm text-brand-300 leading-relaxed">
              Vacantes remotas curadas para talento latinoamericano. Oportunidades
              internacionales en tecnología, data, marketing y más.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Vacantes", "/jobs"],
                ["Categorías", "/categories"],
                ["Newsletter", "/newsletter"],
                ["Subí tu CV", "/candidatos"],
                ["Publicar vacante", "/jobs/post"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Categorías populares</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Sobre Empleoon", "/about"],
                ["Publicar vacante", "/jobs/post"],
                ["Términos y condiciones", "/terms"],
                ["Privacidad", "/privacy"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-brand-400">
         <p>© {new Date().getFullYear()} Empleoon. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para el talento de LATAM</p>
        </div>
      </div>
    </footer>
  );
}
