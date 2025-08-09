# Dockerfile simple para servir archivos estáticos
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
