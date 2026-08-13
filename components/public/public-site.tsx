"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Quote,
  X,
} from "lucide-react";
import { useMemberWebsiteOverrides } from "@/lib/member-showcase";
import { currency } from "@/lib/utils";
import type { Member, Membership, Trainer } from "@/types";

export function PublicSite({
  plans,
  trainers,
  members,
}: {
  plans: Membership[];
  trainers: Trainer[];
  members: Member[];
}) {
  const [nav, setNav] = useState(false);
  const [sent, setSent] = useState(false);
  const overrides = useMemberWebsiteOverrides();
  const websiteMembers = members
    .map((member) => ({ ...member, ...overrides[member.id] }))
    .filter((member) => member.showOnWebsite);
  return (
    <main className="public-site">
      <nav className="public-nav">
        <Link href="/" className="public-logo">
          <span>
            <Dumbbell />
          </span>
          <b>
            GOLDEN<small>GYM & FITNESS</small>
          </b>
        </Link>
        <div className={nav ? "nav-links open" : "nav-links"}>
          {[
            "About",
            "Membership",
            "Trainers",
            "Classes",
            "Transformations",
            "Contact",
          ].map((x) => (
            <a
              onClick={() => setNav(false)}
              href={`#${x.toLowerCase()}`}
              key={x}
            >
              {x}
            </a>
          ))}
          <Link className="nav-login" href="/login">
            Owner login
          </Link>
        </div>
        <div className="nav-cta">
          <a href="#trial" className="btn public-outline">
            Book free trial
          </a>
          <button className="public-menu" onClick={() => setNav(!nav)}>
            {nav ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <section className="public-hero">
        <div className="hero-bg">
          <Image
            src={trainers[6].image}
            alt="Athlete training at Golden Gym"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-kicker">
            <i /> PUNE’S PREMIER FITNESS DESTINATION
          </span>
          <h1>
            BUILD YOUR
            <br />
            <em>STRONGEST</em> SELF.
          </h1>
          <p>
            Professional coaching, serious equipment and personalised plans
            designed to turn goals into results.
          </p>
          <div>
            <a className="btn hero-primary" href="#membership">
              Explore memberships <ArrowRight />
            </a>
            <a className="play-link" href="#classes">
              <i>
                <Play fill="currentColor" />
              </i>
              See how we train
            </a>
          </div>
        </div>
        <div className="hero-side">
          <span>EST. 2018</span>
          <i />
          <span>OPEN 5:30 AM — 10:30 PM</span>
        </div>
        <div className="hero-stats">
          {[
            ["500+", "Active members"],
            ["10+", "Expert trainers"],
            ["8+", "Years of excellence"],
            ["50+", "Transformations"],
          ].map((x) => (
            <div key={x[1]}>
              <b>{x[0]}</b>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="public-intro" id="about">
        <div>
          <span className="section-index">01 — WHY GOLDEN GYM</span>
          <h2>
            NOT JUST A GYM.
            <br />
            <em>A STANDARD.</em>
          </h2>
        </div>
        <div>
          <p>
            We combine focused coaching, modern equipment and a community that
            shows up. Every detail is designed around one thing—your progress.
          </p>
          <div className="public-features">
            {[
              [
                "01",
                "Expert coaching",
                "Programs that adapt as you get stronger.",
              ],
              [
                "02",
                "Premium equipment",
                "Built for safe, serious, effective training.",
              ],
              [
                "03",
                "Progress you can see",
                "Measurements and guidance, not guesswork.",
              ],
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="public-plans" id="membership">
        <header>
          <div>
            <span className="section-index">02 — MEMBERSHIPS</span>
            <h2>
              INVEST IN YOUR
              <br />
              <em>STRONGEST YEAR.</em>
            </h2>
          </div>
          <p>
            Simple plans. No hidden fees. Everything you need to train with
            intent.
          </p>
        </header>
        <div className="public-price-grid">
          {plans.map((p, i) => (
            <article className={i === 3 ? "featured" : ""} key={p.id}>
              {i === 3 && <span className="best">BEST VALUE</span>}
              <small>{String(i + 1).padStart(2, "0")}</small>
              <h3>{p.name}</h3>
              <div className="public-price">
                <b>{currency(p.price)}</b>
                <span>/ {p.duration}</span>
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#trial">
                Choose plan <ArrowRight />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="public-trainers" id="trainers">
        <div className="public-section-head">
          <div>
            <span className="section-index">03 — THE COACHES</span>
            <h2>
              TRAIN WITH
              <br />
              <em>THE BEST.</em>
            </h2>
          </div>
          <p>
            Certified specialists who coach the person, not just the workout.
          </p>
        </div>
        <div className="public-trainer-grid">
          {trainers.slice(0, 4).map((t, i) => (
            <article key={t.id}>
              <div>
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span>0{i + 1}</span>
              </div>
              <h3>{t.name}</h3>
              <p>{t.specialization}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="classes-section" id="classes">
        <div className="public-section-head">
          <div>
            <span className="section-index">04 — CLASSES</span>
            <h2>
              FIND YOUR
              <br />
              <em>FIRE.</em>
            </h2>
          </div>
          <p>High-energy group sessions, coached with purpose.</p>
        </div>
        <div className="class-strips">
          {[
            ["01", "CROSSFIT", "07:00 AM", "Kabir Sethi"],
            ["02", "YOGA FLOW", "06:00 AM", "Nisha Rao"],
            ["03", "HIIT", "07:00 PM", "Dev Kapoor"],
            ["04", "ZUMBA", "08:00 AM", "Kavya Menon"],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <div>
                <b>{x[2]}</b>
                <small>{x[3]}</small>
              </div>
              <button>
                <ChevronRight />
              </button>
            </article>
          ))}
        </div>
      </section>
      {websiteMembers.length > 0 && (
        <section className="public-members" id="members">
          <div className="public-section-head">
            <div>
              <span className="section-index">05 — OUR COMMUNITY</span>
              <h2>PEOPLE WHO<br/><em>SHOW UP.</em></h2>
            </div>
            <p>Real members building strength, confidence and better habits at Golden Gym.</p>
          </div>
          <div className="public-member-grid">
            {websiteMembers.slice(0, 8).map((member) => (
              <article key={member.id}>
                <div><Image src={member.image} alt={`${member.name}, Golden Gym member`} fill sizes="(max-width: 540px) 50vw, 25vw" className="object-cover"/></div>
                <h3>{member.name}</h3>
                <p>Golden Gym Member · {member.memberId}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="transformation-public" id="transformations">
        <div className="transform-photo">
          <Image
            src={websiteMembers[0]?.image ?? members[3].image}
            alt="Member transformation"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="quote-mark">
            <Quote />
          </div>
        </div>
        <div>
          <span className="section-index">05 — REAL RESULTS</span>
          <h2>
            “I DIDN’T JUST
            <br />
            LOSE WEIGHT.
            <br />
            <em>I FOUND MYSELF.”</em>
          </h2>
          <p>
            Rahul lost 12 kg in 5 months with a personalised strength and
            nutrition plan.
          </p>
          <div className="transform-numbers">
            <div>
              <b>82</b>
              <span>KG BEFORE</span>
            </div>
            <i>→</i>
            <div>
              <b>70</b>
              <span>KG AFTER</span>
            </div>
            <div>
              <b>5</b>
              <span>MONTHS</span>
            </div>
          </div>
          <span className="member-name">
            RAHUL SHARMA · COACHED BY KAVYA MENON
          </span>
        </div>
      </section>
      <section className="trial-section" id="trial">
        <div>
          <span className="section-index">06 — START TODAY</span>
          <h2>
            YOUR FIRST
            <br />
            SESSION IS <em>ON US.</em>
          </h2>
          <p>
            Book a free trial. Meet a coach, explore the space and experience
            how focused training feels.
          </p>
          <div className="contact-points">
            <span>
              <Phone />
              +91 98765 43210
            </span>
            <span>
              <MapPin />
              42, Fitness Avenue, Pune
            </span>
            <span>
              <Clock3 />
              Mon–Sat · 5:30 AM–10:30 PM
            </span>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="form-success">
              <Check />
              <h3>Trial request received!</h3>
              <p>Added to this demo session. Our team will contact you soon.</p>
              <button type="button" onClick={() => setSent(false)}>
                Book another
              </button>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input required placeholder="Full name" />
              </label>
              <label>
                Phone number
                <input
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                />
              </label>
              <label>
                Fitness goal
                <select required defaultValue="">
                  <option value="" disabled>
                    Select your goal
                  </option>
                  <option>Weight loss</option>
                  <option>Muscle building</option>
                  <option>General fitness</option>
                  <option>Strength</option>
                </select>
              </label>
              <label>
                Preferred time
                <select>
                  <option>Morning (6–10 AM)</option>
                  <option>Evening (5–9 PM)</option>
                </select>
              </label>
              <button>
                Book my free trial <ArrowRight />
              </button>
              <small>
                No payment required. We’ll call to confirm your slot.
              </small>
            </>
          )}
        </form>
      </section>
      <footer id="contact">
        <Link href="/" className="public-logo">
          <span>
            <Dumbbell />
          </span>
          <b>
            GOLDEN<small>GYM & FITNESS</small>
          </b>
        </Link>
        <p>
          Stronger bodies. Sharper minds.
          <br />
          Better lives.
        </p>
        <div>
          <b>Explore</b>
          <a href="#membership">Memberships</a>
          <a href="#trainers">Trainers</a>
          <a href="#classes">Classes</a>
        </div>
        <div>
          <b>Contact</b>
          <a href="tel:+919876543210">+91 98765 43210</a>
          <a href="mailto:hello@goldengym.in">hello@goldengym.in</a>
        </div>
        <div className="social">
          <a href="#">
            <Camera />
          </a>
          <a href="mailto:hello@goldengym.in">
            <Mail />
          </a>
        </div>
        <small>
          © 2026 Golden Gym & Fitness. Built for stronger tomorrows.
        </small>
      </footer>
    </main>
  );
}
