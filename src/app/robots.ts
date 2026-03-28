import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/gear",
        "/ukhrul-trekking",
        "/shirui-lily-festival",
        "/loktak-lake-camping",
        "/partner-locations",
      ],
      disallow: ["/auth/", "/api/"],
    },
    sitemap: "https://summitrentals.com/sitemap.xml",
  };
}
