import React from "react";
import { Link } from "react-router-dom";
import mayaAvatar from "../assets/testimonials/maya.svg";
import danielAvatar from "../assets/testimonials/daniel.svg";
import shreyaAvatar from "../assets/testimonials/shreya.svg";

function FeatureIcon({ children }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1f2c33]/10 bg-[#f9fbfa] text-[#0f766e] shadow-[0_6px_18px_rgba(15,118,110,0.12)]">
      {children}
    </span>
  );
}

const features = [
  {
    title: "Resume Intelligence",
    copy: "Upload once and get ATS scoring, skill extraction, and clear action points in minutes.",
    stat: "92 avg score",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v6h6" />
        <path d="M9 14h6M9 18h6" />
      </svg>
    ),
  },
  {
    title: "Targeted Job Matching",
    copy: "Discover roles ranked against your real profile, not generic keyword guesses.",
    stat: "3.4x faster",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 4.5 4.5" />
        <path d="m8.5 10.5 1.5 1.7 3-3.4" />
      </svg>
    ),
  },
  {
    title: "AI Resume Builder",
    copy: "Generate polished role-specific drafts, then export a recruiter-ready PDF.",
    stat: "1-click export",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
        <path d="M14 4v5h5" />
        <path d="m8 16 2.2-6 2.2 6M8.7 14h3" />
      </svg>
    ),
  },
  {
    title: "Growth Tracking",
    copy: "Track every improvement cycle so each iteration makes your profile stronger.",
    stat: "Weekly insights",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19h16" />
        <path d="M6 16V9m6 7V6m6 10v-4" />
        <path d="m5 10 4-3 4 2 5-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your current resume",
    copy: "Import PDF or image and let Revyse map your strengths and gaps.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 16V5" />
        <path d="m8.5 8.5 3.5-3.5 3.5 3.5" />
        <rect x="4" y="14" width="16" height="6" rx="2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Optimize with AI guidance",
    copy: "Apply focused bullet rewrites, skill alignment, and ATS structure fixes.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v3m0 12v3M4.9 6.2l2.1 2.1m10 10 2.1 2.1M3 12h3m12 0h3M4.9 17.8l2.1-2.1m10-10 2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Apply with confidence",
    copy: "Use your improved resume with matched openings and track progress.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.5 12.5 9 18l11.5-11.5" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Maya R.",
    role: "Product Designer",
    avatar: mayaAvatar,
    quote:
      "Revyse gave me exact fixes I could apply instantly. My resume finally reads like my actual value.",
  },
  {
    name: "Daniel K.",
    role: "Frontend Engineer",
    avatar: danielAvatar,
    quote:
      "The score breakdown and targeted rewrites helped me pass ATS screens and land interviews in two weeks.",
  },
  {
    name: "Shreya N.",
    role: "Marketing Analyst",
    avatar: shreyaAvatar,
    quote:
      "I loved how the job matching highlighted roles I was a real fit for instead of random suggestions.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#172126] [font-family:'Space_Grotesk',sans-serif]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(38,166,154,0.2),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(255,138,76,0.15),transparent_28%),linear-gradient(180deg,#f6f4ef_0%,#efebe1_100%)]" />

      <header className="mx-auto w-full max-w-7xl px-6 pb-10 pt-6 md:px-10">
        <nav className="glass-card animate-rise flex items-center justify-between rounded-2xl border border-[#1f2c33]/12 bg-white/70 px-5 py-4 shadow-[0_12px_40px_rgba(19,33,38,0.08)] md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-[#132126]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0f766e]/20 to-[#ff8a4c]/20 text-[#0f766e]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h8" />
                <path d="m10 6 6 6-6 6" />
              </svg>
            </span>
            Revyse
          </Link>

          <div className="hidden items-center gap-2 rounded-2xl border border-[#1f2c33]/12 bg-white/75 p-1.5 text-sm text-[#3b4e56] md:flex">
            <a href="#features" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-[#0f766e]/8 hover:text-[#0f766e]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="6" height="6" rx="1.5" />
                <rect x="14" y="4" width="6" height="6" rx="1.5" />
                <rect x="4" y="14" width="6" height="6" rx="1.5" />
                <rect x="14" y="14" width="6" height="6" rx="1.5" />
              </svg>
              Features
            </a>
            <a href="#workflow" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-[#0f766e]/8 hover:text-[#0f766e]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h12" />
                <path d="m13 4 3 3-3 3" />
                <path d="M20 17H8" />
                <path d="m11 14-3 3 3 3" />
              </svg>
              Workflow
            </a>
            <a href="#testimonials" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-[#0f766e]/8 hover:text-[#0f766e]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 10h6" />
                <path d="M7 14h10" />
                <rect x="4" y="5" width="16" height="14" rx="3" />
              </svg>
              Stories
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#22323b]/20 px-4 py-2 text-sm font-medium text-[#22323b] transition hover:border-[#22323b]/40"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M10 17 5 12l5-5" />
                <path d="M5 12h10" />
                <path d="M13 5h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-3" />
              </svg>
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0f766e] to-[#15958b] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_18px_rgba(15,118,110,0.25)] transition hover:brightness-95"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Start free
            </Link>
          </div>
        </nav>

        <section className="relative mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="animate-rise [animation-delay:120ms]">
            <p className="mb-4 inline-flex rounded-full bg-[#0f766e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Career AI, rebuilt
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight text-[#172126] sm:text-5xl md:text-6xl">
              Build an ATS-ready resume that sounds like you.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#39505a] md:text-lg">
              Revyse combines OCR, scoring, and role-aware rewriting into one focused workflow so you can stop guessing and start getting interviews.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="rounded-full bg-[#ff8a4c] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,138,76,0.35)] transition hover:translate-y-[-2px]"
              >
                Create your resume
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-[#22323b]/25 bg-white/75 px-6 py-3 text-sm font-semibold text-[#22323b] transition hover:bg-white"
              >
                Explore dashboard
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "ATS scoring",
                "Skill extraction",
                "Job matching",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#1f2c33]/10 bg-white/60 px-3 py-2 text-sm font-medium text-[#24343c]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-rise [animation-delay:240ms]">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#1f2c33]/15 bg-[#132126] p-6 text-white shadow-[0_18px_60px_rgba(19,33,38,0.36)]">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#0f766e]/45 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#ff8a4c]/45 blur-3xl" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">Resume Health</p>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">+12 this week</span>
                </div>

                <div>
                  <p className="text-5xl font-bold tracking-tight">94</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/75">ATS compatibility score</p>
                </div>

                <div className="space-y-3 rounded-xl bg-white/10 p-4">
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Keyword Strength</span>
                    <span>91%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/20">
                    <div className="h-2 w-[91%] rounded-full bg-[#ff8a4c]" />
                  </div>

                  <div className="flex justify-between text-xs text-white/80">
                    <span>Role Alignment</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/20">
                    <div className="h-2 w-[88%] rounded-full bg-[#55d6c2]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-white/90 sm:text-sm">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-white/70">Top role</p>
                    <p className="mt-1 font-semibold">Frontend Engineer</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-white/70">Skill gap</p>
                    <p className="mt-1 font-semibold">Testing depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section id="features" className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="mb-8 md:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Platform features</p>
            <h2 className="mt-3 text-3xl font-bold text-[#172126] md:text-4xl">Precision tools for every stage of your job hunt</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="animate-rise rounded-2xl border border-[#1f2c33]/10 bg-white/70 p-5 backdrop-blur [animation-delay:340ms]"
                style={{ animationDelay: `${340 + index * 90}ms` }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">{feature.stat}</p>
                <h3 className="mt-3 text-lg font-semibold text-[#172126]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#47606a]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="rounded-3xl border border-[#1f2c33]/12 bg-[#e8efe8]/90 p-6 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">How Revyse works</p>
            <h2 className="mt-3 text-3xl font-bold text-[#172126] md:text-4xl">Three focused steps from resume to interviews</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <article key={step.number} className="rounded-2xl border border-[#1f2c33]/10 bg-white/75 p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#172126] text-white">
                      {step.icon}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a4c]">Step {step.number}</p>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-[#172126]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#456068]">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="mb-8 md:mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Success stories</p>
              <h2 className="mt-3 text-3xl font-bold text-[#172126] md:text-4xl">Built for real career momentum</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#456068] md:text-base">
                Revyse is designed for measurable progress. Every resume improvement feeds directly into stronger matches and better interview readiness.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-[#1f2c33]/10 bg-white/75 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={`${item.name} portrait`}
                    className="h-12 w-12 rounded-xl border border-[#1f2c33]/10 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#172126]">{item.name}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#5f767e]">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#39535c]">&quot;{item.quote}&quot;</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-14 pt-10 md:px-10 md:pb-20">
          <div className="rounded-[2rem] bg-[#172126] px-6 py-10 text-center text-white md:px-12 md:py-14">
            <p className="text-sm uppercase tracking-[0.16em] text-[#55d6c2]">Ready when you are</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold md:text-5xl">Give your next application a serious advantage</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              Join Revyse and turn resume editing from a guessing game into a measurable process.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex rounded-full bg-[#ff8a4c] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,138,76,0.3)] transition hover:translate-y-[-2px]"
            >
              Start with Revyse
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1f2c33]/10 bg-[#f0ece3]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#496069] md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 Revyse. Built for faster career moves.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#0f766e]">Privacy</a>
            <a href="#" className="hover:text-[#0f766e]">Terms</a>
            <Link to="/login" className="hover:text-[#0f766e]">App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}