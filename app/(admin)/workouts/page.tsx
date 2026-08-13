import { WorkoutsView } from "@/components/modules/module-views"; import { getMembers,getWorkouts } from "@/services";
export default async function Page(){return <WorkoutsView workouts={await getWorkouts()} members={await getMembers()}/>}
