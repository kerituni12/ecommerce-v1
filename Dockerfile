## frontend
FROM node:lts-slim as frontend
RUN mkdir -p /usr/app/frontend
WORKDIR /usr/app/frontend

COPY ./frontend/package*.json /usr/app/frontend/
RUN npm install 
   
COPY ./frontend /usr/app/frontend/ 

RUN npm run build

## backend
FROM node:lts-slim

RUN mkdir -p /usr/app/backend
WORKDIR /usr/app/backend

COPY --from=frontend /usr/app/frontend/build/ ./frontend/build/

COPY ./backend/package*.json /usr/app/backend/
RUN npm install
COPY ./backend /usr/app/backend/

EXPOSE 3001

# You can change this
CMD [ "npm", "start" ]

