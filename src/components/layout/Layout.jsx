import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Users,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  X,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNotifications } from "../../context/NotificationsContext";
import Badge from "../ui/Badge";

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const NAV_ITEMS = [
    { label: "Dashboard", to: "/", icon: LayoutDashboard },
    { label: "Notifications", to: "/notifications", icon: Bell, badge: unreadCount },
    { label: "Members", to: "/members", icon: Users },
    { label: "Events", to: "/events", icon: CalendarDays },
    { label: "Tasks", to: "/tasks", icon: ClipboardList },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-surface border-r border-border flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-gradient text-white shadow-glow">
                  <GraduationCap size={20} />
                </div>
                <span className="font-semibold text-heading text-sm">
                  Student Portal
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-body hover:bg-white/5 hover:text-heading transition-colors duration-150"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1">
              {NAV_ITEMS.map(({ label, to, icon: Icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMobileNavOpen(false)}
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
                      <Icon size={18} />
                      <span className="flex-1">{label}</span>
                      {!!badge && (
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
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
