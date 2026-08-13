"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  BadgeIndianRupee,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Edit3,
  Gift,
  Grid2X2,
  List,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Printer,
  Search,
  Share2,
  Target,
  Users,
  Utensils,
} from "lucide-react";
import { Avatar, Badge, StatCard } from "@/components/ui";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast-provider";
import { currency, shortDate } from "@/lib/utils";
import type {
  Diet,
  Lead,
  Member,
  Membership,
  Offer,
  Payment,
  Staff,
  Trainer,
  Workout,
} from "@/types";

export function PageHead({
  eyebrow,
  title,
  text,
  button = "Add new",
  onClick,
}: {
  eyebrow: string;
  title: string;
  text: string;
  button?: string;
  onClick?: () => void;
}) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {onClick && (
        <button className="btn primary" onClick={onClick}>
          <Plus size={17} />
          {button}
        </button>
      )}
    </div>
  );
}
export function SimpleModal({
  open,
  setOpen,
  title,
  success,
  children,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  success: string;
  children?: ReactNode;
}) {
  const toast = useToast();
  return (
    <Modal open={open} onClose={() => setOpen(false)} title={title}>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          toast(success);
        }}
      >
        {children ?? (
          <>
            <label>
              Name
              <input required placeholder="Enter a name" />
            </label>
            <label>
              Notes
              <textarea placeholder="Add details" />
            </label>
          </>
        )}
        <div className="modal-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button className="btn primary">
            <Check size={17} /> Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function MembershipsView({ plans }: { plans: Membership[] }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <PageHead
        eyebrow="Pricing"
        title="Membership Plans"
        text="Flexible plans built for every fitness journey."
        button="Create membership plan"
        onClick={() => setOpen(true)}
      />
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <article
            className={`price-card ${i === 3 ? "featured" : ""}`}
            key={p.id}
          >
            {i === 3 && <span className="popular">MOST POPULAR</span>}
            <div className="price-head">
              <span>0{i + 1}</span>
              <h2>{p.name}</h2>
              <p>{p.duration}</p>
            </div>
            <div className="price">
              <b>{currency(p.price)}</b>
              <span>/ {p.duration}</span>
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="active-members">
              <Users size={17} />
              <b>{p.members}</b> active members
            </div>
            <div className="card-actions">
              <button
                className="btn secondary"
                onClick={() => toast(`${p.name} plan edit form opened`)}
              >
                <Edit3 size={15} /> Edit
              </button>
              <button
                className="btn ghost"
                onClick={() => toast(`${p.name} plan disabled in demo`)}
              >
                Disable
              </button>
            </div>
          </article>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Create membership plan"
        success="Membership plan created for this demo"
      >
        <label>
          Plan name
          <input required placeholder="e.g. Weekend Plan" />
        </label>
        <label>
          Duration
          <select>
            <option>1 month</option>
            <option>3 months</option>
            <option>12 months</option>
          </select>
        </label>
        <label>
          Price
          <input type="number" required placeholder="₹ 0" />
        </label>
        <label>
          Features
          <textarea placeholder="One feature per line" />
        </label>
      </SimpleModal>
    </>
  );
}

