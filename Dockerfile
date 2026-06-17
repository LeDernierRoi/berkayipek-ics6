# 1. Aşama: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lock* package-lock.json* yarn.lock* ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Çalıştırma
FROM node:20-alpine
WORKDIR /app
# Build klasörünü kopyala
COPY --from=builder /app/.output /app/.output
# Gerekli kütüphaneleri kopyala
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Portu belirle
EXPOSE 8080
ENV PORT=8080

# Uygulamayı başlat
CMD ["node", ".output/server/index.mjs"]