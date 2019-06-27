FROM node:11.13-alpine

# bcrypt should be rebuilt from source - otherwise it fails with segfault
# RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /var/www
WORKDIR /var/www

COPY ./package.json /var/www

RUN npm install && rm -rf /root/.npm
# RUN npm rebuild bcrypt --build-from-source

ENV NODE_ENV=production

COPY . /var/www

EXPOSE 8080

ENTRYPOINT [ "node", "boot.js"]
