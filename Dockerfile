# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY frontend/package*.json ./frontend/


CMD ["cd" ,"frontend/"]


# Install application dependencies
RUN npm run install-all

# Copy the rest of the application code to the container
COPY . .

# Expose the ports your application will run on
EXPOSE 5000
EXPOSE 3000
EXPOSE 3001


# Start your application
CMD ["npm", "start"]
