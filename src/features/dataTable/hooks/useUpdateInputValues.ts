import { isDateKeys } from 'guards/isDateKeys';
import { useEffect } from 'react';

import type { UseFormSetValue } from 'react-hook-form';
import type { IDataItem, IDataItemWithDates } from 'types/dataItem';

/**
 *	Хук, обновляет данные в полях ввода формы в зависимости от выбранной позиции
 * @param data объект загруженных данных
 * @param setValue метод, выполняющий подмену данных при выборе дригой позиции
 */

export const useUpdateInputValues = (
	data: IDataItem | null,
	setValue: UseFormSetValue<IDataItemWithDates>
) => {
	useEffect(() => {
		if (data) {
			const keys = Object.keys(data) as Array<keyof IDataItem>;

			keys.forEach(key => {
				if (isDateKeys(key)) {
					return setValue(key, new Date(data[key]));
				}
				setValue(key, data[key]);
			});
		}
	}, [data, setValue]);
};
