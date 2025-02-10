FROM node:20.18.1 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG API_HOST
ENV API_HOST ${API_HOST}

RUN npm run build

FROM nginx:stable-alpine AS production

RUN apk add --no-cache bash

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html

COPY docker/nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY docker/nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
