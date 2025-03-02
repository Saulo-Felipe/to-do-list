FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate \
  && npx prisma migrate deploy \
  && npm run build

EXPOSE 3003

CMD [ "npm", "run", "start" ]
