import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ukhrulrental.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gear`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ukhrul-trekking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shirui-lily-festival`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/loktak-lake-camping`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partner-locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic gear pages
  let gearPages: MetadataRoute.Sitemap = [];
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from("gear").select("slug, created_at");
    if (data) {
      gearPages = data.map((item) => ({
        url: `${baseUrl}/gear/${item.slug}`,
        lastModified: new Date(item.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (e) {
    // fallback slugs
    const slugs = [
      "trekking-backpacks",
      "camping-tents",
      "hiking-boots",
      "navigation-kit",
      "lighting-safety",
      "trekking-poles",
    ];
    gearPages = slugs.map((slug) => ({
      url: `${baseUrl}/gear/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  return [...staticPages, ...gearPages];
}
