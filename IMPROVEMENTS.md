# Improvements

Backlog of prototype-page and app-wide improvements ordered from **high** to **low** priority.

## Page-specific improvements

### Home

- Treat the catalog as playground chrome, not a fourth product UI
  - Single source of truth for prototype title, path, and description (home cards and header nav should not duplicate lists)
- Clarify that each card is a separate prototype (copy and layout can stay unique to the catalog)
- Optional: status/badge on cards (prototype vs WIP) without pulling feature styles into home

### Campaign Dashboard

- Align list header with API totals (`loaded of total`) and fix tests that still expect `Campaigns (20 of 100)`
- Use `pagination.statusCounts` for status filter counts instead of counting only loaded pages
- Debounce search (reuse `useDebounce`) so each keystroke does not hit the API
- Retry failed loads with React Query `refetch` instead of `window.location.reload()`
- Campaign detail as a page-owned drawer or route (click is currently a `console.log`)
  - Detail chrome can use a page-level `CampaignButton` / density variants rather than new global `Button` themes
- Debatable later: virtualize the list if mock volume grows well past ~100 rows

### Analytics Dashboard

- Make range / period / sort **honest**: MSW (or a later API) should return different series; client dropdowns should not be no-ops
- Unify widget fetching on React Query (drop parallel `useFetch` cache for this page)
- Honor widget `size` in the grid, or remove unused size options from the widget config
- Extract table behavior that is unique to this prototype into page-owned table UI
  - Keep current server-side search, sort, and pagination
  - Add only what this dashboard needs next: row selection, column visibility, export (do not grow a shared “god table”)
- Extra chart types (heatmap, treemap, gauge) belong here or in a new viz prototype, not in `components/ui`
- Delete duplicate `utils/columnConfig.tsx` (same exports as `configs/productTableConfig.tsx`)
- Add widget tests: loading, error, refresh, table pagination/sort/search

### Dynamic Filter

- Validate bracket balance; disable or reject invalid grouping
- Serialize conditions to a real query AST / JSON (and optionally apply it to another prototype’s data)
- Show schema `label` in the UI instead of raw `name`
- Move fetch and condition state into a page hook; prefer React Query for schema/conditions
- Keyboard and role support on bracket toggles (currently click-only `div`s)
- Page-specific controls (`FilterAddButton`, denser dropdowns) if shared `Button` / `DropdownList` variants are the wrong density

### Advanced Data Table (New Prototype)

- Paginated table with search and **server-side** sort (one column first; multi-column sort if it stays clear)
- Row selection: none / single / multi, with a selected-count bar
- Inline edit on a few columns (text, number, status) with simple validation and cancel/save
- Column visibility (show/hide); drag-to-reorder only if it does not fight sort/resize
- Bulk action on the selection (e.g. archive / export selected)
- CSV export of the current filtered set (Excel optional later)
- Distinct UI from Analytics’ product table — reuse MSW/query **patterns**, not that page’s components
- Empty, loading, and error states

### Reports (New Prototype)

Build **after** Dynamic Filter is refined and the Advanced Data Table prototype exists. Slightly lower priority than those two; this page composes them rather than inventing filter/table behavior.

- One mocked dataset (e.g. campaign or product report rows) driving **filter, table, and charts together**
- Dynamic filter box (query builder) at the top; applying it refilters the same dataset — reuse the filter prototype’s condition/schema patterns, restyle for this page
- Advanced table of the filtered rows (pagination, sort, column visibility as already proven on the table prototype)
- A few charts (e.g. trend + breakdown) derived from the **current filtered set**, not a separate unfiltered API
- Empty state when the filter matches nothing; loading while the mock query runs
- Optional later: save a report (name + filter JSON); export filtered table (CSV)
- Do not import Campaign/Analytics/Filter page components — copy patterns into `features/reports/` with Reports-specific wrappers

### Form Builder (New Prototype)

- Canvas of fields the user can add, remove, and reorder (drag-and-drop if it stays reliable; move up/down is enough for v1)
- Field types: text, number, select, checkbox, date — backed by shared inputs, styled for this page
- Per-field label, required flag, and one or two validation rules (required, min/max, pattern)
- Conditional visibility: show field B when field A equals a value
- Live preview / fill-out mode next to the builder
- Save as a named template; load a template back into the canvas
- Submit in preview: validate, then show a result payload (JSON) — no real backend required
- Unsaved-change and invalid-rule feedback

### User Management (New Prototype)

