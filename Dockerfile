FROM node:10-alpine

WORKDIR /home

COPY . .

RUN npm install

EXPOSE 80

CMD [ "node", "server.js" ]
