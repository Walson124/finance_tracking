# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies early to leverage Docker layer caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run in development mode
CMD ["npm", "run", "dev"]