- User list with search, status/role filters, and pagination
- User row: name, email, role, status; click opens a detail panel or page (not a new global profile system)
- Create / edit user form (page-owned fields on shared inputs)
- Roles: a small fixed set (e.g. Admin, Editor, Viewer) with a simple permissions matrix you can view, not a full IAM product
- Activity log for a user (mocked events: login, edit, role change)
- Bulk select: activate / deactivate / assign role
- Empty, loading, and error states; confirm before destructive bulk actions

### Performance Dashboard (New Prototype)

- Summary metrics: LCP, INP, CLS (and optionally TTFB/FCP) with pass / needs-improvement / poor
- One time-series chart for a selected vital over a range (24h / 7d / 30d)
- Alert list: threshold, current value, severity; toggle or edit threshold in-page
- Mock “current page” or route selector so the dashboard feels like monitoring, without real RUM
- Loading, empty (no samples), and error states
- Do not add production APM/Sentry — this is a viz/ops **UI** prototype

## App-wide improvements

### Shared primitives (Radix + page extensions)

- Split layers: Radix (or Headless) unstyled primitives → shared styled components with **few** variants → optional per-page wrappers (`MButton`) that add size/theme and classes
- Pass `className` through every shared component so pages can override without forking
- Do not add page-only themes to the shared `Button` / `Card` enums
- Expand the shared kit only with **generic, a11y-heavy** primitives most prototypes can reuse
  - Feedback: toast, alert, confirm dialog
  - Inputs: date/time, file, combobox; rich text only when a prototype needs it
  - Navigation: tabs, pagination, breadcrumbs, command palette (basic variants only)
  - Layout primitives: sidebar, split / resizable panels (unstyled behavior; look stays per page)
  - Loading: spinner, progress, extra skeleton shapes
  - Empty-state slot (illustration/CTA supplied by the page)
- Layout chrome for the playground (`AppHeader`, `PageLayout`) stays separate from prototype visual language
- Storybook for **shared primitives only**, not every page widget
- Accessibility pass on the shared layer (WCAG 2.1 AA): focus, keyboard, dialog traps, live regions — pages inherit this instead of reimplementing it

### Architecture and data

- Error boundary around routes with a simple fallback (playground-level, not product monitoring)
- Lazy-load each prototype route so D3 and large page bundles are not in the initial load; memoize heavy widgets where profiling shows it
- Dead code: unused campaign dashboard state types; unused `total` until the header uses it
- Optional later: page-local store (e.g. Zustand) only if one prototype’s UI state outgrows React state — not a global app store
- Optional later: per-page theme (including dark) or i18n on a prototype that needs it — not one app-wide switch
- Optional later: error tracking (Sentry) only if you start hosting this beyond local demos

### Data fetching

- Two modes behind **TanStack Query** + shared types; pages never import MSW or Firebase
  - `VITE_DATA_SOURCE=msw | firebase` — do not mix in one session
  - Same query keys, shapes, loading / empty / error in both modes
  - Drop or isolate `useFetch`
- **Offline (MSW)** — default for local, preview, and tests
  - Worker in dev **and** `vite preview`
  - Handlers + fixtures per prototype; realistic status, pagination, filters, `delay`
  - `errorHandlers` for tests; `setupServer` only (no network)
  - Warn on unhandled requests; keep `mockServiceWorker.js` in sync
- **Online (Firebase)** — live demo / persistence
  - Firestore (Functions only for heavy aggregation)
  - Env config (`VITE_FIREBASE_*`); no secrets in git; security rules required
  - Adapters (`fetchCampaigns`) map Firestore → same types as MSW (including cursors)
  - Paginate; add indexes for composite filters; seed to match fixtures
  - `onSnapshot` only if the prototype needs live data; watch listener cost

### Tooling and quality

- Lint TypeScript: ESLint currently targets `js`/`jsx` only
- Fix entry/config nits: `index.html` → `/src/index.tsx`; Vite `defineConfig` from `vite`; Prettier script to match `.prettierrc`
- CI: lint + test + build on PR
- Git hooks for lint (and optionally tests) on commit
- Bundle analysis when prototype pages start to bloat
- Coverage provider wired for `npm run test:coverage` if that script is meant to work out of the box

### Playground shell and scaffolding

- Shared route registry consumed by header + home
- Scaffold a new prototype (CLI or script): feature folder, page, `ui/` for wrappers, MSW handlers, home/header entry
- Shared hooks/utils that are not page-owned: `useMediaQuery`, `useLocalStorage`, date/currency helpers
- Desktop nav links; keep the dropdown for small viewports if useful
- Optional later: dedicated docs site if Storybook is not enough; React DevTools / state time-travel only if a prototype needs it

### Testing (beyond a single page)

- Playwright for a few **smoke paths** (open each prototype, one critical interaction), not a full product E2E suite
- Shared primitive tests (Button, Dialog, Dropdown) so page wrappers can stay thin
