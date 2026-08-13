import { MemberPortal } from "@/components/public/member-portal";import { getMemberById,getTrainerById } from "@/services";
export default async function Page(){const member=await getMemberById("1");const trainer=await getTrainerById(member?.trainerId??"1");return <MemberPortal member={member!} trainer={trainer!}/>}
