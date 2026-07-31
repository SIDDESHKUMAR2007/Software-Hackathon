import React, { useState } from "react";
import {
  LayoutDashboard, CalendarDays, PlusCircle, ClipboardList, Users,
  ListChecks, MessageSquare, Star, Award, Search, Filter, MapPin,
  Clock, Trash2, CheckCircle2, XCircle, Circle, ChevronLeft, Pin,
  Building2, X, Send, Bell, Download, Sparkles
} from "lucide-react";

/* ---------------------------------------------------------------
   PALETTE (professional / corporate theme)
   surface #F4F5F7 · ink #2c2c8f · body #475569 · muted #64748B
   navy #1c186c (primary) · gold #B7791F · red #9B2C2C · green #276749
--------------------------------------------------------------- */

const COMMUNITY_COLORS = {
  "Coding Club": "#1E3A5F",
  "AI Club": "#9B2C2C",
  "Design Club": "#B7791F",
  "NSS Club": "#276749",
  "Robotics Club": "#553C9A",
};

const communityColor = (name) => COMMUNITY_COLORS[name] || "#64748B";

/* ---------------------------------------------------------------
   MOCK DATA
--------------------------------------------------------------- */

const initialEvents = [
  {
    id: 1,
    name: "Hackathon 2026",
    description:
      "A 24-hour build sprint where student teams ship a working prototype around this year's civic-tech theme. Mentors from partner communities are on hand throughout.",
    category: "Hackathon",
    organizer: "Coding Club",
    collaborators: ["AI Club"],
    type: "Collaborative",
    date: "2026-08-15",
    endDate: "2026-08-16",
    startTime: "09:00",
    endTime: "18:00",
    venue: "Main Auditorium",
    maxParticipants: 200,
    registered: 150,
    deadline: "2026-08-10",
    eligibility: "Open to all 2nd year and above",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "AI Ethics Roundtable",
    description:
      "A discussion-format session on fairness, bias and accountability in deployed AI systems, followed by an open Q&A with faculty panelists.",
    category: "Seminar",
    organizer: "AI Club",
    collaborators: [],
    type: "Single Community Event",
    date: "2026-08-05",
    endDate: "2026-08-05",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Seminar Hall 2",
    maxParticipants: 80,
    registered: 62,
    deadline: "2026-08-03",
    eligibility: "Open to all",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Poster Design Sprint",
    description:
      "Design Club runs a rapid poster-making workshop covering layout, type pairing and color theory, capped off with a peer critique round.",
    category: "Workshop",
    organizer: "Design Club",
    collaborators: [],
    type: "Single Community Event",
    date: "2026-07-20",
    endDate: "2026-07-20",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Design Lab",
    maxParticipants: 40,
    registered: 40,
    deadline: "2026-07-18",
    eligibility: "Open to all",
    status: "Completed",
  },
  {
    id: 4,
    name: "Campus Clean-Up Drive",
    description:
      "NSS Club leads a joint clean-up of the campus perimeter and lake area, with the Robotics Club piloting a waste-sorting bot demo on the side.",
    category: "Outreach",
    organizer: "NSS Club",
    collaborators: ["Robotics Club"],
    type: "Collaborative",
    date: "2026-07-27",
    endDate: "2026-07-27",
    startTime: "07:00",
    endTime: "10:00",
    venue: "Campus Grounds",
    maxParticipants: 100,
    registered: 88,
    deadline: "2026-07-25",
    eligibility: "Open to all",
    status: "Ongoing",
  },
];

const initialParticipants = {
  1: [
    { id: 1, name: "Arun", department: "CSE", year: "3rd", status: "Approved" },
    { id: 2, name: "Rahul", department: "ECE", year: "2nd", status: "Pending" },
    { id: 3, name: "Divya", department: "AI&DS", year: "2nd", status: "Approved" },
    { id: 4, name: "Meena", department: "IT", year: "3rd", status: "Rejected" },
  ],
  2: [
    { id: 5, name: "Karthik", department: "AI&DS", year: "2nd", status: "Approved" },
    { id: 6, name: "Priya", department: "CSE", year: "1st", status: "Pending" },
  ],
};

