import React, { useState, useMemo, useRef } from "react";
import {
  Users, UserPlus, PlusCircle, Inbox, UsersRound, CalendarDays,
  Megaphone, Trophy, Settings as SettingsIcon, Search, Check, X,
  MapPin, Clock, ChevronRight, Shield, Star, Crown, Bell,
  ImagePlus, Globe, Lock, Trash2, Mail, MoreHorizontal, TrendingUp,
  Sparkles, Hexagon
} from "lucide-react";

/* ---------------------------------------------------------------
   DESIGN TOKENS
   Subject: a community ops dashboard rendered with real depth —
   glass panels floating over a soft gradient-mesh void, layered
   elevation shadows, and cards that tilt toward the cursor like
   physical tiles. Signature motif: the "node cluster" (overlapping
   member circles) now rendered with an embossed rim for a tactile,
   raised feel; achievement badges are beveled hexagon "tiles".
----------------------------------------------------------------*/
const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

    .cm-root {
      --bg: #06080D;
      --surface: rgba(24, 31, 43, 0.72);
      --surface-solid: #141B26;
      --surface-2: rgba(37, 47, 64, 0.85);
      --surface-hover: rgba(48, 60, 80, 0.9);
      --border: rgba(140, 158, 189, 0.16);
      --border-soft: rgba(140, 158, 189, 0.1);
      --border-strong: rgba(160, 178, 209, 0.28);
      --text: #EEF2F8;
      --text-dim: #94A5BC;
      --text-faint: #5C6C82;
      --accent: #8B7CFF;
      --accent-2nd: #6C5CE7;
      --accent-soft: #8B7CFF26;
      --accent-2: #2FD9C7;
      --accent-2-soft: #2FD9C726;
      --warn: #FFB454;
      --warn-soft: #FFB45426;
      --danger: #FF6B7A;
      --danger-soft: #FF6B7A26;
      --success: #3FD983;
      --success-soft: #3FD98326;
      --grad-accent: linear-gradient(135deg, #9C8CFF 0%, #6C5CE7 60%, #4A3FCF 100%);
      --grad-teal: linear-gradient(135deg, #4FEEDB 0%, #2FD9C7 60%, #1CA394 100%);
      --shadow-raised: 0 1px 0 rgba(255,255,255,0.05) inset, 0 1px 2px rgba(0,0,0,0.5), 0 12px 28px -10px rgba(0,0,0,0.65);
      --shadow-floating: 0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.85), 0 4px 16px -6px rgba(0,0,0,0.6);
      --shadow-pressed: inset 0 2px 6px rgba(0,0,0,0.5);
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .cm-display { font-family: 'Space Grotesk', sans-serif; }
    .cm-mono { font-family: 'JetBrains Mono', monospace; }
    .cm-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .cm-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 8px; }
    .cm-scroll::-webkit-scrollbar-track { background: transparent; }

    /* Gradient-mesh void behind everything, with floating blurred orbs for depth cueing */
    .cm-mesh { position: fixed; inset: 0; z-index: 0; overflow: hidden; background: var(--bg); }
    .cm-orb { position: absolute; border-radius: 999px; filter: blur(90px); opacity: 0.5; }
    .cm-orb-1 { width: 620px; height: 620px; top: -180px; left: -120px; background: radial-gradient(circle, #6C5CE7 0%, transparent 70%); animation: cmFloat1 22s ease-in-out infinite; }
    .cm-orb-2 { width: 520px; height: 520px; bottom: -160px; right: -100px; background: radial-gradient(circle, #1CA394 0%, transparent 70%); animation: cmFloat2 26s ease-in-out infinite; }
    .cm-orb-3 { width: 420px; height: 420px; top: 40%; left: 55%; background: radial-gradient(circle, #FFB454 0%, transparent 72%); opacity: 0.16; animation: cmFloat1 30s ease-in-out infinite reverse; }
    @keyframes cmFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.08); } }
    @keyframes cmFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,-40px) scale(1.05); } }
    @media (prefers-reduced-motion: reduce) { .cm-orb-1, .cm-orb-2, .cm-orb-3 { animation: none; } }

    .cm-glass { background: var(--surface); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--border); box-shadow: var(--shadow-raised); }
    .cm-panel { background: var(--surface-solid); border: 1px solid var(--border); box-shadow: var(--shadow-floating); }

    .cm-node-cluster { position: relative; width: 40px; height: 32px; flex-shrink: 0; }
    .cm-node-cluster span {
      position: absolute; top: 0; width: 22px; height: 22px; border-radius: 999px;
      display: flex; align-items: center; justify-content: center;
      font-size: 9px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;
      border: 2px solid rgba(20,27,38,0.9); color: #0B0F14;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35);
    }
    .cm-fade-in { animation: cmFadeIn .4s ease both; }
    @keyframes cmFadeIn { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: translateY(0);} }

    .cm-tilt-wrap { perspective: 1200px; }
    .cm-tilt { transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease; will-change: transform; transform-style: preserve-3d; }
    .cm-tilt:hover { box-shadow: var(--shadow-floating); }

    .cm-press:active { transform: translateY(1px) scale(0.99); box-shadow: var(--shadow-pressed) !important; }

    .cm-hex-tile { filter: drop-shadow(0 6px 14px rgba(0,0,0,0.55)); }
  `}</style>
);

/* Ambient depth backdrop: fixed gradient-mesh void with slow-drifting blurred orbs.
   Rendered once behind the glass panels so every surface reads as floating above it. */
const AmbientMesh = () => (
  <div className="cm-mesh" aria-hidden="true">
    <div className="cm-orb cm-orb-1" />
    <div className="cm-orb cm-orb-2" />
    <div className="cm-orb cm-orb-3" />
  </div>
);

/* Cursor-reactive tilt wrapper — gives cards genuine perspective rotation
   toward the pointer plus a soft glare, so they read as physical tiles. */
function TiltCard({ children, className = "", style = {}, radius = "1rem", ...props }) {
  const ref = useRef(null);
  const [xform, setXform] = useState("rotateX(0deg) rotateY(0deg) translateZ(0px)");
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 10;
    const ry = (px - 0.5) * 10;
    setXform(`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`);
    setGlare({ x: px * 100, y: py * 100, o: 0.12 });
  };
  const onLeave = () => {
    setXform("rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setGlare(g => ({ ...g, o: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`cm-tilt relative ${className}`}
      style={{ transform: xform, borderRadius: radius, ...style }}
      {...props}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.o}), transparent 55%)`,
          transition: "opacity .25s ease",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------
   MOCK DATA
