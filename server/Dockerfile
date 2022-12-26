FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG DOCKER_ENV=local
ENV NODE_ENV=$DOCKER_ENV

EXPOSE 3001

CMD ["npm", "run", "start:dev"]

