import { cache } from "react";

export type GymItem = { title: string; description?: string; image?: string; price?: string; duration?: string; features?: string[]; name?: string; quote?: string };
export type GymSection = { key: "hero" | "about" | "services" | "features" | "gallery" | "testimonials" | "faq" | "cta"; title?: string; subtitle?: string; text?: string; items: GymItem[]; visible: boolean };
export type GymDemoData = {
  id: string; businessName: string; slug: string; status: "ACTIVE" | "DRAFT" | "ARCHIVED" | "CONVERTED"; tagline: string; shortDescription: string; logo?: string; heroImage?: string;
  phone?: string; whatsapp?: string; email?: string; address?: string; area?: string; city?: string; state?: string; googleMapsUrl?: string; instagramUrl?: string; facebookUrl?: string;
  primaryColor: string; secondaryColor: string; sections: GymSection[]; gallery: string[];
};

const allowedImageHosts = new Set(["res.cloudinary.com", "images.unsplash.com"]);
function safeUrl(value: unknown, image = false) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  if (value.startsWith("/")) return value;
  try { const url = new URL(value); if (url.protocol !== "https:") return undefined; if (image && !allowedImageHosts.has(url.hostname) && !url.hostname.endsWith(".public.blob.vercel-storage.com")) return undefined; return url.toString(); } catch { return undefined; }
}
function text(value: unknown, fallback = "") { return typeof value === "string" ? value.slice(0, 5000) : fallback; }
function color(value: unknown, fallback: string) { return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback; }
function item(value: unknown): GymItem | null {
  if (typeof value === "string") return { title: value.slice(0, 160) };
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>; const title = text(row.title ?? row.name, ""); if (!title) return null;
  return { title, name: text(row.name) || undefined, description: text(row.description ?? row.text) || undefined, quote: text(row.quote) || undefined, image: safeUrl(row.image, true), price: text(row.price) || undefined, duration: text(row.duration) || undefined, features: Array.isArray(row.features) ? row.features.filter((x): x is string => typeof x === "string").slice(0, 12) : undefined };
}
function normalizeSection(value: unknown): GymSection | null {
  if (!value || typeof value !== "object") return null; const row = value as Record<string, unknown>; const key = text(row.sectionKey ?? row.key) as GymSection["key"];
  if (!["hero", "about", "services", "features", "gallery", "testimonials", "faq", "cta"].includes(key)) return null;
  const content = row.content && typeof row.content === "object" ? row.content as Record<string, unknown> : {};
  const rawItems = Array.isArray(content.items) ? content.items : Array.isArray(row.items) ? row.items : [];
  return { key, title: text(row.title) || undefined, subtitle: text(row.subtitle) || undefined, text: text(content.text ?? row.text) || undefined, items: rawItems.map(item).filter((x): x is GymItem => Boolean(x)), visible: row.isVisible !== false && row.visible !== false };
}
function normalize(raw: unknown): GymDemoData | null {
  if (!raw || typeof raw !== "object") return null; const source = raw as Record<string, unknown>; const businessName = text(source.businessName); const slug = text(source.slug); if (!businessName || !slug) return null;
  const sections = Array.isArray(source.sections) ? source.sections.map(normalizeSection).filter((x): x is GymSection => Boolean(x)) : [];
  const media = Array.isArray(source.media) ? source.media as Array<Record<string, unknown>> : [];
  const gallerySection = sections.find((x) => x.key === "gallery");
  const gallery = [...media.filter((x) => x.type === "GALLERY").map((x) => safeUrl(x.url, true)), ...(gallerySection?.items.map((x) => x.image) ?? [])].filter((x): x is string => Boolean(x));
  return { id: text(source.id), businessName, slug, status: ["ACTIVE", "DRAFT", "ARCHIVED", "CONVERTED"].includes(text(source.status)) ? text(source.status) as GymDemoData["status"] : "DRAFT", tagline: text(source.tagline, "Train with purpose."), shortDescription: text(source.shortDescription, "Professional coaching and a focused fitness experience."), logo: safeUrl(source.logo, true), heroImage: safeUrl(source.heroImage, true), phone: text(source.phone) || undefined, whatsapp: text(source.whatsapp) || undefined, email: text(source.email) || undefined, address: text(source.address) || undefined, area: text(source.area) || undefined, city: text(source.city) || undefined, state: text(source.state) || undefined, googleMapsUrl: safeUrl(source.googleMapsUrl), instagramUrl: safeUrl(source.instagramUrl), facebookUrl: safeUrl(source.facebookUrl), primaryColor: color(source.primaryColor, "#d8ff34"), secondaryColor: color(source.secondaryColor, "#111111"), sections, gallery };
}

export const previewDemo: GymDemoData = { id: "preview", businessName: "Apex Fitness", slug: "preview", status: "ACTIVE", tagline: "Build your strongest self.", shortDescription: "Professional coaching, serious equipment and personalised plans designed to turn goals into results.", phone: "+91 98765 43210", whatsapp: "+91 98765 43210", email: "hello@example.com", address: "Fitness Avenue", city: "Surat", state: "Gujarat", primaryColor: "#d8ff34", secondaryColor: "#111111", heroImage: "/trainers/imageye___-_imgi_219_young-muscular-man-exercising-with-trx-straps.jpg", gallery: ["/members/imageye___-_imgi_331_250511_Trainerize_14402_web-1280x854.jpg", "/trainers/imageye___-_imgi_155_portrait-of-a-trainer-in-gym-royalty-free-image-1584723855.jpg"], sections: [
  { key: "about", title: "Not just a gym. A standard.", text: "Focused coaching, modern equipment and a community built around measurable progress.", visible: true, items: [] },
  { key: "features", visible: true, items: [{ title: "Expert coaching", description: "Programs that adapt as you get stronger." }, { title: "Premium equipment", description: "Built for safe, effective training." }, { title: "Visible progress", description: "Guidance and measurements, not guesswork." }] },
  { key: "services", title: "Train your way", visible: true, items: [{ title: "Strength Training", description: "Build strength with structured coaching." }, { title: "Cardio", description: "Improve endurance and heart health." }, { title: "Personal Training", description: "A plan built around your goals." }, { title: "Zumba", description: "High-energy coached group sessions." }] },
  { key: "testimonials", visible: true, items: [{ title: "Real progress", name: "A gym member", quote: "The coaching helped me build consistency and confidence." }] },
  { key: "cta", title: "Your first session starts here.", text: "Meet a coach, explore the space and experience focused training.", visible: true, items: [] },
] };

export const getGymDemo = cache(async (slug: string): Promise<GymDemoData | null> => {
  const base = process.env.CENTRAL_DEMO_API_URL?.replace(/\/$/, "");
  if (!base) {
    const developmentDemos: Record<string, string> = {
      "northstar-fitness": "Northstar Fitness",
      "ironworks-gym": "Ironworks Gym",
    };
    const businessName = developmentDemos[slug];

    return process.env.NODE_ENV === "development" && businessName
      ? { ...previewDemo, slug, businessName }
      : null;
  }
  try { const response = await fetch(`${base}/${encodeURIComponent(slug)}`, { next: { revalidate: 60, tags: [`gym-demo-${slug}`] } }); if (!response.ok) return null; const payload = await response.json() as { success?: boolean; data?: unknown }; const demo = normalize(payload.data ?? payload); return demo?.status === "ACTIVE" ? demo : null; } catch { return null; }
});
