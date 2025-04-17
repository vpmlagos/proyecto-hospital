# Etapa de build
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install --save-dev vite

COPY . .

RUN npx vite build

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
