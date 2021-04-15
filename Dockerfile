FROM node:alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json /usr/src/app

# Install dependencies
RUN npm install
RUN npm install -g @angular/cli

# Copy all files
COPY . /usr/src/app

# Expose the listening port
EXPOSE 4000

# Build app
RUN npm run build:ssr


# Launch app
CMD [ "npm", "run", "serve:ssr" ]
