import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import NotificationDrawer from './components/common/NotificationDrawer';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AttendanceManagementPage from './pages/admin/AttendanceManagementPage';
import AttendanceReportsPage from './pages/admin/AttendanceReportsPage';
import SessionMonitorPage from './pages/admin/SessionMonitorPage';
import AttendanceSettingsPage from './pages/admin/AttendanceSettingsPage';

// Coordinator Pages
import CoordinatorDashboardPage from './pages/coordinator/CoordinatorDashboardPage';
import LiveSessionPage from './pages/coordinator/LiveSessionPage';
import StudentRosterPage from './pages/coordinator/StudentRosterPage';
import CoordinatorHistoryPage from './pages/coordinator/CoordinatorHistoryPage';

// Student Pages
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import StudentHistoryPage from './pages/student/StudentHistoryPage';
import StudentCertificatePage from './pages/student/StudentCertificatePage';

import { 
  initialCommunities, 
  initialStudents, 
  initialEvents, 
  initialAttendanceRecords, 
  initialNotifications, 
  initialSettings 
} from './data/mockData';

export default function App() {
  const [role, setRole] = useState("admin"); // 'admin' | 'coordinator' | 'student'

  // Global State
  const [communities, setCommunities] = useState(initialCommunities);
  const [students, setStudents] = useState(initialStudents);
  const [events, setEvents] = useState(initialEvents);
  const [records, setRecords] = useState(initialAttendanceRecords);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [settings, setSettings] = useState(initialSettings);

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleUpdateRecord = (id, fields) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, ...fields } : r));
  };

  const handleDeleteRecord = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleScanAttendance = (newRecord) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
        
        {/* Reusable Sidebar */}
        <Sidebar role={role} />

        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Reusable Top Navbar */}
          <Navbar
            role={role}
            setRole={setRole}
            notificationsCount={unreadCount}
            onOpenNotifications={() => setIsNotifOpen(true)}
          />

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              {/* ADMIN ROUTES */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage students={students} events={events} records={records} settings={settings} />} />
              <Route path="/admin/management" element={<AttendanceManagementPage records={records} onUpdateRecord={handleUpdateRecord} onDeleteRecord={handleDeleteRecord} events={events} communities={communities} />} />
              <Route path="/admin/reports" element={<AttendanceReportsPage events={events} records={records} communities={communities} />} />
              <Route path="/admin/sessions" element={<SessionMonitorPage events={events} />} />
              <Route path="/admin/settings" element={<AttendanceSettingsPage settings={settings} onSaveSettings={handleSaveSettings} />} />

              {/* COORDINATOR ROUTES */}
              <Route path="/coordinator/dashboard" element={<CoordinatorDashboardPage events={events} records={records} />} />
              <Route path="/coordinator/live-session" element={<LiveSessionPage events={events} />} />
              <Route path="/coordinator/roster" element={<StudentRosterPage records={records} onUpdateRecord={handleUpdateRecord} />} />
              <Route path="/coordinator/history" element={<CoordinatorHistoryPage events={events} />} />

              {/* STUDENT ROUTES */}
              <Route path="/student/dashboard" element={<StudentDashboardPage student={students[0]} events={events} records={records} onScanAttendance={handleScanAttendance} />} />
              <Route path="/student/history" element={<StudentHistoryPage records={records} studentId={students[0].id} />} />
              <Route path="/student/certificates" element={<StudentCertificatePage student={students[0]} />} />

              {/* DEFAULT FALLBACK ROUTE */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={role === 'admin' ? '/admin/dashboard' : role === 'coordinator' ? '/coordinator/dashboard' : '/student/dashboard'}
                    replace
                  />
                }
              />
            </Routes>
          </main>

        </div>

        {/* Reusable Notification Drawer */}
        <NotificationDrawer
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          notifications={notifications}
          onClearAll={() => setNotifications([])}
          onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
        />

      </div>
    </>
  );
}