const initialTasks = {
  1: [
    { id: 1, name: "Poster Design", assignedCommunity: "Design Club", assignedMember: "Design Club", deadline: "2026-08-08", priority: "High", status: "Completed" },
    { id: 2, name: "Registration Desk", assignedCommunity: "Coding Club", assignedMember: "Coding Club", deadline: "2026-08-14", priority: "Medium", status: "In Progress" },
    { id: 3, name: "Venue Setup", assignedCommunity: "NSS Club", assignedMember: "NSS Club", deadline: "2026-08-14", priority: "Medium", status: "Pending" },
    { id: 4, name: "AI Workshop Track", assignedCommunity: "AI Club", assignedMember: "AI Club", deadline: "2026-08-15", priority: "High", status: "In Progress" },
  ],
  4: [
    { id: 5, name: "Route Mapping", assignedCommunity: "NSS Club", assignedMember: "NSS Club", deadline: "2026-07-26", priority: "Medium", status: "Completed" },
    { id: 6, name: "Waste-Sorting Bot Demo", assignedCommunity: "Robotics Club", assignedMember: "Robotics Club", deadline: "2026-07-27", priority: "Low", status: "In Progress" },
  ],
};

const initialAnnouncements = {
  1: [
    { id: 1, text: "Venue changed from Hall A to the Main Auditorium.", time: "2 days ago" },
    { id: 2, text: "Team registration closes Aug 10, 11:59 PM — no extensions.", time: "4 days ago" },
  ],
  4: [{ id: 3, text: "Meeting point moved to the North Gate due to weather.", time: "1 day ago" }],
};

const initialFeedback = {
  3: [
    { id: 1, name: "Sanjiv", rating: 5, comment: "Loved the critique round, learned a lot about type pairing." },
    { id: 2, name: "Aditi", rating: 4, comment: "Great pace, could use a longer Q&A at the end." },
  ],
};

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "list", label: "Event list", icon: CalendarDays },
  { key: "create", label: "Create event", icon: PlusCircle },
  { key: "participants", label: "Participants", icon: Users },
  { key: "tasks", label: "Tasks", icon: ListChecks },
  { key: "communication", label: "Communication", icon: MessageSquare },
  { key: "feedback", label: "Feedback", icon: Star },
  { key: "certificates", label: "Certificates", icon: Award },
];

/* ---------------------------------------------------------------
   SMALL PIECES
--------------------------------------------------------------- */

function StatusBadge({ status }) {
  const map = {
    Upcoming: "bg-[#B7791F]/15 text-[#78350F] border-[#B7791F]/40",
    Ongoing: "bg-[#276749]/15 text-[#14532D] border-[#276749]/40",
    Completed: "bg-[#64748B]/15 text-[#334155] border-[#64748B]/40",
    Approved: "bg-[#276749]/15 text-[#14532D] border-[#276749]/40",
    Pending: "bg-[#B7791F]/15 text-[#78350F] border-[#B7791F]/40",
    Rejected: "bg-[#9B2C2C]/15 text-[#7F1D1D] border-[#9B2C2C]/40",
    Cancelled: "bg-[#64748B]/15 text-[#334155] border-[#64748B]/40",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] || "bg-gray-100 text-gray-600 border-gray-300"}`}>
      {status}
    </span>
  );
}

function TaskStatusPill({ status }) {
  const map = {
    "To Do": { c: "text-[#64748B]", icon: Circle },
    "Pending": { c: "text-[#64748B]", icon: Circle },
    "In Progress": { c: "text-[#B7791F]", icon: Clock },
    "Completed": { c: "text-[#276749]", icon: CheckCircle2 },
  };
  const s = map[status] || map["To Do"];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.c}`}>
      <Icon size={14} /> {status}
    </span>
  );
}

