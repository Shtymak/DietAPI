FROM node:16.14.2

WORKDIR /diet-api

COPY package.json ./

COPY . .

EXPOSE 3000

RUN npm install
RUN npm i webpack 

CMD ["npm", "start"]