export function PaymentsView({
  payments,
  members,
}: {
  payments: Payment[];
  members: Member[];
}) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <PageHead
        eyebrow="Finance"
        title="Fees & Payments"
        text="Track collections, dues and member receipts."
        button="Record payment"
        onClick={() => setOpen(true)}
      />
      <div className="stat-grid compact">
        <StatCard
          label="Today's collection"
          value="₹18,500"
          detail="14 payments"
          icon={<BadgeIndianRupee />}
        />
        <StatCard
          label="Monthly collection"
          value="₹2,84,750"
          detail="+12.4%"
          icon={<BadgeIndianRupee />}
          tone="blue"
        />
        <StatCard
          label="Pending amount"
          value="₹38,500"
          detail="23 members"
          icon={<Clock />}
          tone="orange"
        />
        <StatCard
          label="Paid members"
          value="347"
          detail="81% of members"
          icon={<Check />}
          tone="violet"
        />
      </div>
      <section className="panel table-panel">
        <div className="toolbar">
          <label className="search-box">
            <Search size={17} />
            <input placeholder="Search receipt or member" />
          </label>
          <select>
            <option>All methods</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>
          </select>
          <select>
            <option>All status</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Receipt</th>
                <th>Member</th>
                <th>Plan</th>
                <th>Method</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const m = members.find((x) => x.id === p.memberId)!;
                return (
                  <tr key={p.id}>
                    <td>
                      <b>{p.id}</b>
                    </td>
                    <td>
                      <div className="person-cell">
                        <Avatar src={m.image} name={m.name} />
                        <div>
                          <b>{m.name}</b>
                          <small>{m.phone}</small>
                        </div>
                      </div>
                    </td>
                    <td>{p.plan}</td>
                    <td>{p.method}</td>
                    <td>{shortDate(p.date)}</td>
                    <td>
                      <b>{currency(p.amount)}</b>
                    </td>
                    <td>
                      <Badge status={p.status} />
                    </td>
                    <td>
                      <button
                        className="icon-btn"
                        title="Print receipt"
                        onClick={() => {
                          toast("Print dialog opened");
                          window.print();
                        }}
                      >
                        <Printer size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Record payment"
        success="Payment recorded in this demo session"
      >
        <label>
          Member
          <select>
            {members.map((m) => (
              <option key={m.id}>{m.name}</option>
            ))}
          </select>
        </label>
        <label>
          Amount
          <input required type="number" placeholder="₹ 0" />
        </label>
        <label>
          Method
          <select>
            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>
        </label>
        <label>
          Payment date
          <input type="date" required />
        </label>
      </SimpleModal>
    </>
  );
}

