import { useState } from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useNotifications } from "../../context/NotificationsContext";
import NotificationDropdown from "../notifications/NotificationDropdown";

export default function Navbar({ onMenuClick }) {
  const [bellOpen, setBellOpen] = useState(false);
  const { notifications, unreadCount, toggleRead, markAllAsRead } =
    useNotifications();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 h-16 px-4 md:px-6 bg-surface/80 backdrop-blur border-b border-border">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-body hover:bg-white/5 hover:text-heading transition-colors duration-150"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full max-w-sm hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-raised text-sm text-heading placeholder:text-muted py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors duration-150"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="relative">
          <button
            onClick={() => setBellOpen((open) => !open)}
            aria-label="Notifications"
            aria-expanded={bellOpen}
            className={`relative p-2 rounded-lg transition-colors duration-150 ${
              bellOpen
                ? "bg-white/5 text-heading"
                : "text-body hover:bg-white/5 hover:text-heading"
            }`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-ring" />
                <span className="absolute inset-0 w-2 h-2 rounded-full bg-primary" />
              </span>
            )}
          </button>

          {bellOpen && (
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              onToggleRead={toggleRead}
              onMarkAllAsRead={markAllAsRead}
              onClose={() => setBellOpen(false)}
            />
          )}
        </div>

        <div className="w-px h-6 bg-border hidden sm:block" />

        <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-heading px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors duration-150">
          Student
          <ChevronDown size={14} className="text-muted" />
        </button>

        <div className="w-9 h-9 rounded-full bg-brand-gradient text-white flex items-center justify-center text-sm font-semibold shrink-0">
          SC
        </div>
      </div>
    </header>
  );
}
