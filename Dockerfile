FROM node:13-alpine

RUN apk update && apk upgrade && \
    apk add graphviz ttf-freefont

COPY . /app

WORKDIR /app/frontend
RUN yarn && yarn build

WORKDIR /app/backend
RUN yarn && yarn build

ENV FRONTEND_PATH /app/frontend/build

WORKDIR /app

CMD [ "node", "/app/backend/dist/index.js" ]
