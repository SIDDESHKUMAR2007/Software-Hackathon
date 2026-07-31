import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Home,
  Users,
  Handshake,
  ClipboardList,
  Calendar,
  UserCheck,
  UserPlus,
  Megaphone,
  BarChart3,
  Settings,
  Check,
  X,
  ArrowUp,
  ArrowRight,
  Code2,
  Bot,
  Sparkles,
  Heart,
  Shield,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Student Community Management and Tracking Portal — Dashboard
 * Frontend-only. Sidebar items call `onNavigate(path)` which currently just
 * updates local state + logs the target route — swap that for your router
 * (e.g. react-router's `navigate(path)`) once the other modules are wired in.
 *
 * Design tokens (dark theme)
 *  bg app        #090D16   bg panel      #121826   bg panel raised #161D2E
 *  border subtle rgba(255,255,255,.06)   border hover rgba(255,255,255,.12)
 *  text primary  slate-100  text secondary slate-400  text muted slate-500/600
 *  accent        blue-500 → indigo-600 gradient (brand / primary actions)
 *  status        emerald = success/active, blue = info, amber = warning,
 *                rose = danger, violet = highlight
 */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
  { key: "communities", label: "Communities", icon: Users, path: "/communities" },
  { key: "collaborations", label: "Collaborations", icon: Handshake, path: "/collaborations" },
  { key: "tasks", label: "Tasks", icon: ClipboardList, path: "/tasks" },
  { key: "events", label: "Events", icon: Calendar, path: "/events" },
  { key: "attendance", label: "Attendance", icon: UserCheck, path: "/attendance" },
  { key: "memberships", label: "Memberships", icon: UserPlus, path: "/memberships" },
  { key: "announcements", label: "Announcements", icon: Megaphone, path: "/announcements" },
  { key: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { key: "notifications", label: "Notifications", icon: Bell, path: "/notifications", badge: 8 },
  { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

const activityData = [
  { date: "01 May", activities: 30 },
  { date: "08 May", activities: 42 },
  { date: "15 May", activities: 78 },
  { date: "22 May", activities: 55 },
  { date: "29 May", activities: 70 },
];

const taskStatusData = [
  { name: "Completed", value: 28, color: "#3B82F6" },
  { name: "In Progress", value: 25, color: "#F59E0B" },
  { name: "To Do", value: 14, color: "#8B5CF6" },
];

const totalTasks = taskStatusData.reduce((sum, t) => sum + t.value, 0);

const eventsOverview = [
  {
    title: "Hackathon 2024",
    date: "04 Jun 2024 · 09:00 AM",
    place: "Auditorium",
    status: "Upcoming",
    statusColor: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
    icon: Code2,
    tileClass: "bg-gradient-to-br from-slate-600 to-slate-700",
  },
  {
    title: "AI Workshop",
    date: "10 Jun 2024 · 11:00 AM",
    place: "Seminar Hall",
    status: "Upcoming",
    statusColor: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
    icon: Bot,
    tileClass: "bg-gradient-to-br from-violet-500 to-violet-700",
  },
  {
    title: "Tech Talk",
    date: "20 Jun 2024 · 02:00 PM",
    place: "Conference Room",
    status: "Registered",
    statusColor: "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20",
    icon: Sparkles,
    tileClass: "bg-gradient-to-br from-teal-500 to-teal-700",
  },
];

const recentCollaborations = [
  {
    a: { label: "</>", color: "bg-gradient-to-br from-blue-600 to-blue-800", name: "Coding Club" },
    b: { label: "🤖", color: "bg-gradient-to-br from-slate-600 to-slate-800", name: "Robotics Club" },
    status: "Active",
    statusColor: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  },
  {
    a: { label: "AI", color: "bg-gradient-to-br from-indigo-500 to-indigo-700", name: "AI Club" },
    b: { label: "</>", color: "bg-gradient-to-br from-blue-600 to-blue-800", name: "Coding Club" },
    status: "Active",
    statusColor: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  },
  {
    a: { label: "🛡️", color: "bg-gradient-to-br from-amber-500 to-amber-700", name: "NSS Unit" },
    b: { label: "♥", color: "bg-gradient-to-br from-rose-500 to-rose-700", name: "Health Club" },
    status: "Completed",
    statusColor: "bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20",
  },
];

const recentAnnouncements = [
  { text: "Hackathon 2024 registrations are now open!", time: "2h ago", icon: Megaphone, color: "bg-amber-500/10 text-amber-400" },
  { text: "AI Workshop has been scheduled for 10th June.", time: "5h ago", icon: UserPlus, color: "bg-blue-500/10 text-blue-400" },
  { text: "Blood Donation Drive planned for 15th June.", time: "1d ago", icon: Heart, color: "bg-rose-500/10 text-rose-400" },
];

const membershipRequests = [
  { name: "Priya Sharma", club: "Robotics Club", initials: "PS", color: "bg-gradient-to-br from-rose-500 to-rose-700" },
  { name: "Karan Singh", club: "Coding Club", initials: "KS", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
  { name: "Neha Gupta", club: "Photography Club", initials: "NG", color: "bg-gradient-to-br from-violet-500 to-violet-700" },
];

const statCards = [
  { label: "Total Communities", value: "18", change: "2 new this month", icon: Users, iconClass: "bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/30" },
  { label: "Total Members", value: "1,420", change: "120 this month", icon: Shield, iconClass: "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/30" },
  { label: "Active Collaborations", value: "23", change: "5 this month", icon: Handshake, iconClass: "bg-gradient-to-br from-violet-500 to-violet-700 shadow-violet-500/30" },
  { label: "Ongoing Tasks", value: "67", change: "12 overdue", changeColor: "text-orange-400", changeIcon: false, icon: ClipboardList, iconClass: "bg-gradient-to-br from-orange-500 to-orange-700 shadow-orange-500/30" },
  { label: "Upcoming Events", value: "7", link: "View all events", icon: Calendar, iconClass: "bg-gradient-to-br from-pink-500 to-pink-700 shadow-pink-500/30" },
];

function Avatar({ initials, color, size = "w-10 h-10" }) {
  return (
    <div
      className={`${size} ${color} rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 ring-2 ring-white/10`}
    >
      {initials}
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-slate-100 text-[15px] tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

function ViewAllButton({ children = "View all" }) {
  return (
    <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
      {children}
      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigate = (item) => {
    setActive(item.key);
    // Hook up your router here, e.g.: navigate(item.path)
    console.log(`Navigate to ${item.path}`);
  };

  return (
    <div className="h-screen bg-[#090D16] font-sans flex overflow-hidden text-slate-100 antialiased">
      {/* Scoped styles: thin scrollbars + subtle ambient glow, no external deps */}
      <style>{`
        .cmp-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .cmp-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .cmp-scrollbar::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.18); border-radius: 9999px; }
        .cmp-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.32); }
        .cmp-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(148,163,184,0.25) transparent; }
      `}</style>

      {/* Sidebar — fixed, never scrolls with the page */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-64"
        } shrink-0 h-screen bg-[#0B101C] border-r border-white/[0.06] flex flex-col transition-all duration-200 overflow-hidden`}
      >
        <div className="h-20 flex items-center gap-2.5 px-6 border-b border-white/[0.06] shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
            <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-slate-100 text-[15px] tracking-tight">Community</p>
            <p className="text-slate-500 text-xs -mt-0.5">Management Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 cmp-scrollbar">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Main
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavigate(item)}
                className={`relative w-full flex items-center justify-between gap-3 pl-3.5 pr-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-white/80" />
                )}
                <span className="flex items-center gap-3">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  {item.label}
                </span>
                {item.badge ? (
                  <span
                    className={`text-[11px] font-semibold rounded-full px-1.5 py-0.5 min-w-[20px] text-center ${
                      isActive ? "bg-white/25 text-white" : "bg-red-500/90 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4 flex items-center gap-3 shrink-0 hover:bg-white/[0.03] transition-colors cursor-pointer">
          <Avatar initials="RV" color="bg-gradient-to-br from-blue-500 to-indigo-600" />
          <div className="leading-tight flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">Rahul Verma</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 h-screen flex flex-col relative">
        {/* Ambient glow accents — signature touch, purely decorative */}
        <div className="pointer-events-none absolute top-0 left-1/4 w-[36rem] h-[24rem] bg-blue-600/[0.07] rounded-full blur-[120px] -z-0" />
        <div className="pointer-events-none absolute top-24 right-0 w-[28rem] h-[20rem] bg-violet-600/[0.06] rounded-full blur-[120px] -z-0" />

        {/* Topbar */}
        <header className="h-20 bg-[#0B101C]/80 backdrop-blur-md border-b border-white/[0.06] flex items-center gap-4 px-6 shrink-0 z-10">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] rounded-lg p-2 -ml-2 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-shadow"
            />
          </div>

          <div className="flex-1" />

          <button
            className="relative text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] rounded-lg p-2 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-[#0B101C]">
              8
            </span>
          </button>
          <button
            className="relative text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] rounded-lg p-2 transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-[#0B101C]">
              3
            </span>
          </button>

          <div className="w-px h-6 bg-white/[0.08] mx-1" />

          <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.06] transition-colors">
            <Avatar initials="RV" color="bg-gradient-to-br from-blue-500 to-indigo-600" size="w-9 h-9" />
            <span className="text-sm font-semibold text-slate-200 hidden sm:block">Rahul Verma</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        </header>

        {/* Content — the only part that scrolls */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 cmp-scrollbar relative z-[1]">
          {/* Welcome row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                Welcome back, Rahul <span className="inline-block">👋</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Here's what's happening in your communities today.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors">
              <Calendar className="w-4 h-4 text-slate-500" />
              31 May 2024, Friday
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-[#121826] rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-200"
                >
                  <div className={`w-11 h-11 ${card.iconClass} rounded-xl flex items-center justify-center mb-3 shadow-lg ring-1 ring-white/10`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{card.value}</p>
                  {card.change && (
                    <p className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${card.changeColor || "text-emerald-400"}`}>
                      {card.changeColor ? null : <ArrowUp className="w-3 h-3" />} {card.change}
                    </p>
                  )}
                  {card.link && (
                    <button className="text-xs mt-1.5 text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors">
                      {card.link}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Activity overview */}
            <div className="lg:col-span-1 bg-[#121826] rounded-xl border border-white/[0.06] p-5">
              <SectionHeader
                title="Activity Overview"
                action={
                  <button className="text-xs font-medium text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.15] rounded-md px-2.5 py-1.5 flex items-center gap-1 transition-colors">
                    This Month <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                }
              />
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "#161D2E", fontSize: 12, color: "#E2E8F0", boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
                      labelStyle={{ color: "#94A3B8" }}
                      itemStyle={{ color: "#60A5FA" }}
                      formatter={(value) => [`${value}`, "Activities"]}
                    />
                    <Area type="monotone" dataKey="activities" stroke="#60A5FA" strokeWidth={2.5} fill="url(#activityFill)" dot={{ r: 4, fill: "#60A5FA", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#60A5FA", stroke: "#0B101C", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Task status */}
            <div className="bg-[#121826] rounded-xl border border-white/[0.06] p-5">
              <SectionHeader title="Task Status" />
              <div className="flex items-center gap-4">
                <div className="relative w-36 h-36 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        dataKey="value"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {taskStatusData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-slate-100">{totalTasks}</span>
                    <span className="text-[11px] text-slate-500">Total</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {taskStatusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-slate-500 text-xs">
                        {item.value} ({Math.round((item.value / totalTasks) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Events overview */}
            <div className="bg-[#121826] rounded-xl border border-white/[0.06] p-5">
              <SectionHeader
                title="Events Overview"
                action={
                  <button className="text-xs font-medium text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.15] rounded-md px-2.5 py-1.5 flex items-center gap-1 transition-colors">
                    This Month <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                }
              />
              <div className="space-y-3">
                {eventsOverview.map((ev) => {
                  const Icon = ev.icon;
                  return (
                    <div key={ev.title} className="flex items-center gap-3 rounded-lg -mx-2 px-2 py-1.5 hover:bg-white/[0.03] transition-colors">
                      <div className={`w-12 h-12 rounded-lg ${ev.tileClass} flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/10`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-100 truncate">{ev.title}</p>
                        <p className="text-xs text-slate-500 truncate">{ev.date}</p>
                        <p className="text-xs text-slate-600 truncate">{ev.place}</p>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-1 rounded-full whitespace-nowrap ${ev.statusColor}`}>
                        {ev.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent collaborations */}
            <div className="bg-[#121826] rounded-xl border border-white/[0.06] p-5">
              <SectionHeader title="Recent Collaborations" action={<ViewAllButton />} />
              <div className="space-y-4">
                {recentCollaborations.map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${row.a.color} flex items-center justify-center text-white text-xs font-semibold shrink-0 ring-1 ring-white/10`}>
                      {row.a.label}
                    </div>
                    <span className="text-sm text-slate-300 truncate">{row.a.name}</span>
                    <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <div className={`w-9 h-9 rounded-lg ${row.b.color} flex items-center justify-center text-white text-xs font-semibold shrink-0 ring-1 ring-white/10`}>
                      {row.b.label}
                    </div>
                    <span className="text-sm text-slate-300 truncate flex-1">{row.b.name}</span>
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-full whitespace-nowrap ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent announcements */}
            <div className="bg-[#121826] rounded-xl border border-white/[0.06] p-5 flex flex-col">
              <SectionHeader title="Recent Announcements" action={<ViewAllButton />} />
              <div className="space-y-4 flex-1">
                {recentAnnouncements.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-slate-300 flex-1 leading-snug">{a.text}</p>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{a.time}</span>
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
                Go to Announcements
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Membership requests */}
            <div className="bg-[#121826] rounded-xl border border-white/[0.06] p-5">
              <SectionHeader title="Membership Requests" action={<ViewAllButton />} />
              <div className="space-y-4">
                {membershipRequests.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <Avatar initials={m.initials} color={m.color} size="w-9 h-9" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">{m.name}</p>
                      <p className="text-xs text-slate-500 truncate">{m.club}</p>
                    </div>
                    <button className="text-xs font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20 rounded-md px-2.5 py-1.5 flex items-center gap-1 hover:bg-emerald-500/20 transition-colors">
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="text-xs font-medium bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20 rounded-md px-2.5 py-1.5 flex items-center gap-1 hover:bg-rose-500/20 transition-colors">
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-600 pt-4 pb-2">
            © 2024 Community Management Portal. All rights reserved.
          </p>
        </main>
      </div>
    </div>
  );
}
