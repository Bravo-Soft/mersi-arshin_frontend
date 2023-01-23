export interface IGroup {
	/**
	 * Идентификационный номер
	 */
	id: string;
	/**
	 *	Название группы
	 */
	nameGroup: string;
	/**
	 *	Название пакета
	 */
	namePackage: string;
	/**
	 *	Частота бэкапов
	 */
	backupFrequency: string;
	/**
	 *	Макс. кол-во бэкапов
	 */
	maxSaveBackup: number;
	/**
	 *	Макс. кол-во аккаунтов
	 */
	maxCountAccount: number;
	/**
	 *	Когда истекает время оплаты
	 */
	expiresDataAccount: string;
	/**
	 *	Макс. кол-во ролей
	 */
	maxRoleAccount: number;
	/**
	 *	Включена ли админка в пакет
	 */
	isAdminAccont: boolean;
	/**
	 *	Макс. кол-во позиций в таблице
	 */
	maxCountRowTable: number;
	/**
	 *	Макс. кол-во шаблонов в пакете
	 */
	maxCountCustumTemplateTable: number;
	/**
	 *	Модуль печати
	 */
	isPrintLabel: boolean;
	/**
	 *	Возможность выбирать просроченные позиции
	 */
	isChooseExpiredValue: boolean;
	/**
	 *	Модуль уведомлений
	 */
	isNotification: boolean;
	/**
	 *	Есть ли множественный фильтр
	 */
	isMultipleFilter: boolean;
	/**
	 *	Возможность скрывать/показывать колонки
	 */
	isHideShowColumns: boolean;
	/**
	 *	Возможность передвигать колонки
	 */
	isMoveColumns: boolean;
	/**
	 *	Возможность закреплять колонки
	 */
	isFreezeColumns: boolean;
	/**
	 *	Модуль выгрузки (в CSV)
	 */
	isUplodingCSV: boolean;
	/**
	 *	Модуль выгрузки (в XLSX)
	 */
	isUplodingXLSX: boolean;
	/**
	 *	Модуль создания графика поверок
	 */
	isCreateVerificationSchedule: boolean;
	/**
	 *	Возможность выбрать месяц
	 */
	isChoiceMounth: boolean;
	/**
	 *	Возможность добавлять файлы к позициям
	 */
	isStoreCertificates: boolean;
	/**
	 *	Возможность закреплять позиции в вверху таблицы
	 */
	isRowPinning: boolean;
	/**
	 * Функция добавления в избранное
	 */
	IsFavoriteIdsEnabled: boolean;
	/**
	 * Максимальный размер файлов на позицию в байтах
	 */
	maxSizeOfSpacePerPosition: number;
}
