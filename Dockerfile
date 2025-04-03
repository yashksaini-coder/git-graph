### Base Image & Dependencies Stage

FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy build artifacts
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/public ./public

# Copy .env file for runtime environment variables (remove from .dockerignore)
COPY .env .env

EXPOSE 3000
CMD ["npm", "start"]