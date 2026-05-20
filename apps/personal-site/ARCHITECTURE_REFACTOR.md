# Personal Site — Architecture Refactor Tracker

Findings from architectural review on **May 12, 2026**. Diagram reflects current implemented architecture.

---

## Architecture Diagram — Current Data Flow

```mermaid
flowchart TD
    subgraph DATA["📁 Content Layer — content/page-copy/"]
        HC["home.content.ts\nHOME_SECTIONS: PageSection[]"]
        AC["about.content.ts\nABOUT_SECTIONS: PageSection[]"]
        PC["projects.content.ts\nPROJECTS_SECTIONS: PageSection[]"]
        CC["contact.content.ts\nCONTACT_SECTIONS: PageSection[]\nCONTACT_INFO: ContactInfo"]
    end

    subgraph MODEL["📐 Data Model — shared/interfaces/content.dto.ts"]
        direction TB
        PCI["PageContent\n─────────────\ntitle: string\nsubtitle?: string\ndescription?: string\nstats?: HeroStat[]\nctas?: CtaButton[]\nsections: PageSection[]"]
        PSI["PageSection\n─────────────\nid: string\nheading: string\nsubtitle?: string\ncontent: ContentSection[]"]
        CSI["ContentSection\n─────────────\ntype: 'paragraph'\n    | 'list'\n    | 'projects'\n    | 'contact'"]
        PCI --> PSI --> CSI
    end

    subgraph SERVICE["⚙️ Core Layer — core/services/content.service.ts"]
        CS["ContentService\n─────────────────────────────\ngetLandingContent(): Signal‹PageContent›\n─────────────────────────────\nToday: signal(staticData)\nFuture: toSignal(http.get('/api/...'))"]
    end

    subgraph ROUTER["🗺️ Router — app.config.ts / app.routes.ts"]
        R1["/ → DefaultPageComponent"]
        R2["/** → redirect '/'"]
        RM["withInMemoryScrolling\nanchorScrolling: 'enabled'\nscrollPositionRestoration: 'enabled'"]
    end

    subgraph NAV["🧭 NavbarComponent"]
        NB["[routerLink]=\"['/']\" [fragment]=\"'about'\"\n[routerLink]=\"['/']\" [fragment]=\"'projects'\"\n[routerLink]=\"['/']\" [fragment]=\"'contact'\""]
    end

    subgraph PAGE["📄 DefaultPageComponent — pages/default-page/"]
        DP["inject ContentService\n.getLandingContent()\n~13 lines of template"]
    end

    subgraph SHARED["🧩 Shared Components — shared/components/"]
        HERO["HeroSectionComponent\ntitle, subtitle, description\nstats, CTA buttons (fragment links)"]
        PGSEC["PageSectionComponent\n[id]=section.id ← scroll target\nbg alternation by index"]
        CB["ContentBlockComponent\n@switch dispatcher"]
        PAR["ParagraphBlockComponent\nParagraphSection"]
        LIST["ListBlockComponent\nListSection"]
        PROJB["ProjectsBlockComponent\nProjectSection"]
        CONTB["ContactBlockComponent\nContactSection (no hardcoded data)"]
    end

    HC --> CS
    AC --> CS
    PC --> CS
    CC --> CS

    CS -->|"Signal‹PageContent›"| DP
    R1 --> DP
    RM -.->|"fragment scroll"| R1
    NB -->|"/#about\n/#projects\n/#contact"| PGSEC

    DP --> HERO
    DP -->|"@for section"| PGSEC
    PGSEC -->|"@for ContentSection"| CB
    CB -->|"'paragraph'"| PAR
    CB -->|"'list'"| LIST
    CB -->|"'projects'"| PROJB
    CB -->|"'contact'"| CONTB

    style DATA fill:#f0f9ff,stroke:#0ea5e9
    style MODEL fill:#fefce8,stroke:#eab308
    style SERVICE fill:#f0fdf4,stroke:#22c55e
    style ROUTER fill:#fdf4ff,stroke:#a855f7
    style NAV fill:#f5f3ff,stroke:#8b5cf6
    style PAGE fill:#fff7ed,stroke:#f97316
    style SHARED fill:#fff1f2,stroke:#f43f5e
```

---

## Issues — Implementation Order

Ordered by dependency and MVP impact. Each step unblocks the next.

