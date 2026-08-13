import { attendance, diets, leads, members, memberships, offers, payments, staff, trainers, workouts } from "@/data/mock";

export async function getMembers() { return members; }
export async function getMemberById(id: string) { return members.find((m) => m.id === id); }
export async function getTrainers() { return trainers; }
export async function getTrainerById(id: string) { return trainers.find((t) => t.id === id); }
export async function getMemberships() { return memberships; }
export async function getPayments() { return payments; }
export async function getAttendance() { return attendance; }
export async function getLeads() { return leads; }
export async function getWorkouts() { return workouts; }
export async function getDiets() { return diets; }
export async function getStaff() { return staff; }
export async function getOffers() { return offers; }
