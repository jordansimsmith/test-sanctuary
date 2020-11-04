FROM node:lts-alpine as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
# hack to allow nextjs-auth0 to build
COPY .env.example .env
RUN yarn build

FROM node:lts-alpine as run

ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=build /app/.next ./.next
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
