import type { Worksheet } from 'exceljs';

/**
 *	Метод пробегается по значениям колонок и в зависимости от максимальной длины значения внитри ячеек, выставляет максимальную ширину колонки
 * @param {Worksheet} worksheet экземпляр таблицы
 */
export const applyAutoWidthColumns = (worksheet: Worksheet) => {
	worksheet.columns.forEach(column => {
		if (column.values) {
			/* Высчитываем длину ячейки по контенту внутри */
			const lengths = column.values.map(v => (v ? v.toString().length + 5 : 15));

			/* Делаем повторную проверку на тип и находим максимальное значение, устанавливаем его */
			const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
			column.width = maxLength;
		}
	});
};
