FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD npx prisma migrate deploy && npm start
