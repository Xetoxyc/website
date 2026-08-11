# sittenauer.eu, personal portfolio and CV

Personal portfolio and CV for Tobias Sittenauer, linked from a Buy Me a Coffee
profile. React + Vite + Tailwind, built as a fully static site (SSG) and served by
nginx in a Docker image, deployed to Kubernetes. No runtime server, no trackers,
no external requests.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
```

## Build (static output)

```sh
npm run build    # vite-react-ssg → dist (prerendered static HTML per route)
npm run preview  # serve the build locally
```

Routes, each prerendered to static HTML: `/`, `/de`, `/cv`, `/de/cv`,
`/imprint`, `/privacy`. English at `/`, German under `/de`.

## Docker / Kubernetes

```sh
docker build -t portfolio .
docker run --rm -p 8080:5000 portfolio   # http://localhost:8080
```

The image runs `npm ci && npm run build` then serves `dist` with nginx. Run it
as a stateless Deployment behind your ingress (terminate TLS at the ingress; HSTS
is commented in `nginx.conf` for the TLS-at-nginx case). The container **listens on
port 5000** (non-privileged, for restricted Kubernetes security contexts) and
exposes `/healthz` for liveness/readiness probes.

