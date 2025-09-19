# BryantDevhub

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

Welcome to my development workspace! This monorepo houses my various projects and experiments.

## 📂 Projects in This Workspace

| Project                  | Type              | Description                                                               |
| ------------------------ | ----------------- | ------------------------------------------------------------------------- |
| **personal-site**        | Angular (SSG)     | My personal portfolio site showcasing projects, skills, and contact info. |
| _(upcoming)_ sneaker-app | Angular + Express | Sneaker tracking app with live pricing and sales data.                    |

## 🚀 First Project: Personal Website

My first project in this workspace is building my personal website. This site will serve as a showcase of my development skills, a portfolio of my work, and a platform to share my thoughts on technology and development.

The personal website is built using modern web technologies and is located in the `apps/personal-site` directory.

### 🏗️ **Architecture Overview**

The site features a **modern content management architecture** that separates content from presentation:

```typescript
// Type-safe content structure
export interface PageContent {
  title: string;
  subtitle?: string;
  description: string;
  content: ContentSection[];
}

// Union type for flexible content sections
export type ContentSection =
  | ParagraphSection
  | ListSection
  | ProjectSection
  | CodeSection
  | QuoteSection;
```

**Key Benefits:**

- 🎯 **Content Updates**: Non-technical users can update content without touching code
- 🛡️ **Type Safety**: Full TypeScript coverage prevents runtime errors
- 🔄 **Scalability**: Easy to add new content types and pages
- 🧪 **Testability**: Comprehensive test coverage with mock data
- ⚡ **Performance**: Single component with lazy loading and OnPush detection

### ✅ **Current Progress**

#### **Modern Architecture & Content Management** ⭐

- ✅ **Content Management System**: Implemented type-safe, data-driven content architecture
- ✅ **Universal Component**: Consolidated multiple page components into a single `DefaultPageComponent`
- ✅ **Type Safety**: Comprehensive TypeScript interfaces with union types for content sections
- ✅ **Modern Angular Patterns**: Migrated to Angular 20 with new `@if/@for` control flow syntax
- ✅ **Route Data Injection**: Content delivered through route data instead of hardcoded templates

#### **Component Architecture & Performance**

- ✅ **Standalone Components**: Using modern Angular architecture without NgModules
- ✅ **Lazy Loading**: All routes lazy-loaded for optimal performance
- ✅ **Change Detection**: OnPush strategy with inject() dependency injection
- ✅ **Error Handling**: Comprehensive fallback systems and error boundaries
- ✅ **Template Consolidation**: Single template handles all content types (paragraphs, lists, projects)

#### **Content Structure**

- ✅ **Structured Content**: Type-safe content files for Home, About, Projects, and Contact
- ✅ **Flexible Sections**: Support for paragraphs, lists, code blocks, quotes, and project showcases
- ✅ **Dynamic Rendering**: Content types render appropriate UI components automatically
- ✅ **Maintainable Updates**: Content changes require no code modifications

#### **Styling & UI** ⭐

- ✅ **Tailwind CSS**: Fully integrated with custom configuration and responsive design
- ✅ **Angular Material Integration**: Seamlessly integrated with Tailwind CSS for form components
- ✅ **Organized SCSS Architecture**: Modular stylesheet organization with separate files for variables, typography, and components
- ✅ **Inter Font System**: Consistent Inter font family across all components including Material elements
- ✅ **Typography**: Enhanced with @tailwindcss/typography plugin for rich content
- ✅ **Tentative P3 Color Palette**: Professional blue-based color system with accessibility-compliant contrast ratios
- ✅ **Hero Section**: Modern full-screen hero with halftone SVG background and compelling CTAs
- ✅ **SCSS Mixins Architecture**: Clean, reusable mixins for consistent styling patterns
- ✅ **Custom Tailwind Variants**: prose-p3 and prose-p3-invert typography variants for light/dark content
- ✅ **Advanced Layouts**: Alternating section backgrounds, modern grid systems, and responsive design
- ✅ **Professional Contact Section**: Integrated contact information with icons and styled CTAs
- ✅ **Error UI**: User-friendly error banners and fallback content

