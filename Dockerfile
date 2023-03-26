FROM node:alpine

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
ADD . /app