| Order  | Issue | Description                                                                                                     | Status                    |
| ------ | ----- | --------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **1**  | #5    | Fix `PageContent` model — drop `content[]`, `sections[]` is the contract everywhere                             | `[x] Done — May 19, 2026` |
| **2**  | #8    | `ContentService` — insert the CMS seam, components stop importing constants directly                            | `[x] Done — May 19, 2026` |
| **3**  | #2    | God component decomposition — `@switch` dispatcher + block components                                           | `[x] Done — May 20, 2026` |
| **4**  | #9    | Move hardcoded contact data into content files (done in same pass as #2)                                        | `[x] Done — May 20, 2026` |
| **5**  | #3    | `SafeHtmlPipe` audit — enforce consistently across all new leaf components                                      | `[x] Done — May 20, 2026` |
| **6**  | #1    | Fragment routing — `withInMemoryScrolling` + anchor nav on single `/` route (replaces separate page components) | `[x] Done — May 20, 2026` |
| **7**  | #10   | 404 route — replace wildcard redirect with `NotFoundComponent`                                                  | `[ ] Todo`                |
| **8**  | #12   | Visual redesign — replace cookie-cutter Tailwind aesthetic with a distinct personal style                       | `[ ] Todo`                |
| **9**  | #13   | Unit tests — 80% coverage enforced via SonarCloud quality gate                                                  | `[ ] Post-MVP`            |
| **10** | #14   | CI/CD pipeline — GitHub Actions + SonarCloud with quality gate on PRs                                           | `[ ] Post-MVP`            |
| **11** | #15   | E2E tests — Cypress smoke suite covering routing, SSR hydration, and key UI                                     | `[ ] Post-MVP`            |
| **12** | #4    | Eager loading review — low value now, revisit if content grows significantly                                    | `[ ] Post-MVP`            |
| **13** | #6    | Rename `.dto.ts` → `.model.ts`                                                                                  | `[ ] Post-MVP`            |
| **14** | #7    | `export type` cleanup in barrel `index.ts`                                                                      | `[ ] Post-MVP`            |

---

---

## Issue #5 — PageContent Model: `sections` Wins

### Decision

**`content?: ContentSection[]` is removed from `PageContent`. `sections: PageSection[]` is the single, required shape.**

The flat `content[]` field was a shortcut from when the app was one scrollable page. It is incompatible with `PageSectionComponent`, which expects a `PageSection`. Keeping both requires every consumer to guess which field to use.

### Interface Changes

```typescript
// BEFORE — content.model.ts
export interface PageContent {
  title: string;
  subtitle?: string;
  description?: string;
  stats?: HeroStat[];
  content?: ContentSection[]; // ← DELETE THIS
  sections?: PageSection[]; // ← make required
}

// AFTER
export interface PageContent {
  title: string;
  subtitle?: string;
  description?: string;
  stats?: HeroStat[];
  sections: PageSection[]; // required, no ambiguity
}
```

### Content File Changes

Individual content files stop exporting a `PageContent` and instead export `PageSection[]`. `ContentService` assembles the full `PageContent`:

```typescript
// home.content.ts — BEFORE
export const HOME_CONTENT: PageContent = {
  title: 'Bryant Franks',
  content: [{ type: 'paragraph', content: '...' }],
};

// home.content.ts — AFTER
export const HOME_SECTIONS: PageSection[] = [
  {
    id: 'home',
    heading: 'Welcome',
    content: [{ type: 'paragraph', content: '...' }],
  },
];
```

### What Happens to `LANDING_CONTENT`

It is deleted entirely. It only existed to flatten all sections into one page for the single-route design. `ContentService` replaces it — each method assembles one page's `PageContent` from its own `PageSection[]` export.

### Acceptance Criteria

- [x] `content?: ContentSection[]` removed from `PageContent` interface
- [x] `sections` is `required` (not optional) on `PageContent`
- [x] All `*.content.ts` files export `PageSection[]`, not `PageContent`
- [x] `LANDING_CONTENT` deleted
- [x] TypeScript compiles with no errors after the change

> **Completed May 19, 2026.** `HeroStat` and `ContactSection` also added to the model in this pass.

---

## Issue #2 — God Component Decomposition Plan

### Current State

`DefaultPageComponent` owns a 254-line template that:

