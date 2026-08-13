import { StaffView } from "@/components/modules/module-views"; import { getStaff } from "@/services";
export default async function Page(){return <StaffView staff={await getStaff()}/>}
