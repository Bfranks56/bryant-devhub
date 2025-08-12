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

### ✅ **Current Progress**

#### **Architecture & Structure**

- ✅ **Page Components**: Created Home, About, Projects, and Contact pages
- ✅ **Layout Components**: Built responsive Navbar and Footer components
- ✅ **Routing**: Implemented Angular routing with clean URL structure
- ✅ **Component Architecture**: Using standalone components with OnPush change detection

#### **Styling & UI**

- ✅ **Tailwind CSS**: Fully integrated with custom configuration
- ✅ **Responsive Design**: Mobile-first approach with hamburger menu
- ✅ **Typography**: Enhanced with @tailwindcss/typography plugin
- ✅ **Consistent Styling**: Utility-first CSS with custom brand colors

#### **Development Setup**

- ✅ **npm Scripts**: Added convenient `npm run start`, `npm run build`, etc.
- ✅ **Prettier**: Auto-formatting configured for TypeScript and HTML
- ✅ **Testing**: Angular Testing Library setup with Jest
- ✅ **VS Code**: Workspace settings for optimal development experience

#### **Technical Features**

- ✅ **Modern Angular**: Using Angular 20 with latest features
- ✅ **SSR Ready**: Angular Universal configured for server-side rendering
- ✅ **Accessibility**: ARIA labels and semantic HTML structure
- ✅ **Performance**: OnPush change detection and optimized bundle

### 🚧 **Next Steps**

- [ ] Add real content to About, Projects, and Contact pages
- [ ] Implement active route highlighting in navigation
- [ ] Add lazy loading for better performance
- [ ] Create portfolio project showcases
- [ ] Add contact form functionality
- [ ] Implement SEO meta tags

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
