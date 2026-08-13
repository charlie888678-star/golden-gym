import { TrainersView } from "@/components/modules/module-views"; import { getTrainers } from "@/services";
export default async function Page(){return <TrainersView trainers={await getTrainers()}/>}
