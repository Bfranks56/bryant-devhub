# bryant-devhub

Nx monorepo. Primary project is `personal-site` — my Angular portfolio, deployed to [bryantfranks.com](https://bryantfranks.com).

---

## Workspace Structure

| Project         | Stack                                      | Description                                      |
| --------------- | ------------------------------------------ | ------------------------------------------------ |
| `personal-site` | Angular 20, Tailwind CSS, Angular Material | Personal portfolio — SSG, single-page scroll SPA |

---

## personal-site

### Tech Stack

- Angular 20 — standalone components, signals, `@if/@for` control flow, OnPush throughout
- Nx monorepo — `@angular/build:application`, `outputMode: "server"`, SSG prerender
- Tailwind CSS v3 — custom P3 color palette, `darkMode: 'class'`
- Angular Material — form components and icon system
- TypeScript strict mode — `strictTemplates`, `noImplicitReturns`, `strictInjectionParameters`
- Jest — 33 unit tests across 6 suites

### Architecture

Content is data-driven. A single `DefaultPageComponent` renders every section of the site from typed route data — no individual page components.

```typescript
// All pages served from structured route config
export interface PageContent {
  title: string;
  subtitle?: string;
  description?: string;
  sections?: PageSection[];
  content: ContentSection[];
}

// Union type drives DefaultPageComponent rendering
export type ContentSection =
  | ParagraphSection
  | ListSection
  | ProjectSection
  | CodeSection
  | QuoteSection;
```

Single route (`''`) serves `LANDING_CONTENT`. Navbar scrolls via `scrollToSection()` — no Angular Router navigation between sections.

### SCSS Structure

```
src/styles/
├── _variables.scss           # Color tokens, spacing, font constants
├── _base.scss                # Global resets, html/body defaults
├── _mixins.scss              # Reusable patterns
├── _typography.scss          # Inter font system, Material overrides
├── _material-overrides.scss  # Angular Material component customizations
└── _components.scss          # Tailwind component utilities
```

### Running the App

```sh
# Development server
pnpm nx serve personal-site

# Production build
pnpm nx build personal-site --configuration=production

# Unit tests
pnpm nx test personal-site

# Lint
pnpm nx lint personal-site

# E2E
pnpm nx e2e personal-site-e2e
```

Or use the npm script aliases:

```sh
npm run start   # serve
npm run build   # production build
npm run test    # test
npm run lint    # lint
```

### Project Graph

```sh
npx nx graph
```

---

## Nx Workspace

This workspace uses [Nx](https://nx.dev) for task orchestration, caching, and code generation.

```sh
# List all projects
npx nx show projects

# Show targets for a project
npx nx show project personal-site

# Generate a new Angular app
npx nx g @nx/angular:app <name>

# Generate a new library
npx nx g @nx/angular:lib <name>

# Run a target across all affected projects
npx nx affected -t build
```

Targets are defined in each project's `project.json` or inferred by Nx plugins.

---

## Status

- [x] Architecture — data-driven content system, single DefaultPageComponent
- [x] Pre-flight fixes — SSR safety, OnPush signals, Tailwind darkMode, animation async
- [x] Content — all sections written with real copy (home, about, projects, contact)
- [x] Unit tests — 33 passing
- [ ] Contact form — Formspree integration
- [ ] Active section highlighting in navbar
- [ ] Dark/light theme toggle
- [ ] SEO meta tags and OG tags
- [ ] Vercel deployment with custom domain
