<p align="center">
  <img src="docs/testkube-logo.svg" alt="Testkube Logo" width="80"/>
</p>

<p align="center">
  Welcome to Testkube - Your friendly cloud-native testing framework for Kubernetes
</p>

<p align="center">
  <a href="https://testkube.io">Website</a> |
  <a href="https://kubeshop.github.io/testkube">Documentation</a> |
  <a href="https://twitter.com/testkube_io">Twitter</a> |
  <a href="https://discord.gg/hfq44wtR6Q">Discord</a> |
  <a href="https://kubeshop.io/category/testkube">Blog</a>
</p>

<p align="center">
  <img title="Build Status" src="https://github.com/kubeshop/testkube-dashboard/actions/workflows/build.yml/badge.svg?event=push"/>
  <img title="Tests Status" src="https://github.com/kubeshop/testkube-dashboard/actions/workflows/test.yml/badge.svg?event=push"/>
  <img title="E2E Tests Status" src="https://github.com/kubeshop/testkube-dashboard/actions/workflows/pr_checks.yml/badge.svg?event=push"/>
</p>

<p align="center">
  <img title="MIT license" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  <a href="https://github.com/kubeshop/testkube-dashboard/releases"><img title="Release" src="https://img.shields.io/github/v/release/kubeshop/testkube-dashboard"/></a>
  <a href="https://github.com/kubeshop/testkube-dashboard/releases"><img title="Release date" src="https://img.shields.io/github/release-date/kubeshop/testkube-dashboard"/></a>
</p>

<hr>

# Testkube Dashboard

