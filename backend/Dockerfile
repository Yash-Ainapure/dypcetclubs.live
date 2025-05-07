FROM node:23-bookworm

WORKDIR /src

COPY package.*json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]
