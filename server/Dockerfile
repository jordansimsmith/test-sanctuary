FROM node:lts-alpine AS build

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
COPY --from=build /app/dist ./dist
EXPOSE 5000
ENTRYPOINT ["node", "dist/main.js"]

