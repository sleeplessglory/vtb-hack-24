FROM node:20-slim as build

WORKDIR /spa

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27

COPY --from=build /spa/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80