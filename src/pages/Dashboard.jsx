import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

/**
 * Placeholder Dashboard route.
 * This page exists only so the shared Layout has a home route to render.
 * Replace with the real Dashboard module.
 */
export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your community activity."
      />
      <Card>
        <p className="text-sm text-body">
          This module has not been built yet. Visit{" "}
          <span className="text-heading font-medium">Notifications</span> in
          the sidebar to view the completed module.
        </p>
      </Card>
    </div>
  );
}
