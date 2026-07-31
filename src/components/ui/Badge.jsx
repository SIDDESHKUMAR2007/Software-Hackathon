/**
 * Badge
 * tone: "success" | "warning" | "danger" | "info" | "neutral"
 */
const TONE_CLASSES = {
  success: "bg-success/10 text-success ring-1 ring-inset ring-success/20",
  warning: "bg-warning/10 text-warning ring-1 ring-inset ring-warning/20",
  danger: "bg-danger/10 text-danger ring-1 ring-inset ring-danger/20",
  info: "bg-primary/10 text-primary-soft ring-1 ring-inset ring-primary/25",
  neutral: "bg-white/5 text-body ring-1 ring-inset ring-border",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