function EventCard({ event, onView, onRegister }) {
  const color = communityColor(event.organizer);
  return (
    <div className="relative bg-white border border-[#1F2937]/10 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 pt-6">
      <Pin size={16} className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#1E3A5F] rotate-12" fill="#1E3A5F" />
      <div
        className="h-24 rounded-md mb-3 flex items-center justify-center text-white font-semibold text-sm"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
      >
        {event.category}
      </div>

      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: color }}
        />
        <p className="text-xs text-[#64748B]">
          {event.organizer}
          {event.collaborators.length > 0 && ` + ${event.collaborators.join(", ")}`}
        </p>
      </div>

      <h3 className="font-semibold text-[#1F2937] mb-2 leading-snug">{event.name}</h3>

      <div className="space-y-1 text-sm text-[#475569] mb-3">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={14} /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={14} /> {event.venue}
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={14} /> {event.registered}/{event.maxParticipants} registered
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={event.status} />
        <div className="flex gap-2">
          <button
            onClick={() => onView(event.id)}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-[#1F2937]/20 text-[#1F2937] hover:bg-[#1F2937]/5"
          >
            View details
          </button>
          {event.status === "Upcoming" && (
            <button
              onClick={() => onRegister(event.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-[#1E3A5F] text-white hover:bg-[#16304D]"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PAGES
--------------------------------------------------------------- */

function Dashboard({ events, setPage }) {
  const total = events.length;
  const upcoming = events.filter((e) => e.status === "Upcoming").length;
  const ongoing = events.filter((e) => e.status === "Ongoing").length;
  const completed = events.filter((e) => e.status === "Completed").length;
  const totalParticipants = events.reduce((s, e) => s + e.registered, 0);
  const collabs = events.filter((e) => e.type === "Collaborative").length;

  const stats = [
    { label: "Total events", value: total, icon: CalendarDays, color: "#1E3A5F" },
    { label: "Upcoming", value: upcoming, icon: Clock, color: "#B7791F" },
    { label: "Ongoing", value: ongoing, icon: Sparkles, color: "#276749" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "#64748B" },
    { label: "Total participants", value: totalParticipants, icon: Users, color: "#9B2C2C" },
    { label: "Collaboration events", value: collabs, icon: Building2, color: "#553C9A" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Event dashboard</h1>
        <p className="text-[#64748B] text-sm mt-1">Overview of all community event activity</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-[#1F2937]/10 rounded-lg p-4 flex items-start justify-between">
            <div>
              <p className="text-xs text-[#64748B] mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-[#1F2937]">{s.value}</p>
            </div>
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: `${s.color}1A` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setPage("list")}
        className="mt-2 text-sm font-medium text-[#1E3A5F] hover:underline"
      >
        View all events →
      </button>
    </div>
  );
}

function EventList({ events, onView, onRegister }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tab, setTab] = useState("All");

  const categories = ["All", ...new Set(events.map((e) => e.category))];
  const statuses = ["All", "Upcoming", "Ongoing", "Completed"];

  const filtered = events.filter((e) => {
    const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    const matchesTab = tab === "All" || e.category === tab;
    return matchesQuery && matchesStatus && matchesTab;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Events</h1>
          <p className="text-[#64748B] text-sm mt-1">{filtered.length} of {events.length} events</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#1F2937]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#64748B]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-2 rounded-md border border-[#1F2937]/15 text-sm bg-white"
          >
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              tab === c ? "bg-[#1E3A5F] text-white border-[#1E3A5F]" : "border-[#1F2937]/15 text-[#475569] hover:bg-[#1F2937]/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[#64748B] py-10 text-center">No events match your filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} onView={onView} onRegister={onRegister} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventDetails({ event, tasks, onBack, onRegister }) {
  if (!event) return null;
  const eventTasks = tasks[event.id] || [];
  const remaining = event.maxParticipants - event.registered;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-[#1E3A5F] font-medium mb-4 hover:underline">
        <ChevronLeft size={16} /> Back to events
      </button>

      <div
        className="h-40 rounded-lg mb-6 flex items-end p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${communityColor(event.organizer)}, #1F2937)` }}
      >
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80 mb-1">{event.category}</p>
          <h1 className="text-2xl font-bold">{event.name}</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
            <h2 className="font-semibold text-[#1F2937] mb-2">About this event</h2>
            <p className="text-sm text-[#475569] leading-relaxed">{event.description}</p>
          </div>

          <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
            <h2 className="font-semibold text-[#1F2937] mb-3">Organizer information</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: communityColor(event.organizer) }} />
              <span className="text-sm text-[#1F2937]">{event.organizer} <span className="text-[#64748B]">(Main community)</span></span>
            </div>
            {event.collaborators.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: communityColor(c) }} />
                <span className="text-sm text-[#1F2937]">{c} <span className="text-[#64748B]">(Collaborating)</span></span>
              </div>
            ))}
          </div>

          {eventTasks.length > 0 && (
            <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
              <h2 className="font-semibold text-[#1F2937] mb-3">Event preparation tasks</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[#64748B] border-b border-[#1F2937]/10">
                    <th className="pb-2 font-medium">Task</th>
                    <th className="pb-2 font-medium">Assigned to</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventTasks.map((t) => (
                    <tr key={t.id} className="border-b border-[#1F2937]/5 last:border-0">
                      <td className="py-2 text-[#1F2937]">{t.name}</td>
                      <td className="py-2 text-[#475569]">{t.assignedCommunity}</td>
                      <td className="py-2"><TaskStatusPill status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
            <h2 className="font-semibold text-[#1F2937] mb-3">Schedule</h2>
            <div className="space-y-2 text-sm text-[#475569]">
              <div className="flex items-center gap-2"><CalendarDays size={14} /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
              <div className="flex items-center gap-2"><Clock size={14} /> {event.startTime} – {event.endTime}</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> {event.venue}</div>
            </div>
          </div>

          <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
            <h2 className="font-semibold text-[#1F2937] mb-3">Registration</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-[#64748B]">Total seats</span><span className="text-[#1F2937] font-medium">{event.maxParticipants}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Registered</span><span className="text-[#1F2937] font-medium">{event.registered}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Remaining</span><span className="text-[#1F2937] font-medium">{remaining}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Deadline</span><span className="text-[#1F2937] font-medium">{new Date(event.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span></div>
            </div>
            {event.status === "Upcoming" && (
              <button
                onClick={() => onRegister(event.id)}
                className="w-full py-2 rounded-md bg-[#1E3A5F] text-white text-sm font-medium hover:bg-[#16304D]"
              >
                Register for this event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateEvent({ onCreate }) {
  const [form, setForm] = useState({
    name: "", description: "", category: "Workshop", organizer: "Coding Club",
    startDate: "", endDate: "", startTime: "", endTime: "", venue: "",
    maxParticipants: "", eligibility: "", deadline: "",
    type: "Single Community Event", collaborators: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const communities = Object.keys(COMMUNITY_COLORS);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleCollaborator = (name) => {
    setForm((f) => ({
      ...f,
      collaborators: f.collaborators.includes(name)
        ? f.collaborators.filter((c) => c !== name)
        : [...f.collaborators, name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...form,
      id: Date.now(),
      date: form.startDate,
      registered: 0,
      maxParticipants: Number(form.maxParticipants) || 0,
      status: "Upcoming",
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({
      name: "", description: "", category: "Workshop", organizer: "Coding Club",
      startDate: "", endDate: "", startTime: "", endTime: "", venue: "",
      maxParticipants: "", eligibility: "", deadline: "",
      type: "Single Community Event", collaborators: [],
    });
  };

  const inputCls = "w-full px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30";
  const labelCls = "block text-xs font-medium text-[#475569] mb-1";

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Create event</h1>
      <p className="text-[#64748B] text-sm mb-6">Available to admins, community coordinators and staff</p>

      {submitted && (
        <div className="mb-5 flex items-center gap-2 bg-[#276749]/10 border border-[#276749]/30 text-[#14532D] text-sm px-4 py-3 rounded-md">
          <CheckCircle2 size={16} /> Event created and added to the event list.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
          <h2 className="font-semibold text-[#1F2937] mb-4">Basic details</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Event name</label>
              <input required className={inputCls} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Hackathon 2026" />
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea required rows={3} className={inputCls} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="What is this event about?" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Category</label>
                <select className={inputCls} value={form.category} onChange={(e) => update("category", e.target.value)}>
                  {["Workshop", "Hackathon", "Seminar", "Outreach", "Competition"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Organizer community</label>
                <select className={inputCls} value={form.organizer} onChange={(e) => update("organizer", e.target.value)}>
                  {communities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
          <h2 className="font-semibold text-[#1F2937] mb-4">Schedule details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Start date</label><input required type="date" className={inputCls} value={form.startDate} onChange={(e) => update("startDate", e.target.value)} /></div>
            <div><label className={labelCls}>End date</label><input required type="date" className={inputCls} value={form.endDate} onChange={(e) => update("endDate", e.target.value)} /></div>
            <div><label className={labelCls}>Start time</label><input required type="time" className={inputCls} value={form.startTime} onChange={(e) => update("startTime", e.target.value)} /></div>
            <div><label className={labelCls}>End time</label><input required type="time" className={inputCls} value={form.endTime} onChange={(e) => update("endTime", e.target.value)} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Venue</label><input required className={inputCls} value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="e.g. Main Auditorium" /></div>
          </div>
        </div>

        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
          <h2 className="font-semibold text-[#1F2937] mb-4">Participation details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Maximum participants</label><input required type="number" min="1" className={inputCls} value={form.maxParticipants} onChange={(e) => update("maxParticipants", e.target.value)} placeholder="e.g. 200" /></div>
            <div><label className={labelCls}>Registration deadline</label><input required type="date" className={inputCls} value={form.deadline} onChange={(e) => update("deadline", e.target.value)} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Eligibility criteria</label><input className={inputCls} value={form.eligibility} onChange={(e) => update("eligibility", e.target.value)} placeholder="e.g. Open to all 2nd year and above" /></div>
          </div>
        </div>

        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-5">
          <h2 className="font-semibold text-[#1F2937] mb-1 flex items-center gap-1.5">Collaboration details <Sparkles size={14} className="text-[#B7791F]" /></h2>
          <p className="text-xs text-[#64748B] mb-4">Add partner communities for joint events</p>

          <div className="flex gap-4 mb-4">
            {["Single Community Event", "Collaborative Event"].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-[#1F2937] cursor-pointer">
                <input type="radio" name="type" checked={form.type === t} onChange={() => update("type", t)} />
                {t}
              </label>
            ))}
          </div>

          {form.type === "Collaborative Event" && (
            <div>
              <label className={labelCls}>Partner communities</label>
              <div className="flex flex-wrap gap-2">
                {communities.filter((c) => c !== form.organizer).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleCollaborator(c)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                      form.collaborators.includes(c) ? "bg-[#1E3A5F] text-white border-[#1E3A5F]" : "border-[#1F2937]/15 text-[#475569]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="w-full py-2.5 rounded-md bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#16304D]">
          Create event
        </button>
      </form>
    </div>
  );
}

function ParticipantManagement({ events, participants, setParticipants }) {
  const [eventId, setEventId] = useState(events[0]?.id);
  const list = participants[eventId] || [];

  const updateStatus = (id, status) => {
    setParticipants((p) => ({
      ...p,
      [eventId]: p[eventId].map((row) => (row.id === id ? { ...row, status } : row)),
    }));
  };

  const remove = (id) => {
    setParticipants((p) => ({ ...p, [eventId]: p[eventId].filter((row) => row.id !== id) }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Participant management</h1>
      <p className="text-[#64748B] text-sm mb-6">Review, approve and export registrations for coordinators</p>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <select value={eventId} onChange={(e) => setEventId(Number(e.target.value))} className="px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm bg-white">
          {events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md border border-[#1F2937]/15 text-[#1F2937] hover:bg-[#1F2937]/5">
          <Download size={14} /> Export list
        </button>
      </div>

      <div className="bg-white border border-[#1F2937]/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B] bg-[#1F2937]/[0.03] border-b border-[#1F2937]/10">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Department</th>
              <th className="p-3 font-medium">Year</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-[#64748B]">No registrations yet for this event.</td></tr>
            )}
            {list.map((row) => (
              <tr key={row.id} className="border-b border-[#1F2937]/5 last:border-0">
                <td className="p-3 text-[#1F2937] font-medium">{row.name}</td>
                <td className="p-3 text-[#475569]">{row.department}</td>
                <td className="p-3 text-[#475569]">{row.year}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => updateStatus(row.id, "Approved")} className="text-[#276749] hover:opacity-70" title="Approve"><CheckCircle2 size={16} /></button>
                    <button onClick={() => updateStatus(row.id, "Rejected")} className="text-[#9B2C2C] hover:opacity-70" title="Reject"><XCircle size={16} /></button>
                    <button onClick={() => remove(row.id)} className="text-[#64748B] hover:opacity-70" title="Remove"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskManagement({ events, tasks, setTasks }) {
  const [eventId, setEventId] = useState(events[0]?.id);
  const list = tasks[eventId] || [];
  const [form, setForm] = useState({ name: "", assignedCommunity: "Coding Club", deadline: "", priority: "Medium" });

  const columns = ["To Do", "In Progress", "Completed"];
  const normalize = (s) => (s === "Pending" ? "To Do" : s);

  const grouped = columns.reduce((acc, c) => {
    acc[c] = list.filter((t) => normalize(t.status) === c);
    return acc;
  }, {});

  const moveTask = (id, status) => {
    setTasks((t) => ({ ...t, [eventId]: t[eventId].map((row) => (row.id === id ? { ...row, status } : row)) }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const newTask = { id: Date.now(), name: form.name, assignedCommunity: form.assignedCommunity, assignedMember: form.assignedCommunity, deadline: form.deadline, priority: form.priority, status: "To Do" };
    setTasks((t) => ({ ...t, [eventId]: [...(t[eventId] || []), newTask] }));
    setForm({ name: "", assignedCommunity: "Coding Club", deadline: "", priority: "Medium" });
  };

  const priorityColor = { High: "#9B2C2C", Medium: "#B7791F", Low: "#276749" };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Event task management</h1>
      <p className="text-[#64748B] text-sm mb-6">Coordinate responsibilities across collaborating communities</p>

      <select value={eventId} onChange={(e) => setEventId(Number(e.target.value))} className="px-3 py-2 mb-5 rounded-md border border-[#1F2937]/15 text-sm bg-white">
        {events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>

      <form onSubmit={addTask} className="bg-white border border-[#1F2937]/10 rounded-lg p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-[#475569] mb-1">Task name</label>
          <input className="w-full px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Invite speaker" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#475569] mb-1">Assigned community</label>
          <select className="px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm" value={form.assignedCommunity} onChange={(e) => setForm((f) => ({ ...f, assignedCommunity: e.target.value }))}>
            {Object.keys(COMMUNITY_COLORS).map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#475569] mb-1">Deadline</label>
          <input type="date" className="px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm" value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#475569] mb-1">Priority</label>
          <select className="px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}>
            {["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 rounded-md bg-[#1E3A5F] text-white text-sm font-medium hover:bg-[#16304D]">Add task</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col} className="bg-[#1F2937]/[0.03] rounded-lg p-3">
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-3 px-1">{col} · {grouped[col].length}</p>
            <div className="space-y-2">
              {grouped[col].map((t) => (
                <div key={t.id} className="bg-white rounded-md border border-[#1F2937]/10 p-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-[#1F2937]">{t.name}</p>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: `${priorityColor[t.priority]}1A`, color: priorityColor[t.priority] }}>{t.priority}</span>
                  </div>
                  <p className="text-xs text-[#64748B] mb-2">{t.assignedCommunity}{t.deadline && ` · due ${new Date(t.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}</p>
                  <div className="flex gap-1">
                    {columns.filter((c) => c !== col).map((c) => (
                      <button key={c} onClick={() => moveTask(t.id, c)} className="text-[10px] px-2 py-1 rounded border border-[#1F2937]/15 text-[#475569] hover:bg-[#1F2937]/5">
                        → {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {grouped[col].length === 0 && <p className="text-xs text-[#64748B] px-1">No tasks here.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Communication({ events, announcements, setAnnouncements }) {
  const [eventId, setEventId] = useState(events[0]?.id);
  const list = announcements[eventId] || [];
  const [text, setText] = useState("");

  const post = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setAnnouncements((a) => ({
      ...a,
      [eventId]: [{ id: Date.now(), text, time: "just now" }, ...(a[eventId] || [])],
    }));
    setText("");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Event communication</h1>
      <p className="text-[#64748B] text-sm mb-6">Announcements, updates and reminders for a specific event</p>

      <select value={eventId} onChange={(e) => setEventId(Number(e.target.value))} className="px-3 py-2 mb-5 rounded-md border border-[#1F2937]/15 text-sm bg-white">
        {events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>

      <form onSubmit={post} className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Post an announcement or update..."
          className="flex-1 px-3 py-2 rounded-md border border-[#1F2937]/15 text-sm"
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-[#1E3A5F] text-white text-sm font-medium flex items-center gap-1.5 hover:bg-[#16304D]">
          <Send size={14} /> Post
        </button>
      </form>

      <div className="space-y-3">
        {list.length === 0 && <p className="text-sm text-[#64748B]">No announcements posted for this event yet.</p>}
        {list.map((a) => (
          <div key={a.id} className="bg-white border border-[#1F2937]/10 rounded-lg p-4 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B7791F]/15 flex items-center justify-center shrink-0">
              <Bell size={14} className="text-[#78350F]" />
            </div>
            <div>
              <p className="text-sm text-[#1F2937]">{a.text}</p>
              <p className="text-xs text-[#64748B] mt-1">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Feedback({ events, feedback }) {
  const [eventId, setEventId] = useState(events.find((e) => e.status === "Completed")?.id || events[0]?.id);
  const list = feedback[eventId] || [];
  const avg = list.length ? (list.reduce((s, f) => s + f.rating, 0) / list.length).toFixed(1) : "—";

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Event feedback</h1>
      <p className="text-[#64748B] text-sm mb-6">Ratings and comments collected after completed events</p>

      <select value={eventId} onChange={(e) => setEventId(Number(e.target.value))} className="px-3 py-2 mb-5 rounded-md border border-[#1F2937]/15 text-sm bg-white">
        {events.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-4">
          <p className="text-xs text-[#64748B] mb-1">Average rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#1F2937]">{avg}</p>
            <Star size={18} className="text-[#B7791F]" fill="#B7791F" />
          </div>
        </div>
        <div className="bg-white border border-[#1F2937]/10 rounded-lg p-4">
          <p className="text-xs text-[#64748B] mb-1">Responses collected</p>
          <p className="text-2xl font-bold text-[#1F2937]">{list.length}</p>
        </div>
      </div>

      <div className="space-y-3">
        {list.length === 0 && <p className="text-sm text-[#64748B]">No feedback submitted for this event yet.</p>}
        {list.map((f) => (
          <div key={f.id} className="bg-white border border-[#1F2937]/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-[#1F2937]">{f.name}</p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < f.rating ? "text-[#B7791F]" : "text-[#1F2937]/15"} fill={i < f.rating ? "#B7791F" : "none"} />
                ))}
              </div>
            </div>
            <p className="text-sm text-[#475569]">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Certificates({ events, participants }) {
  const completedEvents = events.filter((e) => e.status === "Completed");
  const [eventId, setEventId] = useState(completedEvents[0]?.id);
  const [selected, setSelected] = useState(null);

  const approvedFor = (id) => (participants[id] || []).filter((p) => p.status === "Approved");
  const currentEvent = events.find((e) => e.id === eventId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-1">Certificate management</h1>
      <p className="text-[#64748B] text-sm mb-6">Generate certificates for participants, volunteers and winners</p>

      {completedEvents.length === 0 ? (
        <p className="text-sm text-[#64748B]">No completed events yet — certificates unlock once an event finishes.</p>
      ) : (
        <>
          <select value={eventId} onChange={(e) => setEventId(Number(e.target.value))} className="px-3 py-2 mb-5 rounded-md border border-[#1F2937]/15 text-sm bg-white">
            {completedEvents.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>

          <div className="grid sm:grid-cols-2 gap-4">
            {approvedFor(eventId).length === 0 && <p className="text-sm text-[#64748B]">No approved participants recorded for this event.</p>}
            {approvedFor(eventId).map((p) => (
              <div key={p.id} className="bg-white border border-[#1F2937]/10 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1F2937]">{p.name}</p>
                  <p className="text-xs text-[#64748B]">{p.department} · {p.year}</p>
                </div>
                <button
                  onClick={() => setSelected(p)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-[#1E3A5F] text-white hover:bg-[#16304D]"
                >
                  <Award size={14} /> Generate
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && currentEvent && (
        <div className="fixed inset-0 bg-[#1F2937]/40 flex items-center justify-center p-6 z-50" onClick={() => setSelected(null)}>
          <div className="bg-[#F4F5F7] max-w-lg w-full rounded-lg p-8 relative border-4 border-[#1E3A5F]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[#64748B] hover:text-[#1F2937]"><X size={18} /></button>
            <div className="text-center">
              <Award size={32} className="text-[#B7791F] mx-auto mb-3" />
              <p className="text-xs uppercase tracking-widest text-[#64748B] mb-2">Certificate of participation</p>
              <p className="text-sm text-[#475569] mb-1">This certifies that</p>
              <p className="text-2xl font-bold text-[#1F2937] mb-1">{selected.name}</p>
              <p className="text-sm text-[#475569] mb-4">has participated in</p>
              <p className="text-lg font-semibold text-[#1E3A5F] mb-1">{currentEvent.name}</p>
              <p className="text-xs text-[#64748B]">
                {new Date(currentEvent.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · Organized by {currentEvent.organizer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   APP SHELL
--------------------------------------------------------------- */

export default function EventModuleApp() {
  const [page, setPage] = useState("dashboard");
  const [events, setEvents] = useState(initialEvents);
  const [participants, setParticipants] = useState(initialParticipants);
  const [tasks, setTasks] = useState(initialTasks);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [feedback] = useState(initialFeedback);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [toast, setToast] = useState("");

  const viewEvent = (id) => { setSelectedEventId(id); setPage("details"); };
  const registerEvent = (id) => {
    setEvents((evs) => evs.map((e) => (e.id === id ? { ...e, registered: Math.min(e.registered + 1, e.maxParticipants) } : e)));
    setToast("Registration submitted — status: Pending");
    setTimeout(() => setToast(""), 2500);
  };
  const createEvent = (newEvent) => setEvents((evs) => [newEvent, ...evs]);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex font-[Inter,system-ui,sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
      `}</style>

      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#1E3A5F] text-white flex flex-col min-h-screen">
        <div className="p-5 border-b border-white/10">
          <p className="font-display font-bold text-lg leading-tight">Community Portal</p>
          <p className="text-xs text-white/60 mt-0.5">Events module</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = page === item.key || (page === "details" && item.key === "list") || (page === "register" && item.key === "list");
            return (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  active ? "bg-white/15 font-medium" : "text-white/75 hover:bg-white/10"
                }`}
              >
                <Icon size={16} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50">Signed in as</p>
          <p className="text-sm font-medium">Event Coordinator</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {toast && (
          <div className="mb-4 flex items-center gap-2 bg-[#276749]/10 border border-[#276749]/30 text-[#14532D] text-sm px-4 py-2.5 rounded-md">
            <CheckCircle2 size={16} /> {toast}
          </div>
        )}

        {page === "dashboard" && <Dashboard events={events} setPage={setPage} />}
        {page === "list" && <EventList events={events} onView={viewEvent} onRegister={registerEvent} />}
        {page === "details" && <EventDetails event={selectedEvent} tasks={tasks} onBack={() => setPage("list")} onRegister={registerEvent} />}
        {page === "create" && <CreateEvent onCreate={createEvent} />}
        {page === "participants" && <ParticipantManagement events={events} participants={participants} setParticipants={setParticipants} />}
        {page === "tasks" && <TaskManagement events={events} tasks={tasks} setTasks={setTasks} />}
        {page === "communication" && <Communication events={events} announcements={announcements} setAnnouncements={setAnnouncements} />}
        {page === "feedback" && <Feedback events={events} feedback={feedback} />}
        {page === "certificates" && <Certificates events={events} participants={participants} />}
      </main>
    </div>
  );
}
