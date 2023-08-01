export interface IProfile {
	/**
	 * Адрес почты пользователя, он же логин при входе
	 */
	email: string;
	/**
	 * Имя
	 */
	firstName: string;
	/**
	 * Фамилия
	 */
	lastName: string;
	/**
	 * Отчество
	 */
	patronymicName: string;
	/**
	 * Компания
	 */
	organization: string;
	/**
	 * Должность
	 */
	position: string;
	/**
	 * Отдел
	 */
	division: string;
	/**
	 * Номер телефона
	 */
	phone: string;
}

export interface IProfileRequest {
	firstName: string;
	lastName: string;
	patronymicName: string;
	organization: string;
	position: string;
	division: string;
	phone: string;
}