- Renders the entire Hero section inline
- Iterates sections and branches on `content.type` with chained `@if` blocks
- Has a special-case `@if (section.id === 'contact')` bypass that re-loops content
- Contains hardcoded contact info (email, GitHub, location) in the template

### Target Component Tree

```
DefaultPageComponent          ← orchestrator only, ~20 lines of template
├── HeroSectionComponent      ← hero title, subtitle, description, stats, CTAs
└── PageSectionComponent[]    ← one per section (id, heading, subtitle, bg alternation)
    └── ContentBlockComponent ← @switch (content.type) dispatcher
        ├── ParagraphBlockComponent
        ├── ListBlockComponent
        ├── ProjectsBlockComponent
        └── ContactBlockComponent  ← replaces the section.id === 'contact' special case
```

### Decided Approach — `@switch` Dispatcher

The chosen solution is a **`ContentBlockComponent`** that acts as a `@switch` dispatcher over the `ContentSection` discriminated union. This is the confirmed implementation pattern.

**`ContentBlockComponent`** receives the union type and immediately dispatches:

```typescript
// content-block.component.ts
@Component({
  selector: 'app-content-block',
  standalone: true,
  imports: [
    ParagraphBlockComponent,
    ListBlockComponent,
    ProjectsBlockComponent,
    ContactBlockComponent,
  ],
  template: `
    @switch (content().type) { @case ('paragraph') {
    <app-paragraph-block [section]="asParagraph()" /> } @case ('list') {
    <app-list-block [section]="asList()" /> } @case ('projects') {
    <app-projects-block [section]="asProjects()" /> } @case ('contact') {
    <app-contact-block [section]="asContact()" /> } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockComponent {
  content = input.required<ContentSection>();

  asParagraph() {
    return this.content() as ParagraphSection;
  }
  asList() {
    return this.content() as ListSection;
  }
  asProjects() {
    return this.content() as ProjectSection;
  }
  asContact() {
    return this.content() as ContactSection;
  }
}
```

Each leaf block receives a **narrowed, concrete type** as its input — zero type-checking inside leaf components. The `@switch` already guarantees the type before the cast.

**Why `@switch` over `NgComponentOutlet`:** `NgComponentOutlet` adds a component registry map and injector boilerplate for no gain here. `@switch` is simpler, statically analyzable by the Angular compiler, and tree-shakeable.

**Why not keep `@if` chains:** Adding a new content type requires touching the parent template. With `@switch` in `ContentBlockComponent`, adding a new type means creating one new leaf component and adding one `@case` — the parent `PageSectionComponent` is untouched.

Other structural decisions:

- `PageSectionComponent` owns section scaffold (id, heading, subtitle, background alternation) — not `DefaultPageComponent`.
- `HeroSectionComponent` is fully isolated so it can evolve independently without touching the section rendering path.
- All components **standalone** with `ChangeDetectionStrategy.OnPush`.

### Recommended File Structure

```
src/app/
├── pages/
│   └── default-page/
│       ├── default-page.component.ts       ← keep, slim down
│       └── default-page.component.html     ← reduce to ~20 lines
├── shared/
│   └── components/
│       ├── hero-section/
│       │   ├── hero-section.component.ts
│       │   └── hero-section.component.html
│       ├── page-section/
│       │   ├── page-section.component.ts
│       │   └── page-section.component.html
│       ├── content-block/
│       │   ├── content-block.component.ts   ← @switch dispatcher
│       │   ├── paragraph-block/
│       │   ├── list-block/
│       │   ├── projects-block/
│       │   └── contact-block/
```

### Acceptance Criteria

- [x] `default-page.component.html` is ≤ 25 lines
- [x] No `@if (content.type === ...)` chains remain in any parent template
- [x] The `@if (section.id === 'contact')` special-case block is deleted — `ContactBlockComponent` replaces it entirely
- [x] `ContactSection` is kept in the discriminated union — `ContactBlockComponent` receives it as a typed input and renders from `section.info`
- [x] Each block component receives a typed input matching its interface (not `ContentSection`)
- [x] All new components use `OnPush` and are standalone
- [x] `SafeHtmlPipe` is applied consistently wherever `[innerHTML]` is used

> **Completed May 20, 2026.** 6 new components created. `DefaultPageComponent` template reduced to 13 lines.

---

## Issue #8 — ContentService: CMS Migration Seam

### Goal

No actual CMS migration is planned. The goal is to insert a single abstraction layer so that when/if a CMS is added, **components never change** — only the service implementation swaps out.

### Decided Approach — `ContentService` with Signal-based API

Introduce a `ContentService` that components consume. It currently returns static constants wrapped in Angular signals. When a CMS is introduced, only this service changes.

```typescript
// src/app/core/services/content.service.ts
@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient); // ready for future use, unused now

  // Each method returns a Signal<PageContent>
  // Today: wraps a static constant. Tomorrow: wraps an HTTP call via toSignal().
  getHomeContent(): Signal<PageContent> {
    return signal({
      title: 'Bryant Franks',
      subtitle: 'Angular Engineer & Full-Stack Developer.',
      sections: HOME_SECTIONS,
    });
  }

  getAboutContent(): Signal<PageContent> {
    return signal({ title: 'About', sections: ABOUT_SECTIONS });
  }

  getProjectsContent(): Signal<PageContent> {
    return signal({ title: 'Projects', sections: PROJECTS_SECTIONS });
  }

  getContactContent(): Signal<PageContent> {
    return signal({ title: 'Contact', sections: CONTACT_SECTIONS });
  }
}
```

Components inject `ContentService` instead of importing content constants directly:

```typescript
// default-page.component.ts (or any page component)
export class DefaultPageComponent {
  private contentService = inject(ContentService);
  pageContent = this.contentService.getLandingContent();
}
```

### Why Signal-based (not Observable)

- Components already use `toSignal` — keeping the surface uniform avoids mixing Signal/Observable subscriptions in templates.
- When migrating to HTTP later: `toSignal(this.http.get<PageContent>('/api/content/landing'))` inside the service is a one-line swap per method. The component is completely untouched.

### What Changes at Migration Time

When a CMS is added, only `ContentService` changes:

| Today                                                      | After CMS migration                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `return signal({ title: '...', sections: HOME_SECTIONS })` | `return toSignal(this.http.get<PageContent>('/api/content/home'), { initialValue: { title: '...', sections: HOME_SECTIONS } })` |

The `initialValue` ensures no flicker — static content pre-populates until the CMS response arrives.

### File Location

```
src/app/core/
└── services/
    └── content.service.ts