----------------------------------------------------------------*/
const AVATAR_COLORS = ["#8B7CFF", "#2FD9C7", "#FFB454", "#FF6B7A", "#5CC8FF", "#C792FF"];

const initialsOf = (name) => name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

const NodeCluster = ({ names = [] }) => (
  <div className="cm-node-cluster">
    {names.slice(0, 3).map((n, i) => (
      <span key={i} style={{ left: i * 11, zIndex: 10 - i, background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
        {initialsOf(n)}
      </span>
    ))}
  </div>
);

const seedCommunities = [
  { id: "c1", name: "Frontend Guild", category: "Engineering", visibility: "Public", members: 482, desc: "Weekly deep dives on React, CSS, and performance.", lead: "Aditi Rao", tags: ["React", "CSS", "Perf"], seedMembers: ["Aditi Rao", "Ben Kim", "Carla Diaz"] },
  { id: "c2", name: "Design Systems Circle", category: "Design", visibility: "Public", members: 217, desc: "Building and maintaining shared design language.", lead: "Priya Nair", tags: ["Figma", "Tokens"], seedMembers: ["Priya Nair", "Omar Faye", "Lin Wei"] },
  { id: "c3", name: "ML Practitioners", category: "Data & AI", visibility: "Private", members: 356, desc: "Applied ML, paper reading, and model reviews.", lead: "Dev Patel", tags: ["ML", "Papers"], seedMembers: ["Dev Patel", "Sara Cho", "Noah Ade"] },
  { id: "c4", name: "Open Source Collective", category: "Engineering", visibility: "Public", members: 894, desc: "Coordinating contributions across OSS projects.", lead: "Maya Singh", tags: ["OSS", "Git"], seedMembers: ["Maya Singh", "Leo Marsh", "Ito Yuki"] },
  { id: "c5", name: "Product Thinkers", category: "Product", visibility: "Public", members: 163, desc: "Roadmaps, discovery, and shipping stories.", lead: "Ravi Shah", tags: ["Strategy"], seedMembers: ["Ravi Shah", "Zoe Klein", "Amir Hadi"] },
  { id: "c6", name: "Cloud & Infra", category: "Engineering", visibility: "Private", members: 278, desc: "Kubernetes, cost tuning, and reliability war stories.", lead: "Elena Cruz", tags: ["K8s", "SRE"], seedMembers: ["Elena Cruz", "Sam Okoye", "Tara Bell"] },
];

const seedJoinRequests = [
  { id: "r1", name: "Kavya Menon", community: "Frontend Guild", role: "UI Engineer", requestedAt: "2h ago", note: "Been using your component lib, would love to contribute." },
  { id: "r2", name: "Jonas Weber", community: "ML Practitioners", role: "Data Scientist", requestedAt: "5h ago", note: "Working on a recommender system, keen to learn from the group." },
  { id: "r3", name: "Fatima Al-Sayed", community: "Cloud & Infra", role: "DevOps Engineer", requestedAt: "1d ago", note: "" },
  { id: "r4", name: "Theo Larsen", community: "Design Systems Circle", role: "Product Designer", requestedAt: "1d ago", note: "Currently building a token pipeline, would love feedback." },
];

const seedMembers = [
  { id: "m1", name: "Aditi Rao", community: "Frontend Guild", role: "Owner", joined: "Jan 2025", status: "Active" },
  { id: "m2", name: "Ben Kim", community: "Frontend Guild", role: "Moderator", joined: "Feb 2025", status: "Active" },
  { id: "m3", name: "Carla Diaz", community: "Frontend Guild", role: "Member", joined: "Mar 2025", status: "Active" },
  { id: "m4", name: "Priya Nair", community: "Design Systems Circle", role: "Owner", joined: "Nov 2024", status: "Active" },
  { id: "m5", name: "Omar Faye", community: "Design Systems Circle", role: "Member", joined: "Dec 2024", status: "Inactive" },
  { id: "m6", name: "Dev Patel", community: "ML Practitioners", role: "Owner", joined: "Sep 2024", status: "Active" },
  { id: "m7", name: "Sara Cho", community: "ML Practitioners", role: "Moderator", joined: "Oct 2024", status: "Active" },
];

const seedEvents = [
  { id: "e1", title: "React Performance Clinic", community: "Frontend Guild", date: "Aug 4, 2026", time: "6:00 PM", mode: "Online", rsvp: 76, status: "upcoming" },
  { id: "e2", title: "Design Tokens Workshop", community: "Design Systems Circle", date: "Aug 8, 2026", time: "4:30 PM", mode: "Hybrid", rsvp: 41, status: "upcoming" },
  { id: "e3", title: "Paper Reading: Diffusion Models", community: "ML Practitioners", date: "Jul 22, 2026", time: "7:00 PM", mode: "Online", rsvp: 58, status: "past" },
  { id: "e4", title: "OSS Contribution Sprint", community: "Open Source Collective", date: "Jul 12, 2026", time: "10:00 AM", mode: "In-person", rsvp: 120, status: "past" },
];

const seedAnnouncements = [
  { id: "a1", community: "Frontend Guild", author: "Aditi Rao", title: "New channel for accessibility reviews", body: "We're spinning up a dedicated space to review components for a11y before release. Drop your components for review starting this week.", time: "3h ago", pinned: true },
  { id: "a2", community: "Design Systems Circle", author: "Priya Nair", title: "Token v3 migration guide is live", body: "The migration guide for the new token structure is published. Please migrate your files before the 15th.", time: "1d ago", pinned: false },
  { id: "a3", community: "ML Practitioners", author: "Dev Patel", title: "Compute credits available", body: "We have spare GPU credits this month — reach out if your project needs a boost.", time: "2d ago", pinned: false },
];

const seedAchievements = [
  { id: "b1", label: "First Contribution", icon: Star, tier: "bronze", earnedBy: 312, desc: "Made your first contribution to a community project." },
  { id: "b2", label: "Event Host", icon: CalendarDays, tier: "silver", earnedBy: 89, desc: "Hosted a community event with 20+ attendees." },
  { id: "b3", label: "Mentor", icon: UsersRound, tier: "gold", earnedBy: 34, desc: "Mentored 5 or more community members." },
  { id: "b4", label: "Streak Keeper", icon: Trophy, tier: "silver", earnedBy: 152, desc: "Active in the community for 12 consecutive weeks." },
  { id: "b5", label: "Top Contributor", icon: Crown, tier: "gold", earnedBy: 21, desc: "Ranked in the top 1% of contributions this quarter." },
  { id: "b6", label: "Community Builder", icon: Sparkles, tier: "gold", earnedBy: 12, desc: "Founded a community that reached 100+ members." },
];

const TIER_COLORS = {
  bronze: { fg: "#3A241A", grad: "linear-gradient(145deg, #E3A374, #B96B3C)", glow: "rgba(217,139,95,0.45)" },
  silver: { fg: "#232A34", grad: "linear-gradient(145deg, #E6ECF5, #9FADC2)", glow: "rgba(185,196,212,0.4)" },
  gold: { fg: "#3A2E0E", grad: "linear-gradient(145deg, #FBE29C, #E8B54A)", glow: "rgba(242,196,100,0.5)" },
};

/* ---------------------------------------------------------------
   SHARED UI ATOMS
----------------------------------------------------------------*/
const Badge = ({ children, tone = "default" }) => {
  const tones = {
    default: { color: "var(--text-dim)", background: "var(--surface-2)", border: "var(--border)" },
    accent: { color: "var(--accent)", background: "var(--accent-soft)", border: "transparent" },
    teal: { color: "var(--accent-2)", background: "var(--accent-2-soft)", border: "transparent" },
    warn: { color: "var(--warn)", background: "var(--warn-soft)", border: "transparent" },
    success: { color: "var(--success)", background: "var(--success-soft)", border: "transparent" },
    danger: { color: "var(--danger)", background: "var(--danger-soft)", border: "transparent" },
  };
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
      style={{ color: t.color, background: t.background, borderColor: t.border }}
    >
      {children}
    </span>
  );
};

const Btn = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "cm-press inline-flex items-center justify-center gap-1.5 rounded-xl text-sm font-semibold px-3.5 py-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "text-[#0B0F14]",
    secondary: "border",
    ghost: "",
    danger: "border",
  };
  const styleMap = {
    primary: { background: "var(--grad-accent)", boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset, 0 6px 16px -6px rgba(108,92,231,0.65)" },
    secondary: { background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)", boxShadow: "var(--shadow-raised)" },
    ghost: { color: "var(--text-dim)" },
    danger: { background: "var(--danger-soft)", borderColor: "var(--danger)", color: "var(--danger)", boxShadow: "var(--shadow-raised)" },
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} style={styleMap[variant]} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "", style = {}, ...props }) => (
  <div
    className={`cm-glass rounded-2xl ${className}`}
    style={style}
    {...props}
  >
    {children}
  </div>
);

