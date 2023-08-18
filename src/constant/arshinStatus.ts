export const enum ArshinStatus {
	DONE = 'Готово',
	FAILED_TO_RETRIEVE_DATA = 'Не удалось получить данные',
	AWAITING_SHIPMENT = 'Ожидание отправки',
}

export const arshinFilterStatusDone = {
	columnField: 'status',
	operatorValue: 'is',
	value: ArshinStatus.DONE,
};
