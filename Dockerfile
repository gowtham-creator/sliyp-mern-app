# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
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
RUN npm install

# Return to the root working directory
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Expose the ports your application will run on
EXPOSE 5000
EXPOSE 3000
EXPOSE 3000

# Start your application
CMD ["npm", "run", "dev"]
