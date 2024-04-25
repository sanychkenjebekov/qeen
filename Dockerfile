# Use an official Node.js runtime as the base image
FROM node:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app/

# Build the React application
RUN npm run build

CMD ["npm", "run", "dev"]