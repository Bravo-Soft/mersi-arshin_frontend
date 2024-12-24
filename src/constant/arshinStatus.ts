export const enum ArshinStatus {
	DONE = 'Готово', // dell + sinc
	FAILED_TO_RETRIEVE_DATA = 'Не удалось получить данные', // dell + отправка
	AWAITING_SHIPMENT = 'Ожидание отправки', // dell + отправка
	PROCESS = 'В процессе',
	CANCELED = 'Проверка данных отменена пользователем', // dell + отправка
	NOT_FOUND = 'Данные не обнаружены', // dell + отправка
}

export const arshinFilterStatusDone = {
	columnField: 'status',
	operatorValue: 'is',
	value: ArshinStatus.DONE,
};
export const arshinFilterMyItems = (currentUserId: string) => ({
	columnField: 'userIds',
	operatorValue: 'is',
	value: ArshinStatus.DONE,
	userIds: { $in: [currentUserId] },
});