export function TrainersView({ trainers }: { trainers: Trainer[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="Coaching team"
        title="Trainers"
        text="Meet the specialists driving member results."
        button="Add trainer"
        onClick={() => setOpen(true)}
      />
      <div className="trainer-grid">
        {trainers.map((t) => (
          <Link href={`/trainers/${t.id}`} className="trainer-card" key={t.id}>
            <div className="trainer-photo">
              <Image
                src={t.image}
                alt={t.name}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                className="object-cover"
              />
              <Badge status={t.status} />
            </div>
            <div className="trainer-body">
              <span className="eyebrow">{t.specialization}</span>
              <h2>{t.name}</h2>
              <p>{t.experience} years of experience</p>
              <div className="trainer-metrics">
                <div>
                  <b>{t.assignedMembers}</b>
                  <span>Members</span>
                </div>
                <div>
                  <b>{t.shift}</b>
                  <span>Shift</span>
                </div>
              </div>
              <div className="card-link">
                View profile <ChevronRight size={17} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Add trainer"
        success="Trainer added to this demo session"
      >
        <label>
          Full name
          <input required />
        </label>
        <label>
          Phone
          <input required pattern="[0-9]{10}" />
        </label>
        <label>
          Specialization
          <input required />
        </label>
        <label>
          Shift
          <select>
            <option>Morning</option>
            <option>Evening</option>
          </select>
        </label>
      </SimpleModal>
    </>
  );
}

export function WorkoutsView({
  workouts,
  members,
}: {
  workouts: Workout[];
  members: Member[];
}) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <PageHead
        eyebrow="Programming"
        title="Workout Plans"
        text="Structured programs your trainers can assign in seconds."
        button="Create workout"
        onClick={() => setOpen(true)}
      />
      <div className="program-grid">
        {workouts.map((w, i) => (
          <article className="program-card" key={w.id}>
            <div className="program-number">0{i + 1}</div>
            <div className="program-meta">
              <Badge status={w.level.toLowerCase()} />
              <span>{w.duration}</span>
            </div>
            <h2>{w.name}</h2>
            <p>
              {w.goal} · by {w.trainer}
            </p>
            <div className="week-list">
              {w.days.map((d) => (
                <div key={d.day}>
                  <b>{d.day}</b>
                  <span>{d.focus}</span>
                </div>
              ))}
            </div>
            <div className="card-actions">
              <button
                className="btn secondary"
                onClick={() => toast("Assignment panel opened")}
              >
                <Target size={15} /> Assign
              </button>
              <button
                className="icon-btn"
                onClick={() => toast("Workout duplicated")}
              >
                <Copy size={17} />
              </button>
              <button className="icon-btn">
                <Edit3 size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Create workout plan"
        success="Workout plan created in this demo"
      >
        <label>
          Plan name
          <input required />
        </label>
        <label>
          Goal
          <input required />
        </label>
        <label>
          Level
          <select>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label>
          Assign member
          <select>
            <option>Not assigned</option>
            {members.map((m) => (
              <option key={m.id}>{m.name}</option>
            ))}
          </select>
        </label>
      </SimpleModal>
    </>
  );
}

export function DietsView({
  diets,
  members,
}: {
  diets: Diet[];
  members: Member[];
}) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <PageHead
        eyebrow="Nutrition"
        title="Diet Plans"
        text="Practical Indian meal plans aligned with member goals."
        button="Create diet"
        onClick={() => setOpen(true)}
      />
      <div className="diet-grid">
        {diets.map((d) => (
          <article className="diet-card" key={d.id}>
            <div className="diet-top">
              <div className="diet-icon">
                <Utensils />
              </div>
              <div>
                <span className="eyebrow">{d.goal}</span>
                <h2>{d.name}</h2>
              </div>
              <button className="icon-btn">
                <MoreHorizontal />
              </button>
            </div>
            <div className="macro-row">
              <div>
                <b>{d.calories}</b>
                <span>kcal</span>
              </div>
              <div>
                <b>{d.protein}g</b>
                <span>Protein</span>
              </div>
              <div>
                <b>{d.carbs}g</b>
                <span>Carbs</span>
              </div>
              <div>
                <b>{d.fats}g</b>
                <span>Fats</span>
              </div>
            </div>
            <div className="meal-list">
              {d.meals.map((m) => (
                <div key={m.time}>
                  <time>{m.time}</time>
                  <span>{m.items}</span>
                </div>
              ))}
            </div>
            <button
              className="btn primary full"
              onClick={() => toast(`Select member to assign ${d.name}`)}
            >
              Assign to member
            </button>
          </article>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Create diet plan"
        success="Diet plan created in this demo"
      >
        <label>
          Diet name
          <input required />
        </label>
        <label>
          Goal
          <input required />
        </label>
        <label>
          Calories
          <input type="number" required />
        </label>
        <label>
          Assign member
          <select>
            <option>Not assigned</option>
            {members.map((m) => (
              <option key={m.id}>{m.name}</option>
            ))}
          </select>
        </label>
      </SimpleModal>
    </>
  );
}

export function LeadsView({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [view, setView] = useState<"board" | "table">("board");
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const columns = [
    "New Lead",
    "Contacted",
    "Trial Booked",
    "Trial Completed",
    "Joined",
  ];
  return (
    <>
      <PageHead
        eyebrow="Sales CRM"
        title="Leads & Trials"
        text="Never miss a follow-up. Move every enquiry towards membership."
        button="Add lead"
        onClick={() => setOpen(true)}
      />
      <div className="crm-stats">
        <div>
          <span>Today’s trials</span>
          <b>4</b>
          <small>2 completed</small>
        </div>
        <div>
          <span>Follow-ups due</span>
          <b>7</b>
          <small>3 overdue</small>
        </div>
        <div>
          <span>Trials converted</span>
          <b>68%</b>
          <small>+9% this month</small>
        </div>
        <div className="view-toggle">
          <button
            className={view === "board" ? "active" : ""}
            onClick={() => setView("board")}
          >
            <Grid2X2 size={17} />
            Board
          </button>
          <button
            className={view === "table" ? "active" : ""}
            onClick={() => setView("table")}
          >
            <List size={17} />
            Table
          </button>
        </div>
      </div>
      {view === "board" ? (
        <div className="kanban">
          {columns.map((status) => (
            <section className="kanban-col" key={status}>
              <header>
                <span>{status}</span>
                <b>{leads.filter((l) => l.status === status).length}</b>
              </header>
              {leads
                .filter((l) => l.status === status)
                .map((l) => (
                  <article className="lead-card" key={l.id}>
                    <div>
                      <b>{l.name}</b>
                      <Badge status={l.status} />
                    </div>
                    <p>
                      {l.plan} plan · {l.source}
                    </p>
                    <small>Follow-up {shortDate(l.followUp)}</small>
                    <div className="lead-actions">
                      <button
                        onClick={() => toast(`Calling ${l.name} (simulated)`)}
                      >
                        <Phone size={15} />
                      </button>
                      <button
                        onClick={() =>
                          window.open(`https://wa.me/91${l.phone}`, "_blank")
                        }
                      >
                        <MessageCircle size={15} />
                      </button>
                      <button
                        onClick={() => {
                          const idx = columns.indexOf(l.status);
                          if (idx < columns.length - 1)
                            setLeads(
                              leads.map((x) =>
                                x.id === l.id
                                  ? {
                                      ...x,
                                      status: columns[
                                        idx + 1
                                      ] as Lead["status"],
                                    }
                                  : x,
                              ),
                            );
                        }}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </article>
                ))}
            </section>
          ))}
        </div>
      ) : (
        <section className="panel table-panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Source</th>
                  <th>Plan</th>
                  <th>Staff</th>
                  <th>Follow-up</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <b>{l.name}</b>
                      <small className="block">{l.phone}</small>
                    </td>
                    <td>{l.source}</td>
                    <td>{l.plan}</td>
                    <td>{l.staff}</td>
                    <td>{shortDate(l.followUp)}</td>
                    <td>
                      <Badge status={l.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Create lead"
        success="Lead added to this demo session"
      >
        <label>
          Full name
          <input required />
        </label>
        <label>
          Phone
          <input required pattern="[0-9]{10}" />
        </label>
        <label>
          Source
          <select>
            <option>Walk-in</option>
            <option>Instagram</option>
            <option>Google</option>
            <option>Website</option>
          </select>
        </label>
        <label>
          Interested plan
          <select>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </label>
      </SimpleModal>
    </>
  );
}

export function StaffView({ staff }: { staff: Staff[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="Team operations"
        title="Staff"
        text="Manage shifts, roles, attendance and payroll."
        button="Add staff"
        onClick={() => setOpen(true)}
      />
      <div className="staff-grid">
        {staff.map((s, i) => (
          <article className="staff-card" key={s.id}>
            <div className="staff-avatar">
              {s.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>
            <div>
              <Badge status={s.status} />
              <h3>{s.name}</h3>
              <p>{s.role}</p>
            </div>
            <dl>
              <div>
                <dt>Shift</dt>
                <dd>{s.shift}</dd>
              </div>
              <div>
                <dt>Attendance</dt>
                <dd>{s.attendance}/26</dd>
              </div>
              <div>
                <dt>Salary</dt>
                <dd>{currency(s.salary)}</dd>
              </div>
              <div>
                <dt>Joined</dt>
                <dd>{shortDate(s.joinedAt)}</dd>
              </div>
            </dl>
            <button className="btn secondary full">View details</button>
          </article>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Add staff member"
        success="Staff member added in this demo"
      >
        <label>
          Full name
          <input required />
        </label>
        <label>
          Role
          <select>
            <option>Receptionist</option>
            <option>Manager</option>
            <option>Cleaner</option>
            <option>Sales Staff</option>
          </select>
        </label>
        <label>
          Phone
          <input required />
        </label>
        <label>
          Shift
          <select>
            <option>Morning</option>
            <option>Evening</option>
          </select>
        </label>
      </SimpleModal>
    </>
  );
}

export function OffersView({ offers }: { offers: Offer[] }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <>
      <PageHead
        eyebrow="Campaigns"
        title="Offers"
        text="Create promotions that turn interest into memberships."
        button="Create offer"
        onClick={() => setOpen(true)}
      />
      <div className="offer-grid">
        {offers.map((o, i) => (
          <article className={`offer-card offer-${i}`} key={o.id}>
            <div className="offer-glow" />
            <Badge status={o.status} />
            <Gift size={31} />
            <span className="eyebrow">LIMITED TIME</span>
            <h2>{o.title}</h2>
            <p>{o.description}</p>
            <strong>{o.discount}</strong>
            <div className="offer-dates">
              {shortDate(o.startDate)} — {shortDate(o.endDate)}
            </div>
            <div className="card-actions">
              <button className="btn secondary">
                <Edit3 size={15} />
                Edit
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(`${o.title}: ${o.description}`)}`,
                    "_blank",
                  );
                  toast("Opening WhatsApp share");
                }}
              >
                <Share2 size={15} />
                Share
              </button>
            </div>
          </article>
        ))}
      </div>
      <SimpleModal
        open={open}
        setOpen={setOpen}
        title="Create offer"
        success="Offer created for this demo"
      >
        <label>
          Offer title
          <input required />
        </label>
        <label>
          Discount
          <input required />
        </label>
        <label>
          Start date
          <input type="date" required />
        </label>
        <label>
          End date
          <input type="date" required />
        </label>
      </SimpleModal>
    </>
  );
}
