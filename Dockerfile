FROM node:20-alpine AS builder

RUN apk update && apk add --no-cache bash sed   

WORKDIR /app

COPY package*.json ./

ENV PRISMA_SKIP_POSTINSTALL=true
RUN npm install

RUN npm install --fetch-retries 3 && \
    npm uninstall prisma @prisma/client && \
    npm install prisma@6.15.0 @prisma/client@6.15.0

COPY . .
RUN chmod +x /app/docker-entrypoint.sh

RUN npx prisma generate

FROM node:20-alpine AS final

RUN apk update && apk add --no-cache bash sed

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3042

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]