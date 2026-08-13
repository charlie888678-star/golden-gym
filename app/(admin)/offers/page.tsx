import { OffersView } from "@/components/modules/module-views"; import { getOffers } from "@/services";
export default async function Page(){return <OffersView offers={await getOffers()}/>}
