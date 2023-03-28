# Порядок запуска

## Запуск клиента

1. Скачать текущий репозиторий и установить все пакеты – `yarn`
2. Запустить скрипт `yarn start` через консоль или в сценариях NPM

## Запуск сервера

1. Необходимо загрузить репозиторий с [сервером](git@github.com:Bravo-Soft/mersi_3.0.git) в отдельную папку. ВАЖНО!!! Папку назвать mersi_server_3.0 Это наш прошлый репозиторий, на данной ветке находится чисто серверная часть.
2. Установить все пакеты – `yarn`,
3. Запустить скрипт `yarn start` через консоль или в сценариях NPM

## Примечания к продакшн версии

1. Для корректной работы валидации пароля необходимо прописать env переменную `REACT_APP_ENABLE_PASSWORD_RULES` в значение `false`

По умолчанию API находится по адресу `http://localhost:7001/api/docs`

P.S Для работы сервера необходимо предварительно включить VPN, если подключение идет не с рабочего ПК

### Логины и пароли

|      Логин (email) |                Пароль                | Роль пользователя |
| -----------------: | :----------------------------------: | :---------------- |
|      test1@mail.ru | 19a93870-a686-40a3-978c-2fbaaec3162e | `Администратор`   |
|    demo1-a@mail.ru |            !Svinka@13ee22            | `Администратор`   |
|    demo1-w@mail.ru |            !Svinka@13ee22            | `Писатель`        |
|    demo1-r@mail.ru |            !Svinka@13ee22            | `Читатель`        |
|    lite1-a@mail.ru |            !Svinka@13ee22            | `Администратор`   |
|    lite1-w@mail.ru |            !Svinka@13ee22            | `Писатель`        |
|    lite1-r@mail.ru |            !Svinka@13ee22            | `Читатель`        |
| modules1-a@mail.ru |            !Svinka@13ee22            | `Администратор`   |
| modules1-w@mail.ru |            !Svinka@13ee22            | `Писатель`        |
| modules1-r@mail.ru |            !Svinka@13ee22            | `Читатель`        |
| optimum1-a@mail.ru |            !Svinka@13ee22            | `Администратор`   |
| optimum1-r@mail.ru |            !Svinka@13ee22            | `Писатель`        |
| optimum1-w@mail.ru |            !Svinka@13ee22            | `Читатель`        |

### Пакеты

Демо

```json
{
	"id": "ebb92d42-14d9-4c4d-99f7-f4b55ba01b24",
	"nameGroup": "demo",
	"namePackage": "Демо",
	"backupFrequency": "Никогда",
	"maxSaveBackup": 0,
	"maxCountAccount": 1,
	"expiresDataAccount": "2023-02-06T09:10:10.851Z",
	"maxRoleAccount": 1,
	"isAdminAccont": false,
	"maxCountRowTable": 1000,
	"maxCountCustumTemplateTable": 5,
	"isPrintLabel": true,
	"isChooseExpiredValue": true,
	"isNotification": false,
	"isMultipleFilter": true,
	"isHideShowColumns": true,
	"isMoveColumns": true,
	"isFreezeColumns": true,
	"isUplodingCSV": true,
	"isUplodingXLSX": true,
	"isCreateVerificationSchedule": true,
	"isChoiceMounth": true,
	"isStoreCertificates": true,
	"isRowPinning": true,
	"maxSizeOfSpacePerPosition": 1048576,
	"IsFavoriteIdsEnabled": true,
	"hasClipboard": true
}
```

Лайт

```json
{
	"id": "4ae7d923-ada9-4fc5-9c67-f2cdf6d13da6",
	"nameGroup": "lite",
	"namePackag": "Лайт",
	"backupFrequency": "Раз в сутки",
	"maxSaveBackup": 180,
	"maxCountAccount": 1,
	"expiresDataAccount": "2023-02-03T09:10:10.856Z",
	"maxRoleAccount": 1,
	"isAdminAccont": false,
	"maxCountRowTable": 100,
	"maxCountCustumTemplateTable": 2,
	"isPrintLabel": false,
	"isChooseExpiredValue": true,
	"isNotification": false,
	"isMultipleFilter": true,
	"isHideShowColumns": true,
	"isMoveColumns": true,
	"isFreezeColumns": true,
	"isUplodingCSV": true,
	"isUplodingXLSX": true,
	"isCreateVerificationSchedule": true,
	"isChoiceMounth": true,
	"isStoreCertificates": true,
	"isRowPinning": true,
	"maxSizeOfSpacePerPosition": 1048576,
	"IsFavoriteIdsEnabled": true,
	"hasClipboard": true
}
```

Модули

```json
{
	"id": "1e73c20c-f12d-4bf0-966a-f03719488668",
	"nameGroup": "modules",
	"namePackage": "Модули",
	"backupFrequency": "Раз в сутки",
	"maxSaveBackup": 180,
	"maxCountAccount": 2,
	"expiresDataAccount": "2023-02-03T09:10:10.856Z",
	"maxRoleAccount": 1,
	"isAdminAccont": false,
	"maxCountRowTable": 1000,
	"maxCountCustumTemplateTable": 5,
	"isPrintLabel": false,
	"isChooseExpiredValue": false,
	"isNotification": false,
	"isMultipleFilter": true,
	"isHideShowColumns": true,
	"isMoveColumns": true,
	"isFreezeColumns": true,
	"isUplodingCSV": true,
	"isUplodingXLSX": true,
	"isCreateVerificationSchedule": true,
	"isChoiceMounth": true,
	"isStoreCertificates": true,
	"isRowPinning": true,
	"maxSizeOfSpacePerPosition": 1048576,
	"IsFavoriteIdsEnabled": true,
	"hasClipboard": true
}
```

Оптимум

```json
{
	"id": "90a2c4bf-caba-4d44-b350-3c6757005468",
	"nameGroup": "optimum",
	"namePackage": "Оптимум",
	"backupFrequency": "Раз в сутки",
	"maxSaveBackup": 180,
	"maxCountAccount": 5,
	"expiresDataAccount": "2023-02-03T09:10:10.856Z",
	"maxRoleAccount": 2,
	"isAdminAccont": true,
	"maxCountRowTable": 3000,
	"maxCountCustumTemplateTable": 5,
	"isPrintLabel": true,
	"isChooseExpiredValue": true,
	"isNotification": true,
	"isMultipleFilter": true,
	"isHideShowColumns": true,
	"isMoveColumns": true,
	"isFreezeColumns": true,
	"isUplodingCSV": true,
	"isUplodingXLSX": true,
	"isCreateVerificationSchedule": true,
	"isChoiceMounth": true,
	"isStoreCertificates": true,
	"isRowPinning": true,
	"maxSizeOfSpacePerPosition": 1048576,
	"IsFavoriteIdsEnabled": true,
	"hasClipboard": true
}
```
