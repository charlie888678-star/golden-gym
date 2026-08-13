import { DietsView } from "@/components/modules/module-views"; import { getDiets,getMembers } from "@/services";
export default async function Page(){return <DietsView diets={await getDiets()} members={await getMembers()}/>}
