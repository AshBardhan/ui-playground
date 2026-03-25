# UI Playground

A modern React application showcasing reusable UI components and advanced filtering patterns, built with TypeScript, Vite, and Tailwind CSS. This playground demonstrates feature-based architecture following atomic design principles.

## 📝 Description

UI Playground is a creative sandbox for building and experimenting with various React UI components and features. The project emphasizes clean architecture, type safety, and component reusability while implementing real-world patterns like dynamic filtering, data visualization, and state management.

## ✨ Implemented Features

- **Campaign Dashboard** - Full-featured campaign management interface
  - Infinite scroll with React Query for efficient data loading
  - Real-time campaign listing with mock data
  - Advanced filtering by status and search terms
  - URL-based filter state (shareable/bookmarkable)
  - Campaign metrics display (impressions, clicks, conversions, spend)
  - Responsive two-column layout (2/3 list, 1/3 filters)
  - Mobile-first design with modal filters on small screens
  - Loading states, error handling, and empty states
  
- **Analytics Dashboard** - Data visualization and metrics tracking
  - Interactive D3.js-based charts (Area, Bar, Line, Pie)
  - Real-time metrics with refresh capability
  - Responsive grid layout adapting to screen sizes
  - Data tables with search and sorting
  - Widget-based dashboard architecture
  - Mock data generation for realistic previews
  
- **Dynamic Filter System** - Configurable query builder
  - Dynamic field selection from schema
  - Multiple operator support (equals, not equals, in, etc.)
  - Logical grouping with brackets
  - AND/OR logical operators
  - Both configuration and read-only modes
  - Async value fetching for select fields
  
- **Page Layout System** - Compound component pattern
  - Consistent page structure across all features
  - Sticky page headers below main navigation
  - Containerized scrollable content areas
  - Flexible composition with PageLayout, PageHeader, PageContent
  
- **Shared UI Component Library**
  - Generic, reusable components (Badge, Button, Card, Metric, Text, etc.)
  - Type-safe generic components (FilterGroup)
  - Consistent design system with Tailwind CSS
  - Accessible components using Headless UI
  - Dark theme support for navigation components
  
- **Testing Infrastructure**
  - Component unit tests
  - Integration tests for pages
  - MSW (Mock Service Worker) for API mocking
  - Test coverage for critical user flows

## 🛠️ Tech Stack

### Core

- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type safety and better DX
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing
- **TanStack Query (React Query)** - Powerful data fetching and caching

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **clsx** - Conditional className utility
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful icon library

### Data Visualization

- **D3.js** - Low-level visualization primitives for custom charts

### Testing

- **Vitest 3** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **MSW 2** - API mocking for tests and development
- **@testing-library/jest-dom** - Custom matchers

### Dev Tools

- **ESLint 9** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast Refresh and optimizations

## 📁 File Structure

```text
ui-playground/
├── public/                          # Static assets
│   └── mockServiceWorker.js        # MSW service worker for browser
│
├── src/
│   ├── App.tsx                     # Root component with routing and query setup
│   ├── App.css                     # Global styles
│   ├── index.tsx                   # Application entry point
│   ├── setupTests.ts               # Test environment configuration
│   │
│   ├── features/                   # Feature modules (domain-driven) with feature-specific page, components, types and test cases
│   │   ├── analytics-dashboard/    # Analytics and data visualization feature
│   │   ├── campaign-dashboard/     # Campaign management feature
│   │   ├── dynamic-filter/         # Dynamic filtering feature
│   │   └── home/                   # Landing page with feature navigation
│   │
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # Reusable UI primitives (Badge, Button, Card, Text, etc.)
│   │   └── layout/                 # Layout components (AppHeader, PageLayout, PageHeader, PageContent)
│   │
│   ├── mocks/                      # API mocking with MSW
│   │   ├── handlers/               # API endpoint handlers
│   │   ├── browser.ts              # MSW browser setup
│   │   ├── server.ts               # MSW server setup (tests)
│   │   └── errorHandlers.ts        # Error scenario handlers
│   │
│   ├── hooks/                      # Shared custom hooks
│   └── utils/                      # Utility functions
│
├── dist/                           # Production build output
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── vitest.config.ts                # Vitest test configuration
└── eslint.config.ts                # ESLint configuration
```

