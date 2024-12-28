# Порядок запуска

## Запуск клиента 

1. Скачать текущий репозиторий и установить все пакеты – `yarn`
2. Запустить скрипт `yarn start` через консоль или в сценариях NPM

## Примечания к продакшн версии

По умолчанию API находится по адресу `http://192.168.0.127:8010/api/mersi/docs` && `http://192.168.0.127:8010/api/user/docs`

P.S Для работы сервера необходимо предварительно включить VPN, если подключение идет не с рабочего ПК

### Логины и пароли

|      Логин (email) |                Пароль                | Роль пользователя |
| -----------------: | :----------------------------------: | :---------------- |
|     kirill@mail.ru | 					c5tBmGHu						| `Администратор`   |
|    korepov@mail.ru |              u1P0mjzH      				| `Администратор`   |
|    kirill2@mail.ru |            	c5tBmGHu		            | `Читатель`        |


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
