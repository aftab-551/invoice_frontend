# Super Cheap Mechanic App - Frontend

This is the frontend application for the Super Cheap Mechanic App, a comprehensive dashboard for managing customers, products, schedules, and transactions. It is built with a focus on performance, accessibility, and maintainability using modern React patterns.

## 🚀 Tech Stack

-   **Framework:** [React](https://react.dev/) (v19)
-   **Build Tool:** [Vite](https://vitejs.dev/) - fast build tool and dev server.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) - utility-first CSS framework.
-   **UI Library:** [Radix UI](https://www.radix-ui.com/) - unstyled, accessible components (Dialog, Popover, Dropdown, etc.).
-   **Routing:** [React Router](https://reactrouter.com/) (v6) - client-side routing.
-   **Data Fetching & State:** [TanStack Query](https://tanstack.com/query/latest) - async state management for caching and updating server state.
-   **Forms:** [React Hook Form](https://react-hook-form.com/) - performant forms.
-   **Validation:** [Zod](https://zod.dev/) - schema-first validation alongside forms.
-   **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/).
-   **Utilities:** `date-fns` for date formatting, `clsx` and `tailwind-merge` for dynamic class names.

## 📐 Architecture & Design Patterns

The application follows a **Container-Presentation** pattern and emphasizes separation of concerns:

### 1. **Container vs. Presentational Components**

-   **Containers (`src/containers/`)**: These components handle business logic, state management, and data fetching (e.g., `CustomerContainer.jsx`). They interact with React Query hooks and pass data down to presentational components.
-   **Components (`src/components/`)**: These are purely presentational. They receive data and event handlers via props and focus solely on rendering the UI (e.g., `CustomerForm.jsx`, `DataTable.jsx`).

### 2. **Service Layer**

-   **API Services (`src/api/`)**: All network requests are encapsulated in service files (e.g., `customerService.js`). This layer abstracts the `fetch` calls, handling headers, JSON parsing, and basic error throwing.
-   The services are then verified and consumed by **TanStack Query** hooks (`useQuery`, `useMutation`) within the containers.

### 3. **Layouts**

-   **`DashboardLayout.jsx`**: Wraps authenticated routes. It manages the responsive `Sidebar` (desktop) and `MobileSidebar`, along with the `Navbar`. It uses `Outlet` to render the nested page content.

### 4. **Forms & Validation**

-   Forms are built using `react-hook-form` for state management.
-   Validation schemas are defined in `src/lib/formValidations.js` using **Zod**.
-   The containers integrate the schema with the form using `@hookform/resolvers/zod`.

## 📂 Folder Structure Breakdown

```bash
frontend/
├── src/
│   ├── api/            # Wrapper functions for API calls (fetch/axios)
│   ├── components/
│   │   ├── common/     # Shared components (DataTable, Loaders)
│   │   ├── ui/         # Generic UI primitives (Button, Input, Dialog - often wrapping Radix UI)
│   │   ├── auth/       # Authentication related components (ProtectedRoute)
│   │   └── [feature]/  # Feature-specific components (e.g., customers/CustomerForm.jsx)
│   ├── containers/     # Smart components (State, Effects, Data Fetching)
│   ├── hooks/          # Custom React hooks (e.g., useGetWindowWidth)
│   ├── layouts/        # Layout wrappers (DashboardLayout)
│   ├── lib/            # Utilities, constants, and Zod schemas
│   │   ├── utils.js
│   │   ├── constants.js
│   │   └── formValidations.js
│   ├── pages/          # Page entry points (usually export a Container)
│   ├── App.jsx         # App root & Routing configuration
│   └── main.jsx        # Entry point, providers setup (QueryClientProvider, etc.)
└── package.json
```

## ✨ Key Features & Setup

### Authentication

-   Protected routes are wrapped with `<ProtectedRoute />`.
-   Token management and auth state are handled to redirect users between `/login` and the dashboard.

### Dashboard Modules

-   **Customers**: View list, Create new (Modal form), Edit.
-   **Products**: Inventory management with pricing.
-   **Schedules**: Appointment booking and viewing.
-   **Transactions**: Sales records and history.

## 🛠️ Development Workflow

1.  **Start the server**: `npm run dev`
2.  **Linting**: `npm run lint` (uses ESLint with React Refresh support).
3.  **Building**: `npm run build` (outputs to `dist/`).

## 🎨 Styling System

-   **Global Styles**: `index.css` contains Tailwind directives and base styles.
-   **Component Styling**: Uses utility classes directly.
-   **Conditional Styling**: Uses `cn()` utility (combining `clsx` and `tailwind-merge`) to merge default and prop-based classes safely, especially in `components/ui`.