```

`core/` is the correct Angular convention for singleton services that are app-wide and not tied to a single feature.

### Acceptance Criteria

- [x] `ContentService` created under `src/app/core/services/`
- [x] All page components inject `ContentService` — zero direct imports of content constants in components
- [x] Content constants remain in `content/page-copy/` as the static data source (they are still used, just only by the service)
- [x] `HttpClient` imported in the service even if unused — documents the intended extension point
- [x] Return type is `Signal<PageContent>` on all methods

> **Completed May 19, 2026.** `provideHttpClient(withFetch())` added to `app.config.ts`. `getLandingContent()` added as a temporary combined-page method — to be removed when Issue #1 (routing) lands. 29 unit tests added for `ContentService`.

---

## Issue #9 — Hardcoded Data in Template

### Problem

The `@if (section.id === 'contact')` special-case block in `DefaultPageComponent` hardcodes three personal contact strings directly in the template:

- `bryant.franks@gmail.com`
- `https://github.com/Bfranks56`
- `Royal Oak, MI`

### Solution

`CONTACT_INFO` already exists in `contact.content.ts` with the correct values. The fix is wiring it into the existing `ContactSection` model shape so `ContactBlockComponent` can render from a typed input.

**Step 1 — Add the `contact` entry to `CONTACT_SECTIONS`:**

```typescript
// contact.content.ts — add to the content array of the contact section
{ type: 'contact', info: CONTACT_INFO }
```

**Step 2 — `ContactBlockComponent` receives `ContactSection` as input:**

```typescript
// contact-block.component.ts
export class ContactBlockComponent {
  section = input.required<ContactSection>();
}
// Template renders section.info.email, section.info.github, section.info.location
```

**Step 3 — Delete the `@if (section.id === 'contact')` block** from `DefaultPageComponent`. `ContentBlockComponent`'s `@case ('contact')` handles it.

### Result

- Zero hardcoded personal data in any template
- Single source of truth: one edit in `contact.content.ts` propagates everywhere
- `ContactSection` stays in the discriminated union — it is used, not bypassed

### Acceptance Criteria

