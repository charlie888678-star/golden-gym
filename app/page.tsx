import { PublicSite } from "@/components/public/public-site";
import { getMembers, getMemberships, getTrainers } from "@/services";
export default async function Home(){return <PublicSite plans={await getMemberships()} trainers={await getTrainers()} members={await getMembers()}/>}
