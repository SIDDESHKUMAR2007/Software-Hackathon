import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, BellOff } from "lucide-react";
import { NOTIFICATION_TYPES } from "./notificationTypes";

/**
 * NotificationDropdown
 * Compact preview panel opened from the navbar bell. Shows the most
 * recent notifications, lets the user mark all as read, and links
 * through to the full Notifications page for everything else.
 */
export default function NotificationDropdown({
  notifications,
  unreadCount,
  onToggleRead,
  onMarkAllAsRead,
  onClose,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const preview = notifications.slice(0, 5);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-[22rem] max-w-[90vw] rounded-xl border border-border bg-surface shadow-panel overflow-hidden z-20"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-heading">Notifications</h3>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-primary/15 text-primary-soft text-xs font-semibold">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-soft hover:text-primary transition-colors duration-150"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {preview.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 px-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary-soft mb-3">
              <BellOff size={18} />
            </div>
            <p className="text-sm font-medium text-heading">No notifications</p>
            <p className="text-xs text-body mt-1">
              You're all caught up.
            </p>
          </div>
        ) : (
          <ul>
            {preview.map((notification) => {
              const { id, type, title, description, timestamp, read } =
                notification;
              const config = NOTIFICATION_TYPES[type];
              const Icon = config.icon;
              return (
                <li
                  key={id}
                  className={`flex gap-3 px-4 py-3 border-b border-border-soft last:border-b-0 transition-colors duration-150 hover:bg-surface-hover ${
                    read ? "" : "bg-primary/[0.05]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${config.iconBg} ${config.iconColor}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-heading truncate">
                        {title}
                      </p>
                      {!read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-body mt-0.5 line-clamp-2">
                      {description}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] text-muted">
                        {timestamp}
                      </span>
                      <button
                        onClick={() => onToggleRead(id)}
                        className="text-[11px] font-medium text-primary-soft hover:text-primary transition-colors duration-150"
                      >
                        {read ? "Mark unread" : "Mark read"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Link
        to="/notifications"
        onClick={onClose}
        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-primary-soft hover:text-primary hover:bg-surface-hover transition-colors duration-150 border-t border-border"
      >
        <Bell size={14} />
        View all notifications
      </Link>
    </div>
  );
}
