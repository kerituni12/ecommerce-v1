FROM node:lts-slim
RUN mkdir -p /usr/app/frontend
WORKDIR /usr/app/frontend

COPY package*.json /usr/app/frontend/
RUN npm install 
   
COPY . /usr/app/frontend/ 

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]