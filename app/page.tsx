import { PublicSite } from "@/components/public/public-site";
import { previewDemo } from "@/lib/demo-data";

export default function Home() {
  return <PublicSite demo={previewDemo} />;
}
