import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getMembers, getPayments } from "@/services";
export default async function DashboardPage() { return <DashboardView members={await getMembers()} payments={await getPayments()} />; }
