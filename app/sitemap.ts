import { MetadataRoute } from "next";
import { CATEGORIES, SITE_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("slug, updated_at")
    .eq("is_active", true);

  const jobUrls =
    jobs?.map((job) => ({
      url: `${SITE_URL}/jobs/${job.slug}`,
      lastModified: new Date(job.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...categoryUrls,
    ...jobUrls,
  ];
}
