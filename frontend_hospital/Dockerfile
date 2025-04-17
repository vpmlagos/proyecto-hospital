# Fase de construcción (builder)
FROM node:18 AS builder
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Ejecutar la construcción de la aplicación con Vite usando npx
RUN chmod +x node_modules/.bin/vite && npx vite build

# Fase de producción (nginx)
FROM nginx:stable-alpine

# Eliminar los archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos de la fase anterior al contenedor de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para nginx
EXPOSE 80

# Ejecutar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
