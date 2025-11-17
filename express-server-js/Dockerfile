FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json (we avoid requiring a missing yarn.lock)
COPY package.json ./

# Install dependencies (use npm which is always available in official image)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
CMD ["npm", "start"]