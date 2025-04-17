FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Ejecuta pruebas aquí
RUN npm run test

# Construye después
RUN chmod +x node_modules/.bin/vite && node_modules/.bin/vite build

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]