# Use Bun official image
FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "index.js"]