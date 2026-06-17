# 1. Aşama: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Dosyaları kopyala
COPY package.json package-lock.json* ./ 

# Önce kilidi silip yeniden oluşturalım ve temiz kurulum yapalım
RUN npm install

# Tüm kaynak dosyalarını kopyala
COPY . .

# Build işlemini başlat
RUN npm run build

# 2. Aşama: Çalıştırma
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=8080
EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]