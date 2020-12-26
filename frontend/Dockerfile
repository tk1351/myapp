FROM node:14.15.1-alpine3.12

WORKDIR /myapp/frontend

COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install
RUN yarn global add firebase-tools

RUN apk update \
    && apk --no-cache add openjdk11-jre-headless

COPY ./frontend .

EXPOSE 3000

CMD ["yarn", "dev"]