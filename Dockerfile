# Base image with shared setup
FROM node:18-alpine AS base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# --- DEVELOPMENT STAGE ---
FROM base AS development

# Copy the rest of the source code
COPY . .

# Expose port for dev server
EXPOSE 3000

# Run dev server with hot reload
CMD ["npm", "run", "dev"]

# --- BUILD STAGE ---
FROM base AS build
COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

# Run production server
CMD ["npm", "start"]
