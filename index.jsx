import React, { useState, useEffect } from "react";
import {
  Radio, Anchor, Compass, Terminal, Mail, Github, Linkedin,
  MapPin, ChevronRight, Menu, X, ExternalLink, Radar as RadarIcon,
  Waypoints, Database, Cloud, Cpu, Code2, GitBranch, ArrowUpRight, Building2
} from "lucide-react";

/* ---------------------------------------------------------
   DATA — pulled directly from Krishna's resume
--------------------------------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Systems" },
  { id: "work", label: "Voyage Log" },
  { id: "certs", label: "Credentials" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const CAREER = [
  { company: "IME", full: "Integrated Maritime Exchange", span: "MAY 2025 — OCT 2025", note: "Full-stack engineer on the C-Hub maritime platform and academic portal", color: "gold" },
  { company: "LTM", full: "LTM", span: "NOV 2025 — PRESENT", note: "Cloud data engineering and applied GenAI, currently deployed", color: "blue" },
];

const SKILLS = [
  { area: "Programming", items: ["Python", "Java", "JavaScript", "C#", "SQL"], icon: Code2, level: 88 },
  { area: "Cloud", items: ["Azure Data Factory", "Azure SQL", "Azure Blob Storage", "Azure AI Services"], icon: Cloud, level: 82 },
  { area: "Frontend", items: ["React.js", "HTML", "CSS", "JavaScript"], icon: Terminal, level: 85 },
  { area: "Backend", items: ["Node.js", "REST APIs", ".NET Core"], icon: Cpu, level: 80 },
  { area: "Databases", items: ["MySQL", "NoSQL"], icon: Database, level: 84 },
  { area: "AI / GenAI", items: ["Azure AI", "Prompt Engineering", "LangChain", "RAG Concepts", "GitHub Copilot"], icon: RadarIcon, level: 78 },
  { area: "Tools", items: ["Git", "GitHub", "VS Code"], icon: GitBranch, level: 90 },
];

const PROJECTS = [
  {
    coords: "AUG 2025 — OCT 2025",
    employer: "IME",
    name: "C-Hub Maritime Platform & Market Analytics",
    sub: "Integrated Maritime Exchange (IME)",
    team: 6,
    desc: "Scalable maritime data & analytics platform supporting 3,000+ ports and 100,000+ vessels with 24×7 uptime.",
    role: [
      "Designed distributed backend and data layer (MySQL + NoSQL), improving system efficiency by ~70%",
      "Built market analytics for real-time rate trends — daily movement plus historical tracking",
      "Delivered customer-facing modules: maritime calculators and a mobile-first academic portal; contributed to multi-currency, PCI-oriented payments (in progress)",
    ],
    tech: ["MySQL", "NoSQL", "JavaScript", "React", "Node.js", "Python", "Git"],
  },
  {
    coords: "MAY 2025 — AUG 2025",
    employer: "IME",
    name: "Academic Portal & Maritime Calculators",
    sub: "Integrated Maritime Exchange (IME)",
    team: 3,
    desc: "Educational portal (academics.theimehub.com) and responsive maritime calculators to improve customer self-service workflows.",
    role: [
      "Created mobile-first UI/UX and reusable front-end components for calculators and learning modules",
      "Implemented portal structure and content management flows for maritime student learning content",
      "Integrated APIs and optimized page performance for always-on availability",
    ],
    tech: ["JavaScript", "React", "Node.js", "Git", "REST APIs"],
  },
  {
    coords: "DEC 2025 — JAN 2026",
    employer: "LTM",
    name: "Azure Data Migration & Automated Ingestion Pipeline",
    sub: "LTM",
    team: 1,
    desc: "Azure Data Factory-based ingestion pipeline automating movement of structured and unstructured data into Azure Blob Storage.",
    role: [
      "Created linked services to securely connect Azure SQL, cloud storage, and target Blob Storage",
      "Defined datasets for structured and unstructured sources to support repeatable ingestion workflows",
      "Configured Copy Activity and scheduled triggers for automated, reliable data movement",
    ],
    tech: ["Azure Data Factory", "Azure SQL", "Azure Blob Storage", "Copy Activity", "Linked Services", "Triggers"],
  },
  {
    coords: "FEB 2026 — MAR 2026",
    employer: "LTM",
    name: "RAG-based Document Q&A Assistant",
    sub: "LTM · Azure OpenAI",
    team: 1,
    desc: "GenAI document Q&A assistant retrieving relevant context from uploaded documents to generate concise, grounded answers.",
    role: [
      "Designed a retrieval workflow to process document content and provide context-aware responses",
      "Applied prompt engineering to improve answer relevance, clarity, and consistency",
      "Explored LangChain and RAG concepts for semantic retrieval and document-based Q&A",
    ],
    tech: ["Python", "Azure OpenAI", "Azure AI Services", "LangChain", "RAG Concepts", "Prompt Engineering"],
  },
];

const CERTS = [
  { title: "Microsoft Azure AI — Beginner", note: "Core Azure AI services and concepts", status: "Completed" },
  { title: "Azure Fundamentals", note: "Cloud concepts and core Azure services", status: "Ongoing" },
  { title: "Generative AI & GitHub Copilot", note: "Developer productivity training", status: "Completed" },
  { title: ".NET, C# & GitHub Actions", note: "Applied backend & CI/CD tooling", status: "In Progress" },
];

const EDUCATION = [
  { level: "B.Tech, Computer Science & Engineering", place: "Graphic Era Hill University, Dehradun", meta: "CGPA 8.00", span: "OCT 2021 — JUN 2025" },
  { level: "Class 12 · Non-Medical", place: "Kendriya Vidyalaya, Suratgarh Cantt, Rajasthan", meta: "91.8%", span: "APR 2020 — MAR 2021" },
  { level: "Class 10", place: "Kendriya Vidyalaya, Suratgarh Cantt, Rajasthan", meta: "92.2%", span: "COMPLETED 2019" },
];

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

function useOnScreen(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-[11px] tracking-[0.3em] text-amber-400/80">{index}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-amber-400/40 via-rose-500/20 to-transparent" />
      <h2 className="font-display text-2xl md:text-3xl text-neutral-100 tracking-tight">{children}</h2>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="font-mono text-[11px] tracking-wide text-sky-300/90 bg-sky-400/[0.06] border border-sky-400/20 rounded px-2 py-1">
      {children}
    </span>
  );
}

function EmployerBadge({ employer }) {
  const isIME = employer === "IME";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] px-2 py-1 rounded border ${
        isIME
          ? "text-amber-300 border-amber-400/40 bg-amber-400/10"
          : "text-sky-300 border-sky-400/40 bg-sky-400/10"
      }`}
    >
      <Building2 size={11} />
      {employer}
    </span>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(new Date());
  const active = useOnScreen(NAV.map((n) => n.id));

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const timeStr = clock.toLocaleTimeString("en-IN", { hour12: false });

  return (
    <div className="min-h-screen bg-black text-neutral-200 relative overflow-x-hidden">
      <GlobalStyle />
      <GridBackdrop />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/85 border-b border-amber-400/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <span className="relative w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping-slow" />
              <span className="font-display text-xs text-amber-300">KJ</span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-400 group-hover:text-amber-300 transition-colors hidden sm:inline">
              KRISHNA · JOSHI
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`font-mono text-[11px] tracking-wider px-3 py-2 rounded transition-colors ${
                  active === n.id ? "text-amber-300 bg-amber-400/10" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {timeStr} IST
          </div>

          <button className="md:hidden text-neutral-300" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-amber-400/10 bg-black px-5 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left font-mono text-xs tracking-wider py-2.5 text-neutral-300"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-40 pb-28 md:pt-52 md:pb-36 px-5 md:px-8">
        <div className="max-w-6xl mx-auto relative">
          <RadarHero />

          <div className="relative z-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-amber-400/80 mb-6">
            <Compass size={13} />
            24.5854° N · 81.8103° E — STATUS: AVAILABLE FOR DEPLOYMENT
          </div>

          <h1 className="relative z-10 font-display text-[13vw] leading-[0.9] sm:text-6xl md:text-8xl text-neutral-50 tracking-tight">
            KRISHNA
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-sky-400">
              JOSHI
            </span>
          </h1>

          <p className="relative z-10 mt-6 max-w-xl text-neutral-400 text-base md:text-lg leading-relaxed">
            Software Engineer charting full-stack systems across{" "}
            <span className="text-neutral-200">cloud, data, and applied AI</span> — from distributed
            maritime platforms serving 100,000+ vessels to RAG-based document intelligence.
          </p>

          <div className="relative z-10 mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("work")}
              className="group inline-flex items-center gap-2 bg-amber-400 text-black font-mono text-xs tracking-wider px-5 py-3 rounded-sm hover:bg-amber-300 transition-colors"
            >
              VIEW VOYAGE LOG
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 border border-sky-400/30 text-neutral-300 font-mono text-xs tracking-wider px-5 py-3 rounded-sm hover:border-sky-400/60 hover:text-sky-200 transition-colors"
            >
              ESTABLISH CONTACT
            </button>
          </div>

          <div className="relative z-10 mt-16 grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-lg border-t border-amber-400/10 pt-8">
            <Stat value="4" label="Shipped projects" />
            <Stat value="8.00" label="B.Tech CGPA" />
            <Stat value="Pan-India" label="Open to relocate" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 md:px-8 py-24 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="01">Ship's Log — About</SectionLabel>
          <div className="grid md:grid-cols-5 gap-10 mb-14">
            <div className="md:col-span-3 space-y-5 text-neutral-400 leading-relaxed text-[15px]">
              <p>
                I'm a software engineer working across{" "}
                <span className="text-neutral-100">Python, SQL, React.js, Node.js, and Azure</span>,
                building REST APIs and cloud-based platforms that hold up under real load. My hands-on
                work spans AI/ML, Generative AI, and Azure AI services, alongside core data engineering
                for scalable web systems.
              </p>
              <p>
                I began at <span className="text-amber-300">IME (Integrated Maritime Exchange)</span>,
                building the C-Hub maritime platform and academic portal, and since{" "}
                <span className="text-sky-300">November 2025</span> I've been at{" "}
                <span className="text-sky-300">LTM</span>, working on cloud data pipelines and applied
                GenAI systems.
              </p>
              <p className="text-amber-300/90 font-mono text-xs tracking-wide pt-2">
                CURRENT STATUS: AVAILABLE FOR PROJECT DEPLOYMENT · OPEN TO RELOCATION (PAN-INDIA)
              </p>
            </div>
            <div className="md:col-span-2 space-y-3">
              <InfoRow icon={Anchor} label="Focus" value="Full-stack, cloud & applied AI" />
              <InfoRow icon={Database} label="Data" value="Distributed MySQL + NoSQL systems" />
              <InfoRow icon={Cloud} label="Cloud" value="Azure Data Factory, SQL, Blob, AI" />
              <InfoRow icon={Waypoints} label="Deployment" value="Pan-India, immediate availability" />
            </div>
          </div>

          {/* Career timeline */}
          <div className="border-t border-amber-400/10 pt-10">
            <div className="font-mono text-[11px] tracking-[0.25em] text-neutral-500 mb-6">CAREER COURSE</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CAREER.map((c) => (
                <div
                  key={c.company}
                  className={`relative border rounded-lg p-5 ${
                    c.color === "gold"
                      ? "border-amber-400/25 bg-amber-400/[0.03]"
                      : "border-sky-400/25 bg-sky-400/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-display text-lg ${c.color === "gold" ? "text-amber-300" : "text-sky-300"}`}>
                      {c.company}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-neutral-500">{c.span}</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-2">{c.full}</div>
                  <div className="text-sm text-neutral-400 leading-relaxed">{c.note}</div>
                  {c.span.includes("PRESENT") && (
                    <span className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-5 md:px-8 py-24 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="02">Systems Panel — Skills</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((s) => (
              <div
                key={s.area}
                className="group border border-amber-400/15 rounded-lg p-5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-amber-400/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <s.icon size={16} className="text-amber-300" />
                    <span className="font-display text-sm text-neutral-100">{s.area}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500">{s.level}%</span>
                </div>
                <div className="h-1 bg-neutral-800 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-sky-400 rounded-full"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span key={it} className="font-mono text-[10.5px] text-neutral-400 bg-white/[0.03] rounded px-1.5 py-1">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK / VOYAGE LOG */}
      <section id="work" className="px-5 md:px-8 py-24 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="03">Voyage Log — Work</SectionLabel>

          <div className="relative pl-8 md:pl-10">
            <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/50 via-rose-500/20 to-transparent" />
            <div className="space-y-14">
              {PROJECTS.map((p) => (
                <div key={p.name} className="relative">
                  <span className="absolute -left-8 md:-left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  </span>

                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-amber-400/80">{p.coords}</span>
                    <EmployerBadge employer={p.employer} />
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-display text-xl md:text-2xl text-neutral-50">{p.name}</h3>
                    <span className="font-mono text-[11px] text-neutral-500">TEAM · {p.team}</span>
                  </div>
                  <div className="text-sm text-sky-300/70 font-mono mb-4">{p.sub}</div>

                  <p className="text-neutral-400 text-[15px] leading-relaxed mb-4 max-w-2xl">{p.desc}</p>

                  <ul className="space-y-2 mb-5">
                    {p.role.map((r, ri) => (
                      <li key={ri} className="flex gap-2.5 text-sm text-neutral-400 leading-relaxed">
                        <ArrowUpRight size={14} className="text-rose-400/80 mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" className="px-5 md:px-8 py-24 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="04">Credentials — Certifications</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((c) => (
              <div key={c.title} className="flex items-start gap-4 border border-amber-400/15 rounded-lg p-5 bg-white/[0.015]">
                <div className="w-9 h-9 shrink-0 rounded-full border border-amber-400/40 flex items-center justify-center">
                  <Radio size={14} className="text-amber-300" />
                </div>
                <div>
                  <div className="font-display text-[15px] text-neutral-100 mb-1">{c.title}</div>
                  <div className="text-sm text-neutral-500 mb-2">{c.note}</div>
                  <span
                    className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded ${
                      c.status === "Completed"
                        ? "text-sky-300 bg-sky-400/10"
                        : c.status === "Ongoing"
                        ? "text-amber-300 bg-amber-400/10"
                        : "text-rose-300 bg-rose-500/10"
                    }`}
                  >
                    {c.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="px-5 md:px-8 py-24 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="05">Charted Course — Education</SectionLabel>
          <div className="space-y-3">
            {EDUCATION.map((e) => (
              <div
                key={e.level}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border border-amber-400/15 rounded-lg px-5 py-4 bg-white/[0.015]"
              >
                <div className="font-mono text-[11px] text-amber-400/80 tracking-wide sm:w-40 shrink-0">{e.span}</div>
                <div className="flex-1">
                  <div className="font-display text-[15px] text-neutral-100">{e.level}</div>
                  <div className="text-sm text-neutral-500">{e.place}</div>
                </div>
                <div className="font-mono text-sm text-sky-300 sm:text-right">{e.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 md:px-8 py-28 border-t border-amber-400/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionLabel index="06">Signal — Contact</SectionLabel>
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <h3 className="font-display text-3xl md:text-5xl text-neutral-50 leading-tight mb-6">
                Open to new
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-sky-400">
                  deployments.
                </span>
              </h3>
              <p className="text-neutral-400 max-w-md leading-relaxed">
                Available for full-stack, cloud, and applied-AI roles across India. Send a signal —
                I read every transmission.
              </p>
            </div>
            <div className="space-y-3">
              <ContactRow  icon={Mail} label="Email" value="krishnajoshi177.in@gmail.com" href="https://mail.google.com/mail/?view=cm&fs=1&to=krishnajoshi177.in@gmail.com"/>
              <ContactRow icon={Linkedin} label="LinkedIn" value="linkedin.com/in/krishna-joshi-jk177/" href="https://linkedin.com/in/krishna-joshi-jk177/"/>
              <ContactRow icon={Github} label="GitHub" value="github.com/krishna-joshi177" href="https://github.com/krishna-joshi177"/>
              <ContactRow icon={MapPin} label="Base" value="Pan-India · Open to relocation" />
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 md:px-8 py-8 border-t border-amber-400/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-neutral-600">
          <span>© {new Date().getFullYear()} KRISHNA JOSHI · SOFTWARE ENGINEER</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ---------------------------------------------------------
   VISUAL SUB-COMPONENTS
--------------------------------------------------------- */

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl md:text-3xl text-neutral-50">{value}</div>
      <div className="font-mono text-[10px] tracking-wider text-neutral-500 mt-1">{label.toUpperCase()}</div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border border-amber-400/15 rounded-md px-4 py-3 bg-white/[0.015]">
      <Icon size={15} className="text-amber-300 shrink-0" />
      <div>
        <div className="font-mono text-[10px] tracking-wider text-neutral-500">{label.toUpperCase()}</div>
        <div className="text-sm text-neutral-200">{value}</div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const row = (
    <div className="flex items-center gap-4 border border-amber-400/15 rounded-md px-5 py-3.5 bg-white/[0.015] hover:border-amber-400/40 transition-colors group">
      <Icon size={16} className="text-amber-300 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-wider text-neutral-500">{label.toUpperCase()}</div>
        <div className="text-sm text-neutral-200 truncate">{value}</div>
      </div>
      <ExternalLink size={13} className="text-neutral-600 group-hover:text-amber-300 transition-colors shrink-0" />
    </div>
  );

  if (!href) return row;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {row}
    </a>
  );
}

function RadarHero() {
  return (
    <div className="pointer-events-none absolute -top-16 right-0 w-[280px] h-[280px] md:w-[420px] md:h-[420px] opacity-40 md:opacity-60">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="radarFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0b429" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0b429" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[90, 65, 40, 15].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#f0b429" strokeOpacity="0.15" />
        ))}
        <line x1="10" y1="100" x2="190" y2="100" stroke="#f0b429" strokeOpacity="0.1" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="#f0b429" strokeOpacity="0.1" />
        <g className="radar-sweep" style={{ transformOrigin: "100px 100px" }}>
          <path d="M100 100 L100 10 A90 90 0 0 1 163.6 36.4 Z" fill="url(#radarFade)" />
        </g>
        {[[62, 45], [140, 120], [70, 150], [155, 70]].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.5"
            fill={i % 2 === 0 ? "#fb7185" : "#38bdf8"}
            className="blip"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function GridBackdrop() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(240,180,41,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />
  );
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      body, .min-h-screen { font-family: 'Inter', sans-serif; }

      @keyframes ping-slow {
        0% { transform: scale(1); opacity: 0.6; }
        75%, 100% { transform: scale(1.6); opacity: 0; }
      }
      .animate-ping-slow { animation: ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite; }

      .radar-sweep {
        animation: sweep 4s linear infinite;
      }
      @keyframes sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .blip {
        animation: blip 2.4s ease-in-out infinite;
      }
      @keyframes blip {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .radar-sweep, .animate-ping-slow, .blip { animation: none !important; }
      }
    `}</style>
  );
}