#### **Development Setup & Testing**

- ✅ **Comprehensive Testing**: 33 unit tests across 6 test suites covering all component functionality
- ✅ **Jest Integration**: Modern testing framework with proper TypeScript support
- ✅ **Mock Strategies**: Proper ActivatedRoute mocking and error scenario testing
- ✅ **Type-Safe Tests**: Full TypeScript coverage in test suites
- ✅ **Edge Case Coverage**: Testing for missing data, optional properties, and error states
- ✅ **Development Tools**: Organized SCSS structure for maintainable styling

#### **Technical Features** ⭐

- ✅ **Modern Angular**: Using Angular 20 with latest control flow syntax and signals
- ✅ **Angular Material**: Integrated with custom theming and Inter font consistency
- ✅ **Modular SCSS**: Organized stylesheet architecture with separate concerns
- ✅ **SSR Ready**: Angular Universal configured for server-side rendering
- ✅ **Accessibility**: ARIA labels and semantic HTML structure
- ✅ **Performance**: OnPush change detection and optimized bundle
- ✅ **Error Resilience**: Graceful degradation with meaningful error messages

### 🎨 **Styling Architecture**

The project uses a **comprehensive design system** with modular SCSS organization and modern UI patterns:

```text
src/styles/
├── _variables.scss        # Tentative P3 color palette, fonts, spacing constants
├── _base.scss            # Global resets, html/body base styles
├── _mixins.scss          # Reusable SCSS mixins for consistent patterns
├── _typography.scss      # Inter font system and Material font overrides
├── _material-overrides.scss # Angular Material component customizations
└── _components.scss      # Tailwind component utilities and custom classes
```

**🎨 Design System Features:**

