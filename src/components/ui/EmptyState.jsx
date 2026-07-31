/**
 * EmptyState
 * Shown when a list/table has no matching results. Reusable across modules.
 */
export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {Icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary-soft ring-1 ring-inset ring-primary/20 mb-4">
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-sm font-semibold text-heading">{title}</h3>
      {description && (
        <p className="text-sm text-body mt-1 max-w-sm">{description}</p>
      )}
    </div>
  );
}
