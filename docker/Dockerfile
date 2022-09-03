FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.22-alpine AS server

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder ./app/dist /usr/share/nginx/html