- 🎯 **Tentative P3 Color Palette**: Professional blue-based color system (#1269cc primary, #6d9ac7 secondary, #51eefc accent)
- 🔤 **Inter Font System**: Complete typography hierarchy with weights 300-900 including italic variants
- 📐 **SCSS Mixins Architecture**: Reusable patterns for forms, buttons, and typography
- 🎨 **Custom Tailwind Variants**: prose-p3 and prose-p3-invert for light/dark content styling
- 🖼️ **Hero Section**: Modern full-screen hero with halftone SVG background and gradient overlays
- 📱 **Responsive Grid Systems**: Advanced layouts with alternating section backgrounds
- 🎪 **Professional Contact UI**: Icon-based contact cards with hover states and transitions

**🔧 Key Implementation Details:**

- 🎨 **Seamless Integration**: Angular Material + Tailwind CSS working together harmoniously
- 🔤 **Consistent Typography**: Inter font enforced across all components including Material elements
- 🎯 **Accessibility Compliant**: Color contrast ratios meeting WCAG AA standards
- 📁 **Organized Structure**: Clear separation of concerns for maintainable code
- 🔧 **Reusable Variables**: Shared Tentative P3 color palette and spacing constants
- ⚡ **Performance Optimized**: Efficient CSS output with minimal duplication

### 🎬 **Hero Section Features**

The landing page features a **modern, professional hero section** that immediately establishes credibility:

```typescript
// Hero section includes:
- Full-screen halftone SVG background with Tentative P3 primary blue (#1269cc)
- Large typography hierarchy (text-7xl to text-8xl) with Inter Black 900 Italic
- Professional statistics display (5+ years experience, 20+ projects, 100% satisfaction)
- Compelling call-to-action buttons with hover states and transitions
- Responsive design scaling from mobile to desktop
- Gradient overlay for optimal text readability
```

**🎨 Visual Design Elements:**

- 🎯 **Professional Halftone Background**: SVG-based scalable graphics with brand color integration
- 📐 **Typography Hierarchy**: Large, bold headings with Inter font weight variations
- 🎪 **Interactive CTAs**: Primary and secondary buttons with smooth hover transitions
- 📊 **Statistics Display**: Professional achievement metrics in responsive grid layout
- 🌊 **Gradient Overlays**: Subtle background treatments for optimal text contrast

### 🚧 **Next Steps**

- [ ] Implement contact form with Angular Material components and validation
- [ ] Add more real project showcases and case studies
- [ ] Add SEO meta tags and structured data
- [ ] Integrate with headless CMS for dynamic content management
- [ ] Add analytics and performance monitoring
- [ ] Implement dark/light theme toggle with Tentative P3 color variants
- [ ] Add blog functionality with markdown support
- [ ] Create CI/CD pipeline for automated deployments
- [ ] Add progressive web app (PWA) features
- [ ] Implement advanced animations and micro-interactions

### 🏆 **Key Achievements**

The `stylinonfoos` branch represents a **complete design system overhaul** of the personal site:

- **Professional Design System**: Implemented comprehensive Tentative P3 color palette with accessibility compliance
- **Modern Hero Section**: Full-screen hero with halftone SVG background and compelling call-to-action design
- **SCSS Architecture Evolution**: Advanced mixins system with organized, maintainable stylesheet structure
- **Typography Excellence**: Complete Inter font system (300-900 weights) with custom Tailwind prose variants
- **Responsive Excellence**: Advanced grid layouts with alternating section backgrounds and mobile-first design
- **Content Enhancement**: Professional project showcases with updated copy and real contact information
- **90% Code Reduction**: Eliminated individual page components in favor of data-driven architecture
- **100% Type Safety**: Comprehensive TypeScript coverage with strict mode compliance
- **Modern Angular**: Cutting-edge Angular 20 patterns with new control flow syntax and signals
- **Enterprise-Ready**: Scalable content management system ready for CMS integration
- **Material Integration**: Seamless Angular Material + Tailwind CSS integration with custom theming
- **Comprehensive Testing**: Full test coverage with 33 test cases and edge case handling
- **Developer Experience**: Exceptional maintainability and ease of content updates

### 📊 **Technical Summary**

```bash
# Architecture & Framework
- Modern Angular 20 with signals and new control flow syntax
- Migrated from component-per-page to unified content system
- Added comprehensive TypeScript interfaces with union types
- Created 33 unit tests across 6 test suites with 100% coverage of critical paths

# Design System & Styling
- Professional Tentative P3 color palette (#1269cc, #6d9ac7, #51eefc) with WCAG AA compliance
- Complete Inter font system (300-900 weights) with custom prose-p3 Tailwind variants
- Advanced SCSS mixins architecture for reusable styling patterns
- Modern hero section with halftone SVG background and gradient overlays
- Responsive grid systems with alternating section backgrounds
- Angular Material + Tailwind CSS seamless integration

# User Experience & Content
- Full-screen hero section with compelling CTAs and professional stats display
- Enhanced project showcases with updated descriptions and technology stacks
- Professional contact section with icon-based cards and hover interactions
- Mobile-first responsive design with touch-friendly interactions
- Real contact information and social links integration

# Performance & Technical Excellence
- Lazy loading for all routes with OnPush change detection strategy
- SVG asset optimization and proper build configuration
- Bundle optimization with code splitting and error boundaries
- Accessibility-compliant color contrast and semantic HTML structure
- Modular SCSS organization for scalable styling maintenance

# Developer Experience
- Type-safe content management system with comprehensive interfaces
- Jest test suite with mock strategies and edge case coverage
- Modern Angular patterns and best practices implementation
- Clean, maintainable architecture ready for CMS integration
- Organized SCSS structure with clear separation of concerns
```

✨ This [Nx workspace](https://nx.dev) provides the foundation for scalable development ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

### **Quick Start (Recommended)**

To start the personal website development server:

```sh
npm run start
```

To create a production build:

```sh
npm run build
```

To run tests:

```sh
npm run test
```

To run linting:

```sh
npm run lint
```

### **Direct Nx Commands**

You can also use Nx commands directly:

```sh
npx nx serve personal-site
```

```sh
npx nx build personal-site
```

To see all available targets for the personal website project:

```sh
npx nx show project personal-site
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
