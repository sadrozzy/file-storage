FROM node:alpine AS build

WORKDIR /client

COPY package.json ./
RUN npm i
COPY . ./
RUN npm run build && npx prisma generate