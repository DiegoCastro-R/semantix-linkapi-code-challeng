FROM node:lts as build-step

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

COPY .env ./

EXPOSE 4000

CMD "mkdir ./usr/src/app/dist/src/temp"

CMD [ "node", "dist/src/shared/infra/http/server.js" ]

