## The Wild Oasis – Hotel Management Dashboard 

An opinionated, full‑stack-ish React application for managing a small boutique hotel: cabins, bookings, guests, and operations.  
This project is built as a teaching/learning codebase and showcases modern React patterns, data‑fetching with React Query, and a hosted backend with Supabase.

---
## Demo
 
### Email: admin@admin.io
### Password: 12345678

- **https://wild-oasis29.netlify.app/login

## Features

- **Authentication & Users**
  - Email/password signup and login via Supabase Auth.
  - Protected routes using `react-router-dom` and a `ProtectedRoute` wrapper.
  - Persisted user sessions, logout, and automatic redirect to the login page when unauthenticated.
  - User account management: update full name, avatar image (stored in a Supabase Storage bucket), and password.

- **Cabins Management**
  - View all cabins in a responsive table with prices, capacity, discounts, and images.
  - Create, edit, and delete cabins (with validation via `react-hook-form`).
  - Image upload for cabins.

- **Bookings Management**
  - Bookings table with filtering (by status), sorting (by date and amount), and pagination.
  - View booking details (cabin, guest, dates, status, total price, breakfast, payment status, observations).
  - Create new bookings from a dedicated form.
  - Delete bookings.

- **Check‑in / Check‑out Flow**
  - Check‑in screen that allows confirming a booking, toggling breakfast, and marking as paid.
  - Check‑out action to finalize a stay.
  - “Today’s activity” list of check‑ins and check‑outs.

- **Dashboard & Analytics**
  - High‑level stats (e.g. total bookings, sales, occupancy) using dedicated `Stats` and `Stat` components.
  - Charts built with Recharts (e.g. duration chart, sales chart).
  - Time range filter for dashboard metrics (e.g. last 7 / 30 / 90 days).

- **Hotel Settings**
  - Manage global settings (e.g. minimum nights, maximum guests per booking, breakfast price).
  - All settings stored in a single `settings` row in the Supabase database.

- **UI & UX**
  - App layout with sidebar navigation and header.
  - Dark/light mode with a `DarkModeProvider` context.
  - Reusable UI library: buttons, forms, inputs, selects, tables, modals, pagination, menus, tags, spinners, toasts.
  - Centralized global styles and design tokens using CSS custom properties and `styled-components`.
  - Error boundary with a fallback UI and “try again” behavior.

---

## Tech Stack

- **Frontend**
  - React 18
  - Vite 4
  - `styled-components` for styling
  - `react-hook-form` for form handling and validation
  - `react-hot-toast` for notifications
  - `recharts` for charts and data visualization
  - `react-error-boundary` for error handling UI
  - `@tanstack/react-query` for server state, caching, background refetching, and mutations

- **Backend**
  - Supabase (Postgres + Auth + Storage + Row Level Security)
  - Supabase JS client (`@supabase/supabase-js`)

---

## Project Structure

At a high level:

```text
src/
  main.jsx            # App bootstrap & error boundary
  App.jsx             # Routing, providers, layout shell

  pages/              # Route-level screens
    Dashboard.jsx
    Bookings.jsx
    Booking.jsx
    Cabins.jsx
    Checkin.jsx
    Settings.jsx
    Account.jsx
    Users.jsx
    Login.jsx
    PageNotFound.jsx

  features/           # Feature-oriented modules
    authentication/   # Login, signup, account management, user hooks
    bookings/         # Booking list, detail, create, hooks
    cabins/           # Cabins table, forms, hooks
    check-in-out/     # Check-in/out flows & activity
    dashboard/        # Stats, charts, dashboard layout
    settings/         # Hotel settings and related hooks

  services/           # API clients and Supabase integration
    apiAuth.js
    apiBookings.js
    apiCabins.js
    apiSettings.js
    supabase.js

  context/
    DarkModeContext.jsx

  hooks/              # Generic reusable hooks
    useLocalStorageState.js
    useMoveBack.js
    useOutsideClick.js

  styles/
    GlobalStyles.js   # Global CSS variables and base styles
    styles.js         # Shared styled-components mixins (e.g. `box`)

  ui/                 # Reusable presentational components
    AppLayout.jsx
    Header.jsx
    Sidebar.jsx
    MainNav.jsx
    Button*.jsx
    Form*.jsx
    Table*.jsx
    Modal*.jsx
    Pagination.jsx
    Tag.jsx
    Spinner*.jsx
    DarkModeToggle.jsx
    ProtectedRoute.jsx

  utils/
    helpers.js        # Date helpers & misc utilities
    constants.js      # Constants like `PAGE_SIZE`
```

