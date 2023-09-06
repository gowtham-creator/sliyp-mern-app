# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy frontend package.json and package-lock.json to the container
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy backend package.json and package-lock.json to the container
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the ports your application will run on
EXPOSE 5000
EXPOSE 3000
EXPOSE 3001

# Start your application
CMD ["npm", "run","dev"]
