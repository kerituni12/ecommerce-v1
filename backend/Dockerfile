FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/

EXPOSE 5000

# You can change this
CMD [ "npm", "start" ]