# UI Playground

A modern React application showcasing reusable UI components and advanced filtering patterns, built with TypeScript, Vite, and Tailwind CSS. This playground demonstrates feature-based architecture following atomic design principles.

## 📝 Description

UI Playground is a creative sandbox for building and experimenting with various React UI components and features. The project emphasizes clean architecture, type safety, and component reusability while implementing real-world patterns like dynamic filtering, data visualization, and state management.

## ✨ Implemented Features

- **Campaign Dashboard** - Full-featured campaign management interface
  - Real-time campaign listing with mock data
  - Advanced filtering by status and search terms
  - Campaign metrics display (impressions, clicks, conversions, spend)
  - Responsive card-based layout
  - Loading states and error handling
  
- **Dynamic Filter System** - Configurable query builder
  - Dynamic field selection from schema
  - Multiple operator support (equals, not equals, in, etc.)
  - Logical grouping with brackets
  - AND/OR logical operators
  - Both configuration and read-only modes
  - Async value fetching for select fields
  
- **Shared UI Component Library**
  - Generic, reusable components (Badge, Button, Card, Metric, etc.)
  - Type-safe generic components (FilterGroup)
  - Consistent design system with Tailwind CSS
  - Accessible components using Headless UI
  
- **Testing Infrastructure**
  - Component unit tests
  - Integration tests for pages
  - MSW (Mock Service Worker) for API mocking
  - 100% test coverage for critical paths

## 🛠️ Tech Stack

### Core

- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type safety and better DX
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **clsx** - Conditional className utility
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful icon library

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
│   ├── App.tsx                     # Root component with routing
│   ├── App.css                     # Global styles
│   ├── index.tsx                   # Application entry point
│   ├── setupTests.ts               # Test environment configuration
│   │
│   ├── features/                   # Feature modules (domain-driven) with feature-specific page, components, types and test cases
│   │   ├── campaign-dashboard/     # Campaign management feature
│   │   ├── dynamic-filter/         # Dynamic filtering feature
│   │   └── home/                   # Landing page feature (with feature navigation)
│   │
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # Reusable UI primitives (Atoms & Molecules) with variants
│   │   └── layout/                 # Layout components
│   │
│   ├── mocks/                      # API mocking with MSW
│   │   ├── handlers/               # API endpoint handlers
│   │   ├── browser.ts              # MSW browser setup
│   │   ├── server.ts               # MSW server setup (tests)
│   │   └── errorHandlers.ts        # Error scenario handlers
│   │
│   ├── hooks/                      # Shared custom hooks (prepared for future)
│   └── lib/                        # Utility functions and helpers (prepared)
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

- **Analytics Dashboard** - Data visualization and metrics tracking
  - Chart integration (Chart.js or Recharts)
  - Date range filtering
  - Export functionality
  - Real-time data updates
- **Performance Dashboard** - System monitoring and performance metrics
  - Performance metrics visualization
  - Alert configuration
  - Historical trend analysis
- **Form Builder** - Dynamic form generation
  - Drag-and-drop field arrangement
  - Validation rules configuration
  - Form templates
- **Data Table** - Advanced table component
  - Sorting and pagination
  - Row selection
  - Inline editing
  - Column customization

### Technical Enhancements

- **State Management** - Add Zustand or Redux Toolkit for global state
- **API Integration** - Connect to real backend APIs
- **Authentication** - User login and protected routes
- **Dark Mode** - Theme switching capability
- **Internationalization (i18n)** - Multi-language support
- **Storybook** - Component documentation and playground
- **E2E Testing** - Playwright or Cypress integration
- **Performance Monitoring** - Web Vitals tracking
- **CI/CD Pipeline** - Automated testing and deployment
- **Accessibility Audit** - WCAG 2.1 compliance verification

### Component Library Expansion

- **Advanced Inputs** - Date pickers, file uploads, rich text editors
- **Data Visualization** - Charts, graphs, sparklines
- **Feedback Components** - Notifications, toasts, modals, alerts
- **Navigation** - Breadcrumbs, tabs, sidebars, pagination
- **Layout Components** - Grid system, responsive containers

### Developer Experience

- **Custom Hooks Library** - Reusable hooks for common patterns
- **Utility Functions** - Date formatting, validation, data transformation
- **Debugging Tools** - Component inspector, state visualizer
- **Code Generation** - CLI for scaffolding features/components
- **Documentation Site** - Auto-generated docs from TypeScript types

---

Built with ❤️ using modern React patterns and best practices
