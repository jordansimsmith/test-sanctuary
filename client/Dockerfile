FROM node:lts-alpine as build

ARG AUTH0_DOMAIN=abcd.au.auth0.com
ARG AUTH0_CLIENT_ID=abcdefghiklmnop
ARG AUTH0_CLIENT_SECRET=abcdefghilklmnopqrstuvwxyz123456790abdefghijklmnopqrstuvwxyz0123
ARG AUTH0_COOKIE_SECRET=abcdefghilklmnopqrstuvwxyz123456790abdefghijklmnopqrstuvwxyz0123
ARG AUTH0_API_AUDIENCE=https://abcd.com

ARG NEXT_PUBLIC_CLIENT_BASE
ARG NEXT_PUBLIC_SERVER_BASE

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine as run

ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=build /app/.next ./.next
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
