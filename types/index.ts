export type Status = "active" | "expiring" | "expired" | "pending" | "paid" | "trial" | "lead" | "inactive" | "scheduled" | "completed" | "missed" | "converted";

export interface Membership { id: string; name: string; duration: string; months: number; price: number; features: string[]; members: number; active: boolean }
export interface Member { id: string; memberId: string; name: string; phone: string; email: string; image: string; showOnWebsite: boolean; gender: string; dob: string; emergencyContact: string; planId: string; joinedAt: string; startDate: string; expiryDate: string; trainerId?: string; fees: number; paymentStatus: "paid" | "pending"; attendance: number; weight: number; startWeight: number; goalWeight: number }
export interface Trainer { id: string; name: string; phone: string; email: string; image: string; specialization: string; experience: number; assignedMembers: number; timing: string; shift: string; salary: number; status: "active" | "inactive" }
export interface Payment { id: string; memberId: string; amount: number; plan: string; method: "Cash" | "UPI" | "Card" | "Bank Transfer"; date: string; status: "paid" | "pending" }
export interface Attendance { id: string; memberId: string; date: string; checkIn: string; checkOut: string; trainer: string }
export interface Lead { id: string; name: string; phone: string; source: string; plan: string; staff: string; status: "New Lead" | "Contacted" | "Trial Booked" | "Trial Completed" | "Joined" | "Lost"; followUp: string; notes: string }
export interface Workout { id: string; name: string; goal: string; level: string; duration: string; trainer: string; days: { day: string; focus: string }[] }
export interface Diet { id: string; name: string; goal: string; calories: number; protein: number; carbs: number; fats: number; meals: { time: string; items: string }[] }
export interface Staff { id: string; name: string; phone: string; role: string; shift: string; salary: number; joinedAt: string; attendance: number; status: "active" | "inactive" }
export interface Offer { id: string; title: string; description: string; discount: string; startDate: string; endDate: string; plan: string; status: "active" | "inactive" }
