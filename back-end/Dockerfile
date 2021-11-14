FROM node:16

WORKDIR /tmp

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 4000
ENV MODE "production"

EXPOSE 4000

CMD ["node", "./server.js"]