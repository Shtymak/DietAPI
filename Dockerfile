FROM node:alpine

WORKDIR /diet-api

COPY package.json ./

COPY . .

EXPOSE 3000

RUN npm install


CMD ["npm", "run", "start"]