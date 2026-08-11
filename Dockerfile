# Build the React + Vite SSG site, then serve the static output with nginx.
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
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5000
# nginx:alpine runs `nginx -g 'daemon off;'` by default.
