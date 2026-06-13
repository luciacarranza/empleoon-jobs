import { supabase } from "./supabase";
import type { Job, Category, Seniority, ContractType, Language } from "@/types";

export interface JobFilters {
  category?: Category;
  seniority?: Seniority;
  contract_type?: ContractType;
  language?: Language;
  salary_min?: number;
  search?: string;
}

export async function getJobs(filters: JobFilters = {}, limit = 20, offset = 0) {
  let query = supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.seniority) query = query.eq("seniority", filters.seniority);
  if (filters.contract_type) query = query.eq("contract_type", filters.contract_type);
  if (filters.language) query = query.eq("language", filters.language);
  if (filters.salary_min) query = query.gte("salary_min", filters.salary_min);
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,tags.cs.{${filters.search}}`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Job[];
}

export async function getJobBySlug(slug: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error) return null;
  return data as Job;
}

export async function getFeaturedJobs(limit = 6) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data as Job[];
}

export async function getRecentJobs(limit = 10) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data as Job[];
}

export async function subscribeToNewsletter(email: string) {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email }, { onConflict: "email" });
  if (error) throw error;
}
