import { Dayjs } from 'dayjs';

import { IDataItem } from './dataItem';

export enum ItemAction {
	CREATED = 'Создан',
	UPDATED = 'Обновлен',
	REMOVED = 'Удален',
}

export interface IHistoryItem extends IDataItem {
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
	 * Массив измененных полей
	 */
	flags: Array<keyof Omit<IHistoryItem, 'flags' | 'editedBy' | 'action' | 'modificationDate'>>;
	/**
	 * Комментарий к статусу
	 */
	conditionDescription: string;
	/**
	 * Флаг для поверки: mr - новые МР, tr-редактирование текущей МР
	 */

	typeUpdate: 'mr' | 'tr';
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
