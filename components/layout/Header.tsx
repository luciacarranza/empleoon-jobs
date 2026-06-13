import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Cuando tengas el archivo del logo, guardalo en /public/logo.png
// y reemplazá el <LogoMark /> por:
// import Image from "next/image";
// <Image src="/logo.png" alt="Empleoon" width={140} height={36} priority className="h-8 w-auto" />

function LogoMark() {
  return (
    <span className="flex items-center gap-0 select-none">
      <span className="text-[1.45rem] font-extrabold tracking-tight text-slate-900">
        emple
      </span>
      {/* Toggle pill — imita el ícono del logo */}
      <span className="inline-flex items-center justify-end mx-[1px] w-8 h-5 bg-slate-900 rounded-full relative">
        <span className="absolute right-[3px] w-3.5 h-3.5 bg-brand-400 rounded-full shadow-sm" />
      </span>
      <span className="text-[1.45rem] font-extrabold tracking-tight text-slate-900">
        n
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm shadow-brand-100/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/jobs" className="hover:text-brand-600 transition-colors">
            Vacantes
          </Link>
          <Link href="/categories" className="hover:text-brand-600 transition-colors">
            Categorías
          </Link>
          <Link href="/newsletter" className="hover:text-brand-600 transition-colors">
            Newsletter
          </Link>
          <Link href="/candidatos" className="hover:text-brand-600 transition-colors">
            Subí tu CV
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            📬 Alertas gratis
          </Link>
          <Link href="/jobs/post">
            <Button size="sm" variant="primary">
              Publicar vacante
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
