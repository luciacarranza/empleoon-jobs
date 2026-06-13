import type { CategoryMeta, Seniority, ContractType, Language } from "@/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "programacion",
    label: "Programación",
    description: "Desarrolladores full-stack, backend, frontend y más.",
    icon: "💻",
    seoTitle: "Vacantes remotas de Programación para LATAM",
    seoDescription:
      "Encontrá empleos remotos de desarrollo de software para talento latinoamericano: full-stack, backend, frontend, Node.js, Python, React y más.",
  },
  {
    slug: "data-analytics",
    label: "Data & Analytics",
    description: "Data scientists, analysts, engineers e IA.",
    icon: "📊",
    seoTitle: "Vacantes remotas de Data & Analytics para LATAM",
    seoDescription:
      "Oportunidades remotas en data science, analytics, machine learning e inteligencia artificial para profesionales de América Latina.",
  },
  {
    slug: "diseno-ux",
    label: "Diseño / UX",
    description: "UI/UX designers, product designers y más.",
    icon: "🎨",
    seoTitle: "Vacantes remotas de Diseño y UX para LATAM",
    seoDescription:
      "Trabajos remotos de diseño UX/UI, product design y diseño gráfico para talento latinoamericano.",
  },
  {
    slug: "mobile",
    label: "Desarrollo Mobile",
    description: "iOS, Android, React Native y Flutter.",
    icon: "📱",
    seoTitle: "Vacantes remotas de Desarrollo Mobile para LATAM",
    seoDescription:
      "Empleos remotos en desarrollo móvil iOS, Android, React Native y Flutter para programadores de LATAM.",
  },
  {
    slug: "devops-cloud-qa",
    label: "DevOps / Cloud / QA",
    description: "Infraestructura, cloud, SRE y testing.",
    icon: "☁️",
    seoTitle: "Vacantes remotas de DevOps, Cloud y QA para LATAM",
    seoDescription:
      "Oportunidades remotas en DevOps, cloud computing, AWS, GCP, Azure y QA para profesionales de América Latina.",
  },
  {
    slug: "producto-pm",
    label: "Producto & Project Management",
    description: "PMs, POs, scrum masters y agile coaches.",
    icon: "🗂️",
    seoTitle: "Vacantes remotas de Product Management para LATAM",
    seoDescription:
      "Empleos remotos de product manager, project manager y scrum master para talento latinoamericano.",
  },
  {
    slug: "marketing-digital",
    label: "Marketing Digital",
    description: "SEO, paid media, content, growth y más.",
    icon: "📣",
    seoTitle: "Vacantes remotas de Marketing Digital para LATAM",
    seoDescription:
      "Trabajos remotos en marketing digital, SEO, SEM, redes sociales y growth para profesionales de LATAM.",
  },
  {
    slug: "ventas",
    label: "Ventas",
    description: "SDR, AE, BDR, account managers y más.",
    icon: "🤝",
    seoTitle: "Vacantes remotas de Ventas para LATAM",
    seoDescription:
      "Empleos remotos en ventas B2B y B2C, SDR, account executive y business development para talento latinoamericano.",
  },
  {
    slug: "customer-support",
    label: "Customer Support",
    description: "Soporte al cliente, CS managers y más.",
    icon: "💬",
    seoTitle: "Vacantes remotas de Customer Support para LATAM",
    seoDescription:
      "Oportunidades remotas en customer success, soporte técnico y atención al cliente para profesionales de LATAM.",
  },
  {
    slug: "operaciones-admin",
    label: "Operaciones & Admin",
    description: "Ops, coordinadores, asistentes virtuales.",
    icon: "⚙️",
    seoTitle: "Vacantes remotas de Operaciones y Administración para LATAM",
    seoDescription:
      "Empleos remotos en operaciones, administración y asistencia virtual para talento latinoamericano.",
  },
  {
    slug: "finanzas-contabilidad",
    label: "Finanzas & Contabilidad",
    description: "Controllers, contadores, analysts y CFOs.",
    icon: "💰",
    seoTitle: "Vacantes remotas de Finanzas y Contabilidad para LATAM",
    seoDescription:
      "Trabajos remotos en finanzas, contabilidad, controlling y FP&A para profesionales de América Latina.",
  },
  {
    slug: "legal-compliance",
    label: "Legal & Compliance",
    description: "Abogados, compliance officers y más.",
    icon: "⚖️",
    seoTitle: "Vacantes remotas de Legal y Compliance para LATAM",
    seoDescription:
      "Oportunidades remotas en legal, compliance y regulatorio para profesionales de LATAM.",
  },
];

export const SENIORITY_LABELS: Record<Seniority, string> = {
  junior: "Junior",
  "semi-senior": "Semi Senior",
  senior: "Senior",
  lead: "Lead",
  staff: "Staff",
};

export const CONTRACT_LABELS: Record<ContractType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  freelance: "Freelance",
  contrato: "Contrato",
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  espanol: "Solo español",
  ingles: "Inglés requerido",
  bilingue: "Bilingüe",
};

export const SALARY_RANGES = [
  { value: "0-1000", label: "< USD 1.000/mes" },
  { value: "1000-2000", label: "USD 1.000 – 2.000" },
  { value: "2000-4000", label: "USD 2.000 – 4.000" },
  { value: "4000-8000", label: "USD 4.000 – 8.000" },
  { value: "8000+", label: "USD 8.000+" },
];

export const SITE_NAME = "Empleoon";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://empleoon.com";
export const SITE_DESCRIPTION =
  "Vacantes remotas para talento LATAM. Encontrá oportunidades internacionales curadas en tecnología, data, marketing, ventas, soporte, operaciones y más.";
