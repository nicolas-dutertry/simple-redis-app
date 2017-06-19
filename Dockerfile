# Use an official Node runtime as a base image
FROM node:6

# Set the working directory to /simple-redis-app
WORKDIR /simple-redis-app

# Copy the current directory contents into the container at /simple-redis-app
ADD . /simple-redis-app

# Install any needed packages
RUN npm install

# Make port available to the world outside this container
EXPOSE 3000

# Run main.js when the container launches
ENTRYPOINT ["node", "main.js"]