import { MembershipsView } from "@/components/modules/module-views"; import { getMemberships } from "@/services";
export default async function Page(){return <MembershipsView plans={await getMemberships()}/>}
