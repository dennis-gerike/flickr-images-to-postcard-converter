FROM node:18-alpine

WORKDIR /app

COPY . .

ENTRYPOINT ["npm", "start"]
