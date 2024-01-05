FROM ubuntu:20.04 as base

FROM base as build

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/app

COPY package.json ./


RUN npm install

COPY . .

EXPOSE 3333

CMD npm run setup && npm run dev
