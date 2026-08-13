"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Apple,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Home,
  LogOut,
  QrCode,
  Target,
  TrendingDown,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { Avatar, Badge, ProgressBar, SectionTitle } from "@/components/ui";
import { Modal } from "@/components/ui/modal";
import { useToast, ToastProvider } from "@/components/ui/toast-provider";
import { shortDate } from "@/lib/utils";
import type { Member, Trainer } from "@/types";
export function MemberPortal(props: { member: Member; trainer: Trainer }) {
  return (
    <ToastProvider>
      <PortalInner {...props} />
    </ToastProvider>
  );
}
function PortalInner({
  member,
  trainer,
}: {
  member: Member;
  trainer: Trainer;
}) {
  const [renew, setRenew] = useState(false);
  const toast = useToast();
  return (
    <main className="member-portal">
      <header>
        <Link href="/" className="portal-logo">
          <Dumbbell />
          <b>
            GOLDEN<small>MEMBER</small>
          </b>
        </Link>
        <nav>
          <a className="active">
            <Home />
            Overview
          </a>
          <a>
            <Dumbbell />
            Workout
          </a>
          <a>
            <Apple />
            Diet
          </a>
          <a>
            <Activity />
            Progress
          </a>
        </nav>
        <div>
          <button>
            <Bell />
          </button>
          <Avatar src={member.image} name={member.name} />
          <Link href="/login">
            <LogOut />
          </Link>
        </div>
      </header>
      <div className="portal-container">
        <div className="portal-welcome">
          <div>
            <span className="eyebrow">THURSDAY, 13 AUGUST</span>
            <h1>Ready to work, {member.name.split(" ")[0]}?</h1>
            <p>Your next level won’t build itself. Let’s get after it.</p>
          </div>
          <button
            className="btn portal-scan"
            onClick={() => toast("QR attendance code is ready to scan")}
          >
            <QrCode />
            My attendance QR
          </button>
        </div>
        <div className="portal-grid">
          <section className="membership-card">
            <div className="member-card-top">
              <span>
                <Dumbbell />
                GOLDEN GYM
              </span>
              <Badge status="active" />
            </div>
            <div>
              <small>YOUR MEMBERSHIP</small>
              <h2>Gold Annual</h2>
            </div>
            <div className="membership-details">
              <div>
                <small>EXPIRES</small>
                <b>{shortDate(member.expiryDate)}</b>
              </div>
              <div>
                <small>DAYS LEFT</small>
                <b>42</b>
              </div>
            </div>
            <ProgressBar value={323} max={365} />
            <button onClick={() => setRenew(true)}>
              Renew membership <ArrowRight />
            </button>
          </section>
          <section className="portal-panel workout-today">
            <SectionTitle
              title="Today’s workout"
              subtitle="Chest + Triceps · 55 min"
              action={<span className="plan-pill">4 exercises</span>}
            />
            <div>
              {[
                ["Bench Press", "4 × 10", "90 sec"],
                ["Incline Dumbbell Press", "3 × 12", "60 sec"],
                ["Cable Fly", "3 × 15", "45 sec"],
                ["Tricep Pushdown", "3 × 12", "45 sec"],
              ].map((x, i) => (
                <article key={x[0]}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{x[0]}</b>
                    <small>
                      {x[1]} · Rest {x[2]}
                    </small>
                  </div>
                  <button>
                    <Check />
                  </button>
                </article>
              ))}
            </div>
            <button
              className="start-workout"
              onClick={() => toast("Workout started — stay strong!")}
            >
              Start workout <ArrowRight />
            </button>
          </section>
          <section className="portal-panel progress-snapshot">
            <SectionTitle
              title="Your progress"
              subtitle="Since 12 March 2026"
            />
            <div className="weight-hero">
              <span>
                <TrendingDown />7 kg
              </span>
              <b>
                {member.weight}
                <small>kg</small>
              </b>
              <p>Current weight</p>
            </div>
            <div className="goal-bar">
              <div>
                <span>Started {member.startWeight} kg</span>
                <span>Goal {member.goalWeight} kg</span>
              </div>
              <ProgressBar
                value={member.startWeight - member.weight}
                max={member.startWeight - member.goalWeight}
              />
            </div>
            <div className="mini-measures">
              <div>
                <b>23.1</b>
                <span>BMI</span>
              </div>
              <div>
                <b>18.4%</b>
                <span>Body fat</span>
              </div>
              <div>
                <b>84 cm</b>
                <span>Waist</span>
              </div>
            </div>
          </section>
          <section className="portal-panel coach-card">
            <SectionTitle title="Your trainer" />
            <div className="coach-photo">
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                className="object-cover"
              />
            </div>
            <h3>{trainer.name}</h3>
            <p>{trainer.specialization}</p>
            <div>
              <Badge status="active">Available today</Badge>
              <button
                onClick={() => toast("Message action simulated for this demo")}
              >
                Message
              </button>
            </div>
          </section>
          <section className="portal-panel diet-today">
            <SectionTitle
              title="Today’s nutrition"
              subtitle="1,800 kcal · 130g protein"
              action={<Apple />}
            />
            <div>
              {[
                ["08:00", "Breakfast", "Oats, eggs & green tea"],
                ["11:00", "Snack", "Fruit & buttermilk"],
                ["13:30", "Lunch", "Rice, paneer & salad"],
                ["20:00", "Dinner", "Chicken, vegetables & soup"],
              ].map((x) => (
                <article key={x[0]}>
                  <time>{x[0]}</time>
                  <div>
                    <b>{x[1]}</b>
                    <span>{x[2]}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="portal-panel portal-attendance">
            <SectionTitle title="Attendance" subtitle="August 2026" />
            <div>
              <b>18</b>
              <span>visits this month</span>
            </div>
            <div className="visit-days">
              {[
                1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1,
                1, 0, 1, 1, 0, 0, 0,
              ].map((v, i) => (
                <i className={v ? "visited" : ""} key={i}>
                  {i + 1}
                </i>
              ))}
            </div>
          </section>
          <section className="portal-panel upcoming">
            <SectionTitle title="Upcoming classes" action={<CalendarDays />} />
            {[
              ["14 AUG", "Yoga Flow", "06:00 AM"],
              ["16 AUG", "HIIT Burn", "07:00 PM"],
            ].map((x) => (
              <article key={x[0]}>
                <div>
                  <b>{x[0].split(" ")[0]}</b>
                  <span>{x[0].split(" ")[1]}</span>
                </div>
                <span>
                  <b>{x[1]}</b>
                  <small>
                    <Clock3 />
                    {x[2]}
                  </small>
                </span>
                <ChevronRight />
              </article>
            ))}
          </section>
        </div>
      </div>
      <nav className="portal-mobile-nav">
        <a className="active">
          <Home />
          <span>Home</span>
        </a>
        <a>
          <Dumbbell />
          <span>Workout</span>
        </a>
        <button>
          <QrCode />
        </button>
        <a>
          <Apple />
          <span>Diet</span>
        </a>
        <a>
          <UserRound />
          <span>Profile</span>
        </a>
      </nav>
      <Modal
        open={renew}
        onClose={() => setRenew(false)}
        title="Renew Gold Membership"
      >
        <div className="renew-box">
          <WalletCards />
          <h3>Annual membership</h3>
          <p>12 months · All access</p>
          <b>₹7,999</b>
          <button
            className="btn primary full"
            onClick={() => {
              setRenew(false);
              toast(
                "Renewal simulated. Payment gateway will be connected later.",
              );
            }}
          >
            Continue to simulated payment
          </button>
        </div>
      </Modal>
    </main>
  );
}
