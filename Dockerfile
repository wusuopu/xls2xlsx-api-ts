FROM node:18.12.1-alpine3.16

COPY ./app/package.json ./app/yarn.lock /app/
RUN cd /app && yarn install && rm -rf /root/.cache /root/.npm /usr/local/share/.cache/yarn/

COPY ./app/ /app
WORKDIR /app

RUN yarn build

VOLUME ["/app/tmp"]

ENV NODE_ENV=production \
    PORT=80

CMD ["yarn", "start"]
