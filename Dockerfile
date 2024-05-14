FROM node:20-alpine

WORKDIR /app

COPY . .

ENTRYPOINT ["npm", "start"]
