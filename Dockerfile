
# build environment
FROM node:16-alpine as react-build
WORKDIR /app/frontend

# Choose NGINX as our base Docker image
FROM nginx:alpine

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


CMD ["npm", "run", "dev"]



# Copy our nginx configuration
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html


# Define environment variables for Cloud Run
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

# Substitute $PORT variable in config file with the one passed via "docker run"
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"




