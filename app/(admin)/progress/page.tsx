import { ProgressView } from "@/components/modules/special-views"; import { getMembers } from "@/services";
export default async function Page(){return <ProgressView members={await getMembers()}/>}
