FROM node:12.16.2-alpine

COPY . /home/oction

RUN cd /home/oction && \
    npm install && \
    npm run build

CMD node /home/oction/server.js