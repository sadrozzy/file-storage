FROM node:alpine as build

WORKDIR /client

COPY package.json ./
RUN npm i
COPY . ./
RUN npm build