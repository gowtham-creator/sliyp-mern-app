

FROM node:16-alpine

WORKDIR /app

# Copy root-level package.json and package-lock.json to the container
COPY package*.json ./

# Install root-level dependencies (if any)
RUN npm install

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json to the container
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Set the working directory for the backend
WORKDIR /app/backend

# Copy backend package.json and package-lock.json to the container
COPY backend/package*.json ./

# Install backend dependencies

EXPOSE 3000

CMD ["npm", "run", "start"]

