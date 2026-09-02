import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicSite } from "@/components/public/public-site";
import { getGymDemo } from "@/lib/demo-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const demo = await getGymDemo(slug);
  if (!demo) return { title: "Gym demo unavailable", robots: { index: false, follow: false } };
  const location = demo.city ? `Gym in ${demo.city}` : "Gym & Fitness";
  return { title: `${demo.businessName} | ${location}`, description: demo.shortDescription.slice(0, 160), openGraph: { title: `${demo.businessName} | ${location}`, description: demo.shortDescription.slice(0, 160), images: demo.heroImage ? [demo.heroImage] : undefined } };
}

export default async function GymDemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = await getGymDemo(slug);
  if (!demo) notFound();
  return <PublicSite demo={demo} />;
}