const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
    <div>
      {eyebrow && (
        <div className="cm-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "var(--accent-2)" }}>
          {eyebrow}
        </div>
      )}
      <h1 className="cm-display text-2xl font-semibold" style={{ color: "var(--text)" }}>{title}</h1>
      {description && <p className="text-sm mt-1 max-w-xl" style={{ color: "var(--text-dim)" }}>{description}</p>}
    </div>
    {action}
  </div>
);

const EmptyState = ({ icon: Icon, title, body }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6">
    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--surface-2)" }}>
      <Icon size={20} style={{ color: "var(--text-faint)" }} />
    </div>
    <div className="font-semibold" style={{ color: "var(--text)" }}>{title}</div>
    <div className="text-sm mt-1 max-w-xs" style={{ color: "var(--text-dim)" }}>{body}</div>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-lg px-3 py-2 text-sm outline-none border transition-colors ${props.className || ""}`}
    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={`w-full rounded-lg px-3 py-2 text-sm outline-none border resize-none transition-colors ${props.className || ""}`}
    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
  />
);

const StatPill = ({ label, value, icon: Icon }) => (
  <Card className="px-4 py-3 flex items-center gap-3 min-w-[140px]">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-accent)", boxShadow: "0 1px 0 rgba(255,255,255,0.3) inset, 0 4px 10px -3px rgba(108,92,231,0.6)" }}>
      <Icon size={16} color="#0B0F14" />
    </div>
    <div>
      <div className="cm-mono text-lg font-semibold leading-none" style={{ color: "var(--text)" }}>{value}</div>
      <div className="text-[11px] mt-1" style={{ color: "var(--text-dim)" }}>{label}</div>
    </div>
  </Card>
);

/* ---------------------------------------------------------------
   MODULE: ALL COMMUNITIES
----------------------------------------------------------------*/
function AllCommunities({ communities, myIds, onToggleJoin, onOpenCreate }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(communities.map(c => c.category)))];

  const filtered = useMemo(() => {
    return communities.filter(c => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter = filter === "All" || c.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [communities, query, filter]);

  return (
    <div className="cm-fade-in">
      <SectionHeader
        eyebrow="Directory"
        title="All Communities"
        description="Discover every community across the org and request to join."
        action={<Btn onClick={onOpenCreate}><PlusCircle size={16} />New Community</Btn>}
      />

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-faint)" }} />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search communities or tags…" className="pl-9" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
              style={filter === cat
                ? { background: "var(--accent-soft)", color: "var(--accent)", borderColor: "transparent" }
                : { background: "transparent", color: "var(--text-dim)", borderColor: "var(--border)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState icon={Search} title="No communities found" body="Try a different search term or category." /></Card>
      ) : (
        <div className="cm-tilt-wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => {
            const joined = myIds.includes(c.id);
            return (
              <TiltCard key={c.id} className="cm-glass p-4 flex flex-col gap-3" radius="1rem">
                <div className="flex items-start justify-between">
                  <NodeCluster names={c.seedMembers} />
                  <Badge tone={c.visibility === "Public" ? "teal" : "default"}>
                    {c.visibility === "Public" ? <Globe size={11} /> : <Lock size={11} />}
                    {c.visibility}
                  </Badge>
                </div>
                <div>
                  <div className="cm-display font-semibold text-[15px]" style={{ color: "var(--text)" }}>{c.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{c.category} · Led by {c.lead}</div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>{c.desc}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {c.tags.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
                <div className="flex items-center justify-between pt-2 mt-auto border-t" style={{ borderColor: "var(--border-soft)" }}>
                  <div className="flex items-center gap-1.5 text-xs cm-mono" style={{ color: "var(--text-dim)" }}>
                    <Users size={13} /> {c.members.toLocaleString()} members
                  </div>
                  <Btn
                    variant={joined ? "secondary" : "primary"}
                    onClick={() => onToggleJoin(c.id)}
                    className="!px-3 !py-1.5 !text-xs"
                  >
                    {joined ? <><Check size={13} /> Joined</> : <><UserPlus size={13} /> Join</>}
                  </Btn>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: MY COMMUNITIES
----------------------------------------------------------------*/
function MyCommunities({ communities, myIds, onOpenCreate }) {
  const mine = communities.filter(c => myIds.includes(c.id));
  return (
    <div className="cm-fade-in">
      <SectionHeader
        eyebrow="Your space"
        title="My Communities"
        description="Communities you belong to, at a glance."
        action={<Btn onClick={onOpenCreate}><PlusCircle size={16} />New Community</Btn>}
      />
      {mine.length === 0 ? (
        <Card><EmptyState icon={UsersRound} title="You haven't joined any community yet" body="Browse All Communities and request to join one that fits your interests." /></Card>
      ) : (
        <div className="cm-tilt-wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mine.map(c => (
            <TiltCard key={c.id} className="cm-glass p-4 flex flex-col gap-3" radius="1rem">
              <div className="flex items-center justify-between">
                <NodeCluster names={c.seedMembers} />
                <Badge tone="accent"><Shield size={11} />Member</Badge>
              </div>
              <div>
                <div className="cm-display font-semibold text-[15px]" style={{ color: "var(--text)" }}>{c.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{c.category}</div>
              </div>
              <div className="flex items-center gap-1.5 text-xs cm-mono" style={{ color: "var(--text-dim)" }}>
                <Users size={13} /> {c.members.toLocaleString()} members
              </div>
              <Btn variant="secondary" className="!text-xs !py-1.5 w-full justify-center">
                Open community <ChevronRight size={13} />
              </Btn>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: CREATE COMMUNITY
----------------------------------------------------------------*/
function CreateCommunity({ onCreate, defaultOpenToast }) {
  const [form, setForm] = useState({ name: "", category: "Engineering", visibility: "Public", desc: "", tags: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate({
      id: `c${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      visibility: form.visibility,
      desc: form.desc || "A brand-new community — details coming soon.",
      members: 1,
      lead: "You",
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean).slice(0, 4),
      seedMembers: ["You"],
    });
    setSubmitted(true);
    setForm({ name: "", category: "Engineering", visibility: "Public", desc: "", tags: "" });
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="cm-fade-in max-w-2xl">
      <SectionHeader eyebrow="Start something" title="Create Community" description="Set up a new space for people to organize around a shared interest." />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-dashed flex-shrink-0" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>
              <ImagePlus size={20} />
            </div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>
              Add a cover image later from Settings. For now, give your community a name and purpose.
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Community name</label>
            <Input value={form.name} onChange={set("name")} placeholder="e.g. Platform Engineering Guild" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Category</label>
              <select value={form.category} onChange={set("category")} className="w-full rounded-lg px-3 py-2 text-sm outline-none border" style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}>
                {["Engineering", "Design", "Product", "Data & AI", "Marketing", "Operations"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Visibility</label>
              <div className="flex gap-2">
                {["Public", "Private"].map(v => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setForm(f => ({ ...f, visibility: v }))}
                    className="flex-1 rounded-lg px-3 py-2 text-sm font-medium border flex items-center justify-center gap-1.5"
                    style={form.visibility === v
                      ? { background: "var(--accent-soft)", color: "var(--accent)", borderColor: "var(--accent)" }
                      : { background: "var(--surface-2)", color: "var(--text-dim)", borderColor: "var(--border)" }}
                  >
                    {v === "Public" ? <Globe size={13} /> : <Lock size={13} />} {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Description</label>
            <Textarea value={form.desc} onChange={set("desc")} rows={3} placeholder="What is this community about, and who should join?" />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Tags (comma separated)</label>
            <Input value={form.tags} onChange={set("tags")} placeholder="React, Design Systems, Onboarding" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Btn type="submit"><PlusCircle size={16} />Create Community</Btn>
            {submitted && <span className="text-sm flex items-center gap-1.5" style={{ color: "var(--success)" }}><Check size={15} /> Community created</span>}
          </div>
        </form>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: JOIN REQUESTS
----------------------------------------------------------------*/
function JoinRequests({ requests, onDecide }) {
  return (
    <div className="cm-fade-in">
      <SectionHeader
        eyebrow="Pending"
        title="Join Requests"
        description="Approve or decline people asking to join your communities."
        action={requests.length > 0 && <Badge tone="warn">{requests.length} pending</Badge>}
      />
      {requests.length === 0 ? (
        <Card><EmptyState icon={Inbox} title="You're all caught up" body="New join requests will show up here for review." /></Card>
      ) : (
        <div className="space-y-3">
          {requests.map(r => (
            <Card key={r.id} className="p-4 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  {initialsOf(r.name)}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{r.name}
                    <span className="font-normal ml-2 text-xs" style={{ color: "var(--text-faint)" }}>{r.role}</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                    wants to join <span style={{ color: "var(--accent-2)" }}>{r.community}</span> · {r.requestedAt}
                  </div>
                  {r.note && <p className="text-sm mt-2 max-w-lg" style={{ color: "var(--text-dim)" }}>"{r.note}"</p>}
                </div>
              </div>
              <div className="flex gap-2 ml-auto">
                <Btn variant="secondary" onClick={() => onDecide(r.id, "declined")} className="!px-3"><X size={14} />Decline</Btn>
                <Btn onClick={() => onDecide(r.id, "approved")} className="!px-3"><Check size={14} />Approve</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: MEMBERS
----------------------------------------------------------------*/
function Members({ members }) {
  const [query, setQuery] = useState("");
  const [communityFilter, setCommunityFilter] = useState("All");
  const communities = ["All", ...Array.from(new Set(members.map(m => m.community)))];

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) &&
    (communityFilter === "All" || m.community === communityFilter)
  );

  const roleIcon = { Owner: Crown, Moderator: Shield, Member: Users };
  const roleTone = { Owner: "warn", Moderator: "accent", Member: "default" };

  return (
    <div className="cm-fade-in">
      <SectionHeader eyebrow="Directory" title="Members" description="Everyone across your communities, roles, and status." />

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-faint)" }} />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search members…" className="pl-9" />
        </div>
        <select value={communityFilter} onChange={e => setCommunityFilter(e.target.value)} className="rounded-lg px-3 py-2 text-sm outline-none border" style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}>
          {communities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto cm-scroll">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: "var(--border-soft)" }}>
                {["Member", "Community", "Role", "Joined", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const RoleIcon = roleIcon[m.role];
                return (
                  <tr key={m.id} className="border-b last:border-0 hover:bg-white/[0.02]" style={{ borderColor: "var(--border-soft)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--accent-2-soft)", color: "var(--accent-2)" }}>
                          {initialsOf(m.name)}
                        </div>
                        <span className="font-medium" style={{ color: "var(--text)" }}>{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--text-dim)" }}>{m.community}</td>
                    <td className="px-4 py-3"><Badge tone={roleTone[m.role]}><RoleIcon size={11} />{m.role}</Badge></td>
                    <td className="px-4 py-3 cm-mono text-xs" style={{ color: "var(--text-dim)" }}>{m.joined}</td>
                    <td className="px-4 py-3">
                      <Badge tone={m.status === "Active" ? "success" : "default"}>{m.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 rounded-md hover:bg-white/5" style={{ color: "var(--text-faint)" }}>
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6}><EmptyState icon={Users} title="No members found" body="Adjust your search or filter." /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: EVENTS
----------------------------------------------------------------*/
function Events({ events, onRsvp }) {
  const [tab, setTab] = useState("upcoming");
  const filtered = events.filter(e => e.status === tab);

  return (
    <div className="cm-fade-in">
      <SectionHeader
        eyebrow="Calendar"
        title="Events"
        description="Meetups, workshops, and sessions across your communities."
        action={<Btn><PlusCircle size={16} />New Event</Btn>}
      />
      <div className="flex gap-1.5 mb-5">
        {["upcoming", "past"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold border capitalize"
            style={tab === t
              ? { background: "var(--accent-soft)", color: "var(--accent)", borderColor: "transparent" }
              : { background: "transparent", color: "var(--text-dim)", borderColor: "var(--border)" }}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState icon={CalendarDays} title={`No ${tab} events`} body="Check back later or create a new event for your community." /></Card>
      ) : (
        <div className="cm-tilt-wrap grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(e => (
            <TiltCard key={e.id} className="cm-glass p-4 flex gap-4" radius="1rem">
              <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: "var(--grad-teal)", boxShadow: "0 1px 0 rgba(255,255,255,0.3) inset, 0 6px 14px -4px rgba(47,217,199,0.5)" }}>
                <div className="cm-mono text-[10px] uppercase" style={{ color: "#06201C" }}>{e.date.split(" ")[0]}</div>
                <div className="cm-display text-lg font-bold leading-none" style={{ color: "#06201C" }}>{e.date.split(" ")[1]?.replace(",", "")}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{e.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--accent-2)" }}>{e.community}</div>
                <div className="flex items-center gap-3 text-xs mt-2" style={{ color: "var(--text-dim)" }}>
                  <span className="flex items-center gap-1"><Clock size={12} />{e.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{e.mode}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs cm-mono" style={{ color: "var(--text-faint)" }}>{e.rsvp} going</span>
                  {tab === "upcoming" && (
                    <Btn variant="secondary" onClick={() => onRsvp(e.id)} className="!text-xs !py-1 !px-2.5">RSVP</Btn>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: ANNOUNCEMENTS
----------------------------------------------------------------*/
function Announcements({ announcements }) {
  const sorted = [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  return (
    <div className="cm-fade-in max-w-2xl">
      <SectionHeader
        eyebrow="Feed"
        title="Announcements"
        description="Updates shared across your communities."
        action={<Btn><Megaphone size={16} />New Announcement</Btn>}
      />
      <div className="space-y-3">
        {sorted.map(a => (
          <Card key={a.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  {initialsOf(a.author)}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{a.author}
                    <span className="font-normal ml-1.5 text-xs" style={{ color: "var(--text-faint)" }}>· {a.community}</span>
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--text-faint)" }}>{a.time}</div>
                </div>
              </div>
              {a.pinned && <Badge tone="warn"><Bell size={11} />Pinned</Badge>}
            </div>
            <div className="mt-3">
              <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{a.title}</div>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-dim)" }}>{a.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: ACHIEVEMENTS
----------------------------------------------------------------*/
function Achievements({ achievements }) {
  return (
    <div className="cm-fade-in">
      <SectionHeader eyebrow="Recognition" title="Achievements" description="Badges members earn for contribution and consistency." />
      <div className="cm-tilt-wrap grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {achievements.map(b => {
          const Icon = b.icon;
          const tc = TIER_COLORS[b.tier];
          return (
            <TiltCard key={b.id} className="cm-glass p-5 flex flex-col items-center text-center gap-2" radius="1.25rem">
              <div className="relative w-16 h-16 flex items-center justify-center mb-1 cm-hex-tile" style={{ transform: "translateZ(14px)" }}>
                <Hexagon size={62} strokeWidth={0} style={{ fill: `url(#cmHexGrad-${b.id})` }} />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id={`cmHexGrad-${b.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={tc.grad.match(/#[A-Fa-f0-9]{6}/g)[0]} />
                      <stop offset="100%" stopColor={tc.grad.match(/#[A-Fa-f0-9]{6}/g)[1]} />
                    </linearGradient>
                  </defs>
                </svg>
                <Hexagon size={62} strokeWidth={1} className="absolute" style={{ color: "rgba(255,255,255,0.25)" }} />
                <Icon size={22} className="absolute" style={{ color: tc.fg }} />
              </div>
              <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{b.label}</div>
              <Badge tone="default"><span style={{ textTransform: "capitalize" }}>{b.tier}</span></Badge>
              <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-dim)" }}>{b.desc}</p>
              <div className="text-[11px] cm-mono mt-1" style={{ color: "var(--text-faint)" }}>{b.earnedBy} members earned this</div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MODULE: SETTINGS
----------------------------------------------------------------*/
function SettingsPanel({ communities, myIds }) {
  const mine = communities.filter(c => myIds.includes(c.id));
  const [selectedId, setSelectedId] = useState(mine[0]?.id || null);
  const selected = mine.find(c => c.id === selectedId);
  const [notifs, setNotifs] = useState({ events: true, announcements: true, joinRequests: false });

  if (!selected) {
    return <Card><EmptyState icon={SettingsIcon} title="No community to configure" body="Join or create a community to manage its settings." /></Card>;
  }

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className="w-10 h-5.5 rounded-full relative transition-colors flex-shrink-0"
      style={{ background: checked ? "var(--accent)" : "var(--surface-2)", border: `1px solid ${checked ? "var(--accent)" : "var(--border)"}`, height: 22, width: 40 }}
    >
      <span className="absolute top-[2px] rounded-full bg-white transition-all" style={{ width: 16, height: 16, left: checked ? 20 : 2 }} />
    </button>
  );

  return (
    <div className="cm-fade-in">
      <SectionHeader eyebrow="Configure" title="Settings" description="Manage details, permissions, and notification preferences per community." />
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <Card className="p-2 h-fit">
          {mine.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium mb-1 last:mb-0 transition-colors"
              style={selectedId === c.id
                ? { background: "var(--accent-soft)", color: "var(--accent)" }
                : { color: "var(--text-dim)" }}
            >
              {c.name}
            </button>
          ))}
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <div className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>General</div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Community name</label>
                <Input defaultValue={selected.name} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-dim)" }}>Description</label>
                <Textarea defaultValue={selected.desc} rows={3} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text)" }}>Visibility</div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>Public communities are discoverable by anyone.</div>
                </div>
                <Badge tone={selected.visibility === "Public" ? "teal" : "default"}>
                  {selected.visibility === "Public" ? <Globe size={11} /> : <Lock size={11} />}{selected.visibility}
                </Badge>
              </div>
              <div className="pt-2">
                <Btn>Save changes</Btn>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>Notifications</div>
            <div className="space-y-3">
              {[
                { key: "events", label: "Event reminders", desc: "Get notified before upcoming events." },
                { key: "announcements", label: "New announcements", desc: "Alerts when leads post updates." },
                { key: "joinRequests", label: "Join request activity", desc: "Notify when someone requests to join." },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-1.5">
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>{item.desc}</div>
                  </div>
                  <Toggle checked={notifs[item.key]} onChange={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5" style={{ borderColor: "var(--danger-soft)" }}>
            <div className="font-semibold text-sm mb-1" style={{ color: "var(--danger)" }}>Danger zone</div>
            <div className="text-xs mb-4" style={{ color: "var(--text-faint)" }}>Deleting a community removes all its data permanently.</div>
            <Btn variant="danger"><Trash2 size={14} />Delete Community</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHELL / NAVIGATION
----------------------------------------------------------------*/
const NAV = [
  { key: "all", label: "All Communities", icon: Globe },
  { key: "mine", label: "My Communities", icon: UsersRound },
  { key: "create", label: "Create Community", icon: PlusCircle },
  { key: "requests", label: "Join Requests", icon: Inbox },
  { key: "members", label: "Members", icon: Users },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "announcements", label: "Announcements", icon: Megaphone },
  { key: "achievements", label: "Achievements", icon: Trophy },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function CommunityPortal() {
  const [active, setActive] = useState("all");
  const [communities, setCommunities] = useState(seedCommunities);
  const [myIds, setMyIds] = useState(["c1", "c2", "c3"]);
  const [requests, setRequests] = useState(seedJoinRequests);
  const [members] = useState(seedMembers);
  const [events, setEvents] = useState(seedEvents);
  const [announcements] = useState(seedAnnouncements);
  const [achievements] = useState(seedAchievements);
  const [toast, setToast] = useState(null);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const toggleJoin = (id) => {
    setMyIds(prev => {
      const isMember = prev.includes(id);
      flash(isMember ? "Left community" : "Join request sent");
      return isMember ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  const createCommunity = (c) => {
    setCommunities(prev => [c, ...prev]);
    setMyIds(prev => [...prev, c.id]);
    flash("Community created");
  };

  const decideRequest = (id, decision) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    flash(decision === "approved" ? "Request approved" : "Request declined");
  };

  const rsvpEvent = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, rsvp: e.rsvp + 1 } : e));
    flash("You're on the list");
  };

  const memberCount = useMemo(() => new Set(members.map(m => m.id)).size, [members]);

  const renderContent = () => {
    switch (active) {
      case "all": return <AllCommunities communities={communities} myIds={myIds} onToggleJoin={toggleJoin} onOpenCreate={() => setActive("create")} />;
      case "mine": return <MyCommunities communities={communities} myIds={myIds} onOpenCreate={() => setActive("create")} />;
      case "create": return <CreateCommunity onCreate={createCommunity} />;
      case "requests": return <JoinRequests requests={requests} onDecide={decideRequest} />;
      case "members": return <Members members={members} />;
      case "events": return <Events events={events} onRsvp={rsvpEvent} />;
      case "announcements": return <Announcements announcements={announcements} />;
      case "achievements": return <Achievements achievements={achievements} />;
      case "settings": return <SettingsPanel communities={communities} myIds={myIds} />;
      default: return null;
    }
  };

  return (
    <div className="cm-root min-h-screen relative" style={{ minHeight: "100vh" }}>
      <Tokens />
      <AmbientMesh />

      <div className="relative z-10 flex gap-4 p-4 md:p-5" style={{ minHeight: "100vh" }}>
        {/* Sidebar — a floating raised panel, not a docked edge */}
        <aside className="cm-panel w-64 flex-shrink-0 rounded-3xl hidden md:flex flex-col overflow-hidden" style={{ alignSelf: "flex-start", maxHeight: "calc(100vh - 2.5rem)" }}>
          <div className="px-5 py-5 flex items-center gap-2.5 border-b" style={{ borderColor: "var(--border-soft)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-accent)", boxShadow: "0 1px 0 rgba(255,255,255,0.3) inset, 0 6px 14px -4px rgba(108,92,231,0.6)" }}>
              <Hexagon size={17} color="#0B0F14" fill="#0B0F14" />
            </div>
            <div>
              <div className="cm-display font-bold text-sm leading-none" style={{ color: "var(--text)" }}>Communities</div>
              <div className="text-[10px] mt-0.5" style={{ color: "var(--text-faint)" }}>Management &amp; Tracking</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto cm-scroll">
            {NAV.map(item => {
              const Icon = item.icon;
              const isActive = active === item.key;
              const badgeCount = item.key === "requests" ? requests.length : 0;
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={isActive
                    ? { background: "var(--surface-2)", color: "var(--accent)", boxShadow: "var(--shadow-raised)", border: "1px solid var(--border)" }
                    : { color: "var(--text-dim)", border: "1px solid transparent" }}
                >
                  <Icon size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {badgeCount > 0 && (
                    <span className="cm-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--warn-soft)", color: "var(--warn)" }}>
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t" style={{ borderColor: "var(--border-soft)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: "var(--grad-teal)", color: "#06201C", boxShadow: "0 2px 6px -1px rgba(47,217,199,0.5)" }}>YOU</div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>Community Lead</div>
                <div className="text-[10px] truncate" style={{ color: "var(--text-faint)" }}>you@portal.dev</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile bottom nav — floating pill bar */}
        <div className="cm-panel md:hidden fixed bottom-3 left-3 right-3 rounded-2xl flex overflow-x-auto z-20 cm-scroll">
          {NAV.map(item => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button key={item.key} onClick={() => setActive(item.key)} className="flex flex-col items-center gap-1 px-4 py-2.5 flex-shrink-0" style={{ color: isActive ? "var(--accent)" : "var(--text-faint)" }}>
                <Icon size={16} />
                <span className="text-[9px] font-medium whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main — a second floating panel, mesh visible in the gap between the two */}
        <main className="cm-panel flex-1 min-w-0 flex flex-col rounded-3xl overflow-hidden">
          <header className="px-6 md:px-8 py-4 border-b flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: "var(--border-soft)" }}>
            <div className="flex items-center gap-3">
              <StatPill label="Communities" value={communities.length} icon={Globe} />
              <StatPill label="Members reach" value={memberCount + "+"} icon={TrendingUp} />
              <StatPill label="Open requests" value={requests.length} icon={Inbox} />
            </div>
          </header>

          <div className="flex-1 px-6 md:px-8 py-7 pb-24 md:pb-7 overflow-y-auto cm-scroll">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-30 cm-fade-in">
          <div className="cm-panel px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
            <Check size={14} style={{ color: "var(--success)" }} /> {toast}
          </div>
        </div>
      )}
    </div>
  );
}