- [x] `{ type: 'contact', info: CONTACT_INFO }` added to `CONTACT_SECTIONS` content array
- [x] `ContactBlockComponent` renders all contact info from `section.info` — no hardcoded strings in template
- [x] `@if (section.id === 'contact')` block deleted from `DefaultPageComponent`
- [x] `CONTACT_INFO` remains the single source of truth in `contact.content.ts`

> **Completed May 20, 2026.** Done in the same pass as Issue #2.

---

## Issue #10 — 404 Route

Add a `not-found` page component and wire it to the wildcard route instead of redirecting:

```typescript
{ path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
```

Update `app.routes.server.ts` to prerender the 404 path.

---

## Issue #1 — Routing: Fragment Navigation on a Single Scrollable Page

### Decision

**Separate per-page route components are not the right fit for a portfolio UX. Fragment-based navigation on a single `/` route is.**

Routing to `/about`, `/projects`, `/contact` as distinct page components forces a full component destroy/recreate on every nav click. The user loses scroll position, Angular tears down and rebuilds the page, and the experience feels like a traditional multi-page site. That works against the seamless one-page feel that is the correct UX for a portfolio.

### Decided Approach — `withInMemoryScrolling` + Anchor Navigation

- `DefaultPageComponent` stays at `/` as the single scrollable page — no structural change
- `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })` added to `provideRouter` in `app.config.ts`
- Navbar links updated to use Router fragment navigation: `[routerLink]="['/']" [fragment]="'about'"` etc.
- `PageSectionComponent` renders each section with `[id]="section.id"` — the data-driven `id` is the scroll target
- URL updates to `/#about`, `/#projects`, `/#contact` on nav click — deep-linking and browser back/forward both work

### What This Replaces

The original plan to create separate `HomeComponent`, `AboutComponent`, `ProjectsComponent`, `ContactComponent` page components is dropped. The `about/` and `contact/` stub component folders remain as-is (unused stubs) until the 404 and visual redesign passes clarify whether standalone pages are needed.

### SSR Impact

Zero. Prerender still targets `**` → `RenderMode.Prerender` in `app.routes.server.ts` — only one route exists.

### Acceptance Criteria

- [x] `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })` added to `provideRouter` in `app.config.ts`
- [x] Navbar links use `[routerLink]` + `[fragment]` instead of raw `href="#..."` anchors
- [x] Clicking a nav link scrolls to the correct section and updates the URL fragment
- [x] Browser back/forward restores scroll position correctly

> **Completed May 20, 2026.** `NavbarComponent` refactored to use `RouterLink` + `[fragment]`. `goHome()` method replaces scroll-to-top. `Router` injected. Tests updated with `provideRouter([])`.

---

## Issue #3 — innerHTML / SafeHtmlPipe Audit

> Applied in the same pass as Issue #2 — leaf components are the correct enforcement point.

Each leaf component is small enough that all `[innerHTML]` bindings are audited at creation time. The god component made this hard; leaf components make it impossible to miss.

### Binding Inventory

| Component                 | Binding                               | Needs pipe            |
| ------------------------- | ------------------------------------- | --------------------- |
| `HeroSectionComponent`    | `[innerHTML]="title"`                 | Yes                   |
| `HeroSectionComponent`    | `[innerHTML]="subtitle"`              | Yes                   |
| `HeroSectionComponent`    | `[innerHTML]="description"`           | Yes                   |
| `ParagraphBlockComponent` | `[innerHTML]="section.heading"`       | Yes                   |
| `ParagraphBlockComponent` | `[innerHTML]="section.content"`       | Yes                   |
| `ListBlockComponent`      | `[innerHTML]="section.heading"`       | Yes                   |
| `ListBlockComponent`      | `[innerHTML]="item"` (each list item) | Yes                   |
| `ProjectsBlockComponent`  | `[innerHTML]="project.description"`   | Yes (already present) |

> **Completed May 20, 2026.** All `[innerHTML]` bindings audited and `SafeHtmlPipe` applied at creation time for each leaf component. Non-null assertions (`!`) required inside `@if` guards — Angular strict template checking does not narrow signal return types.

---

## Issue #12 — Visual Redesign

### Why Pre-MVP

The architecture refactor makes the code defensible. The visual is the first impression — a recruiter or hiring engineer decides in seconds whether to keep reading. The current design is indistinguishable from a generic Tailwind portfolio template. That works against the goal of the site.

