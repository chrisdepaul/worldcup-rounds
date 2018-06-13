FROM node:carbon

WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
COPY . .
EXPOSE 8080

CMD ["yarn", "start:prod"]

