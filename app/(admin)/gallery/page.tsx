import { GalleryView } from "@/components/modules/special-views"; import { getMembers,getTrainers } from "@/services";
export default async function Page(){return <GalleryView members={await getMembers()} trainers={await getTrainers()}/>}
