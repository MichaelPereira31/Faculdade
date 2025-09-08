# --- Stage 1: Build ---
FROM node:20 AS builder

WORKDIR /usr/src/app

# Copia package.json e instala dependências (incluindo dev)
COPY package*.json ./
RUN npm install

# Copia tudo
COPY . .

# Gera Prisma Client
RUN npx prisma generate

# Build de produção do Next.js
RUN npm run build

# --- Stage 2: Runner ---
FROM node:20 AS runner

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copia apenas o necessário do build
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules 
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/next.config.ts ./
COPY --from=builder /usr/src/app/next-env.d.ts ./
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/.env ./.env 

EXPOSE 3000

# Aplica migrations, roda seeds e sobe o servidor
CMD sh -c "npx prisma migrate deploy && npm run seed && npm start"