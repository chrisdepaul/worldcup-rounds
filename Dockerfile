FROM node:carbon

WORKDIR /app
COPY . /app
RUN yarn --production
COPY . .
EXPOSE 80

CMD ["yarn", "start"]

