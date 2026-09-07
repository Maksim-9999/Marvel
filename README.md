<div align="center">

# 🦸‍♂️ Marvel Universe Explorer

An interactive web app for browsing Marvel characters and comics, built with React 19 and Vite.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![ESLint](https://img.shields.io/badge/ESLint-configured-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Tests](https://img.shields.io/badge/tests-10%20passed-brightgreen?logo=vitest&logoColor=white)](#-testing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

[Live demo](https://marvel-phi-swart.vercel.app) · [Features](#-features) · [Tech stack](#️-tech-stack) · [Getting started](#-getting-started) · [Testing](#-testing)

</div>

---

## 📸 Screenshots

<div align="center">

|              Home page              |                Character details                 |
| :---------------------------------: | :----------------------------------------------: |
| ![Home page](/screenshots/main.png) | ![Character details](/screenshots/character.png) |

|               Comics page               |                  Single comic page                  |
| :-------------------------------------: | :-------------------------------------------------: |
| ![Comics page](/screenshots/comics.png) | ![Single comic page](/screenshots/single-comic.png) |

|                  Loading state                   |                404 page                 |
| :----------------------------------------------: | :-------------------------------------: |
| ![Loading state](/screenshots/loading-state.png) | ![404 page](/screenshots/not-found.png) |

|                 Mobile layout                  |     |
| :--------------------------------------------: | :-: |
| ![Mobile layout](/screenshots/mobile-view.png) |     |

**Character search — form states**

|                Empty field (validation)                 |                  Character found                  |                    Character not found                    |
| :-----------------------------------------------------: | :-----------------------------------------------: | :-------------------------------------------------------: |
| ![Validation error](/screenshots/search-validation.png) | ![Character found](/screenshots/search-found.png) | ![Character not found](/screenshots/search-not-found.png) |

</div>

---

## ✨ Features

- 🎲 **Random character** — the home page suggests a new Marvel hero every few seconds
- 🔍 **Search by name** — character search form with validation powered by Formik + Yup
- 📖 **Character catalog** — paginated character cards with image and short description
- 📚 **Comics catalog** — issue list with covers and prices
- 🧾 **Detail pages** — dedicated layouts for a single character and a single comic
- ⚡ **Route-level code splitting** — every page is loaded as its own chunk via `React.lazy` + `Suspense`
- 🛡 **Error isolation** — every widget on the home page is wrapped in its own `ErrorBoundary`, and the whole router tree is guarded by a top-level one, so a crash on one page never breaks the rest of the app
- 🏷 **Per-page SEO tags** — dynamic `<title>` and `meta description` via `react-helmet-async`
- 📱 **Fully responsive layout** — built mobile-first in SCSS and tested across phones, tablets, laptops, and desktop screens, with no extra UI libraries

---

## 🛠️ Tech stack

| Category               | Tools                                      |
| ---------------------- | ------------------------------------------ |
| **UI library**         | React 19                                   |
| **Bundler**            | Vite 8                                     |
| **Routing**            | React Router 7 (with lazy-loaded routes)   |
| **Forms & validation** | Formik + Yup                               |
| **Styling**            | SCSS (per-component structure)             |
| **SEO**                | react-helmet-async                         |
| **Linting**            | ESLint (react-hooks, react-refresh)        |
| **API layer**          | Custom `useHttp` hook + `useMarvelService` |

---

## 📂 Project structure

```
marvel/
├── public/                 # Static assets (favicon, icon sprite)
├── src/
│   ├── assets/              # Images and fonts
│   ├── components/
│   │   ├── app/             # Root component, routing
│   │   ├── appHeader/        # Site header
│   │   ├── appBanner/        # Banner on the comics page
│   │   ├── charList/         # Character list
│   │   ├── charInfo/         # Selected character card
│   │   ├── charSearchForm/   # Search-by-name form
│   │   ├── comicsList/       # Comics list
│   │   ├── randomChar/       # Random character widget
│   │   ├── errorBoundary/    # Error-catching wrapper component
│   │   ├── errorMessage/     # Error message UI
│   │   ├── skeleton/         # Placeholder shown while data is missing
│   │   ├── spinner/          # Loading indicator
│   │   └── pages/            # Pages and their layouts
│   ├── hooks/                # Custom hooks (useHttp, etc.)
│   ├── services/             # Marvel API layer
│   ├── style/                # Shared SCSS styles
│   └── utils/                # Helper functions
├── .env.example              # Sample environment variables
├── eslint.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting started

### Requirements

- Node.js 18+
- npm (or yarn/pnpm — your choice)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Maksim-9999/marvel.git
cd marvel

# 2. Install dependencies
npm install

# 3. Create your env file
cp .env.example .env
```

Open `.env` and set your key:

```env
VITE_API_KEY=your_api_key
```

> The app talks to a Marvel API proxy (`marvel-server-zeta.vercel.app`), which needs this key to serve data.

### Development

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build     # build into the dist/ folder
npm run preview   # preview the production build locally
```

### Linting

```bash
npm run lint
```

---

## 🧪 Testing

Unit and component tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react).

**Covered:**

- `setContent` — content-switching logic for all four fetch states (waiting / loading / confirmed / error)
- `ErrorBoundary` — renders children normally, and falls back to an error UI when a child component throws
- `Spinner` — renders correctly
- `CharSearchForm` — field validation and both success/not-found search results (network layer mocked)

```bash
npm test              # run once
npm run test:watch    # watch mode
```

<div align="center">

![All tests passing](/screenshots/tests-passing.png)

</div>

---

## 🌐 Deployment

This is a plain Vite SPA, so it can be deployed to any static host in a single step:

- [Vercel](https://vercel.com/) — `vercel --prod`
- [Netlify](https://www.netlify.com/) — drag the `dist` folder into Netlify Drop, or connect the repo
- GitHub Pages — via `vite.config.js` (`base`) and `gh-pages`

Remember to set the `VITE_API_KEY` environment variable on whichever platform you use.

---

## 🗺️ Roadmap

- [ ] Migrate to TypeScript
- [x] Unit and component tests (Vitest + React Testing Library)
- [ ] Dark/light theme

---

## 👤 Author

**Maksim Duljuk**

- GitHub: [@Maksim-9999](https://github.com/Maksim-9999)
- LinkedIn: [maksim-duljuk](https://linkedin.com/in/maksim-duljuk-1b0071423)

---

## 📄 License

Character and comics data is sourced from the [Marvel Comics API](https://developer.marvel.com/), accessed through a custom proxy server (since the official Marvel API is currently unavailable): [marvel-server-zeta.vercel.app](https://marvel-server-zeta.vercel.app/). This site is not endorsed, sponsored by, or affiliated with Marvel.

Project code is licensed under the MIT License — see the [LICENSE](LICENSE) file.
