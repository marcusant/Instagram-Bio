import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.seo.title,
    short_name: site.profile.name,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0810",
    theme_color: "#0a0810",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
