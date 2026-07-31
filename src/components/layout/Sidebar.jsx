import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Users,
  CalendarDays,
  ClipboardList,
  Settings,
  LogOut,
  GraduationCap,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../../context/NotificationsContext";
import Badge from "../ui/Badge";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { unreadCount } = useNotifications();

  const NAV_ITEMS = [
    { label: "Dashboard", to: "/", icon: LayoutDashboard },
    { label: "Notifications", to: "/notifications", icon: Bell, badge: unreadCount },
    { label: "Members", to: "/members", icon: Users },
    { label: "Events", to: "/events", icon: CalendarDays },
    { label: "Tasks", to: "/tasks", icon: ClipboardList },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 bg-surface border-r border-border h-screen sticky top-0 transition-all duration-200 ${
        collapsed ? "w-18" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 h-16 px-4 border-b border-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-gradient text-white shrink-0 shadow-glow">
          <GraduationCap size={20} />
        </div>
        {!collapsed && (
          <span className="font-semibold text-heading text-sm leading-tight">
            Student Community
            <br />
            Tracking Portal
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "text-body hover:bg-white/5 hover:text-heading"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="flex-1">{label}</span>}
                {!collapsed && !!badge && (
                  <Badge
                    tone={isActive ? "neutral" : "info"}
                    className={isActive ? "bg-white/20 text-white ring-0" : ""}
                  >
                    {badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border p-3 space-y-1">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-body hover:bg-white/5 hover:text-heading w-full transition-colors duration-150">
          <Settings size={18} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/10 w-full transition-colors duration-150">
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-body hover:bg-white/5 hover:text-heading w-full transition-colors duration-150"
        >
          {collapsed ? (
            <ChevronsRight size={18} className="shrink-0" />
          ) : (
            <>
              <ChevronsLeft size={18} className="shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