### Architecture Principles

#### Feature-Based Organization

Each feature is self-contained with its own components, types, data, and tests. This makes the codebase:

- **Scalable** - Easy to add new features without affecting existing ones
- **Maintainable** - Related code lives together
- **Testable** - Features can be tested in isolation

#### Atomic Design (Adapted)

**Shared Components** (`/components/ui/`):

- Pure, reusable UI primitives
- No business logic or feature-specific dependencies
- Generic and type-safe (e.g., `FilterGroup<T>`)

**Feature Components** (`/features/*/components/`):

- Feature-specific compositions
- Can use shared UI components and contain business logic
- May manage local state

**Pages** (`/features/*/Page.tsx`):

- Route-level components
- Data fetching and global state
- Compose feature components and layouts

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
# Run tests once
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Lint Code

```bash
npm run lint
```

## 🔮 Future Implementations & Enhancements

### Planned Features

- **Performance Dashboard** - System monitoring and performance metrics
  - Real-time performance metrics visualization
  - Web Vitals tracking and display
  - Alert configuration and notifications
  - Historical trend analysis with time-series charts
  
- **User Management** - User administration interface
  - User list with search and filtering
  - Role-based access control (RBAC)
  - User activity logs
  - Bulk operations
  
- **Form Builder** - Dynamic form generation
  - Drag-and-drop field arrangement
  - Field validation rules configuration
  - Conditional field visibility
  - Form templates and presets
  - Form submission handling
  
- **Advanced Data Table** - Enhanced table component
  - Server-side sorting and pagination
  - Multi-column sorting
  - Row selection (single/multi)
  - Inline editing with validation
  - Column visibility and reordering
  - Export to CSV/Excel
  - Bulk actions

### Technical Enhancements

- **State Management** - Add Zustand for complex global state
- **Real API Integration** - Connect to backend APIs (replacing MSW in production)
- **Authentication** - User login, JWT tokens, and protected routes
- **Dark Mode** - Full application theme switching capability
- **Internationalization (i18n)** - Multi-language support with react-i18next
- **Storybook** - Component documentation and interactive playground
- **E2E Testing** - Playwright integration for end-to-end testing
- **Performance Optimization** - Code splitting, lazy loading, React.memo
- **CI/CD Pipeline** - GitHub Actions for automated testing and deployment
- **Accessibility Audit** - WCAG 2.1 AA compliance verification and fixes
- **Error Boundary** - Global error handling with fallback UI
- **Monitoring** - Sentry or similar for error tracking

### Component Library Expansion

- **Advanced Inputs** - Date pickers, time pickers, file uploads, rich text editors
- **Data Visualization** - More chart types (heatmap, treemap, gauge)
- **Feedback Components** - Toast notifications, alerts, confirmation dialogs
- **Navigation** - Breadcrumbs, tabs, command palette, pagination
- **Layout Components** - Sidebar navigation, split panels, resizable containers
- **Loading States** - Progress bars, spinners, skeleton screens (expand current set)
- **Empty States** - Contextual empty state illustrations and CTAs

### Developer Experience

- **Custom Hooks Library** - Expand with more reusable hooks (useLocalStorage, useMediaQuery, etc.)
- **Utility Functions** - Date/time formatting, currency formatting, validation helpers
- **Debugging Tools** - React DevTools integration, state time-travel
- **Code Generation CLI** - Script for scaffolding features/components/pages
- **Documentation Site** - Dedicated docs with component examples and API references
- **Git Hooks** - Pre-commit hooks for linting and testing
- **Bundle Analysis** - Visualize and optimize bundle size

---

Built with ❤️ using modern React patterns and best practices
