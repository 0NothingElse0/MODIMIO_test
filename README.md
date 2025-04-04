Swagger можно открыть по адресу /api-docs
В файле .env необходимо заполнить PORT и данные для bd. 
В package.json созданы скрипты:
- build - сбор билда,
- start - запуск приложения,
- start:build - запуск приложения и сбор билда(Запускайте это для включения сервера),
- dev - запуск с nodemon,
- migrate - миграции в бд
- seed - добавление сидов
- создание учётки админа npm run createAdmin -- --login=param --password=param