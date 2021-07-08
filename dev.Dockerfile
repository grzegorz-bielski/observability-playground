FROM node:alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
CMD npm run dev