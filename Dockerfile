FROM nginx:stable-alpine

RUN apk add dos2unix --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/ --allow-untrusted

COPY --chmod=775 scripts/create-config.sh /docker-entrypoint.d/40-create-config.sh
COPY --chmod=775 scripts/configure-keycloak.sh /docker-entrypoint.d/50-configure-keycloak.sh

RUN dos2unix /docker-entrypoint.d/50-configure-keycloak.sh

COPY dist/ /usr/share/nginx/html
