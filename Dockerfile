# Dockerfile
FROM node:18

WORKDIR /app

# Copy over package.json and pnpm-lock.yaml before other files to cache dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of your application files
COPY . .

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["pnpm", "run", "dev"]
