import { Circle } from "lucide-react";
import Badge from "../ui/Badge";
import { NOTIFICATION_TYPES } from "./notificationTypes";

/**
 * NotificationItem
 * Small rounded card: icon, title, description, timestamp.
 * Unread notifications get a subtle violet-tinted background + dot indicator.
 */
export default function NotificationItem({ notification, onToggleRead }) {
  const { type, title, description, timestamp, read } = notification;
  const config = NOTIFICATION_TYPES[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex gap-4 rounded-xl border p-4 transition-colors duration-150 ${
        read
          ? "bg-raised border-border"
          : "bg-primary/[0.06] border-primary/20"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${config.iconBg} ${config.iconColor}`}
      >
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {!read && (
              <Circle size={8} className="fill-primary text-primary shrink-0" />
            )}
            <h3 className="text-sm font-semibold text-heading truncate">
              {title}
            </h3>
          </div>
          <Badge tone={config.badgeTone} className="shrink-0">
            {config.label}
          </Badge>
        </div>

        <p className="text-sm text-body mt-1 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-xs text-muted">{timestamp}</span>
          <button
            onClick={() => onToggleRead(notification.id)}
            className="text-xs font-medium text-primary-soft hover:text-primary transition-colors duration-150"
          >
            {read ? "Mark as unread" : "Mark as read"}
          </button>
        </div>
      </div>
    </div>
  );
}
