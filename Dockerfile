FROM node:carbon

WORKDIR /app
COPY . /app
RUN yarn --production
COPY . .
EXPOSE 8080

CMD ["yarn", "start"]

