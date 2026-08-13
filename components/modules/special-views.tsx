"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Activity,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Gauge,
  Play,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge, ProgressBar, SectionTitle, StatCard } from "@/components/ui";
import { useToast } from "@/components/ui/toast-provider";
import { PageHead, SimpleModal } from "./module-views";
import type { Member, Trainer } from "@/types";

export function ProgressView({ members }: { members: Member[] }) {
  const [memberId, setMemberId] = useState(members[0].id);
  const [open, setOpen] = useState(false);
  const m = members.find((x) => x.id === memberId)!;
  return (
    <>
      <PageHead
        eyebrow="Measurements"
        title="Progress Tracking"
        text="Turn check-ins into visible, motivating results."
        button="Add progress entry"
        onClick={() => setOpen(true)}
      />
      <section className="member-selector">
        <label>
          Viewing progress for
          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          >
            {members.map((x) => (
              <option value={x.id} key={x.id}>
                {x.name} · {x.memberId}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span>Goal progress</span>
          <b>
            {m.startWeight} kg <i>→</i> {m.weight} kg
          </b>
          <ProgressBar
            value={m.startWeight - m.weight}
            max={m.startWeight - m.goalWeight}
          />
        </div>
      </section>
      <div className="stat-grid compact">
        <StatCard
          label="Current weight"
          value={`${m.weight} kg`}
          detail={`-${m.startWeight - m.weight} kg total`}
          icon={<TrendingUp />}
        />
        <StatCard
          label="BMI"
          value="23.1"
          detail="Healthy range"
          icon={<Activity />}
          tone="blue"
        />
        <StatCard
          label="Body fat"
          value="18.4%"
          detail="-4.2% total"
          icon={<Gauge />}
          tone="violet"
        />
        <StatCard
          label="Waist"
          value="84 cm"
          detail="-9 cm total"
          icon={<Target />}
          tone="orange"
        />
      </div>
      <div className="chart-grid">
        <section className="panel">
          <SectionTitle title="Weight progress" subtitle="Last 6 check-ins" />
          <div className="big-line-chart">
            <svg viewBox="0 0 700 260">
              <defs>
                <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#d8ff3e" stopOpacity=".25" />
                  <stop offset="1" stopColor="#d8ff3e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M20 42 L145 78 L275 102 L410 148 L545 174 L680 205 L680 245 L20 245Z"
                fill="url(#progressFill)"
              />
              <path
                d="M20 42 L145 78 L275 102 L410 148 L545 174 L680 205"
                fill="none"
                stroke="#d8ff3e"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>
        <section className="panel">
          <SectionTitle title="Body measurements" />
          <div className="body-bars">
            {[
              ["Chest", 101, 108],
              ["Waist", 84, 100],
              ["Arms", 37, 42],
              ["Thighs", 58, 65],
            ].map(([l, v, max]) => (
              <div key={l as string}>
                <span>{l}</span>
                <b>{v} cm</b>
                <ProgressBar value={v as number} max={max as number} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Add progress entry"
        success="Progress entry added to this demo"
      >
        <label>
          Date
          <input type="date" required />
        </label>
        <label>
          Weight (kg)
          <input type="number" step=".1" required />
        </label>
        <label>
          Body fat %<input type="number" step=".1" />
        </label>
        <label>
          Waist (cm)
          <input type="number" />
        </label>
      </SimpleModal>
    </>
  );
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const classes = [
  ["06:00", "Yoga Flow", "Nisha Rao"],
  ["07:00", "CrossFit", "Kabir Sethi"],
  ["08:00", "Zumba", "Kavya Menon"],
  ["17:00", "Strength Lab", "Aarav Thakur"],
  ["19:00", "HIIT", "Dev Kapoor"],
];
export function ScheduleView() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="Weekly timetable"
        title="Classes & Schedule"
        text="Keep trainers, classes and capacity perfectly in sync."
        button="Add class"
        onClick={() => setOpen(true)}
      />
      <div className="schedule-scroll">
        <div className="schedule-grid">
          {days.map((day, di) => (
            <section key={day}>
              <header>
                <span>{day.slice(0, 3)}</span>
                <b>{13 + di}</b>
              </header>
              {classes
                .filter((_, i) => (i + di) % 3 !== 0)
                .map((c, i) => (
                  <article
                    key={c[1]}
                    className={`class-card class-${(i + di) % 4}`}
                  >
                    <time>{c[0]}</time>
                    <h3>{c[1]}</h3>
                    <p>{c[2]}</p>
                    <div>
                      <Users size={14} />
                      {12 + i * 3}/25
                    </div>
                  </article>
                ))}
            </section>
          ))}
        </div>
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Schedule a class"
        success="Class added to this demo schedule"
      >
        <label>
          Class name
          <input required />
        </label>
        <label>
          Trainer
          <input required />
        </label>
        <label>
          Date
          <input type="date" required />
        </label>
        <label>
          Time
          <input type="time" required />
        </label>
      </SimpleModal>
    </>
  );
}

export function SlotsView() {
  const toast = useToast();
  const [slots, setSlots] = useState([
    ["06:00–07:00", 17],
    ["07:00–08:00", 25],
    ["08:00–09:00", 12],
    ["17:00–18:00", 21],
    ["18:00–19:00", 24],
    ["19:00–20:00", 25],
    ["20:00–21:00", 16],
  ]);
  function book(i: number) {
    if (slots[i][1] === 25)
      return toast("This slot is full. Choose another time.");
    setSlots(slots.map((s, x) => (x === i ? [s[0], (s[1] as number) + 1] : s)));
    toast("Slot booked successfully for this demo");
  }
  return (
    <>
      <PageHead
        eyebrow="Capacity"
        title="Slot Booking"
        text="Balance gym capacity and give members a smoother experience."
      />
      <div className="slot-summary">
        <div>
          <Flame />
          <span>Peak hour</span>
          <b>7:00–8:00 PM</b>
        </div>
        <div>
          <Users />
          <span>Today’s bookings</span>
          <b>156 / 225</b>
        </div>
        <div>
          <Clock3 />
          <span>Next available</span>
          <b>8:00–9:00 AM</b>
        </div>
      </div>
      <div className="slot-grid">
        {slots.map((s, i) => {
          const n = s[1] as number;
          const status =
            n === 25 ? "Full" : n >= 21 ? "Almost Full" : "Available";
          return (
            <article key={s[0] as string}>
              <div>
                <Clock3 />
                <Badge
                  status={
                    status === "Available"
                      ? "active"
                      : status === "Full"
                        ? "expired"
                        : "expiring"
                  }
                >
                  {status}
                </Badge>
              </div>
              <h2>{s[0]}</h2>
              <p>
                <b>{n}</b>/25 booked
              </p>
              <ProgressBar value={n} max={25} />
              <button
                className="btn full secondary"
                disabled={n === 25}
                onClick={() => book(i)}
              >
                {n === 25 ? "Join waitlist" : "Book slot"}
              </button>
            </article>
          );
        })}
      </div>
    </>
  );
}

export function GalleryView({
  members,
  trainers,
}: {
  members: Member[];
  trainers: Trainer[];
}) {
  return (
    <>
      <PageHead
        eyebrow="Real results"
        title="Transformation Gallery"
        text="Celebrate the consistency, coaching and confidence behind every result."
      />
      <div className="gallery-grid">
        {members.slice(0, 6).map((m, i) => (
          <article className="transformation-card" key={m.id}>
            <div className="transform-images">
              <div>
                <Image
                  src={members[(i + 3) % members.length].image}
                  alt={`${m.name} before`}
                  fill
                  className="object-cover"
                />
                <span>BEFORE</span>
              </div>
              <div>
                <Image
                  src={m.image}
                  alt={`${m.name} after`}
                  fill
                  className="object-cover"
                />
                <span>AFTER</span>
              </div>
            </div>
            <div className="transform-body">
              <span className="eyebrow">{4 + i} MONTH JOURNEY</span>
              <h2>{m.name}</h2>
              <div className="weight-change">
                <span>{m.startWeight} kg</span>
                <i>→</i>
                <b>{m.weight} kg</b>
              </div>
              <p>
                “Consistency became my superpower. The plan was simple, but the
                support made all the difference.”
              </p>
              <div className="coach">
                <span>COACHED BY</span>
                <b>{trainers[i % trainers.length].name}</b>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

const exercises = [
  "Bench Press|Chest|Intermediate|Barbell",
  "Lat Pulldown|Back|Beginner|Cable",
  "Goblet Squat|Legs|Beginner|Dumbbell",
  "Shoulder Press|Shoulders|Intermediate|Dumbbells",
  "Cable Curl|Arms|Beginner|Cable",
  "Hanging Leg Raise|Abs|Advanced|Pull-up Bar",
  "Battle Ropes|Cardio|Intermediate|Ropes",
  "Romanian Deadlift|Legs|Advanced|Barbell",
];
export function ExercisesView() {
  const [filter, setFilter] = useState("All");
  const cats = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Abs",
    "Cardio",
  ];
  return (
    <>
      <PageHead
        eyebrow="Technique library"
        title="Exercise Library"
        text="Clear coaching references for safer, stronger training."
      />
      <div className="filter-tabs exercise-filters">
        {cats.map((c) => (
          <button
            key={c}
            className={filter === c ? "active" : ""}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="exercise-grid">
        {exercises.map((e, i) => {
          const [name, muscle, level, equipment] = e.split("|");
          if (filter !== "All" && filter !== muscle) return null;
          return (
            <article key={name}>
              <div className={`video-placeholder vp-${i % 4}`}>
                <Dumbbell size={48} />
                <button aria-label={`Play ${name}`}>
                  <Play size={20} fill="currentColor" />
                </button>
                <span>VIDEO READY</span>
              </div>
              <div>
                <Badge status={level.toLowerCase()} />
                <h3>{name}</h3>
                <p>
                  {muscle} · {equipment}
                </p>
                <button className="text-link">
                  View instructions <span>→</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export function ReportsView() {
  const metrics = [
    ["Revenue", "₹2,84,750", "+12.4%"],
    ["New memberships", "38", "+8.6%"],
    ["Avg. daily attendance", "108", "+5.2%"],
    ["Lead conversion", "28.6%", "+3.1%"],
  ];
  return (
    <>
      <PageHead
        eyebrow="Business intelligence"
        title="Reports"
        text="A clear view of revenue, growth, engagement and performance."
      />
      <div className="report-tabs">
        <button className="active">Overview</button>
        <button>Revenue</button>
        <button>Membership</button>
        <button>Attendance</button>
        <button>Leads</button>
        <button>Trainers</button>
      </div>
      <div className="report-metrics">
        {metrics.map(([l, v, d], i) => (
          <article key={l}>
            <span>{l}</span>
            <b>{v}</b>
            <small>
              <TrendingUp size={13} />
              {d} vs last month
            </small>
          </article>
        ))}
      </div>
      <div className="chart-grid">
        <section className="panel">
          <SectionTitle
            title="Revenue growth"
            subtitle="January — August 2026"
          />
          <div className="revenue-area">
            <svg viewBox="0 0 700 270">
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#d8ff3e" stopOpacity=".3" />
                  <stop offset="1" stopColor="#d8ff3e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M10 220 L105 180 L200 195 L295 135 L390 152 L485 90 L580 110 L690 45 L690 260 L10 260Z"
                fill="url(#revFill)"
              />
              <path
                d="M10 220 L105 180 L200 195 L295 135 L390 152 L485 90 L580 110 L690 45"
                fill="none"
                stroke="#d8ff3e"
                strokeWidth="5"
              />
            </svg>
          </div>
        </section>
        <section className="panel">
          <SectionTitle title="Lead funnel" subtitle="This month" />
          <div className="funnel">
            {[
              ["Total leads", 84],
              ["Contacted", 62],
              ["Trials", 41],
              ["Converted", 24],
            ].map(([l, v], i) => (
              <div key={l as string} style={{ width: `${100 - i * 16}%` }}>
                <span>{l}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="panel">
        <SectionTitle
          title="Peak gym hours"
          subtitle="Average attendance by time slot"
        />
        <div className="heatmap">
          {["6 AM", "7 AM", "8 AM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"].map(
            (t, i) => (
              <div key={t}>
                <span>{t}</span>
                <i style={{ opacity: 0.25 + (i % 4) * 0.22 }} />
                <b>{[48, 72, 56, 41, 68, 92, 78, 38][i]}</b>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}

export function SettingsView() {
  const toast = useToast();
  const [checks, setChecks] = useState([true, true, true, false]);
  return (
    <>
      <PageHead
        eyebrow="Configuration"
        title="Settings"
        text="Control gym details, reminders and operating preferences."
      />
      <div className="settings-layout">
        <aside>
          <button className="active">
            <Settings2 />
            Gym information
          </button>
          <button>
            <Dumbbell />
            Membership
          </button>
          <button>
            <Activity />
            Attendance
          </button>
          <button>
            <Sparkles />
            Notifications
          </button>
        </aside>
        <div>
          <section className="panel settings-section">
            <SectionTitle
              title="Gym information"
              subtitle="Details shown across receipts and member communication"
            />
            <div className="logo-upload">
              <div>GG</div>
              <span>
                <b>Gym logo</b>
                <small>PNG or JPG, up to 2 MB</small>
                <button className="text-link">Change logo</button>
              </span>
            </div>
            <div className="form-grid">
              <label>
                Gym name
                <input defaultValue="Golden Gym & Fitness" />
              </label>
              <label>
                Phone
                <input defaultValue="+91 98765 43210" />
              </label>
              <label>
                Email
                <input defaultValue="hello@goldengym.in" />
              </label>
              <label>
                Address
                <input defaultValue="42, Fitness Avenue, Pune, Maharashtra" />
              </label>
              <label>
                Opening time
                <input type="time" defaultValue="05:30" />
              </label>
              <label>
                Closing time
                <input type="time" defaultValue="22:30" />
              </label>
            </div>
          </section>
          <section className="panel settings-section">
            <SectionTitle
              title="Notification preferences"
              subtitle="Simulated reminders for the MVP"
            />
            <div className="toggle-list">
              {[
                "Membership expiry reminders",
                "Payment reminders",
                "Trial follow-up reminders",
                "Birthday greetings",
              ].map((x, i) => (
                <label key={x}>
                  <span>
                    <b>{x}</b>
                    <small>
                      {i === 0
                        ? "Send 7, 3 and 1 day before expiry"
                        : "Keep staff informed automatically"}
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={checks[i]}
                    onChange={() =>
                      setChecks(checks.map((v, j) => (j === i ? !v : v)))
                    }
                  />
                  <i />
                </label>
              ))}
            </div>
          </section>
          <button
            className="btn primary save-settings"
            onClick={() => toast("Settings saved locally for this demo")}
          >
            <Check />
            Save settings
          </button>
        </div>
      </div>
    </>
  );
}
