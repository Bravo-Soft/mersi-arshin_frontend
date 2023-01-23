import type { BorderStyle, Cell, Worksheet } from 'exceljs';

/**
 *	Функция, добавляющая для строки с названиями колонок нижнюю границу
 * @param {Worksheet} worksheet экземпляр таблицы
 * @param {BorderStyle} style стиль границы, по умолчанию `medium`
 */
export const applyBorderBottomFormColumnHeader = (
	worksheet: Worksheet,
	style: BorderStyle = 'medium'
) => {
	const columnHeader = worksheet.getRow(1);

	columnHeader.eachCell((cell: Cell) => {
		cell.border = {
			...cell.border,
			bottom: {
				style,
			},
		};
	});
};
