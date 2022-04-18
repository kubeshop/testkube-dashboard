# TestKube Dashboard

![Netlify](https://img.shields.io/netlify/8cef7e08-ee34-4dd3-871a-27fb0c63a0c8?color=%231890fc&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kubeshop/testkube-dashboard/Publish%20Docker%20image?style=for-the-badge)

A simple read-only dashboard for real-time TestKube results.

The TestKube Dashboard is deployed as a standalone web application in a cluster running TestKube. It runs in the browser
and communicates with the TestKube api-server via an Ingress controller (either provided or bundled):

![img.png](docs/images/very-high-level-architecture.png)

Available operations for the api-server are in its
[OpenAPI Definition](https://github.com/kubeshop/testkube/blob/main/api/v1/testkube.yaml)

## Development setup

During development one can bypass the Ingress and interact with the api-server directly:

- Install TestKube in your cluster - see [TestKube Installation](https://kubeshop.github.io/testkube/installing/)
- Expose the api-server with

```shell
kubectl-testkube dashboard
```

(here we're exposing the testkube-api-server running in the TestKube namespace on port 8080 locally)

![img.png](docs/images/dev-architecture.png)

## Packaging / Running under Docker

Package this into a Docker image using the provided [Dockerfile](Dockerfile) with

```
docker build -t kubeshop/testkube-dashboard .
```

Run locally on port 3001 with

```
docker run -it -p 3001:80 kubeshop/testkube-dashboard:latest
```

## Deploying under Kubernetes

Push to DockerHub

```
docker push testkube/testkube-dashboard
```

Deploy the included manifest to your cluster:

```
kubectl apply -f manifests/deployment.yaml
```

Access using port-forwarding :

```
kubectl port-forward service/testkube-dashboard 8080:80
```

(this example forwards on port 8080)

## Quick start

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the
[Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

Eslint/Prettier/Husky/Craco/etc configuration was copied from [Monokle](https://github.com/kubeshop/monokle) project

In order to be able to run this application locally without docker, just close this repo and then let the magic start
:fireworks: :tada:

```bash
git clone git@github.com:kubeshop/testkube-dashboard.git && cd kubetest-dashboard
npm install --force
npm run start
```

To be able to run the application with mocked data, you just need to switch commands and use:

```bash
npm run start:mock-app
```

After this, you should get an open navigator with the link: `http://localhost:3000/` otherwise you can just go to that
:link:

## Commands:

| Command                  |           description            |
| ------------------------ | :------------------------------: |
| `npm run lint`           |           lint project           |
| `npm run lintfix`        |     fix lint of the project      |
| `npm run stylelint`      |    fix styles of the project     |
| `npm run start`          |          start the app           |
| `npm run start:mock-app` |    Start app with mocked data    |
| `npm run mock-api`       |     Run mock data separately     |
| `npm run test`           |       run test of the app        |
| `npm run test:watch`     |         watch jest test          |
| `npm run test:coverage`  |        run test coverage         |
| `npm run test:update`    |       run coverage update        |
| `npm run build`          | build the app under build folder |

## Deployment application

This application is deployed with [Netlify](https://app.netlify.com/) where you can see it live using under this :link:
[TestKube-dashboard](https://cocky-northcutt-d5b913.netlify.app/) .
