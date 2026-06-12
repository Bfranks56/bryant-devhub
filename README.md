# bryant-devhub

Nx monorepo. Primary project is `personal-site` — my Angular portfolio, deployed to [bryantfranks.com](https://bryantfranks.com).

---

## personal-site

Angular 20 · Tailwind CSS · Angular Material · SSG prerender · TypeScript strict mode

Single-page scroll SPA with fragment-based navigation (`/#about`, `/#projects`, `/#contact`). Content is data-driven via `ContentService` — the sole abstraction seam for a future CMS swap.

### Run locally

```sh
pnpm nx serve personal-site        # dev server
pnpm nx build personal-site        # production build
pnpm nx test personal-site         # unit tests
pnpm nx e2e personal-site-e2e      # E2E
```

---

## Status

Architecture refactor complete. Next: visual redesign.

- [x] Content — all sections written (home, about, projects, contact)
- [x] Unit tests — 55 passing across 7 suites
- [ ] Visual redesign
- [ ] Contact form
- [ ] CI/CD — GitHub Actions + SonarCloud
- [ ] Vercel deployment with custom domain
