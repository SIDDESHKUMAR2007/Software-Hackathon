# Student Community Tracking Portal

Frontend-only shell (React + Vite + Tailwind + React Router + Lucide) with a
shared design system, plus the **Notifications module** built on top of it.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The sidebar links to `/` (placeholder Dashboard)
and `/notifications` (the completed module).

## Folder structure

```
src/
  components/
    ui/            Shared design-system components used by every module
      Card.jsx
      Button.jsx
      Input.jsx
      Badge.jsx
      PageHeader.jsx
      SegmentedTabs.jsx
      EmptyState.jsx
    layout/         App shell used by every page
      Sidebar.jsx
      Navbar.jsx
      Layout.jsx
    notifications/   Notification-module-specific pieces
      NotificationItem.jsx
      notificationTypes.js
      notificationData.js   (placeholder data only — no backend)
  pages/
    Dashboard.jsx     Placeholder home route
    Notifications.jsx Notifications module page
  App.jsx             Route definitions
  index.css           Tailwind directives + base styles
```

## Adding a new module (for teammates)

1. Create `src/pages/YourModule.jsx`.
2. Build it using the shared components in `src/components/ui/` — don't
   restyle `Card`, `Button`, `Input`, etc. If a component doesn't exist yet
   for something you need, add it to `ui/` so others can reuse it too.
3. Wrap the page content with `PageHeader` for the title/breadcrumb/action
   button, exactly like `Notifications.jsx` does.
4. Register the route in `src/App.jsx` inside the existing `<Layout />`
   route, and add a matching entry to `NAV_ITEMS` in
   `src/components/layout/Sidebar.jsx` (and the mobile nav list in
   `Layout.jsx`).
5. Do not introduce new colors, fonts, spacing values, or border-radius
   outside `tailwind.config.js` — extend that file if a token is genuinely
   missing, rather than hardcoding a one-off value in a component.

## Design tokens

Defined in `tailwind.config.js`: `primary`, `primary-hover`, `background`,
`border`, `heading`, `body`, `success`, `warning`, `danger`. Font is Inter,
loaded in `index.html`.

## Notes

- Frontend UI only — no backend, API, auth, or state-management library.
  `notificationData.js` is static placeholder data.
- Mark-all-as-read and per-item read/unread toggling are local component
  state (`useState`), not persisted anywhere.
