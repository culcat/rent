FROM node

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm i

# Bundle app source
COPY . /app
RUN npm start

EXPOSE 80
CMD [ "npm", "start" ]
