import { useMemo, useState } from "react";
import { CheckCheck, Search as SearchIcon, BellOff } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SegmentedTabs from "../components/ui/SegmentedTabs";
import EmptyState from "../components/ui/EmptyState";
import NotificationItem from "../components/notifications/NotificationItem";
import { useNotifications } from "../context/NotificationsContext";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
];

export default function Notifications() {
  const { notifications, unreadCount, toggleRead, markAllAsRead } =
    useNotifications();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) => {
        if (filter === "unread") return !n.read;
        if (filter === "read") return n.read;
        return true;
      })
      .filter((n) => {
        const query = search.trim().toLowerCase();
        if (!query) return true;
        return (
          n.title.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
        );
      });
  }, [notifications, filter, search]);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated on club activity, events, and account alerts."
        breadcrumb={["Home", "Notifications"]}
        action={
          <Button
            variant="secondary"
            icon={CheckCheck}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        }
      />

      <Card padded={false} className="overflow-hidden">
        {/* Toolbar: search + filter tabs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border">
          <div className="w-full sm:max-w-xs">
            <Input
              icon={SearchIcon}
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <SegmentedTabs
            tabs={[
              { ...FILTERS[0], count: notifications.length },
              { ...FILTERS[1], count: unreadCount },
              {
                ...FILTERS[2],
                count: notifications.length - unreadCount,
              },
            ]}
            active={filter}
            onChange={setFilter}
          />
        </div>

        {/* Notification list */}
        <div className="p-4">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              icon={BellOff}
              title="No notifications found"
              description={
                search
                  ? `No notifications match "${search}".`
                  : "You're all caught up — new notifications will appear here."
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onToggleRead={toggleRead}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
