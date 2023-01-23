import type { Worksheet } from 'exceljs';

/**
 * Функция закрепляет первую строку с заголовками колонок
 * @param {Worksheet} worksheet экземпляр таблицы
 */
export const applyPinFirstColumnsRow = (worksheet: Worksheet) => {
	worksheet.views = [{ state: 'frozen', ySplit: 1 }];
};
