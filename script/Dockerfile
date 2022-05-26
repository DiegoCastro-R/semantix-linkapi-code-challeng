FROM node:lts as build-step

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

COPY .env ./



CMD [ "node", "dist/src/index.js" ]

