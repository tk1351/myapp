FROM node:14.15.1

WORKDIR /myapp/backend

COPY backend/package.json .
COPY backend/yarn.lock .

COPY ./backend .
RUN rm -rf node_modules && yarn install

EXPOSE 8080

CMD ["yarn", "start"]