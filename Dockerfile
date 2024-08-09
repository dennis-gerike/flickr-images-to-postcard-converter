FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

ENTRYPOINT ["npm", "start"]
