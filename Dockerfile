# Base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
