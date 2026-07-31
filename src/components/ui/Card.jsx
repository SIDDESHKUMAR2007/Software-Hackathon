/**
 * Card
 * Base container used across every module for grouped content.
 * Dark navy surface, rounded-xl, soft shadow, thin border, 24px padding.
 */
export default function Card({ children, className = "", padded = true, ...props }) {
  return (
    <div
      className={`bg-surface rounded-xl border border-border shadow-card ${
        padded ? "p-6" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
