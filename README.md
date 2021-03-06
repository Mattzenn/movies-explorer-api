# Выпускная проектная работа: "movies-explorer-api-backend".

## Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

 ### Ссылка на сайт размещенный на сервере: https://mattzenn-movies.nomoredomains.rocks/
 ### Ссылка на backend сайта на сервере: https://api.mattzenn-movies.nomoredomains.rocks (backend) Публичный ip 84.252.138.161
 ### Ссылка: на репозиторий frontend https://github.com/Mattzenn/movies-explorer-frontend

## Описание:

"Movies Explorer" - это приложение схожее по функционалу с онлайн кинотеатром. В данном сервисе
реализована возможность аутентификации пользователей, сохранения фильмов в избранном и поиском фильмов по ключевым словам.

В проектной работе была применена работа с макетом в Figma, построение сложных сеток, расширенные возможности HTML и CSS, реализация адаптивной вёрстки посредством Flexbox, Grid Layout и Media queries.

В рамках данного проекта был реализован фронтенд (с использованием фреймворка React.js) и бэкенд (Node.js, Express, MongodDB).

## Схемы и модели ресурсов

### Поля схемы `user`:

Поле | Описание
-----|------------
email | Почта пользователя, по которой он регистрируется. Обязательное поле, уникальное для каждого пользователя. Валидируется на соответствие схеме элекстронной почты.
password | Хеш пароля. Обязательное поле-строка. База данных не возвращает это поле.
name | Имя пользователя. Обязательное поле-строка от 2 до 30 символов.

### Поля схемы `movie`:

Поле | Описание
-----|------------
country | Страна создания фильма. Обязательное поле-строка.
director | Режиссёр фильма. Обязательное поле-строка.
duration | Длительность фильма. Обязательное поле-число.
year | Год выпуска фильма. Обязательное поле-строка.
description | Описание фильма. Обязательное поле-строка.
image | Cсылка на постер к фильму. Обязательное поле-строка. URL-адрес.
trailer | Cсылка на трейлер фильма. Обязательное поле-строка. URL-адрес.
thumbnail | Миниатюрное изображение постера к фильму. Обязательное поле-строка. URL-адрес.
owner | **_id** пользователя, который сохранил статью. Обязательное поле.
movieId | **id** фильма, который содержится в ответе сервиса **MoviesExplorer**. Обязательное поле.
nameRU | Название фильма на русском языке. Обязательное поле-строка.
nameEN | Название фильма на английском языке. Обязательное поле-строка.

## Технологии:

* nodejs 
* Expressjs
* nodemon 
* MongoDB
* Mongoose
* nodemon
* dotenv
* bcryptjs
* cors
* celebrate
* express-rate-limit
* winston
* eslint
* express-winston
* helmet
* jsonwebtoken
* validator

## Чеклист

[Критерии диплома веб-разработка](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html) 

