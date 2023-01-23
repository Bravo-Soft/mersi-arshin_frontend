import type { BorderStyle, Fill } from 'exceljs';

export interface IColumn {
	/**
	 * Ключ колонки, идентичен ключу в интерфейсе сущности. ВАЖНО! Если не правильно подставить имена колонок, будет неверно происходить подстановка данных в таблицу книги
	 */
	key: string;
	/**
	 * Название колонки
	 */
	header: string;
}

export interface IExcelConfig {
	/**
	 * Имя пользователя
	 */
	userName?: string;
	/**
	 * Наименование компании
	 */
	company?: string;
	/**
	 * Закрепить строку заголовков таблицы, по умолчанию включено
	 */
	enablePinFirstRow?: boolean;
	/**
	 * Включить внешнюю границу
	 */
	enableOuterBorder?: boolean;
	/**
	 * Стиль границы, применяется к правилам `enableOuterBorder` и `enableBorderBottomForColumnHeader`
	 */
	borderStyle?: BorderStyle;
	/**
	 * Выровнять по центру названия колонок
	 */
	enableAlignTitlesCentrally?: boolean;
	/**
	 * Жирный шрифт для заголовков
	 */
	enableBoldFontColumnHeader?: boolean;
	/**
	 * Включить границу для строки заголовков колонок
	 */
	enableBorderBottomForColumnHeader?: boolean;
	/**
	 * Включить окрашивание цвета для строки заголовков колонок
	 */
	enableFillColumnHeader?: boolean;
	/**
	 * Варианты заполнения ячеек заголовков колонок цветом
	 */
	fill?: Fill;
}

export interface IBorderPosition {
	/**
	 * Номер строки для начала/конца
	 */
	row: number;
	/**
	 * Номер колонки начала/конца
	 */
	col: number;
}
