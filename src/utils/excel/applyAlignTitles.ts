import type { Cell, Worksheet } from 'exceljs';

/**
 * Автовыравнивание строки с названиями колонок по центру
 * @param {Worksheet} worksheet экземпляр таблицы
 */
export const applyAlignTitles = (worksheet: Worksheet) => {
	worksheet.getRow(1).eachCell((cell: Cell) => {
		cell.style = { ...cell.style, alignment: { horizontal: 'center' } };
	});
};
