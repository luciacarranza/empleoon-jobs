export type Category =
  | "programacion"
  | "data-analytics"
  | "diseno-ux"
  | "mobile"
  | "devops-cloud-qa"
  | "producto-pm"
  | "marketing-digital"
  | "ventas"
  | "customer-support"
  | "operaciones-admin"
  | "finanzas-contabilidad"
  | "legal-compliance";

export type Seniority = "junior" | "semi-senior" | "senior" | "lead" | "staff";
export type ContractType = "full-time" | "part-time" | "freelance" | "contrato";
export type Language = "espanol" | "ingles" | "bilingue";
export type SalaryRange =
  | "0-1000"
  | "1000-2000"
  | "2000-4000"
  | "4000-8000"
  | "8000+";

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  company_logo?: string;
  company_url?: string;
  category: Category;
  seniority: Seniority;
  contract_type: ContractType;
  language: Language;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  location: string;
  is_remote: boolean;
  description: string;
  requirements: string[];
  benefits?: string[];
  tags: string[];
  apply_url: string;
  is_featured: boolean;
  is_active: boolean;
  published_at: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  category: Category;
  seniority: Seniority;
  linkedin_url?: string;
  portfolio_url?: string;
  cv_url: string;
  message?: string;
  created_at: string;
}
