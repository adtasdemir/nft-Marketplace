# Use the official node image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies (including vue-router)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080 for the frontend application
EXPOSE 8080

# Run the Vue.js development server
CMD ["npm", "run", "serve"]
