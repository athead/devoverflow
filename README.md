# devOverflow

<!-- GitHub badges -->

[![Stars](https://img.shields.io/github/stars/athead/devoverflow?style=social)](https://github.com/athead/devoverflow/stargazers)
[![Fork](https://img.shields.io/github/forks/athead/devoverflow?style=social)](https://github.com/athead/devoverflow/forks)
[![GitHub commits](https://img.shields.io/github/commit-activity/t/athead/devoverflow?style=social&logo=github)](https://github.com/athead/devoverflow/commits)
[![Pull requests](https://img.shields.io/github/issues-pr/athead/devoverflow?style=social&logo=github)](https://github.com/athead/devoverflow/pulls)

![demo](https://raw.githubusercontent.com/athead/devoverflow/main/images/github.jpg)

[![License](https://img.shields.io/github/license/athead/devoverflow?color=dddddd&labelColor=000000)](https://github.com/athead/devoverflow/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/athead/devoverflow?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
[![Contributors](https://img.shields.io/github/contributors/athead/devoverflow?style=flat&color=orange&label=Contributors)](https://github.com/athead/devoverflow/graphs/contributors)
![Release](https://img.shields.io/github/release/athead/devoverflow.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)

## 🔥 Lighthouse

<img src='https://raw.githubusercontent.com/athead/devoverflow/main/images/optimization.jpg' height='100'>
* При использовании локального сервера MongoDB (Atlas + Vercel: Perfomance = 98)

## 🌐 Демо

Демо проекта: [devOverflow](https://deverflow.vercel.app/)

## 📝 Описание

**devOverflow** это платформа вопросов и ответов, позволяющая разработчикам задавать вопросы, делиться знаниями и учиться друг у друга. Она построена с использованием Next.js, Tailwind CSS, Clerk, MongoDB и многого другого.

<details><summary><b>Структура папок</b></summary>

```bash
devoverflow/
├───app
│   ├───(auth)
│   │   ├───sign-in
│   │   │   └───[[...sign-in]]
│   │   └───sign-up
│   │       └───[[...sign-up]]
│   ├───(root)
│   │   ├───(home)
│   │   │   └───ask-question
│   │   ├───collection
│   │   ├───community
│   │   ├───jobs
│   │   ├───profile
│   │   │   ├───edit
│   │   │   └───[id]
│   │   ├───question
│   │   │   ├───edit
│   │   │   │   └───[id]
│   │   │   └───[id]
│   │   └───tags
│   │       └───[id]
│   └───api
│       ├───chatgpt
│       ├───trudvsem
│       └───webhook
├───components
│   ├───cards
│   ├───forms
│   ├───home
│   ├───jobs
│   ├───layout
│   ├───profile
│   ├───shared
│   │   ├───filters
│   │   ├───navbar
│   │   ├───search
│   │   ├───sidebar
│   │   └───ui
│   └───ui
├───constants
├───content
├───context
├───database
├───lib
│   └───actions
├───public
│   └───assets
│       ├───icons
│       └───images
├───styles
└───types
```

</details>

## 📖 Оглавление

<details><summary>Оглавление</summary>

- [Демо](#-Демо)
- [Описание](#-Описание)
- [Используемые технологии](#-Используемые-технологии)
- [Начало работы](#-Начало-работы)
  - [Условия запуска](#-Условия-запуска)
  - [Установка и локальный запуск](#-Установка-и-локальный-запуск)
  - [Скрипты](#-Скрипты)
- [Переменные окружения](#-Переменные-окружения)
- [Развертывание](#-Развертывание)
  - [Развертывание в рабочей среде (вручную)](#-Развертывание-в-рабочей-среде-вручную)
  - [Развертывание на Vercel (рекомендуется)](#-Развертывание-на-Vercel-рекомендуется)
  - [Развертывание на Netlify](#-Развертывание-на-Netlify)
- [Участники](#-Участники)
  - [Запрос на исправление ошибок/добавление функции](#-Запрос-на-исправление-ошибок--добавление-функции)
- [Благодарности](#-Благодарности)
- [Ссылки](#-Ссылки)
- [Контакты](#-Контакты)
- [Лицензия](#-Лицензия)

</details>

## ✨ Используемые технологии

<details><summary><b>devOverflow</b> разработан с использованием следующих технологий:</summary>

- [TypeScript](https://www.typescriptlang.org/): TypeScript - это типизированный JavaScript.
- [Next.js](https://nextjs.org/): Next.js - это фреймворк React для создания веб-приложений, статически генерирующих страницу на стороне сервера.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS - это CSS-фреймворк для быстрой верстки пользовательских интерфейсов.
- [ESLint](https://eslint.org/): ESLint - это инструмент статического анализа кода для выявления проблем в JavaScript коде.
- [Prettier](https://prettier.io/): Prettier - это настраиваемый форматировщик кода.
- [Clerk](https://clerk.dev/): Clerk - это API аутентификации для разработчиков, который обрабатывает всю логику регистрации пользователя, входа в систему.
- [Shadcn-UI](https://ui.shadcn.com/): Shadcn UI - это библиотека пользовательского интерфейса React, которая помогает разработчикам быстро создавать современные веб-приложения.
- [TinyMCE](https://www.tiny.cloud/): TinyMCE - самая популярная в мире библиотека для редактирования текста.
- [MongoDB](https://www.mongodb.com/): MongoDB - это нереляционная, основанная на документах распределенная база данных, созданная для разработки современных приложений.
- [Mongoose](https://mongoosejs.com/): Mongoose - это инструмент моделирования объектов MongoDB, предназначенный для работы в асинхронной среде.
- [Prism.js](https://prismjs.com/): Prism - это легкий, расширяемый парсер синтаксиса.
- [Query String](https://www.npmjs.com/package/query-string): Парсер строки запроса URL.
- [Svix](https://svix.com/): Svix - это прокси-сервер webhook, который позволяет получать веб-хуки локально.
- [Zod](https://zod.dev/): Zod - это TypeScript библиотека для валидации данных.
- [Vercel](https://vercel.com/): Vercel - это облачная платформа для разработчиков, предоставляющая инфраструктуру для быстрого развертывания веб-приложения.

</details><br/>

[![Используемые технологии](https://skillicons.dev/icons?i=ts,nextjs,tailwind,mongodb,vercel)](https://skillicons.dev)

## 🧰 Начало работы

Чтобы запустить проект в вашей среде разработки, следуйте нижеописанной пошаговой инструкции.

### 📋 Условия запуска

Для локального запуска, вам необходимо установить на вашем локальном компьютере следующие программы:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)

### ⚙️ Установка и локальный запуск

**Шаг 0:**

Примечание :bangbang: приложение использует Clerk для аутентификации и управления пользователями, вам необходимо создать учетную запись Clerk [здесь](https://clerk.dev/) и установить переменные окружения `CLERK_PUBLISHABLE_KEY` и `CLERK_SECRET_KEY` в файле `.env`.

Примечание :bangbang: приложение использует базу данных MongoDB, необходимо создать базу данных и подключить ее к приложению, для этого измените переменную окружения `MONGODB_URL` в файле `.env`, расположенном в папке `server`.

Примечание :bangbang: приложение использует TinyMCE, необходимо создать учетную запись TinyMCE [здесь](https://www.tiny.cloud/) и установить переменную окружения `NEXT_PUBLIC_TINYMCE_API_KEY` в файле `.env`.

Примечание :bangbang: приложение использует OpenAI API для генерации ответов, необходимо создать учетную запись OpenAI [здесь](https://openai.com/) и установить переменную окружения `OPENAI_API_KEY` в файле `.env` (не является обязательным).

После выполнения всех приведенных выше инструкций, необходимо создать новый webhook на Clerk. Для этого перейдите в [Панель управления Clerk](https://dashboard.clerk.dev/), во вкладку "Webhooks", а затем нажмите "Add Endpoint". В качестве URL введите `http://<ССЫЛКА-НА-ВАШ-САЙТ>/api/webhook/clerk`. Для событий выберите "user". Затем нажмите "Create", чтобы создать webhook. Получите секретный ключ и установите его как переменную окружения `CLERK_WEBHOOK_SECRET` в файле `.env`.

**Шаг 1:**

Загрузите или клонируйте это репозиторий, воспользовавшись командой ниже:

```bash
git clone https://github.com/athead/devoverflow.git
```

**Шаг 2:**

Выполните следующую команду в корневом каталоге загруженного репозитория, чтобы установить все зависимости:

```bash
npm install
```

**Шаг 3:**

Выполните следующую команду, чтобы запустить логальный сервер разработки:

```bash
npm run dev
```

**Шаг 4:**

Откройте [http://localhost:3000](http://localhost:3000) с помощью вашего браузера, чтобы увидеть результат.

### 📜 Скрипты

Все скрипты описны в файле `package.json`. Вот список всех скриптов:

| Скрипт              | Действие                                             |
| :------------------ | :--------------------------------------------------- |
| `npm install`       | Установка зависимостей                               |
| `npm run dev`       | Запуск локального сервера по адресу `localhost:3000` |
| `npm run build`     | Сборка в production режиме в `./dist/`               |
| `npm run start`     | Локальный запуск production сборки                   |
| `npm run lint`      | Запуск ESLint                                        |
| `npm run analyze`   | Запуск Bundle analyzer                               |
| `npm run structure` | Генерация структуры папок                            |


## 🔒 Переменные окружения

Переменные окружения используются для конфигурирования приложения.

> [Переменные окружения](https://en.wikipedia.org/wiki/Environment_variable) — это переменные, которые задаются в операционной системе или оболочке, обычно используемые для настройки программ.

**devOverflow** использует [Clerk](https://clerk.com), [TinyMCE](https://uploadthing.com/), [OpenAI API](https://openai.com/blog/openai-api) и [MongoDB](https://mongodb.com) как внешние службы. Вам необходимо создать учетную запись в каждой из этих служб и получить учетные данные (ключи API) для запуска приложения.

Создайте файл `.env` в корневом каталоге проекта и добавьте следующие переменные окружения:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_CLERK_WEBHOOK_SECRET=<CLERK_WEBHOOK_SECRET>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

NEXT_PUBLIC_TINY_MCE_API_KEY=<YOUR_TINY_MCE_API_KEY>

MONGODB_URL=<YOUR_MONGODB_URL>

NEXT_PUBLIC_SERVER_URL=<YOUR_SERVER_URL>

OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

## 🚀 Развертывание

#### Развертывание в рабочей среде (вручную)

Вы можете создать оптимизированную рабочую сборку с помощью следующей команды:

```bash
npm run build
```

#### Развертывание на Vercel (рекомендуется)

Самый простой способ развернуть это Next.js приложение - использовать платформу [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Развертывание на Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fathead%2Fdevoverflow)

#### Развертывание на Netlify

Вы также можете развернуть это Next.js приложение с помощью [Netlify](https://www.netlify.com/).

[![Развертывание на Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/athead/devoverflow)

Ознакомтесь с [Next.js документацией](https://nextjs.org/docs/deployment) для получения более подробной информации.

## 🔧 Сообщество

[![Совместная разработка](https://contrib.rocks/image?repo=athead/devoverflow)](https://github.com/athead/devoverflow/graphs/contributors)

Совместная работа - это то, что делает open-source сообщество таким замечательным местом для обучения, вдохновения и творчества. Я **высоко ценю любой ваш вклад**.

Чтобы исправить ошибку или улучшить существующий модуль, выполните следующие действия:

1. Форкните репозиторий
2. Создайте новую ветку (`git checkout -b improve-feature`)
3. Внесите соответствующие изменения в файлы
4. Зафиксируйте свои изменения (`git commit -am 'Improve feature'`)
5. Запуште в ветку (`git push origin improve-feature`)
6. Создайте pull request 🎉

### 📩 Запрос на исправление ошибок/добавление функции

Если вы обнаружили ошибку (неспособность модуля выполнять предназначенную функцию), пожалуйста, откройте запрос [здесь](https://github.com/athead/devoverflow/issues/new) указав проблему с заголовком и четким описанием.

Если вы хотите запросить новую функцию, не стесняйтесь сделать это, открыв запрос [здесь](https://github.com/athead/devoverflow/issues/new). Пожалуйста, укажите примеры запросов и соответствующие им результаты.

## 💎 Благодарности

Я хотел бы выразить свою благодарность следующим людям, которые помогли мне с этим проектом и сделали его возможным:

- [Clerk](https://clerk.dev/)
- [MongoDB](https://mongodb.com)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)
- [Shadcn](https://shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Svix](https://svix.com/)
- [TinyMCE](https://www.tiny.cloud/)
- [OpenAI API](https://openai.com/blog/openai-api)
- [Vercel](https://vercel.com/)
- [JavaScript Mastery](https://www.jsmastery.pro/)

## 📚 Ссылки

JSMastery. [Ultimate Next.js 14 Course | Become a top 1% Next.js 14 developer](https://www.jsmastery.pro/ultimate-next-course).

## 📞 Контакты

[![Telegram](https://img.shields.io/badge/Telegram-@athead-2CA5E0?style=social&logo=telegram&logoColor=000000)](https://t.me/athead)

## 📋 Лицензия

**devOverflow** — это программное обеспечение с открытым исходным кодом, лицензированное [MIT](https://opensource.org/license/mit/), его можно использовать бесплатно - более подробную информацию смотрите в разделе [ЛИЦЕНЗИЯ](https://github.com/athead/devoverflow/blob/main/LICENSE).
