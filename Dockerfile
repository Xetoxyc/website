# Build the React + Vite SSG site, then serve the static output with Caddy.
# Stateless and runtime-free (no Node server), suitable for Kubernetes.

# --- Stage 1: build the static site ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: skips the husky `prepare` hook (no .git in the image)
RUN npm ci --ignore-scripts
COPY . ./
RUN npm run build

# --- Stage 2: static server ---
# Caddy as a non-root user on port 5000; the Caddyfile says how.
FROM caddy:2.11-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
USER nobody
EXPOSE 5000
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
