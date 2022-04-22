FROM nginx:stable-alpine

COPY scripts/ /docker-entrypoint.d
COPY dist/ /usr/share/nginx/html
