# 1. Aşama: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Önce sadece bağımlılık dosyalarını kopyala
COPY package.json package-lock.json* ./ 
# Eğer bun kullanıyorsan bun.lock dosyasını da kopyala
# COPY bun.lock* ./

# Bağımlılıkları yükle
RUN npm install

# Şimdi tüm dosyaları kopyala
COPY . .

# Build işlemini başlat
RUN npm run build

# 2. Aşama: Çalıştırma (Sadece gerekli dosyalar)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]