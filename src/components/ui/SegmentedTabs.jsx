/**
 * SegmentedTabs
 * Pill-style filter tabs, e.g. All / Unread / Read.
 * tabs: [{ label, value, count }]
 */
export default function SegmentedTabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-raised p-1">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "bg-brand-gradient text-white"
                : "text-body hover:bg-white/5 hover:text-heading"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-muted"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
