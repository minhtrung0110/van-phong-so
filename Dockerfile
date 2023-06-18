### STAGE 1: Build ###
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run start
