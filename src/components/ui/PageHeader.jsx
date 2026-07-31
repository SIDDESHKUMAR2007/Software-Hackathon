import { ChevronRight } from "lucide-react";

/**
 * PageHeader
 * Consistent page title + optional breadcrumb + optional top-right action slot.
 * Used at the top of every module's content area.
 */
export default function PageHeader({ title, description, breadcrumb, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted mb-2">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={i === breadcrumb.length - 1 ? "text-body font-medium" : ""}>
                  {crumb}
                </span>
                {i < breadcrumb.length - 1 && <ChevronRight size={14} />}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-semibold text-heading">{title}</h1>
        {description && (
          <p className="text-sm text-body mt-1">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
