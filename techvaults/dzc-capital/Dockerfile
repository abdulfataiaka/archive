FROM php:7.4-alpine AS builder

RUN apk add --upgrade \
    wait4ports \
    bash

RUN docker-php-ext-install \
    pdo_mysql

WORKDIR /app

COPY . .

FROM builder AS deploy

RUN bash ./bin/container/install-composer

RUN php composer.phar install