---


## Data Layer & Supabase

- **Supabase Client**: `src/services/supabase.js`
  - Creates a Supabase client via `createClient(supabaseUrl, supabaseKey)`.
  - **Security note**: In a real production app, you should load these values from environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) instead of hard‑coding them.

- **Auth API**: `src/services/apiAuth.js`
  - `signup({ fullName, email, password })`
  - `login({ email, password })`
  - `getCurrentUser()`
  - `logout()`
  - `updateCurrentUser({ password, fullName, avatar })` – updates metadata & avatar in Supabase Storage.

- **Bookings API**: `src/services/apiBookings.js`
  - `createBooking(newBooking)` – inserts into the `bookings` table.
  - `getBookings({ filter, sortBy, page })` – supports filtering, sorting, and pagination.
  - `getBooking(id)` – loads a single booking with related cabin and guest.
  - `getBookingsAfterDate(date)` / `getStaysAfterDate(date)` / `getStaysTodayActivity()` – used for dashboard statistics and today’s activity.
  - `updateBooking(id, obj)` – updates a booking (e.g. for check‑in/out, payment, breakfast).
  - `deleteBooking(id)` – removes a booking.

- **Cabins API**: `src/services/apiCabins.js`
  - CRUD operations for cabins, including image upload to Supabase Storage.

- **Settings API**: `src/services/apiSettings.js`
  - `getSettings()` – loads the single settings row.
  - `updateSetting(newSetting)` – updates that row by ID.

All these APIs throw `Error` objects on failure; React Query’s `onError` handlers display them through `react-hot-toast`.

---

## Getting Started

### Prerequisites

- Node.js (LTS version recommended, e.g. ≥ 18)
- npm (comes with Node)
- A Supabase project with:
  - Tables: `cabins`, `bookings`, `guests`, `settings`, etc.
  - Auth enabled (email/password).
  - A storage bucket for user avatars and cabin images (e.g. `avatars`, `cabins`).

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` or `.env.local` file in the project root and define:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then update `src/services/supabase.js` to read from `import.meta.env` instead of hard‑coding:

```js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 3. Run the App in Development

```bash
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## Supabase Schema (High‑Level Overview)

The exact schema may differ, but the app expects something similar to:

- **`cabins`**
  - `id`, `name`, `maxCapacity`, `regularPrice`, `discount`, `description`, `image`
- **`guests`**
  - `id`, `fullName`, `email`, `nationality`, `countryFlag`, `nationalID`
- **`bookings`**
  - `id`, `created_at`, `startDate`, `endDate`, `numNights`, `numGuests`
  - `status` (`unconfirmed`, `checked-in`, `checked-out`)
  - `totalPrice`, `cabinPrice`, `extraPrice`
  - `hasBreakfast`, `isPaid`
  - `observations`
  - `cabinId` (FK to `cabins.id`)
  - `guestId` (FK to `guests.id`)
- **`settings`**
  - Single row with global hotel settings (e.g. `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`, `breakfastPrice`).

Supabase Auth’s `users` table is used for staff accounts, and there is typically an `avatars` bucket in Supabase Storage.

---

## Error Handling & UX

- Global **error boundary** in `main.jsx`:
  - Displays a friendly error UI via `ErrorFallback`.
  - Provides a way to reset back to `/`.
- **React Query**:
  - Surfaces server errors through `onError` handlers and `react-hot-toast` notifications.
- **Form validation**:
  - Implemented via `react-hook-form`, with inline error messages passed down to `FormRow` components.

---

## Development Tips

- Use the **React Query Devtools** (enabled in `App.jsx`) to inspect queries, cache, and mutation states.
- The codebase is organized by **feature folders**, which is ideal for scaling; when adding a new domain (e.g. promotions or housekeeping), prefer creating a new folder under `src/features/`.
- Shared, generic UI elements should live under `src/ui/` to remain reusable.

---

## Deployment

The project is built with Vite and outputs a static bundle under `dist/`, which can be deployed to:

- Netlify
- Vercel
- Supabase Hosting
- Any static hosting that can serve a SPA with client‑side routing (remember to configure SPA fallback to `index.html`).

For Netlify, ensure you configure a redirect rule (for example via `netlify.toml` or dashboard) so that all paths route to `/index.html`.

---

## License

This project is part of an educational React course. If you are using it as a template, you are generally free to adapt it for learning and internal projects. For any commercial use, please ensure you comply with the original course’s license and terms.


