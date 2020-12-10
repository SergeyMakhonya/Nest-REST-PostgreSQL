<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Описание

Пробный проект про учёт книг 📖 и читателей в библиотеке, с использованием фреймворка Nest.js

## Установка

# Перед запуском сервера или тестов
Для работы тестов и самого сервера, нужно поднять базу данных PostgreSQL через докер-контейнеры командой:

```bash
docker-compose up -d
```

> 🚀 Запуск базы данных PostgreSQL займёт некоторое время (минуту или две)

После чего нужно установить все необходимые пакеты:

```bash
npm ci
```

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Тестирование

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Генерация файла миграций
Генерация файла миграций опирается на файлы папки `src/entity`.
Команда для генирации миграций:

```bash
npm run typeorm migration:generate -- -n имя_миграции
```

Новый файл миграции появится в папке `src/migration`.
