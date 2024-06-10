FROM node:20.12.2

WORKDIR /app

COPY app .
RUN npm i
RUN npm run build