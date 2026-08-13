import { AttendanceView } from "@/components/attendance/attendance-view";
import { getAttendance, getMembers, getTrainers } from "@/services";
export default async function AttendancePage(){return <AttendanceView members={await getMembers()} records={await getAttendance()} trainers={await getTrainers()}/>}
