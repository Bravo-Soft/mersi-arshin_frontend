import { useGridApiContext } from '@mui/x-data-grid-pro';
import { useState } from 'react';

import { arshinFilterStatusDone } from 'constant/arshinStatus';

/**
 * @package хук отправления данных на проверку в Arshin
 * @props url => url для коннекта к каналу SSE
 * @props callBack
 * @function handleSelectItems => функция обработки модели
 * @function handleDisabledSelectedRow => функция блокирующая возможность изменения выбранной модели
 * @argument selectionIds => выбранная модель
 * @returns возвращает [selectionIds , handleSelectItems , handleDisabledSelectedRow ]
 */

export const useFilterArshin = (): [VoidFunction, boolean] => {
	const apiRef = useGridApiContext();

	const localeStorageArshinState = Boolean(localStorage.getItem('Arshin-filter'));

	const [completeDone, setCompleteDone] = useState(localeStorageArshinState);

	const updateArshinFilter = () => {
		if (completeDone) {
			localStorage.removeItem('Arshin-filter');
			apiRef.current.deleteFilterItem(arshinFilterStatusDone);
		} else {
			localStorage.setItem('Arshin-filter', 'done');
			apiRef.current.upsertFilterItem(arshinFilterStatusDone);
		}
		setCompleteDone(prev => !prev);
	};

	return [updateArshinFilter, completeDone];
};
