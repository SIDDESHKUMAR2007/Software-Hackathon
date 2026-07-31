import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import { NotificationsProvider } from "./context/NotificationsContext";

export default function App() {
  return (
    <NotificationsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Other modules (Members, Events, Tasks) will be added here
              by teammates using the same Layout + design system. */}
        </Route>
      </Routes>
    </NotificationsProvider>
  );
}
