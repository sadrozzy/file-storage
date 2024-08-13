FROM node:alpine AS build

WORKDIR /client

COPY package.json ./
RUN npm i
COPY . ./

RUN npx prisma migrate dev && npx prisma generate
RUN npm run build

CMD ["npm", "run", "start"]
