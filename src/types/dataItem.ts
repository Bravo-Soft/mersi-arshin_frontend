import { Dayjs } from 'dayjs';

import type { Tag } from 'constant/tag';

export interface IDataItem {
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
	size: Tag;
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
	verificationControlInStateRegister?: boolean;
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
	fgisUrl?: string;
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
	/**
	 * Завод-изготовитель
	 */
	manufacturer: string;
	/**
	 * Дата производства
	 */
	dateOfCommissioning: string;
	/**
	 * Аттестат
	 */
	instrumentCertificate: string;
	/**
	 * СНИЛС
	 */
	snils: string;
	/**
	 * Комментарий к ремонту (опционально)
	 */
	conditionDescription?: string;
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
		IDataItem,
		'verificationDate' | 'productionDate' | 'dateOfTheNextVerification' | 'dateOfCommissioning'
	> {
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
	/**
	 * Дата ввода в эксплуатацию
	 */
	dateOfCommissioning: Dayjs;
}

export interface IConditionData extends Pick<IDataItem, 'id' | 'condition'> {
	description: string;
}
