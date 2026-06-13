import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50",
        variant === "primary" &&
          "bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow-md",
        variant === "secondary" &&
          "bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow-md",
        variant === "ghost" && "hover:bg-slate-100 text-slate-700",
        variant === "outline" &&
          "border border-slate-300 hover:border-brand-400 hover:bg-brand-50 text-slate-700",
        size === "sm" && "text-sm px-3 py-1.5 gap-1.5",
        size === "md" && "text-sm px-4 py-2.5 gap-2",
        size === "lg" && "text-base px-6 py-3 gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
