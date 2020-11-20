FROM node:14.15.1-alpine3.12

WORKDIR /myapp/backend

COPY backend/package.json .
COPY backend/yarn.lock .
RUN yarn install

COPY ./backend .

EXPOSE 8080

CMD ["yarn", "start"]