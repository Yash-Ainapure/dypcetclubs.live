
FROM node:23-alpine3.20

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 5173

CMD ["npm","run","dev"]


