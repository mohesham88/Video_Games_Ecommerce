FROM node:18

# WORKDIR /app: Sets the working directory inside the container to /app. This is where the application code will be copied and where the container will run from.
ENV TZ=EG
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run" , "start:dev" ]