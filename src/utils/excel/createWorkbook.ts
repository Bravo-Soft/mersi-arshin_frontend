import { Workbook } from 'exceljs';
import { applyAlignTitles } from './applyAlignTitles';
import { applyAutoWidthColumns } from './applyAutoWidthColumns';
import { applyFillColumnHeader } from './applyFillColumnHeader';
import { applyBoldFontForTitles } from './applyBoldFontForColumnTitles';
import { applyBorderBottomFormColumnHeader } from './applyBorderBottomFormColumnHeader';
import { applyOuterBorder } from './applyOuterBorder';
import { applyPinFirstColumnsRow } from './applyPinFirstRow';

import type { IColumn, IExcelConfig } from './types';

/**
 *	Функция, создающая экземпляр книги Excel
 * @param {T} data массив данных
 * @param {IColumn} columns колонки, ключи которых должны совпадать с ключами объекта данных типа `T`
 * @param {IExcelConfig} excelConfig желаемая конфигурация при создании книги
 * @returns {Workbook} готовый экземпляр книги
 */
export const createWorkbook = <T>(
	data: T[],
	columns: IColumn[],
	excelConfig: IExcelConfig = { enablePinFirstRow: true }
): Workbook => {
	const workbook = new Workbook();

	const worksheet = workbook.addWorksheet('Таблица 1');

	/* Вставляем колонки и данные в таблицу */
	worksheet.columns = columns;
	worksheet.addRows(data);

	/* Установка ширины в зависимости от контента */
	applyAutoWidthColumns(worksheet);

	/* Если передана конфигурация, устанавливаем значения и применяем необходимые функции */
	if (excelConfig) {
		const {
			userName,
			enableOuterBorder,
			enablePinFirstRow = true,
			enableAlignTitlesCentrally,
			enableFillColumnHeader,
			enableBoldFontColumnHeader,
			enableBorderBottomForColumnHeader,
			borderStyle,
			fill,
		} = excelConfig;

		workbook.creator = userName ?? 'Пользователь 1';

		enableOuterBorder && // Установка внешней границы
			applyOuterBorder(
				worksheet,
				{ col: 1, row: 1 },
				{ col: worksheet.columns.length, row: data.length + 1 },
				borderStyle
			);
		enablePinFirstRow && applyPinFirstColumnsRow(worksheet); // Закрепление первой строки
		enableAlignTitlesCentrally && applyAlignTitles(worksheet); // Выравнивание по центру
		enableFillColumnHeader && applyFillColumnHeader(worksheet, fill); // Наполнение ячеек заголовков столбцов
		enableBoldFontColumnHeader && applyBoldFontForTitles(worksheet); // Жирный шрифт для текста внутри заголовков столбцов
		enableBorderBottomForColumnHeader &&
			applyBorderBottomFormColumnHeader(worksheet, borderStyle); // Нижняя граница для заголовков столбцов
	}

	return workbook;
};
