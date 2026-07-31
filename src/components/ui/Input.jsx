/**
 * Input
 * Rounded-lg, dark navy surface, violet focus ring, optional leading icon.
 */
export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
      )}
      <input
        className={`w-full rounded-lg border border-border bg-raised text-sm text-heading placeholder:text-muted py-2.5 ${
          Icon ? "pl-9 pr-3" : "px-3"
        } focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors duration-150 ${className}`}
        {...props}
      />
    </div>
  );
}
