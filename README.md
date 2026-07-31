# Community Portal

The Community module (All Communities, My Communities, Create Community, Join
Requests, Members, Events, Announcements, Achievements, Settings) built with
React + Tailwind CSS + lucide-react icons.

## Run it in VS Code

1. Open this folder in VS Code (`File > Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. It should open automatically at **http://localhost:5173** (or click the
   link Vite prints in the terminal).

## Project structure

```
community-portal/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx        # The whole Community module (all 9 submodules)
    └── index.css      # Tailwind directives
```

## Notes

- Everything currently runs on **mock/in-memory data** defined at the top of
  `App.jsx` (`seedCommunities`, `seedMembers`, `seedEvents`, etc.). Swap these
  out for real API calls when you wire up your backend — the state setters
  (`setCommunities`, `setMembers`, …) and handlers (`onToggleJoin`,
  `onDecide`, `onRsvp`, `onCreate`) are already shaped to drop real requests
  into.
- No routing library is used — navigation between the 9 sections is just
  local state (`active`) in `App.jsx`. Swap in `react-router` if this needs
  to live at its own URLs inside a larger app.
- Requires **Node.js 18+**.

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```
