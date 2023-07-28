FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --update python3 make g++

RUN rm -rf /var/cache/apk/*

RUN npm install

EXPOSE 3000

COPY . .

CMD [ "npm", "run", "start" ]
