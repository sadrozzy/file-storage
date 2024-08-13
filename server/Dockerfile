FROM node:alpine AS build

WORKDIR /client

COPY package.json ./
RUN npm i
COPY . ./
RUN npm run build \
    npx prisma migrate dev \
    npx prisma generate \