Scheduled **after** the architecture refactor because:

- The decomposed component tree makes restyling surgical — each block component is isolated
- Redesigning the god component template first means doing the work twice
- Routing must exist before per-page layout decisions make sense

### Scope

**What changes:**

- Typography system — typeface choices, scale, weight contrast
- Color palette — move away from default blue/gray Tailwind
- Layout language — spacing rhythm, grid decisions, section transitions
- Hero section — most visible, highest impact
- Component-level treatments per block type (projects cards, skill lists, contact section)

**What does not change:**

- Content (copy, projects, skills)
- Data model or component architecture
- SSR / prerender behavior

### Constraints

- Must stay Tailwind-based — no CSS framework swap
- Must remain fully responsive
- SSR-safe — no runtime-only layout tricks

### Acceptance Criteria

- [ ] Design direction decided (reference sites, mood board, or written aesthetic brief)
- [ ] Typography and color tokens defined as Tailwind config extensions
- [ ] Hero section redesigned
- [ ] All block components restyled consistently
- [ ] Visually distinct from default Tailwind portfolio aesthetic
- [ ] Passes Lighthouse accessibility score ≥ 90

---

## Issue #13 — Unit Tests (80% Coverage)

### Goal

Demonstrate professional testing habits. Not exhaustive coverage for its own sake — targeted tests on the components and services where behavior matters.

### Priority Targets

| Target                  | What to test                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `ContentService`        | Each method returns a `Signal<PageContent>` with the correct shape |
| `ContentBlockComponent` | Correct child component rendered for each `ContentSection` type    |
| `PageSectionComponent`  | Correct heading, subtitle, and background class rendered           |
| `HeroSectionComponent`  | Title, subtitle, stats render correctly from inputs                |
| Leaf block components   | Smoke test — renders without error given valid input               |

### Coverage Gate

80% line coverage enforced by SonarCloud. Pipeline blocks merge if it drops below threshold.

### Acceptance Criteria

- [ ] All priority targets have meaningful tests (not just scaffolding)
- [ ] `ng test --code-coverage` produces an lcov report
- [ ] Coverage is ≥ 80% lines

---

## Issue #14 — CI/CD Pipeline

### Toolchain

| Tool           | Purpose                                         | Cost               |
| -------------- | ----------------------------------------------- | ------------------ |
| GitHub Actions | Run pipeline on push/PR                         | Free (public repo) |
| SonarCloud     | Static analysis + coverage gate + PR decoration | Free (public repo) |
| Nx `affected`  | Only lint/test/build what changed               | Free               |

### Pipeline Order

```
Push / PR
└── GitHub Actions
    ├── nx affected --target=lint
    ├── nx affected --target=test --coverage
    │   └── lcov report → SonarCloud scan
    │       └── quality gate: coverage ≥ 80%, no new blocker issues
    ├── nx affected --target=build
    └── nx affected --target=e2e  ← runs against built output
```

### Acceptance Criteria

- [ ] `.github/workflows/ci.yml` created
- [ ] SonarCloud project connected to repo
- [ ] Quality gate blocks PR merge on coverage failure or blocker issues
- [ ] SonarCloud posts inline annotations on PRs
- [ ] Pipeline passes clean on `main`

---

## Issue #15 — E2E Tests (Cypress)

### Scope

Narrow smoke suite. Goal is to demonstrate the habit, not achieve exhaustive coverage. Cypress is already wired up in `personal-site-e2e` — infrastructure cost is zero.

### Test Cases

| Test                                                 | What it proves                                |
| ---------------------------------------------------- | --------------------------------------------- |
| `/` loads, hero title visible                        | SSR hydration works, home route healthy       |
| `/about` loads without error                         | Routing works                                 |
| `/projects` loads, at least one project card visible | Projects data flows through                   |
| `/contact` loads, contact links present              | Contact route healthy                         |
| Bad URL (`/doesnotexist`) shows 404 page             | Wildcard route works                          |
| Nav links route to correct pages                     | Router integration                            |
| Contact email `href` is correct                      | Hardcoded data was moved to content correctly |

### Acceptance Criteria

- [ ] All 7 test cases implemented in `apps/personal-site-e2e/src/e2e/`
- [ ] Tests run against built SSR output, not dev server
- [ ] All tests pass in CI pipeline
- [ ] Suite completes in under 60 seconds
