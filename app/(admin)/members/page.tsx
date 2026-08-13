import { MembersView } from "@/components/members/members-view";
import { getMembers, getMemberships, getTrainers } from "@/services";
export default async function MembersPage(){return <MembersView initialMembers={await getMembers()} plans={await getMemberships()} trainers={await getTrainers()}/>}
