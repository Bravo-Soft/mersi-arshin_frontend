import type { Cell, Worksheet } from 'exceljs';

/**
 * Применение жирного шрифта для строки заголовков
 * @param {Worksheet} worksheet экземляр таблицы
 */
export const applyBoldFontForTitles = (worksheet: Worksheet) => {
	const rowColumTitles = worksheet.getRow(1);

	rowColumTitles.eachCell((cell: Cell) => {
		cell.font = {
			...cell.font,
			bold: true,
		};
	});
};
