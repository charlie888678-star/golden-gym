import { LeadsView } from "@/components/modules/module-views"; import { getLeads } from "@/services";
export default async function Page(){return <LeadsView initialLeads={await getLeads()}/>}
