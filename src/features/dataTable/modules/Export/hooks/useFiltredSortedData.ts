import { gridFilteredSortedRowEntriesSelector, useGridSelector } from '@mui/x-data-grid-pro';
import type { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import dayjs from 'dayjs';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { selectSelectionModel } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItem } from 'types/dataItem';

/**
 * Хук, достает из селектора отфильтрованные и отсортированные позиции и в зависимости от того, есть ли отмеченные позиции будет их возвращать
 * @param {React.MutableRefObject<GridApiPro>}apiRef ref-ссылка, получаемая из `useGridApiContext`
 * @returns Массив отфильтрованных и отсортированных позиций
 */
export const useFiltredSortedData = (apiRef: React.MutableRefObject<GridApiPro>): IDataItem[] => {
	const filtedSortedRow = useGridSelector(apiRef, gridFilteredSortedRowEntriesSelector);
	const ids = useAppSelector(selectSelectionModel);

	/* Создаём новый массив, форматируем даты и при этом убираем повторяющийся id ключ */
	const filtedSortedDataItems = filtedSortedRow.map(
		({ model }) =>
			({
				...model,
				productionDate: dayjs(model.productionDate).format(dayjsFormatVariant),
				verificationDate: dayjs(model.verificationDate).format(dayjsFormatVariant),
				dateOfTheNextVerification: dayjs(model.dateOfTheNextVerification).format(
					dayjsFormatVariant
				),
			} as IDataItem)
	);
	/* Проверка на наличие отмеченных позиций */
	if (ids.length) {
		/* Находим только отмеченные */
		return filtedSortedDataItems.filter((item: IDataItem) => ids.includes(item.id));
	}

	/* Если массив ids пустой, то возвращает отфильтрованный и отсортированный массив */
	return filtedSortedDataItems;
};
