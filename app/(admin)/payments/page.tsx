import { PaymentsView } from "@/components/modules/module-views"; import { getMembers,getPayments } from "@/services";
export default async function Page(){return <PaymentsView payments={await getPayments()} members={await getMembers()}/>}
