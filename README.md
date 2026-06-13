# Star Industries

A modern React (Vite) front-end for showcasing Star Industries' range of industrial uniforms, footwear, and accessories. The site highlights detailed subcategories, high-resolution imagery, and product specifications tailored for sectors like automotive, hospitality, government, and education.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Environment Variables](#environment-variables)
6. [Assets & Media](#assets--media)
7. [Conventions](#conventions)
8. [License](#license)

## Tech Stack

- **Frontend:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** Tailwind CSS + custom CSS modules
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** `react-router-dom`
- **Backend:** Node.js + Express (see `server/`)
- **Database:** PostgreSQL (via `pg`), schema/migrations in `server/src/scripts/migrate.js`

## Project Structure

```
Star Industries/
├── public/                      # Static assets served by the frontend
├── src/
│   ├── App.jsx                  # Root application shell & routing
│   ├── main.jsx                 # Vite entry point
│   ├── styles/                  # Global Tailwind + custom styles
│   ├── components/              # Reusable UI components
│   └── Pages/                   # Route-level views (Home, Products, Admin, ...)
├── server/
│   ├── package.json             # Server scripts
│   └── src/
│       ├── index.js             # Express app entry (mounts /api routes and serves /uploads)
│       ├── routes/              # auth.js, products.js, contact.js
│       ├── middleware/          # auth (JWT), upload (multer)
│       ├── scripts/             # migrate.js, seed.js, seed_products.js
│       └── db.js                # pg pool helper
├── package.json                 # Frontend scripts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

Install frontend deps at the root and server deps in `server/`:

```bash
# frontend
npm install

# backend
cd server && npm install
```

### Backend (API) — Local Development

1) Create `.env` in `server/` (see Environment Variables below).

2) Run database migrations and seed an admin user and sample products:

```bash
npm run migrate --prefix server
npm run seed --prefix server
npm run seed:products --prefix server  # optional large catalog seed
```

3) Start the API server (default: `http://localhost:5000`):

```bash
npm run dev --prefix server
```

The API exposes `/api/*` and serves uploaded files from `/uploads/*`.

### Frontend — Local Development

Create `.env` at project root to point the frontend to the API:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Start Vite (default: `http://localhost:5173`):

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

Frontend (root `package.json`):

| Script             | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start Vite dev server with HMR                     |
| `npm run build`    | Bundle the app for production into `dist/`         |
| `npm run preview`  | Run a local server to preview the production build |

Backend (`server/package.json`):

| Script                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start Express API with nodemon               |
| `npm run start`        | Start Express API (production)               |
| `npm run migrate`      | Create tables/types if not present           |
| `npm run seed`         | Seed/refresh admin user                      |
| `npm run seed:products`| Seed or update sample product catalog        |

## Environment Variables

Frontend (root `.env`):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend (`server/.env`):

```
DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>
ADMIN_JWT_SECRET=change-me
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=strong-password
```

## Assets & Media

- Frontend static assets live in `public/`.
- Admin uploads are handled by the API using Multer and are served from `/uploads/*` by the server.
- When rendering images that originate from the API uploads, use an absolute URL against the API origin. The project includes a helper `resolveAssetPath` in `utils.jsx` which:
  - Strips any leading `public/` and ensures a leading `/` for frontend assets.
  - For API-served uploads (paths starting with `/uploads`), automatically prefixes the API origin based on `VITE_API_BASE_URL`.

## Conventions

- Follow the existing Tailwind token usage for spacing, colors, and typography.
- Prefer functional React components with hooks.
- Keep file and folder names in `kebab-case` for consistency.
- Use descriptive commit messages and ensure linting passes before pushing.
