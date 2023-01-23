import type { DATE_OF_SENDING_NOTIFICATION, RANGE_OF_SELECTION } from 'constant/mailer';

export interface INotificationSettings {
	/**
	 * Включены ли уведомления у пользователя
	 */
	isNotificationEnabled: boolean;
	/**
	 * Дата отправки уведомления
	 */
	dateOfSendingNotification: DATE_OF_SENDING_NOTIFICATION;
	/**
	 * Диапазон средств измерений
	 */
	rangeOfSelection: RANGE_OF_SELECTION;
	/**
	 * Подписанные на рассылку адреса электронной почты
	 */
	subscribedEmails: IEmailSettings[];
}

export interface IEmailSettings {
	/**
	 * Адрес почтового ящика
	 */
	email: string;

	/**
	 * Фильтр данных для почтового ящика
	 */
	emailFilters: IEmailFilter[];

	/**
	 * Условия группировки фильтров данных для почтового ящика
	 */
	linkOperator: 'or' | 'and';
}

/**
 * Интерфейся фильтров для почтового ящика
 */
export interface IEmailFilter {
	columnFilter: string;
	operatorValue: string;
	value?: string | Date;
}
