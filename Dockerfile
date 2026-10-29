# syntax=docker/dockerfile:1
FROM node:24-bookworm AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .

FROM build AS test
RUN npx ng test --watch=false

FROM build AS dist
RUN npx ng build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=dist /app/dist/lab-web/browser /usr/share/nginx/html
EXPOSE 80
