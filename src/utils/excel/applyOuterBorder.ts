import type { Border, BorderStyle, Worksheet } from 'exceljs';
import type { IBorderPosition } from './types';

/**
 *	Функция генерирует границу для таблицы в зависимости от установленных координат и стиля границы
 * @param {Worksheet} worksheet экземпляр таблицы
 * @param {IBorderPosition} start координаты начала границы
 * @param {IBorderPosition} end координаты конца границы
 * @param {BorderStyle} borderWidth стиль границы, по умолчанию `medium`
 */
export const applyOuterBorder = (
	worksheet: Worksheet,
	start: IBorderPosition,
	end: IBorderPosition,
	borderWidth: BorderStyle = 'medium'
) => {
	const borderStyle: Pick<Border, 'style'> = {
		style: borderWidth,
	};
	/* Проходимся по строкам, получаем начальные и конечные ячейки, прорисовываем им границы */
	for (let i = start.row; i <= end.row; i++) {
		const leftBorderCell = worksheet.getCell(i, start.col);
		const rightBorderCell = worksheet.getCell(i, end.col);
		leftBorderCell.border = {
			...leftBorderCell.border,
			left: borderStyle,
		};
		rightBorderCell.border = {
			...rightBorderCell.border,
			right: borderStyle,
		};
	}

	/* Аналогично со колонкам */
	for (let i = start.col; i <= end.col; i++) {
		const topBorderCell = worksheet.getCell(start.row, i);
		const bottomBorderCell = worksheet.getCell(end.row, i);
		topBorderCell.border = {
			...topBorderCell.border,
			top: borderStyle,
		};
		bottomBorderCell.border = {
			...bottomBorderCell.border,
			bottom: borderStyle,
		};
	}
};
