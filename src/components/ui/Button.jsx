/**
 * Button
 * variant: "primary" | "secondary" | "ghost"
 * size: "sm" | "md"
 */
const VARIANT_CLASSES = {
  primary:
    "bg-brand-gradient text-white border border-transparent hover:brightness-110 shadow-glow",
  secondary:
    "bg-surface text-primary-soft border border-primary/30 hover:bg-surface-hover hover:border-primary/50",
  ghost:
    "bg-transparent text-body hover:bg-white/5 hover:text-heading border border-transparent",
};

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}
