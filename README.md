# Community Portal — Events Module

React + Tailwind CSS implementation of the Events module (Dashboard, Event List,
Event Details, Create Event, Registration, Participant Management, Task
Management, Communication, Feedback, Certificates). Runs entirely on mock
in-memory data — no backend required, ready to wire up to an API later.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  EventModuleApp.jsx   All event-module components (single file for easy review)
  main.jsx             React entry point
  index.css            Tailwind directives
index.html
tailwind.config.js
postcss.config.js
vite.config.js
package.json
```

## Notes

- All data (events, participants, tasks, announcements, feedback) is mock
  data defined at the top of `EventModuleApp.jsx` — swap the `useState`
  initializers for API calls when your backend is ready.
- Icons come from `lucide-react`.
- Colors are set with Tailwind arbitrary values (e.g. `bg-[#0F4C46]`) rather
  than a custom theme, so no extra Tailwind config is needed beyond content
  paths.
