import type { Cell, Fill, Worksheet } from 'exceljs';

/**
 *	Функция, добаляющая наполение для ячеек заголовков
 * @param {Worksheet} worksheet эксземпляр таблицы
 * @param {Fill} fill параметр определяющий, как следует стилизовать наполнение ячеек
 */
export const applyFillColumnHeader = (worksheet: Worksheet, fill?: Fill) => {
	const rowColumnTitles = worksheet.getRow(1);

	rowColumnTitles.eachCell((cell: Cell) => {
		cell.style = {
			...cell.style,
			fill,
		};
	});
};