Dashboard to manage your [**Testkube**](https://testkube.io) cluster and monitor its real-time results.

The Dashboard is deployed as an application in the cluster.
It runs in a browser, and it communicates with the [**Testkube API Server**](https://github.com/kubeshop/testkube) via Ingress Controller (either provided or bundled).
A simple read-only dashboard for real-time TestKube results.

## Table of Contents

1. [Running Dashboard](#running-dashboard)
   1. [Bundled](#bundled) 
   2. [Repository](#repository)
   3. [Docker](#docker)
2. [Configuring Application](#configuring-application)
   1. [Environment Variables](#environment-variables)
   2. [Building Docker Image](#building-docker-image)
3. [Learn More](#learn-more)
   1. [Contributing and Architecture](#contributing-and-architecture)
   2. [Telemetry](#telemetry)
   3. [Testkube](#testkube)

## Running Dashboard

### Bundled

By default, Dashboard is installed in your cluster along with your Testkube system.

To use the bundled Dashboard, run `testkube dashboard` command with [**Testkube CLI**](https://docs.testkube.io/articles/install-cli/),
to forward the UI and API ports from the Kubernetes cluster.

> <details>
> <summary>:warning: <strong>Testkube Cloud and Enterprise</strong></summary>
> <br>
> 
> This Dashboard works only for the Testkube Open Source installations.
> To manage the Testkube in Enterprise or Cloud offering, use their corresponding dashboards:
> * [**cloud.testkube.io**](https://cloud.testkube.io?utm_source=github-dashboard) for Testkube Cloud
> * Your Enterprise URL for Testkube Enterprise
> </details>

> <details>
> <summary>:eight_spoked_asterisk: <strong>Disable bundling dashboard</strong></summary>
> <br>
> 
> To disable Dashboard installation with the Testkube system, you may use `testkube-dashboard.enabled=false` value in the [**Helm chart**](https://github.com/kubeshop/helm-charts/tree/main/charts/testkube).
> </details>

### Repository

To run the Testkube Dashboard for development:
* Install Node 20.x
* Fork the repository and clone it (or just clone it, if you are Testkube member or )
* Install NPM dependencies
* Run `npm start` command

```bash
git clone git@github.com:kubeshop/testkube-dashboard.git && cd testkube-dashboard
npm install
npm start
```

To learn more about the Testkube Dashboard development and architecture, see the [**Contribution manual**](CONTRIBUTING.md).

> <details>
> <summary>:eight_spoked_asterisk: <strong>Environment variables</strong></summary>
> <br>
> 
> To configure your [**environment variables**](#environment-variables), either:
> * create `.env` file in the repository, or
> * export the environment variables globally
> 
> You may use both [**build time**](#build-time-variables) and [**dynamic variables**](#dynamic-variables) here.
>
> Please note, that you may want to use [**Create React App's varisbles**](https://create-react-app.dev/docs/advanced-configuration/) too,
> i.e. `BROWSER=none` to avoid opening the browser.
> </details>

### Docker

The Docker images for the Testkube Dashboard are deployed to the Docker Hub as [**kubeshop/testkube-dashboard**](https://hub.docker.com/r/kubeshop/testkube-dashboard).

To start Dashboard using Docker, run the image with the [**dynamic environment variables**](#dynamic-variables) you would like to pass, i.e.:

```bash
docker run --rm \
  -p 8080:8080 \
  -e REACT_APP_API_SERVER_ENDPOINT=https://demo.testkube.io/results/v1 \
  kubeshop/testkube-dashboard:latest
```

> <details>
> <summary>:warning: <strong>Environment variables</strong></summary>
> <br>
> 
> To override the [**build time environment variables**](#build-time-variables) too, you need to [**build the Docker image**](#building-docker-image) on your own.
> </details>

## Configuring Application

### Environment Variables

All the Dashboard is configured with the environment variables.

Part of them is included directly in the production build,
while the rest may be modified for the running application.

The latest variables are listed in [**env.ts**](packages/web/src/env.ts) file,
but for simplicity we keep them documented below too.

> <details>
> <summary>:eight_spoked_asterisk: <strong>Deep-linking overrides</strong></summary>
> <br>
> 
> You may temporarily override the variables in the running application using the query string.
> The Dashboard seeks for query params starting with `~` and try to override any matching known variable.
>
> The query param name should be a variable name,
> but for simplicity it may omit `REACT_APP_` prefix and is case-insensitive.
> Short name from the tables above may be used.
> 
> As an example, to change the API endpoint, you may use `https://demo.testkube.io?~api_server_endpoint=http://localhost:8088`.
> </details>

#### Build Time Variables

The build time environments are loaded from `process.env` during build time.

| Name                   | Short Name   | Description                                                               |
|------------------------|--------------|---------------------------------------------------------------------------|
| `REACT_APP_SENTRY_DSN` | `sentry_dsn` | [**Sentry**](https://sentry.io/) DSN for error reporting                  |
| `REACT_APP_GTM_ID`     | `gtm_id`     | [**Google Tag Manager**](https://tagmanager.google.com/) ID for telemetry |
| `REACT_APP_VERSION`    | `version`    | Dashboard version used for reporting and displaying                       |

#### Dynamic Variables

The dynamic variables are loaded from automatically generated `env-config.js` file.

| Name                              | Short Name              | Description                                                                                                                               |
|-----------------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `REACT_APP_API_SERVER_ENDPOINT`   | `api_server_endpoint`   | URL for the Testkube API Server                                                                                                           |
| `REACT_APP_DISABLE_TELEMETRY`     | `disable_telemetry`     | Force disabling telemetry in the Dashboard                                                                                                |
| `REACT_APP_DEBUG_TELEMETRY`       | `debug_telemetry`       | Display debugging information about telemetry in the console log                                                                          |
| `REACT_APP_CRD_OPERATOR_REVISION` | `crd_operator_revision` | [**testkube-operator**](https://github.com/kubeshop/testkube-operator/tree/main/config/crd)'s branch for getting the JSON Schema for CRDs |
| `REACT_APP_ROUTE_BASENAME`        | `route_basename`        | Basename for the application. Use only when your Dashboard is accessible via different path than `/`                                      |

### Building Docker Image

To build the Docker image of Testkube Dashboard locally,
simply build the [**Dockerfile**](Dockerfile), optionally with the [**environment variables**](#environment-variables) from above.

```bash
docker build \
  --build-arg REACT_APP_API_SERVER_ENDPOINT=https://demo.testkube.io/results/v1 \
  -t kubeshop/testkube-dashboard:latest .
```

> <details>
> <summary>:eight_spoked_asterisk: <strong>Environment variables</strong></summary>
> <br>
> 
> When you are building images with `docker build`, you may either both set the [**build time variables**](#build-time-variables),
> and set defaults for the [**dynamic variables**](#dynamic-variables).
> </details>

## Learn more

### Contributing and Architecture

To learn more about the Testkube Dashboard development and architecture, see the [**Contribution manual**](CONTRIBUTING.md).

### Telemetry

To learn more about what custom events we expose to [**Google Tag Manager**](https://tagmanager.google.com/),
see [**Telemetry**](telemetry.md) document.

### Testkube

* For the documentation of the Testkube system, see [**docs.testkube.io**](https://docs.testkube.io).
* To see the live demo, you may take a look at [**demo.testkube.io**](https://demo.testkube.io) *(some API endpoints are disabled there though, to avoid modifications)*

> **Unleash the power of cloud native testing in Kubernetes with Testkube.**
>
> Consider [**Testkube Cloud**](https://cloud.testkube.io?utm_source=github-dashboard) for simpler integration and more features!
