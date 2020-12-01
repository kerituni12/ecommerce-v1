FROM node:lts-slim
RUN mkdir -p /usr/app/backend
WORKDIR /usr/app/backend

COPY package*.json /usr/app/backend/
RUN npm install
COPY . /usr/app/backend/

EXPOSE 3001

# You can change this
CMD [ "npm", "start" ]