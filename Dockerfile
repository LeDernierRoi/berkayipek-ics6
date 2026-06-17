# 1. Aşama: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Gerekli bağımlılık dosyalarını kopyala
COPY package.json package-lock.json* bun.lock* ./

# Bağımlılıkları yükle (npm install yerine ci daha stabildir)
RUN npm ci

# Tüm kaynak dosyalarını kopyala
COPY . .

# Build işlemini başlat (Vinxi/TanStack Start projeleri için)
RUN npm run build

# 2. Aşama: Çalıştırma (Hafif imaj)
FROM node:20-alpine
WORKDIR /app

# Sadece build çıktısını ve gerekli kütüphaneleri kopyala
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Port ayarı (Railway 8080'i otomatik algılayacaktır)
ENV PORT=8080
EXPOSE 8080

# Uygulamayı başlat
CMD ["node", ".output/server/index.mjs"]