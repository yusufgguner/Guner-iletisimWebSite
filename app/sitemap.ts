import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://guneriletisim.example"; // gerçek alan adı alındığında güncellenecek

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/teknik-servis/`, priority: 0.9 },
    { url: `${BASE}/takas/`, priority: 0.9 },
    { url: `${BASE}/urunler/`, priority: 0.9 },
    { url: `${BASE}/kvkk/`, priority: 0.3 },
  ];
}
