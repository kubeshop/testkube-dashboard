# Contributing to Testkube Dashboard

This document helps to start development of the 

## Table of Contents

1. [Set Environment](#set-environment)
   1. [Running own Testkube](#running-own-testkube) 
      1. [Custom API Version](#custom-api-version)
   2. [Environment Variables](#environment-variables)
   3. [Starting Dashboard](#starting-dashboard)
2. [Code Quality](#code-quality)
   1. [Process](#process)
   2. [Linter](#linter)
   3. [Unit Tests](#unit-tests)
   4. [E2E Tests](#e2e-tests)
3. [Preview](#preview)
4. [Architecture](#architecture)
   1. [Technology Stack](#technology-stack)
   2. [Mono-repository](#mono-repository)
   3. [Build Process](#build-process)
   4. [Plugins System](#plugins-system)
5. [Releases](#releases)
   1. [Cadence](#cadence)
   2. [Release Process](#release-process)
   3. [Feature Flags](#feature-flags)
6. [Project Management](#project-management)
   1. [Issue Tracking](#issue-tracking)
   2. [Error Reporting](#error-reporting)

## Set Environment

The Dashboard is getting data from the Testkube installation.

For development, you may either:
* use `https://demo.testkube.io/results/v1` or any other existing test environment
* run own Testkube installation

Either way, it may be useful to have [**Testkube CLI**](https://docs.testkube.io/articles/install-cli/) installed.

### Running own Testkube

To run the Testkube, you need to have Kubernetes cluster, and `kubectl` connected to it.

> **Running Kubernetes cluster locally**
> 
> For local development it may be easiest to use [**K3D**](https://k3d.io/v5.6.0/), [**Minikube**](https://minikube.sigs.k8s.io/docs/start/),
> or the one built in [Docker Desktop](https://docs.docker.com/desktop/kubernetes/) (but it's heavy).

To install the Testkube in your cluster, you may either run `testkube install` command, or install it from the [**helm chart**](https://docs.testkube.io/articles/helm-chart/).

After the Testkube is installed, you should run `testkube dashboard` command,
that will forward ports for Testkube API from your cluster to `http://localhost:8088/v1`.

#### Custom API Version

If you need to use custom API version, i.e. latest from the [**develop**](https://github.com/kubeshop/testkube/tree/develop) branch,
you may upgrade Testkube installation to a specific version,
by overriding the image tag in the Helm chart to the expected commit hash:

```bash
helm repo add kubeshop https://kubeshop.github.io/helm-charts && \
helm repo update && \
helm upgrade --install --reuse-values \
  --namespace testkube --create-namespace testkube \
  --set testkube-api.image.tag=9bd9f1b \
  kubeshop/testkube
```

### Environment Variables

See [**Environment Variables**](README.md#environment-variables) section in the README file.

### Starting Dashboard

Follow [**Running Dashboard > Repository**](README.md#repository) steps to start the dashboard.

## Code Quality

We aim to keep the best code quality. It doesn't mean that all the code great,
yet we try to have it covered with tests, standardize the syntax, and isolate problems.

### Process

To ensure that we continuously deliver good quality,
most of our checks are performed automatically during the Pull Request review.

### Linter

We use modified Prettier configuration ([**config**](.prettierrc.js)) for code style,
and lint the code against it and common mistakes with ESLint ([**config**](.eslintrc.js)).

Additionally, for styles (including the styled-components) we are using StyleLint ([**config**](.stylelintrc.json)).

* To run ESLint, you may run `npm run lint` command
* To run Prettier, you may run `npm run format:all` command *(but we encourage to configure IDE to run Prettier on save)*
* To run StyleLint, you may run `npm run stylelint`

### Unit Tests

We use [**Jest**](https://jestjs.io/) as our main test runner. Additionally, you may use [**Wallaby.js**](https://wallabyjs.com/) to run them with better experience in the IDE.

The tests are next to tested files, with `.spec.ts` or `.spec.tsx` extension.

We aim into having unit tests for every new feature, along with the Pull Request.

* To run unit tests, you may run `npm test` command
* To run unit tests with watching for a changes, you may run `npm run test:watch` command

> **Technical debt**
> 
> Unfortunately, we have a technical debt for old components,
> that are not well covered. We try to write unit tests for them in spare time or when editing,
> but a lot is too complex to cover and needs a refactor before to reduce the complexity.

### E2E Tests

We write E2E tests using [**Playwright**](https://playwright.dev/). The E2E tests are in the [`packages/e2e-tests`](packages/e2e-tests) directory.

We aim into having unit tests for bigger features, after the release.

During the Pull Request checks, the E2E tests are run against generated [**Vercel preview**](#preview) and `demo.testkube.dev`'s API.

> **Technical debt**
>
> We have some critical paths not covered, and we aim into covering them before new features,
> in spare time, or allocated time after other features.

## Preview

For every Pull Request, we are deploying the frontend as a Vercel preview.
When the Pull Request is created, there is automatically added a comment there,
with link to the generated preview.

It's not connected to any Testkube environment, so you have to put the API endpoint there.

It has telemetry disabled - to override it, add `?~gtm_id=GTM-PQK4DKN&~disable_telemetry=false` query parameters.

## Architecture

### Technology Stack

* [**TypeScript**](https://www.typescriptlang.org/) - we use TypeScript for all the code
* [**Zustand**](https://github.com/pmndrs/zustand) - we use for the state management
* [**RTK Query**](https://redux-toolkit.js.org/rtk-query/overview) - we use for communication with the [**Testkube REST API**](https://github.com/kubeshop/testkube/blob/develop/api/v1/testkube.yaml)
* [**Create React App**](https://create-react-app.dev/) with [**CRACO**](https://craco.js.org/) - we use for the build process
* [**Antd 4.x**](https://4x.ant.design/) - we use as the main UI library
* [**Jest**](https://jestjs.io/) and [**Testing Library**](https://testing-library.com/) - we use for unit tests
* [**Playwright**](https://playwright.dev/) - we use for E2E tests

> **Deprecation: Create React App**
> 
> As CRA is deprecated for long time, we plan to move to [**Vite**](https://vitejs.dev/).
> 
> It has a significant effort though, especially that we are using Monaco Editor with its [**Webpack plugin**](https://www.npmjs.com/package/monaco-editor-webpack-plugin) to reduce bundle size.

> **Deprecation: RTK Query**
> 
> We plan to move to GraphQL (probably with Apollo) mutations, queries and subscriptions,
> but we need to finish ongoing back-end work before.

> **Deprecation: Antd 4.x**
> 
> The Antd 5.x is alive for a long time, so we may consider migrating there.
> It will require significant effort though.
>
> As a side note, after migrating, we would like to have light/dark mode introduced.

> **Consideration: Zustand**
> 
> We may consider getting rid of Zustand,
> as our [**plugin system**](#plugins-system) is able to store the data in a similar way.
>
> It would make the code slightly simpler. The plugins system is a new thing though, so we are not fully familiar with it yet, during day-to-day development.

### Mono-repository

The `testkube-dashboard` repository is a mono-repository configured with the NPM.
All the packages are in the [`packages`](packages) directory, and have `@testkube/` name prefix.

The package that is exactly the Dashboard, is called [`web`](packages/web).

Running `npm install` from the root directory will install all the dependencies for all packages,
while running different commands like `npm run lint` or `npm test` will do that for all packages too.

> **Technical debt: Monolithic `web`**
> 
> The mono-repository has been introduced lately, so we had no time yet to split the code to corresponding packages.
> We should improve that in the coming weeks.

> **We plan to use [**nx**](https://nx.dev/) in future**
> 
> Thanks to that, we will be able to build boilerplate code for i.e. plugins automatically.

### Build Process

When `npm start` is run, the development build is performed and the application with hot reload is available at [**localhost:3000**](http://localhost:3000).

To build application for the production, you have to run `npm run build` command.

To test application with the production build, you may run `npm run start:prod` command,
that will build the package and serve it on [**localhost:3000**](http://localhost:3000).

### Plugins System

Lately we have started efforts towards the plugins system.

Thanks to that, we are able to prepare features that are OSS-only, Cloud-only or under the feature flag.

At the moment the plugins are created in [`packages/web/src/plugins`](packages/web/src/plugins). You may read the [**plugin system documentation here**](packages/plugins/README.md).

To add a new plugin, update the list in [`packages/web/src/AppRoot.tsx`](packages/web/src/AppRoot.tsx#L47) file.

> **Technical debt: all the plugins are in `web` package**
> 
> At the moment, because of issues with TypeScript types across packages (due to aliases in `web` package),
> all the plugins are in [`packages/web/src/plugins`](packages/web/src/plugins) directory.
> 
> We plan to move them to separate packages in the future.

> **Future enhancement**
> 
> We want to allow community plugins as well.

## Releases

### Cadence

We aim into having a big release once a month. We are increasing minor version (`1.MINOR.0`) then.

When we have some features and bugfixes ready, we release them with the patch version (`1.15.PATCH`).

### Release process

You may use the [**Create Release PR**](https://github.com/kubeshop/testkube-dashboard/blob/develop/.github/workflows/create-release-pr.yml) manual workflow.

Alternatively, you may do steps manually:

* Create a new release branch from `develop` (like `release/v1.16.3`)
* Rebase on top of `origin/main` branch (or merge if it's not possible)
* Create a PR to `main` branch
* Merge it (don't squash!)
* Tag the `main` branch to expected release (i.e. `git tag v1.16.3 && git push --tags`)

### Feature Flags

For new features, we are able to use feature flags.

* To check the status of the feature flag, you may use [`useFeatureFlag`](packages/web/src/feature-flags/hooks.ts) hook
* The feature flags are added by [**GTM**](https://tagmanager.google.com/), mostly from the [**PostHog**](https://posthog.com/)
* To switch the feature flag locally, you may dispatch the feature-flags event (like `const event = new Event('feature-flags'); event.data = {flag1: true}; window.dispatchEvent(event)`)

> **Future enhancement**
> 
> We could allow feature flags in a similar way as we handle environment variables overrides in the query string.

### Telemetry

We send custom events to GTM, that propagates them to specific places when the Trigger and Tag is created.

To track a new event, you may use [`useTelemetry`](packages/web/src/telemetry/hooks.ts) hook:

```ts
import {useTelemetry} from '@telemetry/hooks';

const telemetry = useTelemetry();

telemetry.event('runTest', {type: details!.type});
```

Additionally, don't forget to update the [**Telemetry docs**](telemetry.md).

## Project Management

### Issue Tracking

We are using GitHub issues in the [**kubeshop/testkube**](https://github.com/kubeshop/testkube/issues?q=is%3Aopen+is%3Aissue+label%3A%22service%3Adashboard+%F0%9F%8E%A1%22) repository.

Additionally, for internal project tracking we are using [**Linear**](https://linear.app/kubeshop/team/TKC/active), and [**Notion**](https://www.notion.so/) for specs.

### Error Reporting

The errors are automatically reported in the Sentry organization.
