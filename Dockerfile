
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm ci

COPY . . 

EXPOSE 3333

CMD ["npm", "run", "setup", "&&", "npm", "run", "dev" ]
