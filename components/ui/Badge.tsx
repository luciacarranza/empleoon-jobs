import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "featured" | "category" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-brand-100 text-brand-800",
        variant === "featured" && "bg-brand-700 text-white",
        variant === "category" && "bg-slate-100 text-slate-700",
        variant === "muted" && "bg-slate-50 text-slate-500 border border-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}
