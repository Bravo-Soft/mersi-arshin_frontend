export const enum ArshinStatus {
	DONE = 'Готово', // dell + sinc
	FAILED_TO_RETRIEVE_DATA = 'Не удалось получить данные', // dell + отправка
	AWAITING_SHIPMENT = 'Ожидание отправки', // dell + отправка
	PROCESS = 'Данные в обработке',
	CANCELED = 'Проверка данных отменена пользователем', // dell + отправка
	NOT_FOUND = 'Данные не обнаружены', // dell + отправка
}

export const arshinFilterStatusDone = {
	columnField: 'status',
	operatorValue: 'is',
	value: ArshinStatus.DONE,
};


