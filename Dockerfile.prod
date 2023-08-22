FROM node:18-alpine as build
WORKDIR /usr/src/app
ADD *.json *.lock ./
RUN yarn install --network-timeout 240000
ADD . .
RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/app
ADD package.json yarn.lock ./
RUN yarn global add serve
COPY --from=build /usr/src/app/build ./build
