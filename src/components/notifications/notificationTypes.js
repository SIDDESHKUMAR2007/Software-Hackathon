import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";

/**
 * Central config for notification types.
 * Keeps icon + color mapping in one place so every module that renders
 * notifications (this page, the navbar bell dropdown, etc.) stays consistent.
 */
export const NOTIFICATION_TYPES = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    badgeTone: "success",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  info: {
    label: "Info",
    icon: Info,
    badgeTone: "info",
    iconBg: "bg-primary/10",
    iconColor: "text-primary-soft",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    badgeTone: "warning",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  error: {
    label: "Error",
    icon: XCircle,
    badgeTone: "danger",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
  },
};
