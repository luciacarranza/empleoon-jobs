import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, DollarSign, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatSalary, timeAgo } from "@/lib/utils";
import { CATEGORIES, SENIORITY_LABELS, CONTRACT_LABELS } from "@/lib/constants";
import type { Job } from "@/types";

export function JobCard({ job }: { job: Job }) {
  const category = CATEGORIES.find((c) => c.slug === job.category);

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={cn(
        "group block bg-white rounded-2xl border border-brand-100 p-5 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-200/40 transition-all duration-200",
        job.is_featured && "border-brand-400 bg-gradient-to-r from-brand-50 to-brand-100"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Company logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-slate-400">
              {job.company.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">{job.company}</p>
            </div>
            {job.is_featured && (
              <Badge variant="featured" className="flex-shrink-0">
                <Zap className="w-3 h-3 mr-1" /> Destacada
              </Badge>
            )}
          </div>

          {/* Meta */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.is_remote ? "100% remoto" : job.location}
            </span>
            {formatSalary(job.salary_min, job.salary_max, job.salary_currency) && (
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <DollarSign className="w-3.5 h-3.5" />
                {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeAgo(job.published_at)}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {category && <Badge variant="category">{category.icon} {category.label}</Badge>}
            <Badge variant="muted">{SENIORITY_LABELS[job.seniority]}</Badge>
            <Badge variant="muted">{CONTRACT_LABELS[job.contract_type]}</Badge>
            {job.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="muted">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
