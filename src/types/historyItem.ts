import { Dayjs } from 'dayjs';

import type { Tag } from 'constant/tag';

export type ItemAction = 'Создание' | 'Редактирование' | 'Удаление';

export interface IHistoryItem {
	/**
	 * Кем отредактирован СИ
	 */
	editedBy: string;
	/**
	 * Когда отредактирован СИ
	 */
	modificationDate: string;
	/**
	 * Действие пользователя
	 */
	action: ItemAction;

	/**
	 * Идентификационный номер
	 */
	id: string;
	/**
	 * Наименование
	 */
	name: string;
	/**
	 * Тип СИ
	 */
	type: string;
	/**
	 * Заводской номер
	 */
	factoryNumber: string;
	/**
	 * Инвентарный номер
	 */
	inventoryNumber: string;
	/**
	 * Подразделение
	 */
	division: string;
	/**
	 * Дата поверки
	 */
	verificationDate: string;
	/**
	 * Дата следующией поверки
	 */
	dateOfTheNextVerification: string;
	/**
	 * Вид работ
	 */
	typeOfWork: string;
	/**
	 * Состояние
	 */
	condition: string;
	/**
	 * Госреестр
	 */
	stateRegister: string;
	/**
	 * Свидетельство
	 */
	certificate: string;
	/**
	 * Дата производства
	 */
	productionDate: string;
	/**
	 * Организация
	 */
	organization: string;
	/**
	 * Класс точности
	 */
	accuracyClass: string;
	/**
	 * Предел измерения
	 */
	measurementLimit: string;
	/**
	 * Размер
	 */
	size: string;
	/**
	 * Примечания
	 */
	notes: string;

	/**
	 * Массив id пользователей, у которых данных позиция записана в избранное
	 */
	userIds: string[];
	/**
	 * Межповерочный интервал
	 */
	interVerificationInterval: number;
	/**
	 * Контроль поверки в Госреестр
	 */
	verificationControlInStateRegister: boolean;
	/**
	 * Местоположение СИ
	 */
	location: string;
	/**
	 * Ответственный
	 */
	responsible: string;
	/**
	 * Пригодность
	 */
	suitability: string;
	/**
	 * Ссылка
	 */
	fgisUrl: string;
	/**
	 * Доп. Данные
	 */
	additionalData: string;
	/**
	 * Методика
	 */
	methodology: string;
	/**
	 * Стоимость
	 */
	cost: string;
	/**
	 * Вид
	 */
	view: string;
	flags: any;
}

export interface IDocument {
	/**
	 * Уникальный номер документа
	 */
	id: string;
	/**
	 * Название
	 */
	label: string;
	/**
	 * Размер в байтах
	 */
	size: number;
}

/* Интерфейс копирует родительский, но только изменяет тип данных трёх ключей. Необходим для отправки формы на сервер */
export interface IDataItemWithDates
	extends Omit<
		IHistoryItem,
		'modificationDate' | 'verificationDate' | 'productionDate' | 'dateOfTheNextVerification'
	> {
	/**
	 * Когда отредактирован СИ
	 */
	modificationDate: Dayjs;
	/**
	 * Дата поверки
	 */
	verificationDate: Dayjs;
	/**
	 * Дата производства
	 */
	productionDate: Dayjs;
	/**
	 * Дата следующией поверки
	 */
	dateOfTheNextVerification: Dayjs;
}
