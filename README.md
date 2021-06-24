# Getting Started
## Стек MERN + TypeScript + SCSS

## Все команды вводятся в корне проекта

#### 1. Установка необходимых пакетов:
	1.1 Установка node_modules сервера: `npm install`
	1.2 Переходим в директорию `/client`
	1.3 Установка node_modulse клиента: `npm install`
	1.4 Переходим в корень проекта

#### 2. Запуск в dev режиме:
	`npm run dev`  

#### 3. Запуск в production
	3.1 Компиляция клиента:
		`npm run client:build`
	3.2 Запуск:
		`npm start`

## Структура сервера

1. Index.js - это файл, запускающий сервер, находится он в корне проекта.
2. Контроллеры запросов находятся в директории `/rotes`.
3. Картинки слайдера хранятся в директории `/public/images`.
4. Файлы со структурой коллекций базы данных находятся в `/collections`.

## Структура клиента
Командой `npx create-react-app my-app --template typescript` был создан шаблон.
1. В файле `/src/routes.tsx` настраивается маршрутизация.
2. В директории `/Components` хранятся компоненты, которые могут использовать несколько раз.