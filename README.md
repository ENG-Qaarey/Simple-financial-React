# Modern Native App

A Vite + React + TypeScript app styled with Tailwind CSS and shadcn/ui.

## Prerequisites
- Node.js 20 LTS (recommended)
- npm 10+

## Quick start
```sh
npm install
npm run dev
```

## Scripts
- `npm run dev` – start the dev server on http://localhost:5173
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## Tech stack
# Modern Native App

A Vite + React + TypeScript app styled with Tailwind CSS and shadcn/ui.

## Prerequisites
- Node.js 20 LTS (recommended)
- npm 10+

## Quick start
```sh
npm install
npm run dev
```

## Scripts
- `npm run dev` – start the dev server on http://localhost:5173
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## Tech stack
- Vite
- React 18 + TypeScript
- Tailwind CSS
- shadcn/ui (Radix primitives)
- TanStack Query
- Supabase client

## Project structure
- `src/pages` – route-level pages
- `src/components` – shared UI components
- `src/contexts` – providers (auth, theme)
- `src/hooks` – reusable hooks
- `src/integrations/supabase` – Supabase client and types

## Environment
Create a `.env` file if you need to configure Supabase or other services. Example:
```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

## Deploy
Build and serve the `dist/` folder with your preferred host:
```sh
npm run build
```
Upload `dist/` to static hosting (e.g., Netlify, Vercel, Cloudflare Pages) or serve with any static file server.


# Step 2: Navigate to the project directory.
