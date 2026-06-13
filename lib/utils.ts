import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${currency} ${fmt(min)} – ${fmt(max)}/mes`;
  if (min) return `${currency} ${fmt(min)}+/mes`;
  return null;
}

export function timeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
