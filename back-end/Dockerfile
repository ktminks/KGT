FROM ubuntu:20.04
USER root
WORKDIR /home/app
COPY ./package*.json /home/app/

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

COPY . .

ENV PORT 4000
ENV MODE "production"
ENV NODE_ENV "production"

RUN --mount=type=secret,id=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=AWS_SECRET_ACCESS_KEY \
    mkdir ~/.aws && \
    echo "[default]" > ~/.aws/credentials && \
    echo aws_access_key_id = $(cat /run/secrets/AWS_ACCESS_KEY_ID) >> ~/.aws/credentials && \
    echo aws_secret_access_key = $(cat /run/secrets/AWS_SECRET_ACCESS_KEY) >> ~/.aws/credentials

EXPOSE 4000

CMD ["node", "./server.js"]